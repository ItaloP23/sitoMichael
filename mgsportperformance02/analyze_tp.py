import re

with open('triathlonpassione_full.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Clean HTML tags to get pure text in sequence
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_script = False
        self.in_style = False

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'noscript'):
            self.in_script = True
        elif tag == 'style':
            self.in_style = True
        elif tag in ('p', 'h1', 'h2', 'h3', 'h4', 'div', 'section', 'li'):
            self.text.append('\n')

    def handle_endtag(self, tag):
        if tag in ('script', 'noscript'):
            self.in_script = False
        elif tag == 'style':
            self.in_style = False
        elif tag in ('p', 'h1', 'h2', 'h3', 'h4', 'div', 'section', 'li'):
            self.text.append('\n')

    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            d = data.strip()
            if d:
                self.text.append(d + ' ')

extractor = TextExtractor()
extractor.feed(html)
content = ''.join(extractor.text)

# Clean excessive newlines
lines = [l.strip() for l in content.split('\n') if l.strip()]
print("=== HOMEPAGE TEXT FLOW ===")
for line in lines:
    if len(line) > 3 and not line.startswith("var ") and not "cookie" in line.lower() and not "cmplz" in line.lower():
        print(line)
