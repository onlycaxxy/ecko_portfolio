# Kishi Portfolio — 超簡單 README（國中生版）

> 不用會寫程式。照著做，就能打開、修改、加內容。

---

## 0) 這是什麼？
- 一個**雙欄**（左英文｜右中文）的作品網站。
- 有五個可切換的效果：`scanline`、`grain`、`hover-glitch`、`canvas`、`sync-scroll`。
- 你可以：打開網站 → 改字 → 加段落 → 放圖片 → 切效果。

資料夾（你現在看到的）
```
README.md
index.html
public/
assets/
package.json
src/
```

---

## 1) 打開網站（兩種方法）

### 方法 A：直接開檔（最簡單）
1. 在 Finder 打開這個資料夾。
2. **雙擊 `index.html`** → 瀏覽器就會顯示網站。

### 方法 B：用開發伺服器（畫面比較順）
1. 開「終端機」(Terminal)。
2. 進到這個資料夾（有 `index.html` 的那層）。
3. 輸入：
   ```bash
   npx vite
   ```
4. 終端機會出現網址（像 `http://localhost:5173/`）。把它貼到瀏覽器打開。
5. 要關閉伺服器：在終端機按 **Ctrl + C**。

---

## 2) 五個效果開關在哪？怎麼用？

- 畫面**右上角**有一個 **FX** 盒子。
- 內有五個勾選框：
  - **scanline**：開／關「老電視條紋」。
  - **grain**：開／關「底片顆粒」。
  - **hover-glitch**：滑鼠移到重點文字時的「小故障抖動」。
  - **canvas**：背景有「細線漂移」的動畫。
  - **sync-scroll**：左右兩欄會一起捲動（取消就各自捲）。

> 看效果有沒有生效：把勾打開/關掉，畫面會**立刻**改變。

---

## 3) 改文字（最常用！）

1. 打開 `index.html`（用你喜歡的編輯器，像 VS Code 也可以）。
2. 找到這兩塊：
   - `<section class="col left">`  → **放英文**
   - `<section class="col right">` → **放中文**
3. 每一段是一個 `<article class="block" data-speed="0.20">`。
   - 直接把 `<p> ... </p>` 裡的文字換成你的內容。
   - **建議**：左、右兩邊的段落數量要對齊（可讀起來比較整齊）。
4. 想讓某段「更漂移」：把 `data-speed` 改大一點（例如 `0.30`）。

---

## 4) 新增一段（請左右一起加）

### 英文（左欄）的範本
```html
<article class="block" data-speed="0.25">
  <h2 class="t">New Fragment</h2>
  <p class="verse">Write your English text here. Short lines feel good.</p>
</article>
```

### 中文（右欄）的範本
```html
<article class="block" data-speed="0.28">
  <h2 class="t">新片段</h2>
  <p class="verse">在這裡寫中文。短句、換行，節奏會更舒服。</p>
</article>
```

> 小技巧：`data-speed` 左右不一定要一樣，可以用 0.02～0.05 的微差，讀起來會像呼吸。

---

## 5) 放圖片（可選）

1. 建議把圖片放在 `assets/images/`（如果沒有這個資料夾，你可以自己新建）  
2. 在 `index.html` 你要的段落內加入：
   ```html
   <img src="/assets/images/my-photo.jpg" alt="描述這張圖">
   ```
3. 圖片太大？先用手機或電腦壓小（例如 1600px 寬以內）。

---

## 6) 換字體或顏色（想要更像你）

打開 `src/styles.css`，在最上面的 `:root{ ... }` 可以改：

```css
--ink: #e6e0d6;   /* 文字顏色（奶油色） */
--accent: #b55a5a; /* 重點色（洗淡紅） */
--font: ui-monospace, "JetBrains Mono", "IBM Plex Mono", monospace;
```

- 想用自己的字體：把字體檔放到 `assets/fonts/`，再把 `--font` 換成你的字體名稱（如果需要，可另外加 `@font-face`，不改也能用系統等寬字體）。
- 想更「髒一點」：往下找
  ```css
  --grain-opacity: 0.18;
  --scanline-opacity: 0.12;
  ```
  把數字調大（例如 0.25）。

---

## 7) 特效「預設就關掉」的方法

### 方法 1：改 `index.html`
在 `<div class="fx">` 裡面有這些勾選框：
```html
<input id="fxCanvas" type="checkbox" checked/>
```
把 `checked` 刪掉，就會**預設關閉**。

### 方法 2：改生成式背景的檔案（完全關）
打開 `src/scratch-canvas.js`，把
```js
let t=0, on=true;
```
改成
```js
let t=0, on=false;
```

---

## 8) 如果畫面怪怪的，怎麼檢查？（超簡單）

- **FX 盒子不見**：`index.html` 最底下一定要有這行：
  ```html
  <script type="module" src="/src/main.js"></script>
  ```
- **顆粒/游標不見**：確認這兩個檔案在不在：  
  `assets/textures/grain.png`、`assets/cursors/scribble.svg`
- **左右不同步**：FX 裡把 `sync-scroll` 打勾。
- **hover 會抖太多**：先把 `hover-glitch` 關掉。

---

## 9) 每次修改的小方法（不累版）

1. **小步改**：一次只改一段或一個顏色。
2. **存檔 → 看畫面**：用方法 A（雙擊）或方法 B（npx vite）立刻看效果。
3. **覺得 OK 再繼續**：不要一次改太多，容易亂。

> 口訣：**「先看 → 再改 → 再看」**。

---

## 10) 想要打包（可略過）

- 建一個可上線的資料夾：
  ```bash
  npx vite build
  ```
  會產生 `dist/`，裡面的檔案就是可以拿去放在靜態空間（例如 Netlify、Vercel、GitHub Pages）。
- 在本機預覽「打包後」的版本：
  ```bash
  npx vite preview
  ```

---

## 11) 需要幫忙？

- 你可以把遇到的情況（螢幕截圖或錯誤訊息）貼給我，我會用最短的步驟幫你處理。
- 如果你要，我也可以幫你把一段真實的中英文本**套進去、標好節奏**，你只要把文字丟來。

— 完 —
