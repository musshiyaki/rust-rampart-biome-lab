# Rust & Rampart Biome Lab

Static GitHub Pages app for tuning the current Rust & Rampart Sulfur Valley biome parameters.

## Features

- Minecraft-style parameter editor for `rust_rampart:sulfur_valley`
- Live bird's-eye biome preview
- English/Japanese UI
- JSON copy, download, and share URL
- Creative-inventory-style block picker
- Optional local resource-pack texture loading for vanilla block icons

## Local preview

```bash
python3 -m http.server 4173 --directory .
```

Open <http://localhost:4173>.

## Publish to GitHub Pages

Create a new GitHub repository from this folder and push to `main`.

```bash
git init
git add .
git commit -m "Add Rust & Rampart Biome Lab"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/rust-rampart-biome-lab.git
git push -u origin main
```

In the GitHub repository settings, set **Pages** source to **GitHub Actions** if it is not already selected. The included workflow deploys the static app.

## Texture note

Official Minecraft textures are not bundled. Load an extracted resource pack folder from the block picker to replace vanilla block icons with real local textures.

## License

The app code and Rust & Rampart assets in this repository are released under CC0-1.0. Vendored Three.js files remain under the MIT License; see `THIRD_PARTY_NOTICES.md`.
