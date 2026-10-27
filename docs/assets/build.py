"""Gera os SVGs do README a partir de theme.json e content.json.

Uso (na raiz do repositório): python docs/assets/build.py
"""
import base64
import json
import textwrap
from html import escape
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
T = json.loads((HERE / "theme.json").read_text(encoding="utf-8"))
C = json.loads((HERE / "content.json").read_text(encoding="utf-8"))

SANS, MONO = T["fontSans"], T["fontMono"]
ANIM = T["animations"]
GLOW = T["glow"] and T["grid"]
R = T["radiusScale"]
SVG_NS = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'


def e(s):
    return escape(s, quote=True)


def write(name, body):
    (HERE / name).write_text(body, encoding="utf-8")


def svg(w, h, title, inner, defs="", style=""):
    st = f"<style>{style}</style>" if style else ""
    return (
        f'<svg {SVG_NS} width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{e(title)}">'
        f"<title>{e(title)}</title><defs>{defs}</defs>{st}{inner}</svg>\n"
    )


def grad(id_="g"):
    return (
        f'<linearGradient id="{id_}" x1="0" y1="0" x2="1" y2="0">'
        f'<stop offset="0" stop-color="{T["accent"]}"/><stop offset="1" stop-color="{T["accent2"]}"/></linearGradient>'
    )


def radial(id_, color, op):
    return (
        f'<radialGradient id="{id_}"><stop offset="0" stop-color="{color}" stop-opacity="{op}"/>'
        f'<stop offset="1" stop-color="{color}" stop-opacity="0"/></radialGradient>'
    )


def dots(x, y):
    cols = ["#ff8a7a", "#f5d36a", T["accent"]]
    return "".join(f'<circle cx="{x + i * 16}" cy="{y}" r="4.5" fill="{c}"/>' for i, c in enumerate(cols))


def data_uri(rel, max_w=None):
    path = ROOT / rel
    raw = path.read_bytes()
    from PIL import Image
    import io

    im = Image.open(path)
    w, h = im.size
    if max_w and w > max_w:
        im = im.convert("RGB").resize((max_w, round(h * max_w / w)))
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=80, optimize=True)
        raw = buf.getvalue()
        w, h = im.size
    assert len(raw) <= 200 * 1024, f"{rel} passa de 200 KB"
    return "data:image/jpeg;base64," + base64.b64encode(raw).decode(), w, h


def chip_w(label):
    return 0.6 * 13 * len(label) + 38


def chips(labels, x0, y0, max_x):
    """Chips em linha, quebrando quando passa de max_x. Devolve (svg, altura usada)."""
    out, x, y, i = [], x0, y0, 0
    for lb in labels:
        w = chip_w(lb)
        if x + w > max_x:
            x, y = x0, y + 40
        col = T["accent"] if i % 2 == 0 else T["accent2"]
        out.append(
            f'<rect x="{x:.1f}" y="{y}" width="{w:.1f}" height="32" rx="16" fill="{T["bg"]}" stroke="{T["borderStrong"]}"/>'
            f'<circle cx="{x + 17:.1f}" cy="{y + 16}" r="3.5" fill="{col}"/>'
            f'<text x="{x + 29:.1f}" y="{y + 21}" font-family="{MONO}" font-size="13" fill="{T["fg"]}">{e(lb)}</text>'
        )
        x += w + 10
        i += 1
    return "".join(out), y + 32 - y0


# ---------------------------------------------------------------- banner
def banner():
    W, H = 1200, 470
    d = grad() + radial("ga", T["accent"], 0.26) + radial("gb", T["accent2"], 0.26)
    d += f'<pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="{T["fg"]}" stroke-opacity="0.045"/></pattern>'
    d += f'<clipPath id="card"><rect width="{W}" height="{H}" rx="26"/></clipPath>'
    d += '<clipPath id="shot"><rect x="770" y="86" width="366" height="290" rx="0"/></clipPath>'
    d += '<clipPath id="shotc"><rect x="770" y="58" width="366" height="318" rx="20"/></clipPath>'
    style = ""
    if ANIM:
        style = (
            "@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}"
            "@keyframes d1{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,22px)}}"
            "@keyframes d2{0%,100%{transform:translate(0,0)}50%{transform:translate(-44px,-20px)}}"
            ".pulse{animation:pulse 2.4s ease-in-out infinite}"
            ".d1{animation:d1 14s ease-in-out infinite}.d2{animation:d2 16s ease-in-out infinite}"
        )
    inner = f'<g clip-path="url(#card)"><rect width="{W}" height="{H}" fill="{T["bg"]}"/>'
    if GLOW:
        inner += f'<rect width="{W}" height="{H}" fill="url(#grid)"/>'
        inner += '<circle class="d1" cx="170" cy="40" r="330" fill="url(#ga)"/>'
        inner += '<circle class="d2" cx="1040" cy="420" r="380" fill="url(#gb)"/>'
    inner += "</g>"
    inner += f'<rect x=".5" y=".5" width="{W - 1}" height="{H - 1}" rx="26" fill="none" stroke="{T["borderStrong"]}"/>'
    # pílula
    label = f'github.com/diegonatalo/{C["repo"]}'.upper()
    pw = len(label) * (13 * 0.6 + 1.8) + 56
    inner += f'<rect x="72" y="62" width="{pw:.0f}" height="36" rx="18" fill="{T["accent"]}" fill-opacity=".1" stroke="{T["accent"]}" stroke-opacity=".38"/>'
    inner += f'<circle class="pulse" cx="92" cy="80" r="4.5" fill="{T["accent"]}"/>'
    inner += f'<text x="108" y="85" font-family="{MONO}" font-size="13" letter-spacing="1.8" fill="{T["fg"]}">{e(label)}</text>'
    # nome
    inner += f'<text x="72" y="196" font-family="{SANS}" font-size="98" font-weight="800" letter-spacing="-3" fill="{T["fg"]}">{e(C["name"])}</text>'
    for i, ln in enumerate(textwrap.wrap(C["tagline"], 48)[:2]):
        inner += f'<text x="72" y="{296 + i * 28}" font-family="{SANS}" font-size="20" fill="{T["muted"]}">{e(ln)}</text>'
    cs, _ = chips(C["bannerChips"], 72, 362, 740)
    inner += cs
    # moldura
    uri, iw, ih = data_uri(C["bannerShot"]["file"], 732)
    inner += f'<rect x="770" y="58" width="366" height="318" rx="20" fill="{T["card"]}" stroke="{T["borderStrong"]}"/>'
    inner += f'<g clip-path="url(#shotc)"><rect x="770" y="58" width="366" height="28" fill="{T["card"]}"/>'
    inner += f'<image x="770" y="86" width="366" height="290" preserveAspectRatio="xMidYMid slice" xlink:href="{uri}" href="{uri}"/></g>'
    inner += f'<line x1="771" x2="1135" y1="86" y2="86" stroke="{T["borderStrong"]}"/>'
    inner += dots(790, 72)
    inner += f'<text x="850" y="76" font-family="{MONO}" font-size="12" fill="{T["subtle"]}">{e(C["bannerShot"]["title"])}</text>'
    alt = f'{C["name"]}: {C["tagline"]}'
    write("banner.svg", svg(W, H, alt, inner, d, style))


# ---------------------------------------------------------------- botões
def button(name, label, primary):
    text = label + " ↗"
    w = round(len(text) * 10.4 + 64)
    h = 52
    d = grad()
    if primary:
        body = f'<rect width="{w}" height="{h}" rx="26" fill="url(#g)"/>'
        col = T["onAccent"]
    else:
        body = f'<rect x=".75" y=".75" width="{w - 1.5}" height="{h - 1.5}" rx="26" fill="{T["card"]}" stroke="{T["borderStrong"]}" stroke-width="1.5"/>'
        col = T["fg"]
    body += f'<text x="{w / 2}" y="33" text-anchor="middle" font-family="{SANS}" font-size="16" font-weight="700" fill="{col}">{e(text)}</text>'
    write(name, svg(w, h, text, body, d))


# ---------------------------------------------------------------- cabeçalhos
def headers():
    for n, s in enumerate(C["sections"], 1):
        lab = f"{n:02d} · {s['label']}"
        pw = len(lab) * 9.4 + 34
        d = grad() + radial("a", T["accent2"], 0.16) + radial("b", T["accent"], 0.16)
        d += '<clipPath id="c"><rect width="1000" height="124" rx="22"/></clipPath>'
        inner = f'<g clip-path="url(#c)"><rect width="1000" height="124" fill="{T["bg"]}"/>'
        if GLOW:
            inner += '<circle cx="1000" cy="0" r="230" fill="url(#a)"/><circle cx="0" cy="124" r="200" fill="url(#b)"/>'
        inner += "</g>"
        inner += f'<rect x=".5" y=".5" width="999" height="123" rx="22" fill="none" stroke="{T["borderStrong"]}"/>'
        inner += f'<rect x="40" y="26" width="{pw:.0f}" height="28" rx="14" fill="{T["accent"]}" fill-opacity=".1" stroke="{T["accent"]}" stroke-opacity=".38"/>'
        inner += f'<text x="{40 + pw / 2:.0f}" y="45" text-anchor="middle" font-family="{MONO}" font-size="12" letter-spacing="1.6" fill="{T["accent"]}">{e(lab)}</text>'
        inner += f'<text x="40" y="94" font-family="{SANS}" font-size="36" font-weight="800" letter-spacing="-0.8" fill="{T["fg"]}">{e(s["title"])}</text>'
        inner += '<rect x="40" y="106" width="64" height="3" rx="1.5" fill="url(#g)"/>'
        write(f"h-{s['id']}.svg", svg(1000, 124, f"{lab}: {s['title']}", inner, d))


# ---------------------------------------------------------------- cards
def card_svg(w, h, inner, title, idn):
    d = grad() + radial("a", T["accent"], 0.2)
    d += f'<clipPath id="c"><rect width="{w}" height="{h}" rx="22"/></clipPath>'
    body = f'<g clip-path="url(#c)"><rect width="{w}" height="{h}" fill="{T["card"]}"/>'
    body += f'<rect width="{w}" height="4" fill="url(#g)"/>'
    if GLOW:
        body += f'<circle cx="{w}" cy="0" r="170" fill="url(#a)"/>'
    body += "</g>"
    body += f'<rect x=".5" y=".5" width="{w - 1}" height="{h - 1}" rx="22" fill="none" stroke="{T["borderStrong"]}"/>'
    return svg(w, h, title, body + inner, d)


def features():
    for i, (t, desc) in enumerate(C["features"], 1):
        inner = f'<text x="32" y="44" font-family="{MONO}" font-size="12" letter-spacing="1.2" fill="{T["subtle"]}">FUNCIONALIDADE {i:02d}</text>'
        inner += f'<text x="32" y="82" font-family="{SANS}" font-size="28" font-weight="700" fill="{T["fg"]}">{e(t)}</text>'
        for j, ln in enumerate(textwrap.wrap(desc, 46)[:5]):
            inner += f'<text x="32" y="{116 + j * 22}" font-family="{SANS}" font-size="14.5" fill="{T["muted"]}">{e(ln)}</text>'
        write(f"f-{i:02d}.svg", card_svg(490, 290, inner, f"{t}. {desc}", i))


def stack():
    cs, ch = chips(C["stack"], 26, 26, 974)
    h = ch + 52
    d = radial("a", T["accent"], 0.12)
    body = f'<rect width="1000" height="{h}" rx="20" fill="{T["card"]}"/>'
    if GLOW:
        body += f'<circle cx="1000" cy="0" r="200" fill="url(#a)" clip-path="url(#c)"/>'
    d += f'<clipPath id="c"><rect width="1000" height="{h}" rx="20"/></clipPath>'
    body += f'<rect x=".5" y=".5" width="999" height="{h - 1}" rx="20" fill="none" stroke="{T["borderStrong"]}"/>' + cs
    write("stack.svg", svg(1000, h, "Stack: " + ", ".join(C["stack"]), body, d))


# ---------------------------------------------------------------- screenshots
def shots():
    for i, s in enumerate(C["shots"], 1):
        uri, iw, ih = data_uri(s["file"])
        W = 1000
        ph = round(W * ih / iw)
        H = 28 + ph + 34
        d = radial("a", T["accent"], 0.22)
        d += f'<clipPath id="c"><rect x="0" y="0" width="{W}" height="{28 + ph}" rx="16"/></clipPath>'
        body = ""
        if GLOW:
            body += f'<ellipse cx="500" cy="{28 + ph + 4}" rx="420" ry="30" fill="url(#a)"/>'
        body += f'<rect width="{W}" height="{28 + ph}" rx="16" fill="{T["card"]}"/>'
        body += f'<g clip-path="url(#c)"><image x="0" y="28" width="{W}" height="{ph}" xlink:href="{uri}" href="{uri}"/></g>'
        body += f'<line x1="1" x2="{W - 1}" y1="28" y2="28" stroke="{T["borderStrong"]}"/>'
        body += f'<rect x=".5" y=".5" width="{W - 1}" height="{27 + ph}" rx="16" fill="none" stroke="{T["borderStrong"]}"/>'
        body += dots(22, 14) + f'<text x="80" y="18" font-family="{MONO}" font-size="12" fill="{T["subtle"]}">{e(s["title"])}</text>'
        write(f"shot-{i:02d}.svg", svg(W, H, s["alt"], body, d))


# ---------------------------------------------------------------- rodapé
def footer():
    d = grad()
    body = f'<rect x="0" y="13" width="1000" height="2" fill="url(#g)" opacity=".7"/>'
    body += f'<text x="500" y="52" text-anchor="middle" font-family="{MONO}" font-size="12.5" fill="{T["subtle"]}">© {C["year"]} {e(C["author"].upper())}</text>'
    if C.get("licenseLine"):
        body += f'<text x="500" y="74" text-anchor="middle" font-family="{SANS}" font-size="14" fill="{T["muted"]}">{e(C["licenseLine"])}</text>'
    write("footer.svg", svg(1000, 90, f"© {C['year']} {C['author']}. {C.get('licenseLine', '')}", body, d))


if __name__ == "__main__":
    banner()
    button("btn-demo.svg", "Demonstração", True)
    button("btn-code.svg", "Código", False)
    for k, (lb, _) in enumerate(C["authorLinks"]):
        button(f"btn-autor-{k + 1}.svg", lb, False)
    headers()
    features()
    stack()
    shots()
    footer()
    print("ok")
