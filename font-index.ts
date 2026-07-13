// Character lookup for the generated bitmap font.
namespace pixelFontData {
    const FALLBACK_GLYPH = "f/xABEAEQARABEAEQARABEAEQARABEAEQARABH/8AAA=";

    export function glyphFor(character: string): string {
        let index0 = CHARS_0.indexOf(character);
        if (index0 >= 0) return GLYPHS_0.substr(index0 * 44, 44);
        let index1 = CHARS_1.indexOf(character);
        if (index1 >= 0) return GLYPHS_1.substr(index1 * 44, 44);
        let index2 = CHARS_2.indexOf(character);
        if (index2 >= 0) return GLYPHS_2.substr(index2 * 44, 44);
        let index3 = CHARS_3.indexOf(character);
        if (index3 >= 0) return GLYPHS_3.substr(index3 * 44, 44);
        let index4 = CHARS_4.indexOf(character);
        if (index4 >= 0) return GLYPHS_4.substr(index4 * 44, 44);
        let index5 = CHARS_5.indexOf(character);
        if (index5 >= 0) return GLYPHS_5.substr(index5 * 44, 44);
        let index6 = CHARS_6.indexOf(character);
        if (index6 >= 0) return GLYPHS_6.substr(index6 * 44, 44);
        let index7 = CHARS_7.indexOf(character);
        if (index7 >= 0) return GLYPHS_7.substr(index7 * 44, 44);
        let index8 = CHARS_8.indexOf(character);
        if (index8 >= 0) return GLYPHS_8.substr(index8 * 44, 44);
        let index9 = CHARS_9.indexOf(character);
        if (index9 >= 0) return GLYPHS_9.substr(index9 * 44, 44);
        let index10 = CHARS_10.indexOf(character);
        if (index10 >= 0) return GLYPHS_10.substr(index10 * 44, 44);
        let index11 = CHARS_11.indexOf(character);
        if (index11 >= 0) return GLYPHS_11.substr(index11 * 44, 44);
        let index12 = CHARS_12.indexOf(character);
        if (index12 >= 0) return GLYPHS_12.substr(index12 * 44, 44);
        return FALLBACK_GLYPH;
    }

    export function contains(character: string): boolean {
        if (CHARS_0.indexOf(character) >= 0) return true;
        if (CHARS_1.indexOf(character) >= 0) return true;
        if (CHARS_2.indexOf(character) >= 0) return true;
        if (CHARS_3.indexOf(character) >= 0) return true;
        if (CHARS_4.indexOf(character) >= 0) return true;
        if (CHARS_5.indexOf(character) >= 0) return true;
        if (CHARS_6.indexOf(character) >= 0) return true;
        if (CHARS_7.indexOf(character) >= 0) return true;
        if (CHARS_8.indexOf(character) >= 0) return true;
        if (CHARS_9.indexOf(character) >= 0) return true;
        if (CHARS_10.indexOf(character) >= 0) return true;
        if (CHARS_11.indexOf(character) >= 0) return true;
        if (CHARS_12.indexOf(character) >= 0) return true;
        return false;
    }
}
