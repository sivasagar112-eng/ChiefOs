import re
import json

def style_str_to_dict(style_str):
    if not style_str.strip():
        return "{}"
    parts = style_str.split(";")
    res = []
    for p in parts:
        if ":" in p:
            k, v = p.split(":", 1)
            k = k.strip()
            v = v.strip()
            # camelCase the key
            k_parts = k.split("-")
            k_camel = k_parts[0] + "".join(word.capitalize() for word in k_parts[1:])
            res.append(f"{k_camel}: '{v}'")
    return "{{ " + ", ".join(res) + " }}"

def convert_html_to_jsx(html_content):
    # Extract style
    style_match = re.search(r'<style>(.*?)</style>', html_content, re.DOTALL)
    css = style_match.group(1) if style_match else ""
    
    # Extract body
    body_match = re.search(r'<body>(.*?)<script>', html_content, re.DOTALL)
    body = body_match.group(1) if body_match else ""
    
    # Replace class= with className=
    body = body.replace('class=', 'className=')
    body = body.replace('onclick=', 'onClick=')
    
    # Fix self closing tags
    body = re.sub(r'<br>', r'<br />', body)
    body = re.sub(r'<hr>', r'<hr />', body)
    body = re.sub(r'<img([^>]*?[^/])>', r'<img\1 />', body)
    body = re.sub(r'<input([^>]*?[^/])>', r'<input\1 />', body)
    
    # Replace style="prop: val; prop: val" with style={{ prop: 'val' }}
    def style_replacer(match):
        return f"style={style_str_to_dict(match.group(1))}"
    body = re.sub(r'style="(.*?)"', style_replacer, body)
    
    # Handle HTML entities
    # Not strictly necessary if we use unicode or dangerouslySetInnerHTML, but standard jsx handles &mdash; if we keep it, actually JSX allows some entities, but &mdash; is fine. Wait, JSX sometimes complains about unescaped entities or we can just leave them. Actually, better to replace some.
    # &mdash; -> {'\u2014'}
    # &ldquo; -> {'\u201C'}
    # &rdquo; -> {'\u201D'}
    
    return css, body

with open('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

css, jsx = convert_html_to_jsx(html)

with open('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/marketing.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/marketing_jsx.txt', 'w', encoding='utf-8') as f:
    f.write(jsx)

print("Done")
