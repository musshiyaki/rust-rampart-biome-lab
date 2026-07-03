# Rust & Rampart Biome Lab

Minecraft biome parameter editor and live preview tool for **Rust & Rampart**.

[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f)](https://musshiyaki.github.io/rust-rampart-biome-lab/)
[![License: CC0-1.0](https://img.shields.io/badge/license-CC0--1.0-lightgrey)](LICENSE)
[![Minecraft](https://img.shields.io/badge/Minecraft-1.21.11-62b47a)](https://www.minecraft.net/)

![Rust & Rampart Biome Lab social preview](assets/social/social-preview.png)

**Live app:** <https://musshiyaki.github.io/rust-rampart-biome-lab/>

Rust & Rampart Biome Lab is a browser-based tool for tuning Minecraft mod biome parameters, world generation values, placed features, surface rules, and block assignments with an immediate bird's-eye preview. It is currently focused on the `rust_rampart:sulfur_valley` biome for Rust & Rampart `0.1.0` on Minecraft `1.21.11`.

The goal is simple: make Minecraft biome design less blind. Change the numbers, generate a preview, export JSON, and share the exact parameter state with a URL.

## Features

- Minecraft-style biome parameter editor for `rust_rampart:sulfur_valley`
- Live bird's-eye terrain preview for basin shape, vents, sulfur patches, springs, and crystal clusters
- One-click demo presets for default, crystal-heavy, and vent-heavy biome variants
- English and Japanese UI
- JSON copy, download, and share URL support
- Creative-inventory-style block picker
- Search by block id or display name
- Hover tooltips for block names and ids
- Local resource-pack texture loading for vanilla block icons
- Rust & Rampart block textures bundled for the mod's own blocks
- Static GitHub Pages deployment, no backend required

## Use Cases

- Tune Fabric Minecraft mod biome parameters before hard-coding worldgen constants
- Compare biome surface rule thresholds visually
- Share a biome design preset with another mod developer
- Export JSON for generated biome, configured feature, and placed feature data
- Prototype sulfur valley terrain, sulfur vents, hot springs, and crystal shard fields

## Supported Target

This app is intentionally narrow for now.

| Target | Value |
| --- | --- |
| Minecraft | `1.21.11` |
| Mod | `Rust & Rampart 0.1.0` |
| Biome | `rust_rampart:sulfur_valley` |
| Loader context | Fabric-oriented worldgen data |

Future versions can add generic biome presets, datapack import/export, and additional Minecraft versions.

## How to Use

1. Open the [live app](https://musshiyaki.github.io/rust-rampart-biome-lab/).
2. Adjust parameters in the right-hand panel.
3. Press **Generate**, or enable **Instant generation** for live updates.
4. Inspect the bird's-eye preview on the left.
5. Try a **Demo preset** if you want an instant starting point.
6. Copy, download, or share the generated JSON.

## Block Textures

Official Minecraft textures are **not bundled** in this repository.

To see real vanilla block textures in the block picker, load an extracted resource pack folder that contains:

```text
assets/minecraft/textures/block
```

The app reads those local PNG files in your browser and maps them to `minecraft:*` block ids. The files stay local; there is no server upload.

Rust & Rampart's own block textures are included because they are part of this project.

## Generated Output

The JSON output includes:

- `data/rust_rampart/worldgen/biome/sulfur_valley.json`
- configured features for Rust & Rampart sulfur worldgen
- placed features for basin, spring, vent field, vent halo, and shard field
- implementation handoff parameters that mirror the current Java constants

Some parameters represent current hard-coded Java worldgen constants. They are exported as a practical handoff object so the values can be copied back into the mod implementation.

## Local Development

This is a static web app. No npm install is required.

```bash
python3 -m http.server 4173 --directory .
```

Open:

```text
http://localhost:4173
```

Do not open `index.html` directly via `file://`; browser module imports need an HTTP server.

## Repository Keywords

Minecraft biome editor, Minecraft modding tool, Fabric mod worldgen, Minecraft world generation, biome JSON generator, placed feature editor, configured feature editor, surface rules preview, Rust & Rampart, sulfur valley biome, Minecraft 1.21.11.

## 日本語

Rust & Rampart Biome Lab は、Minecraft MOD のバイオーム作成を支援する静的Webアプリです。現在は Rust & Rampart の `rust_rampart:sulfur_valley` に特化しています。

右側でパラメーターを調整し、左側で鳥瞰プレビューを確認できます。初見向けのデモプリセットを押すと、通常、結晶多め、噴出孔多めの状態をすぐ試せます。生成したJSONはコピー、ダウンロード、共有URL化できます。ブロック選択はクリエイティブタブ風UIで、手元のリソースパックを読み込むとバニラブロックも実テクスチャ表示になります。

## License

The app code and Rust & Rampart assets in this repository are released under [CC0-1.0](LICENSE).

Vendored Three.js files remain under the MIT License. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

This project is not affiliated with Mojang or Microsoft. Minecraft is a trademark of Microsoft Corporation.
