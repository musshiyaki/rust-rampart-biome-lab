# Social Preview Assets

Files in this directory are used for repository and link preview cards.

- `social-preview-background.png` — generated voxel sulfur valley background.
- `social-preview.svg` — editable overlay source with text, border, and badges.
- `social-preview.png` — final 1280x640 image for GitHub Social Preview and OGP cards.

GitHub recommends 1280x640 for best display and requires the social preview image to be under 1 MB. The final PNG is optimized for that limit.

## Prompt

The background image was generated with this prompt:

> Create an original voxel-style fantasy biome scene for a Minecraft modding tool social preview. No text. A bird's-eye three-quarter view of a sulfur valley biome: stepped rocky basin, yellow sulfur deposits, pale calcite streaks, small turquoise hot springs, a few glowing sulfur vents, and crystalline yellow shard clusters. Polished stylized 3D render, voxel art inspired but original, not a direct Minecraft screenshot, no official textures. 2:1 horizontal composition, terrain mass slightly left of center, darker atmospheric negative space on the right for title overlay. Warm sulfur glow, cool dark teal shadows, crisp rim light, subtle haze. No words, no logos, no watermark, no characters, no official Minecraft assets.

## Uploading to GitHub

GitHub repository social preview images are uploaded through the web UI:

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Find **Social preview**.
4. Upload `assets/social/social-preview.png`.

There is no supported public GitHub API for setting this image programmatically.
