# Parameter Coverage

Biome Lab for Minecraft Mods aims to cover Minecraft mod biome and worldgen parameters without pretending that one fixed hand-written form can enumerate every loader, registry, Codec, and mod-defined field forever.

The coverage model is:

1. Fixed controls for high-value, previewable parameters.
2. JSON extension fields for arbitrary data pack and loader-specific data.
3. Schema-driven controls as future target profiles mature.

## Current Fixed UI Coverage

| Area | Fixed UI | Export | Preview | Notes |
| --- | --- | --- | --- | --- |
| Biome identity and version metadata | Yes | Yes | Partial | Current profile targets Rust & Rampart `0.1.0` and Minecraft `1.21.11`. |
| Biome climate values | Yes | Yes | No | `has_precipitation`, `temperature`, `downfall`, and temperature modifier are editable. |
| Biome visual/audio values | Yes | Yes | Partial | Colors affect JSON and some preview colors. Audio values are export-only. |
| Mob spawners and spawn costs | JSON | Yes | No | Exposed as raw JSON because structures are open-ended. |
| Vanilla generation toggles | Partial | Yes | No | Current UI groups vanilla ores as one toggle instead of every ore entry. |
| Placed features | Yes | Yes | Partial | Counts, heightmap, biome filter, and vent halo predicate blocks are editable. |
| Configured features | Partial | Yes | Partial | Current Rust & Rampart features use `NoneFeatureConfiguration`; custom feature configs should use extension JSON. |
| Surface rules | Partial | Yes | Partial | Core thresholds are editable; full rule tree editing is not yet schema-driven. |
| Block assignments | Yes | Yes | Yes | Includes vanilla/resource-pack local texture loading and sample MOD block textures. |
| Basin locator constants | Yes | Yes | Yes | Main shape and floor constants are editable. |
| Material thresholds | Yes | Yes | Yes | Sulfur/calcite/gravel thresholds are editable. |
| Vent field constants | Yes | Yes | Yes | Main cluster, radius, deposit, slope, and pool constants are editable. |
| Vent halo constants | Yes | Yes | Yes | Main search, radius, variation, calcite, and sulfur constants are editable. |
| Spring constants | Yes | Yes | Partial | Main pool, rim, density, support, and coverage constants are editable. |
| Shard constants | Yes | Yes | Partial | Main cluster, height, base radius, sub-shard, lean, taper, and spacing constants are editable. |

## Extension JSON Coverage

The app includes **Full Coverage / Extra JSON** fields for data that is not yet represented by fixed UI controls. This section is open by default so arbitrary coverage is part of the normal workflow, not a hidden escape hatch.

| Extension field | Export behavior | Intended use |
| --- | --- | --- |
| `extensions.datapack_files` | Merged into the exported `files` object using each key as a repository-relative data-pack path. | Any Minecraft data pack JSON file such as additional biomes, placed features, configured features, density functions, noise settings, dimensions, or tags. |
| `extensions.forge_biome_modifiers` | Exported under `data/{mod_id}/forge/biome_modifier/{name}.json` and copied into `loader_extensions`. | Forge biome modifier JSON. |
| `extensions.neoforge_biome_modifiers` | Exported under `data/{mod_id}/neoforge/biome_modifier/{name}.json` and copied into `loader_extensions`. | NeoForge biome modifier JSON. |
| `extensions.fabric_biome_modifications` | Copied into `loader_extensions`. | Fabric biome modification handoff data, because Fabric biome modifications are usually code/datagen rather than a single portable JSON format. |

Example:

```json
{
  "extensions": {
    "datapack_files": {
      "data/example/worldgen/noise/custom_noise.json": {
        "firstOctave": -7,
        "amplitudes": [1, 1, 0, 1]
      }
    },
    "neoforge_biome_modifiers": {
      "add_sulfur_feature": {
        "type": "neoforge:add_features",
        "biomes": "#minecraft:is_overworld",
        "features": "rust_rampart:sulfur_basin",
        "step": "local_modifications"
      }
    }
  }
}
```

## Known Gaps

These are not yet first-class fixed controls:

- TerraBlender region weight and climate parameter list entries.
- Client fog and mist constants from the current Rust & Rampart client mixin.
- Individual vanilla ore feature toggles instead of the current grouped ore toggle.
- Full surface-rule tree editing.
- Arbitrary configured feature Codec fields.
- Arbitrary placement modifier Codec fields.
- Arbitrary density function, noise, dimension, world preset, structure, processor, and template pool schemas.
- Per-loader code-generation workflows for Fabric biome modifications.

## Direction

The long-term solution is to load versioned schemas or target profiles and generate controls from those schemas. Fixed controls should remain only for values that benefit from immediate preview feedback.
