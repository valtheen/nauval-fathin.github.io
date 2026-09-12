"""Refresh local CSS/JS version URLs after editing shared assets."""
from pathlib import Path
import hashlib
import re

root = Path(__file__).resolve().parents[1]
for asset in ('css/site.css', 'js/site.js'):
    version = hashlib.sha256((root / asset).read_bytes()).hexdigest()[:12]
    for name in ('index.html', 'about.html', 'projects.html', 'contact.html'):
        page = root / name
        page.write_text(re.sub(
            re.escape(asset) + r'(?:\?v=[a-f0-9]+)?',
            f'{asset}?v={version}',
            page.read_text(),
        ))
    print(f'{asset}: {version}')
