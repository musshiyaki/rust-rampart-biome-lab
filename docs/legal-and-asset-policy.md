# Legal and Asset Policy

Biome Lab for Minecraft Mods is an unofficial community tool for Minecraft mod biome design.

This project is not approved by, endorsed by, or associated with Mojang or Microsoft. Minecraft is a trademark of Microsoft Corporation.

## Implementation Policy

The live preview is an original approximation written for this project. It is intended to help mod developers reason about biome shape, material distribution, placed features, and exported JSON before they move values into their own mod code.

The repository must not include:

- Minecraft or Mojang source code
- decompiled Minecraft or Mojang code
- modified Minecraft game files
- Minecraft client or server binaries
- official Minecraft textures
- official Minecraft sounds or music
- official Minecraft logos
- official Minecraft fonts

References to Minecraft names, registry ids, JSON field names, and data-pack concepts are used only where needed to describe the modding target and generated data.

## Texture Policy

Official Minecraft textures are not bundled in this repository.

The block picker can read a user-selected local resource-pack folder in the browser. Those files stay on the user's machine. The app does not upload, store, commit, or redistribute those textures.

The bundled `assets/rust_rampart/` textures are sample MOD assets for the current target profile and are part of this project.

## Branding Policy

Use the project name `Biome Lab for Minecraft Mods`.

Do not use official Minecraft logos, official Minecraft fonts, or branding that makes the project look official. When the project uses the Minecraft name, use it as a descriptive reference for modding compatibility.

Keep the following notice visible in public project materials:

```text
Unofficial tool. Not approved by or associated with Mojang or Microsoft.
```
