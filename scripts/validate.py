"""Validate the static site's page structure, internal links and required content."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index.html', 'about.html', 'projects.html', 'contact.html']

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.h1s, self.active = set(), [], 0, []
        self.stack = []
        self.feed(source)
        assert not self.stack, f'Unclosed elements: {self.stack}'

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate ID: {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'h1':
            self.h1s += 1
        if attrs.get('aria-current') == 'page':
            self.active.append(attrs['href'])
        if tag == 'img':
            assert 'alt' in attrs, 'Image missing alternative text'
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, f'Mismatched closing tag: {tag} after {self.stack[-3:]}'
        self.stack.pop()

pages = {name: Page((ROOT/name).read_text()) for name in PAGES}
for name, page in pages.items():
    assert page.h1s == 1, f'{name}: expected one main heading'
    assert page.active == [name], f'{name}: incorrect active navigation'
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = unquote(url.path) or name
        assert (ROOT/target).is_file(), f'{name}: missing file {target}'
        if url.fragment and target in pages:
            assert url.fragment in pages[target].ids, f'{name}: missing anchor {link}'
    print(f'PASS {name}: headings, nesting, navigation, links, assets')
assert len([i for i in pages['projects.html'].ids if i.startswith('project-')]) == 11
print('PASS all 11 projects retained')
