#!/usr/bin/env python3
"""Apply subpage-copy.json to portfolio-content.js in place.

Only the values named in the spec change (a project's lede `text`; each section's `title`, `more`, `bullets` and showcase
`caption`), so formatting, comments and every other field stay exactly as they are. Sections are matched by their label,
in order. Usage: python3 scripts/copy/apply-copy.py [--check]
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'portfolio-content.js'
SPEC = json.loads((Path(__file__).parent / 'subpage-copy.json').read_text())
LABELS = {'The problem', 'Why build it', 'What I learnt', 'Challenge', 'Pattern', 'Scale', 'Today', 'Outcome', 'Next step'}


def value_end(s, i):
    """Index just past the string or array literal that starts at s[i]."""
    if s[i] in '"\'':
        q, i = s[i], i + 1
        while s[i] != q:
            i += 2 if s[i] == '\\' else 1
        return i + 1
    assert s[i] == '[', s[i:i + 40]
    depth = 0
    while True:
        c = s[i]
        if c in '"\'':
            i = value_end(s, i)
            continue
        depth += c == '['
        depth -= c == ']'
        i += 1
        if depth == 0:
            return i


def key(s, name, start, end):
    """(key start, value start, quoted?) for the first `name:` or `"name":` key in s[start:end], or None."""
    m = re.compile(r'(?<![\w"\'])("?)' + re.escape(name) + r'\1\s*:\s*').search(s, start, end)
    return (m.start(), m.end(), m.group(1) == '"') if m else None


def literal(value, indent):
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if len(value) == 1:
        return '[' + literal(value[0], indent) + ']'
    inner = indent + '  '
    return '[\n' + ',\n'.join(inner + literal(v, inner) for v in value) + '\n' + indent + ']'


def indent_at(s, i):
    return re.match(r'[ \t]*', s[s.rfind('\n', 0, i) + 1:]).group(0)


def main():
    s = SOURCE.read_text()
    edits = []  # (start, end, replacement)
    for pid, spec in SPEC.items():
        if pid.startswith('_'):
            continue
        m = re.search(r"\n  '" + re.escape(pid) + r"': \{", s)
        assert m, pid
        start = m.end()
        nxt = re.compile(r"\n  '[a-z0-9-]+': \{|\n\};").search(s, start)
        end = nxt.start()
        subs = key(s, 'subs', start, end)
        if 'text' in spec:
            k = key(s, 'text', start, subs[0])
            edits.append((k[1], value_end(s, k[1]), literal(spec['text'], '')))
        # Section boundaries: each section-level label, in order.
        bounds = []
        for lm in re.compile(r'(?<![\w"\'])("?)label\1\s*:\s*').finditer(s, subs[1], end):
            v0 = lm.end(); v1 = value_end(s, v0)
            if s[v0 + 1:v1 - 1] in LABELS:
                bounds.append((lm.start(), s[v0 + 1:v1 - 1]))
        # Sections marked "insert" are added (before the next existing section) the first time; after that they exist and are edited.
        labels = [b[1] for b in bounds]
        sections = spec['sections']
        missing = [sec for sec in sections if sec.get('insert') and sec['label'] not in labels]
        want = [sec['label'] for sec in sections if sec not in missing]
        assert labels == want, (pid, labels, want)
        for sec in missing:
            later = sections[sections.index(sec) + 1:]
            nxt = next(b for b in bounds if b[1] in [s['label'] for s in later])[0]
            brace = s.rindex('{', 0, nxt)
            quoted = s[nxt] == '"'
            ind = indent_at(s, brace)
            fields = [('label', sec['label']), ('title', sec['title']), ('more', sec['more'])] + ([('bullets', sec['bullets'])] if sec.get('bullets') else []) + ([('film', sec['film'])] if 'film' in sec else [])
            body = (',\n' + ind + '  ').join(('"%s"' % f if quoted else f) + ': ' + literal(v, ind + '  ') for f, v in fields)
            edits.append((brace, brace, '{\n' + ind + '  ' + body + '\n' + ind + '},\n' + ind))
        sections = [sec for sec in sections if sec not in missing]
        for n, sec in enumerate(sections):
            a = bounds[n][0]
            b = bounds[n + 1][0] if n + 1 < len(bounds) else end
            for field in ('title', 'caption'):
                if field in sec:
                    k = key(s, field, a, b)
                    assert k, (pid, sec['label'], field)
                    edits.append((k[1], value_end(s, k[1]), literal(sec[field], '')))
            k = key(s, 'more', a, b)
            more_end = value_end(s, k[1])
            ind = indent_at(s, k[0])
            if 'more' in sec:
                edits.append((k[1], more_end, literal(sec['more'], ind)))
            # New fields go after `more` (or after existing bullets), in the source's key style.
            name = lambda f: '"%s"' % f if k[2] else f
            kb = key(s, 'bullets', a, b)
            after, added = (value_end(s, kb[1]) if kb else more_end), ''
            if 'bullets' in sec:
                if kb:
                    edits.append((kb[1], value_end(s, kb[1]), literal(sec['bullets'], indent_at(s, kb[0]))))
                else:
                    added += ',\n' + ind + name('bullets') + ': ' + literal(sec['bullets'], ind)
            if 'film' in sec:
                kf = key(s, 'film', a, b)
                if kf:
                    edits.append((kf[1], re.compile(r'[\d.]+').match(s, kf[1]).end(), str(sec['film'])))
                else:
                    added += ',\n' + ind + name('film') + ': ' + str(sec['film'])
            if added:
                edits.append((after, after, added))
    edits.sort(reverse=True)
    for (a, b, text) in edits:
        s = s[:a] + text + s[b:]
    if '--check' in sys.argv:
        print(f'{len(edits)} edits ready')
        return
    SOURCE.write_text(s)
    print(f'applied {len(edits)} edits to {SOURCE.name}')


if __name__ == '__main__':
    main()
