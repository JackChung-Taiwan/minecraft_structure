from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import base64
import json
import textwrap

ROOT = Path(__file__).resolve().parents[1]
FONT_PATH = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
FONT = ImageFont.truetype(FONT_PATH, 18, index=3)  # Traditional Chinese face
CHUNK_SIZE = 450

characters = []

def add(text: str) -> None:
    for character in text:
        if character not in characters and character not in "\r\n":
            characters.append(character)

add("".join(chr(code) for code in range(32, 127)))
add('，。！？、；：「」『』（）《》〈〉【】〔〕［］｛｝…—．％＋－×÷＝＠＃＆＊／＼\u3000＿｜～‧·￥□')

# Big5 first-level characters: Taiwan's common Chinese character plane.
for lead in range(0xA4, 0xC7):
    for trail in list(range(0x40, 0x7F)) + list(range(0xA1, 0xFF)):
        try:
            add(bytes((lead, trail)).decode("big5"))
        except UnicodeDecodeError:
            pass

add("麥塊教育版程式設計人工智慧翊華台北兒童新樂園方塊學院冒險紅石機關建築玩家超能力變數陷阱代理人")


def glyph_rows(character: str):
    if character in (" ", "\u3000"):
        return [0] * 16

    canvas = Image.new("L", (24, 24), 0)
    draw = ImageDraw.Draw(canvas)
    left, top, right, bottom = draw.textbbox((0, 0), character, font=FONT)
    draw.text(((24 - right + left) // 2 - left, (24 - bottom + top) // 2 - top), character, font=FONT, fill=255)

    bounds = canvas.getbbox()
    if not bounds:
        return [0] * 16

    cropped = canvas.crop(bounds)
    cropped.thumbnail((15, 15), Image.Resampling.LANCZOS)
    bitmap = Image.new("L", (16, 16), 0)
    bitmap.paste(cropped, ((16 - cropped.width) // 2, (16 - cropped.height) // 2))
    bitmap = bitmap.point(lambda value: 255 if value >= 95 else 0)

    rows = []
    for y in range(16):
        row = 0
        for x in range(16):
            if bitmap.getpixel((x, y)):
                row |= 1 << (15 - x)
        rows.append(row)
    return rows


def encode(character: str) -> str:
    raw = bytearray()
    for row in glyph_rows(character):
        raw.extend(((row >> 8) & 255, row & 255))
    result = base64.b64encode(raw).decode("ascii")
    assert len(result) == 44
    return result

encoded = [encode(character) for character in characters]
source_files = []

for old_file in ROOT.glob("font-data-*.ts"):
    old_file.unlink()

chunks = []
for start in range(0, len(characters), CHUNK_SIZE):
    chunks.append(("".join(characters[start:start + CHUNK_SIZE]), "".join(encoded[start:start + CHUNK_SIZE])))

# Put two data namespaces in each source file to keep files reasonably sized.
for file_index, chunk_start in enumerate(range(0, len(chunks), 2)):
    output = []
    for chunk_index in range(chunk_start, min(chunk_start + 2, len(chunks))):
        chars, glyphs = chunks[chunk_index]
        output.append("// Generated 16×16 bitmap glyph data. Do not edit manually.\n")
        output.append("namespace pixelFontData {\n")
        output.append(f"    export const CHARS_{chunk_index} = {json.dumps(chars, ensure_ascii=False)};\n")
        output.append(f"    export const GLYPHS_{chunk_index} =\n")
        pieces = textwrap.wrap(glyphs, 120)
        for index, piece in enumerate(pieces):
            suffix = " +" if index < len(pieces) - 1 else ";"
            output.append(f'        "{piece}"{suffix}\n')
        output.append("}\n\n")

    destination = ROOT / f"font-data-{file_index}.ts"
    destination.write_text("".join(output), encoding="utf-8")
    source_files.append(destination.name)

print(f"Generated {len(characters)} glyphs in {len(source_files)} source files")
