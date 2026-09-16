import re
import urllib.request

with open('triathlonpassione_full.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's inspect the actual HTML sections and backgrounds
print("=== ELEMENTOR SECTIONS BACKGROUND & STRUCTURE ===")
# Find background images or colors in elementor settings
bg_images = re.findall(r'url\(([^)]+)\)', html)
print("Background images:", bg_images[:10])

# Inspect the visual structure:
# Section 1: Hero
# Section 2: Philosophy
# Section 3: Services
# Section 4: Call to action / Contact
# Section 5: Footer

# Let's look at the classes and inline styles of the main sections
matches = re.finditer(r'<section[^>]+class="([^"]*elementor-top-section[^"]*)"[^>]*>(.*?)</section>', html, re.DOTALL)
for i, m in enumerate(matches):
    cls = m.group(1)
    body = m.group(2)
    h = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', body, re.DOTALL)
    h_clean = [re.sub(r'<[^>]+>', '', x).strip() for x in h]
    p = re.findall(r'<p[^>]*>(.*?)</p>', body, re.DOTALL)
    p_clean = [re.sub(r'<[^>]+>', '', x).strip() for x in p if len(x.strip()) > 20]
    print(f"\n--- SECTION {i+1} ---")
    print(f"Headings: {h_clean}")
    if p_clean:
        print(f"Sample Text: {p_clean[0][:150]}...")
