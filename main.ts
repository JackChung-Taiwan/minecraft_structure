//% helper=mapImage
//% blockIdentity="pixelArt._spriteImage"
//% pyConvertToTaggedTemplate
function img(lits: any, ...args: any[]): Image { return null }

namespace helpers {
    // Parses an Arcade-style image string. Invalid characters are ignored.
    export function mapImage(value: string) {
        const values: number[][] = [];
        let currentRow = 0;
        let currentCol = 0;
        let width = 0;

        for (let i = 0; i < value.length; i++) {
            const current = value.charAt(i);
            if (current === "\n") {
                if (currentCol > 0) {
                    width = Math.max(width, currentCol);
                    currentRow++;
                    currentCol = 0;
                }
                continue;
            }

            let pixel: number;
            switch (current) {
                case ".":
                case "#":
                case "0": pixel = 0; break;
                case "1": pixel = 1; break;
                case "2": pixel = 2; break;
                case "3": pixel = 3; break;
                case "4": pixel = 4; break;
                case "5": pixel = 5; break;
                case "6": pixel = 6; break;
                case "7": pixel = 7; break;
                case "8": pixel = 8; break;
                case "9": pixel = 9; break;
                case "a": case "A": pixel = 10; break;
                case "b": case "B": pixel = 11; break;
                case "c": case "C": pixel = 12; break;
                case "d": case "D": pixel = 13; break;
                case "e": case "E": pixel = 14; break;
                case "f": case "F": pixel = 15; break;
                default: continue;
            }

            if (values.length < currentCol + 1) values.push([]);
            if (values[currentCol].length < currentRow + 1) values[currentCol].push(0);
            values[currentCol][currentRow] = pixel;
            currentCol++;
        }

        const height = values.length;
        const result = new Image(width, height);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const col = values[x];
                if (col && y < col.length) result.setPixel(x, y, col[y]);
            }
        }
        return result;
    }
}

/** Concrete-block colors used by pixel text. */
enum PixelTextColor {
    //% block="白色"
    White = 1,
    //% block="紅色"
    Red = 2,
    //% block="粉紅色"
    Pink = 3,
    //% block="橘色"
    Orange = 4,
    //% block="黃色"
    Yellow = 5,
    //% block="青色"
    Cyan = 6,
    //% block="淺綠色"
    Lime = 7,
    //% block="藍色"
    Blue = 8,
    //% block="淺藍色"
    LightBlue = 9,
    //% block="洋紅色"
    Magenta = 10,
    //% block="灰色"
    Gray = 11,
    //% block="紫色"
    Purple = 12,
    //% block="淺灰色"
    LightGray = 13,
    //% block="棕色"
    Brown = 14,
    //% block="黑色"
    Black = 15
}

//% block="中文像素字"
//% color="#00296b"
//% icon="\uf031"
namespace pixelArt {
    /** An image editable with the MakeCode pixel-art editor. */
    //% blockId=minecraft_pixel_art_sprite_image
    //% block="$img"
    //% shim=TD_ID
    //% img.fieldEditor="sprite"
    //% img.fieldOptions.taggedTemplate="img"
    //% img.fieldOptions.decompileIndirectFixedInstances="true"
    //% img.fieldOptions.decompileArgumentAsString="true"
    //% weight=100 duplicateShadowOnDrag
    export function _spriteImage(img: Image) {
        return img;
    }

    /** Draws an image at a world position using concrete blocks. */
    //% blockId=minecraft_pixel_art_draw_image
    //% block="畫出像素圖 $image 在 $position 朝向 $direction"
    //% image.shadow=minecraft_pixel_art_sprite_image
    //% position.shadow=minecraftCreatePosition
    //% weight=100
    export function drawImage(image: Image, position: Position, direction: CompassDirection) {
        const origin = position.toWorld();
        const colors = [
            WHITE_CONCRETE,
            RED_CONCRETE,
            PINK_CONCRETE,
            ORANGE_CONCRETE,
            YELLOW_CONCRETE,
            CYAN_CONCRETE,
            LIME_CONCRETE,
            BLUE_CONCRETE,
            LIGHT_BLUE_CONCRETE,
            MAGENTA_CONCRETE,
            GRAY_CONCRETE,
            PURPLE_CONCRETE,
            LIGHT_GRAY_CONCRETE,
            BROWN_CONCRETE,
            BLACK_CONCRETE
        ];

        const visited = new Image(image.width, image.height);
        for (let x = 0; x < image.width; x++) {
            for (let y = 0; y < image.height; y++) {
                if (visited.getPixel(x, y)) continue;
                const color = image.getPixel(x, y);
                visited.setPixel(x, y, 1);
                if (!color) continue;

                let width = 1;
                for (let x2 = x + 1; x2 < image.width; x2++) {
                    if (visited.getPixel(x2, y) || image.getPixel(x2, y) !== color) break;
                    width++;
                    visited.setPixel(x2, y, 1);
                }

                let height = 1;
                for (let y2 = y + 1; y2 < image.height; y2++) {
                    let invalid = false;
                    for (let i = 0; i < width; i++) {
                        if (visited.getPixel(x + i, y2) || image.getPixel(x + i, y2) !== color) {
                            invalid = true;
                            break;
                        }
                    }
                    if (invalid) break;
                    for (let i = 0; i < width; i++) visited.setPixel(x + i, y2, 1);
                    height++;
                }

                fillRect(origin, direction, colors[color - 1], x, y, width, height, image);
            }
        }
    }

    /**
     * Turns typed Traditional Chinese text into 16×16 pixel glyphs and builds it in Minecraft.
     * Unsupported characters are shown as a square.
     * @param text Text to build, for example 你好麥塊
     * @param position Bottom-left starting position
     * @param direction Direction the text faces
     * @param color Concrete color
     * @param scale Pixel size in blocks, from 1 to 4
     * @param spacing Space between characters, from 0 to 4 pixels
     */
    //% blockId=minecraft_pixel_art_draw_text
    //% block="畫出中文 $text 在 $position 朝向 $direction 顏色 $color 放大 $scale 倍 字距 $spacing"
    //% text.defl="你好麥塊"
    //% position.shadow=minecraftCreatePosition
    //% color.defl=PixelTextColor.Black
    //% scale.min=1 scale.max=4 scale.defl=1
    //% spacing.min=0 spacing.max=4 spacing.defl=1
    //% weight=110
    export function drawText(text: string, position: Position, direction: CompassDirection, color: PixelTextColor = PixelTextColor.Black, scale = 1, spacing = 1) {
        const image = textImage(text, color, scale, spacing, 2);
        drawImage(image, position, direction);
    }

    /** Returns whether the built-in font contains a character. */
    //% blockId=minecraft_pixel_art_has_character
    //% block="中文字庫包含 $character"
    //% character.defl="學"
    //% weight=90
    export function hasCharacter(character: string): boolean {
        if (!character || character.length < 1) return false;
        return pixelFontData.contains(character.charAt(0));
    }

    function textImage(text: string, color: PixelTextColor, scale: number, spacing: number, lineSpacing: number): Image {
        scale = clampInteger(scale, 1, 4);
        spacing = clampInteger(spacing, 0, 4);
        lineSpacing = clampInteger(lineSpacing, 0, 8);
        if (!text) text = " ";

        const lines = splitLines(text);
        let maxLength = 1;
        for (let i = 0; i < lines.length; i++) maxLength = Math.max(maxLength, lines[i].length);

        const unscaledWidth = maxLength * 16 + Math.max(0, maxLength - 1) * spacing;
        const unscaledHeight = lines.length * 16 + Math.max(0, lines.length - 1) * lineSpacing;
        const result = new Image(unscaledWidth * scale, unscaledHeight * scale);

        for (let line = 0; line < lines.length; line++) {
            for (let index = 0; index < lines[line].length; index++) {
                const character = lines[line].charAt(index);
                const rows = decodeGlyph(pixelFontData.glyphFor(character));
                const startX = index * (16 + spacing) * scale;
                const startY = line * (16 + lineSpacing) * scale;

                for (let y = 0; y < 16; y++) {
                    const row = rows[y];
                    for (let x = 0; x < 16; x++) {
                        if ((row & (1 << (15 - x))) === 0) continue;
                        for (let sy = 0; sy < scale; sy++) {
                            for (let sx = 0; sx < scale; sx++) {
                                result.setPixel(startX + x * scale + sx, startY + y * scale + sy, color);
                            }
                        }
                    }
                }
            }
        }
        return result;
    }

    function splitLines(text: string): string[] {
        const result: string[] = [];
        let current = "";
        for (let i = 0; i < text.length; i++) {
            const ch = text.charAt(i);
            if (ch === "\n") {
                result.push(current);
                current = "";
            } else if (ch !== "\r") {
                current += ch;
            }
        }
        result.push(current);
        return result;
    }

    function clampInteger(value: number, minimum: number, maximum: number): number {
        value = Math.round(value);
        if (value < minimum) return minimum;
        if (value > maximum) return maximum;
        return value;
    }

    function decodeGlyph(encoded: string): number[] {
        const bytes: number[] = [];
        for (let i = 0; i < encoded.length; i += 4) {
            const a = base64Value(encoded.charCodeAt(i));
            const b = base64Value(encoded.charCodeAt(i + 1));
            const c = base64Value(encoded.charCodeAt(i + 2));
            const d = base64Value(encoded.charCodeAt(i + 3));
            if (a < 0 || b < 0) break;
            bytes.push((a << 2) | (b >> 4));
            if (c >= 0) {
                bytes.push(((b & 15) << 4) | (c >> 2));
                if (d >= 0) bytes.push(((c & 3) << 6) | d);
            }
        }

        const rows: number[] = [];
        for (let i = 0; i < 16; i++) rows.push((bytes[i * 2] << 8) | bytes[i * 2 + 1]);
        return rows;
    }

    function base64Value(code: number): number {
        if (code >= 65 && code <= 90) return code - 65;
        if (code >= 97 && code <= 122) return code - 97 + 26;
        if (code >= 48 && code <= 57) return code - 48 + 52;
        if (code === 43) return 62;
        if (code === 47) return 63;
        return -1;
    }

    function fillRect(origin: Position, direction: number, block: number, x: number, y: number, width: number, height: number, image: Image) {
        let fromPosition: Position;
        let toPosition: Position;
        if (direction === CompassDirection.North) {
            fromPosition = world(origin.getValue(Axis.X), origin.getValue(Axis.Y) + image.height - y - 1, origin.getValue(Axis.Z) - x);
            toPosition = world(origin.getValue(Axis.X), origin.getValue(Axis.Y) + image.height - (y + height - 1) - 1, origin.getValue(Axis.Z) - (x + width - 1));
        } else if (direction === CompassDirection.East) {
            fromPosition = world(origin.getValue(Axis.X) + x, origin.getValue(Axis.Y) + image.height - y - 1, origin.getValue(Axis.Z));
            toPosition = world(origin.getValue(Axis.X) + (x + width - 1), origin.getValue(Axis.Y) + image.height - (y + height - 1) - 1, origin.getValue(Axis.Z));
        } else if (direction === CompassDirection.South) {
            fromPosition = world(origin.getValue(Axis.X), origin.getValue(Axis.Y) + image.height - y - 1, origin.getValue(Axis.Z) + x);
            toPosition = world(origin.getValue(Axis.X), origin.getValue(Axis.Y) + image.height - (y + height - 1) - 1, origin.getValue(Axis.Z) + (x + width - 1));
        } else {
            fromPosition = world(origin.getValue(Axis.X) - x, origin.getValue(Axis.Y) + image.height - y - 1, origin.getValue(Axis.Z));
            toPosition = world(origin.getValue(Axis.X) - (x + width - 1), origin.getValue(Axis.Y) + image.height - (y + height - 1) - 1, origin.getValue(Axis.Z));
        }
        blocks.fill(block, fromPosition, toPosition, FillOperation.Replace);
    }
}

//% snippet='img`.`'
//% pySnippet='img(""" . """)'
class Image {
    protected buf: number[];

    constructor(public width: number, public height: number, public x0 = 0, public y0 = 0) {
        if (!this.width) this.width = 16;
        if (!this.height) this.height = 16;
        this.buf = [];
        for (let i = 0; i < this.width * this.height; i++) this.buf.push(0);
    }

    setPixel(col: number, row: number, value: number) {
        if (col < this.width && row < this.height && col >= 0 && row >= 0) this.buf[col + row * this.width] = value;
    }

    getPixel(col: number, row: number) {
        if (col < this.width && row < this.height && col >= 0 && row >= 0) return this.buf[col + row * this.width];
        return 0;
    }

    copy(col = 0, row = 0, width = this.width, height = this.height): Image {
        const sub = new Image(width, height);
        sub.x0 = col;
        sub.y0 = row;
        for (let c = 0; c < width; c++) {
            for (let r = 0; r < height; r++) sub.setPixel(c, r, this.getPixel(col + c, row + r));
        }
        return sub;
    }

    apply(change: Image, transparent = false) {
        for (let c = 0; c < change.width; c++) {
            for (let r = 0; r < change.height; r++) {
                const current = change.getPixel(c, r);
                if (!current && transparent) continue;
                this.setPixel(change.x0 + c, change.y0 + r, current);
            }
        }
    }
}
