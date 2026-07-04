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
| Mob spawners and spawn costs | JSON | Yes | No | Exposed as raw JSON because spawn entry maps are open-ended. |
| Vanilla generation toggles | Partial | Yes | No | Current UI groups vanilla ores as one toggle instead of every ore entry. |
| Placed features | Yes | Yes | Partial | Counts, heightmap, biome filter, and vent halo predicate blocks are editable. |
| Configured features | Partial | Yes | Partial | Current Rust & Rampart features use `NoneFeatureConfiguration`; custom feature configs should use extension JSON. |
| Structures | Yes | Yes | Partial | Exports structure, structure set, biome tag, and empty template-pool handoff files; preview uses approximate ruin/tower/arch/monolith/platform silhouettes. |
| Surface rules | Partial | Yes | Partial | Core thresholds are editable; full rule tree editing is not yet schema-driven. |
| Block assignments | Yes | Yes | Yes | Includes vanilla/resource-pack local texture loading and generated example MOD block swatches. |
| Basin locator constants | Yes | Yes | Yes | Main shape and floor constants are editable. |
| Material thresholds | Yes | Yes | Yes | Sulfur/calcite/gravel thresholds are editable. |
| Vent field constants | Yes | Yes | Yes | Main cluster, radius, deposit, slope, and pool constants are editable. |
| Vent halo constants | Yes | Yes | Yes | Main search, radius, variation, calcite, and sulfur constants are editable. |
| Spring constants | Yes | Yes | Partial | Main pool, rim, density, support, and coverage constants are editable. |
| Shard constants | Yes | Yes | Partial | Main cluster, height, base radius, sub-shard, lean, taper, and spacing constants are editable. |

## Extension JSON Coverage

The app includes **Full Coverage / Extra JSON** fields for data that is not yet represented by fixed UI controls. This section is open by default so arbitrary coverage is part of the normal workflow, not a hidden escape hatch. It now combines first-pass schema builders with raw JSON escape hatches.

The first field is `extensions.loader_mode`, which controls which loader-specific JSON fields are shown.

| Mode | Visible extension fields | Export behavior | Intended use |
| --- | --- | --- | --- |
| `minecraft` | `extensions.minecraft_schema`, `extensions.datapack_files` | The schema builder writes its body to the selected data-pack path, and arbitrary files are merged into `files`. | Common Minecraft/Data Pack registries such as biome, configured feature, placed feature, density function, noise, dimension, world preset, structure, structure set, template pool, and processor list JSON. |
| `forge` | `extensions.forge_schema`, `extensions.forge_biome_modifiers`, `extensions.datapack_files` | The builder exports one Forge biome modifier under `data/{mod_id}/forge/biome_modifier/{name}.json`; raw modifier entries export to the same directory. | Forge biome modifier JSON plus normal data pack files and datagen handoff metadata. |
| `neoforge` | `extensions.neoforge_schema`, `extensions.neoforge_biome_modifiers`, `extensions.datapack_files` | The builder exports one NeoForge biome modifier under `data/{mod_id}/neoforge/biome_modifier/{name}.json`; raw modifier entries export to the same directory. | NeoForge biome modifier JSON plus normal data pack files. |
| `fabric` | `extensions.fabric_schema`, `extensions.fabric_biome_modifications`, `extensions.datapack_files` | Fabric builder data is copied into `loader_extensions` for code/datagen handoff. | Fabric `BiomeModifications` workflows, which are usually implemented in Java/Kotlin code or generated data rather than a single portable JSON file. |

## First-Pass Schema Builders

These builders are designed to make common work visible in the UI without claiming to validate every possible Codec field.

| Builder | Covered now | Raw escape hatch |
| --- | --- | --- |
| Minecraft / Data Pack | Registry type, output path, and JSON body for common worldgen/data-pack registries. | `extensions.datapack_files` |
| Forge | Biome modifier name, type, biome selector, features, generation step, spawners, entity types, carvers, spawn costs, climate, effects, and raw overrides. | `extensions.forge_schema.raw`, `extensions.forge_biome_modifiers` |
| NeoForge | Biome modifier name, type, biome selector, features, generation step, spawners, entity types, carvers, spawn costs, climate, effects, and raw overrides. | `extensions.neoforge_schema.raw`, `extensions.neoforge_biome_modifiers` |
| Fabric | `BiomeModifications` handoff name, operation, biome selector, generation step, placed feature, entity type, spawner entry, carver, and implementation notes. | `extensions.fabric_biome_modifications` |

Example:

```json
{
  "extensions": {
    "loader_mode": "neoforge",
    "neoforge_schema": {
      "name": "add_sulfur_feature",
      "type": "neoforge:add_features",
      "biomes": "#minecraft:is_overworld",
      "features": "rust_rampart:sulfur_basin",
      "step": "local_modifications"
    },
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
- Full Fabric code generation for `BiomeModifications` calls.

## Direction

The long-term solution is to load versioned schemas or target profiles and generate controls from those schemas. Fixed controls should remain only for values that benefit from immediate preview feedback.
