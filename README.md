# Minecraft Education 中文像素字

這個 MakeCode 擴充功能以 Microsoft 官方 `makecode-minecraft-pixel-art` 為基礎，新增「直接輸入繁體中文文字，轉成 16×16 像素字並用混凝土方塊建造」的功能。

## 功能

- 在 MakeCode 積木的文字欄直接輸入中文，例如「你好麥塊」。
- 內建 Big5 第一字面常用字、英文字母、數字及常用標點。
- 可選 15 種混凝土顏色。
- 可設定 1～4 倍像素大小與 0～4 格字距。
- 支援換行；不支援的字會顯示為「□」。
- 保留原本的 Pixel Art 圖片編輯器與四方向建造功能。

## 匯入方式

1. 在 Minecraft Education 世界按 `C` 開啟 MakeCode。
2. 建立專案，選擇「進階」→「擴充功能」。
3. 貼上此 GitHub 儲存庫網址；測試分支可在網址後加上 `#agent/chinese-pixel-art`。
4. 安裝後，在左側找到「中文像素字」。

## 範例

```typescript
player.onChat("中文", function () {
    pixelArt.drawText(
        "你好麥塊",
        pos(0, 1, 5),
        EAST,
        PixelTextColor.Black,
        1,
        1
    )
})
```

每個中文字基本尺寸為 16×16 方塊。四個字、字距 1 時，整體寬度為 `16×4＋3＝67` 格。建議先在空曠平坦世界測試。

## 字庫與授權

程式修改自 Microsoft 的 `makecode-minecraft-pixel-art`，依 MIT License 使用。內建 16×16 點陣資料由 Noto Sans CJK TC Bold 產生，字型依 SIL Open Font License 1.1 授權；詳見 `THIRD_PARTY_NOTICES.md`。

---

## 原有建造結構專案說明

2025.3.9 minecraft_structure

本「建造結構」由台灣資訊教育發展協會教師 Jack Chung 製作，請依照 MIT License 使用規範，於 Minecraft 教育版程式教學中運用此擴充應用。

This "Building Structures" extension was created by Jack Chung, a teacher at the Taiwan Information Education Development Association. 
Please adhere to the MIT License when using this extension in Minecraft: Education Edition programming lessons.

用Minecraft Makecode建造塔、金字塔、樓梯以及橋樑

Build a Tower, Pyramid, Stairs, and Bridge using Minecraft MakeCode

注意事項: 若分享程式,需對方也要有此擴充 | If you share the MakeCode pyramid program, the other party must also have this extension.

1.Copy https://makecode.com/_LCv5X1VcwFrx (Traditional Chinese)
       https://makecode.com/_2s4DTbAkVXMs (English Version)

2.Follow these steps and install the extension
![022](https://github.com/user-attachments/assets/a4f526d5-2293-41cf-85da-c8681fb0578a)

![0003](https://github.com/user-attachments/assets/cb947959-ba31-4890-b3e6-70e874ea8545)

![02](https://github.com/user-attachments/assets/40563cc3-c272-4d2e-aa0c-ac92181b305b)

![03](https://github.com/user-attachments/assets/747c6046-4284-4e33-9f4d-1dbf4af7024d)

製作一個空心的金字塔 Build a hollow Pyramid
![004](https://github.com/user-attachments/assets/541e805b-66cb-46a9-bc18-b4779368c857)

![螢幕擷取畫面 2025-03-09 125845](https://github.com/user-attachments/assets/a43e5a95-3768-49f4-b457-e288f623a769)
