"""Pull the real Menu Finder data the film draws (read-only) and write it into menu-film.html.

Usage: python3 extract-data.py [path/to/crawler.db]
Replaces the block between /*DATA*/ and /*END DATA*/ in menu-film.html.
"""
import json, math, random, re, sqlite3, sys
from pathlib import Path

DB = sys.argv[1] if len(sys.argv) > 1 else str(Path.home() / 'Library/Application Support/CrawlerRuntime/crawler.db')
HERE = Path(__file__).parent
con = sqlite3.connect(f'file:{DB}?mode=ro', uri=True)

STATES = {'NSW': 0, 'New South Wales': 0, 'ACT': 0, 'Australian Capital Territory': 0,
          'VIC': 1, 'Victoria': 1, 'QLD': 2, 'Queensland': 2, 'WA': 3, 'Western Australia': 3,
          'SA': 4, 'South Australia': 4, 'TAS': 5, 'Tasmania': 5, 'NT': 5, 'Northern Territory': 5}
rows = con.execute("""
  select distinct r.id, r.latitude, r.longitude, coalesce(r.state, '')
  from restaurants r join restaurant_menu_documents rmd on rmd.restaurant_id = r.id
  where r.latitude between -44 and -10 and r.longitude between 112 and 154""").fetchall()

NEWTOWN = (-33.8968, 151.1793)
def metres(lat, lng):
    k = math.pi / 180
    a = math.sin((lat - NEWTOWN[0]) * k / 2) ** 2 + math.cos(NEWTOWN[0] * k) * math.cos(lat * k) * math.sin((lng - NEWTOWN[1]) * k / 2) ** 2
    return 6371000 * 2 * math.asin(math.sqrt(a))

def state_of(name, lat, lng):
    if name in STATES: return STATES[name]
    if lat < -39.5: return 5
    if lng < 129: return 3
    if lng < 141 and lat < -26: return 4
    if lat > -29 and lng > 138: return 2
    if lat < -34 and lng > 141 and lng < 150: return 1
    return 0

random.seed(7)
# Everything within 30 km of Newtown keeps street-level precision so the camera can dive in without gaps.
national, local = [], []
for _, lat, lng, st in rows:
    if metres(lat, lng) < 30000:
        local.append((round(lng, 4), round(lat, 4)))
    else:
        national.append((round(lng, 2), round(lat, 2), state_of(st, lat, lng)))
local = sorted(set(local))
national = sorted(set(national))
random.shuffle(national)
national = national[:8000]

data = {
    'national': [v for p in national for v in (round((p[0] - 112) * 100), round((p[1] + 44) * 100), p[2])],
    'local': [v for p in local for v in (round((p[0] - 150) * 1e4), round((p[1] + 34.5) * 1e4))],
}
block = '/*DATA*/const DATA = ' + json.dumps(data, separators=(',', ':')) + ';/*END DATA*/'
html_path = HERE / 'menu-film.html'
html = html_path.read_text()
html = re.sub(r'/\*DATA\*/.*?/\*END DATA\*/', lambda _: block, html, flags=re.S)
html_path.write_text(html)
print(f'{len(rows)} restaurants with menus · {len(national)} national points · {len(local)} within 30 km of Newtown')
