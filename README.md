# oshikatsu coord

推し活・バウンドコーデ系の非公式ファッションメディアです。

## Local development

```bash
npm ci
npm run dev
```

## Static build

```bash
npm run build
```

The static export is generated in `out/`.

## Article CSV workflow

Article list data is managed from the CSV.
On this machine, `npm run articles:sync` reads the Google Drive CSV first and mirrors it to `data/INITIAL_ARTICLES.csv`.
On GitHub Actions, it falls back to the committed `data/INITIAL_ARTICLES.csv`.

```bash
npm run articles:sync
```

You can also point to another CSV explicitly:

```bash
ARTICLE_CSV_PATH="/path/to/INITIAL_ARTICLES.csv" npm run articles:sync
```

Commit both the CSV and `lib/articleRows.generated.ts` so GitHub Pages can build without access to local Google Drive files.

## GitHub Pages

This project includes `.github/workflows/pages.yml`.
When pushed to the `main` branch on GitHub, GitHub Actions builds the site and deploys `out/` to GitHub Pages.

For a repository named `oshikatsu-coord-media`, the public URL will be:

```text
https://kensuke5704.github.io/oshikatsu-coord-media/
```
