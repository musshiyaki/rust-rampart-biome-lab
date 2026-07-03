# Minecraft Biome Lab

Open-source Minecraft biome and worldgen parameter editor with a live 3D preview.

[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f)](https://musshiyaki.github.io/rust-rampart-biome-lab/)
[![License: CC0-1.0](https://img.shields.io/badge/license-CC0--1.0-lightgrey)](LICENSE)
[![Minecraft](https://img.shields.io/badge/Minecraft-1.21.11-62b47a)](https://www.minecraft.net/)

![Minecraft Biome Lab social preview](assets/social/social-preview.png)

**Live app:** <https://musshiyaki.github.io/rust-rampart-biome-lab/>

Minecraft Biome Lab is a browser-based tool for tuning Minecraft mod biome parameters, world generation values, placed features, surface rules, and block assignments with an immediate bird's-eye preview.

It currently ships with a complete Rust & Rampart `0.1.0` target profile for `rust_rampart:sulfur_valley` on Minecraft `1.21.11`. That profile is the first working adapter, not the ceiling of the idea.

The goal is simple: make Minecraft biome design less blind. Change the numbers, generate a preview, export JSON, and share the exact parameter state with a URL.

## Features

- Minecraft-style biome and worldgen parameter editor
- Live bird's-eye terrain preview for basin shape, vents, material patches, springs, and crystal clusters
- One-click demo presets for default, crystal-heavy, and vent-heavy biome variants
- English and Japanese UI
- JSON copy, download, and share URL support
- Creative-inventory-style block picker
- Search by block id or display name
- Hover tooltips for block names and ids
- Local resource-pack texture loading for vanilla block icons
- Bundled sample MOD block textures for the current target profile
- Static GitHub Pages deployment, no backend required

## Use Cases

- Design custom Minecraft mod biomes with visual feedback instead of editing constants blind
- Tune Fabric Minecraft mod biome parameters before hard-coding worldgen constants
- Compare biome surface rule thresholds visually
- Share a biome design preset with another mod developer
- Export JSON for generated biome, configured feature, and placed feature data
- Prototype terrain basins, vents, pools, material patches, and crystal fields

## Current Target Profile

The public app is positioned as a Minecraft biome lab. Version `0.1.0` includes one complete target profile so the editor is useful immediately instead of being a hollow generic UI.

| Target | Value |
| --- | --- |
| Minecraft | `1.21.11` |
| Mod | `Rust & Rampart 0.1.0` |
| Biome | `rust_rampart:sulfur_valley` |
| Loader context | Fabric-oriented worldgen data |

Future versions can add named target profiles, datapack import/export, custom schema loading, and additional Minecraft versions.

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

The current target profile includes its own sample MOD block textures because they are part of this project.

## Generated Output

The JSON output includes Minecraft data files plus a handoff object for implementation constants. For the current target profile, it includes:

- `data/rust_rampart/worldgen/biome/sulfur_valley.json`
- configured features for the sample biome worldgen profile
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

Minecraft biome editor, Minecraft modding tool, Fabric mod worldgen, Minecraft world generation, biome JSON generator, placed feature editor, configured feature editor, surface rules preview, mod biome design, Minecraft 1.21.11, Rust & Rampart.

## 日本語

Minecraft Biome Lab は、Minecraft MOD のバイオーム作成を支援する静的Webアプリです。バイオームJSON、配置済みフィーチャー、サーフェスルール、ブロック割り当てを、鳥瞰3Dプレビューを見ながら調整できます。

現在の `0.1.0` では、最初の対応プロファイルとして Rust & Rampart の `rust_rampart:sulfur_valley` を同梱しています。専用デモではなく、今後プロファイル追加で広げられる実装済みの第一ターゲットです。

右側でパラメーターを調整し、左側で鳥瞰プレビューを確認できます。初見向けのデモプリセットを押すと、通常、結晶多め、噴出孔多めの状態をすぐ試せます。生成したJSONはコピー、ダウンロード、共有URL化できます。ブロック選択はクリエイティブタブ風UIで、手元のリソースパックを読み込むとバニラブロックも実テクスチャ表示になります。

## License

The app code and bundled sample MOD assets in this repository are released under [CC0-1.0](LICENSE).

Vendored Three.js files remain under the MIT License. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

This project is not affiliated with Mojang or Microsoft. Minecraft is a trademark of Microsoft Corporation.
