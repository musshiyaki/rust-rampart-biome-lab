import * as THREE from "./vendor/three.module.js";
import { OrbitControls } from "./vendor/OrbitControls.js";

const TARGET = {
  minecraftVersion: "1.21.11",
  modVersion: "0.1.0",
  modId: "rust_rampart",
  biomeId: "rust_rampart:sulfur_valley",
};

const I18N = {
  ja: {
    appTitle: "Biome Lab",
    languageLabel: "言語",
    previewLoading: "3Dプレビューを読み込み中...",
    previewReady: "プレビュー更新済み",
    previewDirty: "未生成の変更あり",
    jsonTitle: "生成JSON",
    copyJson: "コピー",
    copied: "コピー済み",
    downloadJson: "ダウンロード",
    share: "共有",
    shared: "共有URLをコピー済み",
    parametersTitle: "パラメーター",
    instantMode: "即時生成モード",
    generate: "生成",
    reset: "リセット",
    presetsTitle: "デモプリセット",
    presetDefault: "硫気谷デフォルト",
    presetCrystalHeavy: "結晶多め",
    presetVentFieldHeavy: "噴出孔多め",
    presetApplied: "適用済み",
    dirtyNotice: "変更は待機中です。生成を押すとプレビューへ反映されます。",
    blockPickerEyebrow: "クリエイティブインベントリ",
    blockPickerTitle: "ブロック選択",
    searchBlocks: "id または表示名で検索",
    customBlockTitle: "MODブロックのテクスチャ読み込み",
    customBlockId: "ブロックID",
    customBlockName: "表示名",
    customBlockTexture: "テクスチャPNG",
    resourceTextureTitle: "バニラ/リソースパックのブロックテクスチャ読み込み",
    resourceTextureHelp: "assets/minecraft/textures/block を含む展開済みリソースパックフォルダを選択してください。",
    resourceTexturesLoaded: "テクスチャを読み込みました",
    resourceTexturesNone: "対応するブロックテクスチャが見つかりませんでした",
    addCustomBlock: "ブロック追加",
    invalidJson: "JSONとして読めません",
    invalidBlock: "IDとテクスチャを指定してください",
    allTab: "すべて",
    buildingTab: "建築",
    naturalTab: "自然",
    oresTab: "鉱石",
    fluidsTab: "流体",
    modTab: "Rust & Rampart",
    customTab: "追加",
    blocks: "ブロック",
    vents: "噴出孔",
    springs: "温泉",
    shards: "結晶柱",
  },
  en: {
    appTitle: "Biome Lab",
    languageLabel: "Language",
    previewLoading: "Loading 3D preview...",
    previewReady: "Preview ready",
    previewDirty: "Changes pending",
    jsonTitle: "Generated JSON",
    copyJson: "Copy",
    copied: "Copied",
    downloadJson: "Download",
    share: "Share",
    shared: "Share URL copied",
    parametersTitle: "Parameters",
    instantMode: "Instant generation",
    generate: "Generate",
    reset: "Reset",
    presetsTitle: "Demo presets",
    presetDefault: "Sulfur Valley default",
    presetCrystalHeavy: "Crystal heavy",
    presetVentFieldHeavy: "Vent field heavy",
    presetApplied: "Applied",
    dirtyNotice: "Changes are waiting. Press Generate to update the preview.",
    blockPickerEyebrow: "Creative Inventory",
    blockPickerTitle: "Choose Block",
    searchBlocks: "Search by id or display name",
    customBlockTitle: "Load MOD block texture",
    customBlockId: "Block id",
    customBlockName: "Display name",
    customBlockTexture: "Texture PNG",
    resourceTextureTitle: "Load vanilla/resource-pack block textures",
    resourceTextureHelp: "Select an extracted resource pack folder that contains assets/minecraft/textures/block.",
    resourceTexturesLoaded: "Loaded textures",
    resourceTexturesNone: "No matching block textures found",
    addCustomBlock: "Add block",
    invalidJson: "Invalid JSON",
    invalidBlock: "Set an id and texture first",
    allTab: "All",
    buildingTab: "Building",
    naturalTab: "Natural",
    oresTab: "Ores",
    fluidsTab: "Fluids",
    modTab: "Rust & Rampart",
    customTab: "Added",
    blocks: "blocks",
    vents: "vents",
    springs: "springs",
    shards: "shards",
  },
};

const DEFAULT_FEATURES = {
  undergroundOres: [
    "minecraft:ore_dirt",
    "minecraft:ore_gravel",
    "minecraft:ore_granite_upper",
    "minecraft:ore_granite_lower",
    "minecraft:ore_diorite_upper",
    "minecraft:ore_diorite_lower",
    "minecraft:ore_andesite_upper",
    "minecraft:ore_andesite_lower",
    "minecraft:ore_tuff",
    "minecraft:ore_coal_upper",
    "minecraft:ore_coal_lower",
    "minecraft:ore_iron_upper",
    "minecraft:ore_iron_middle",
    "minecraft:ore_iron_small",
    "minecraft:ore_gold",
    "minecraft:ore_gold_lower",
    "minecraft:ore_redstone",
    "minecraft:ore_redstone_lower",
    "minecraft:ore_diamond",
    "minecraft:ore_diamond_medium",
    "minecraft:ore_diamond_large",
    "minecraft:ore_diamond_buried",
    "minecraft:ore_lapis",
    "minecraft:ore_lapis_buried",
    "minecraft:ore_copper",
    "minecraft:underwater_magma",
    "minecraft:disk_gravel",
    "minecraft:ore_emerald",
  ],
  undergroundDecoration: ["minecraft:ore_infested"],
  undergroundStructures: ["minecraft:monster_room", "minecraft:monster_room_deep"],
};

const SPAWNER_GROUPS = {
  ambient: [],
  axolotls: [],
  creature: [],
  misc: [],
  monster: [],
  underground_water_creature: [],
  water_ambient: [],
  water_creature: [],
};

const BLOCKS = [
  ["minecraft:stone", "Stone", "石", "building", "#7b7b7b"],
  ["minecraft:granite", "Granite", "花崗岩", "building", "#9a6b5f"],
  ["minecraft:diorite", "Diorite", "閃緑岩", "building", "#c9c9c4"],
  ["minecraft:andesite", "Andesite", "安山岩", "building", "#77776f"],
  ["minecraft:deepslate", "Deepslate", "深層岩", "building", "#4d4d55"],
  ["minecraft:tuff", "Tuff", "凝灰岩", "building", "#666a61"],
  ["minecraft:calcite", "Calcite", "方解石", "natural", "#dedbd1"],
  ["minecraft:gravel", "Gravel", "砂利", "natural", "#8b8781"],
  ["minecraft:dirt", "Dirt", "土", "natural", "#79563a"],
  ["minecraft:coarse_dirt", "Coarse Dirt", "粗い土", "natural", "#74553a"],
  ["minecraft:grass_block", "Grass Block", "草ブロック", "natural", "#597d36"],
  ["minecraft:mud", "Mud", "泥", "natural", "#3e3835"],
  ["minecraft:clay", "Clay", "粘土", "natural", "#9aa4b2"],
  ["minecraft:sand", "Sand", "砂", "natural", "#d8c68d"],
  ["minecraft:red_sand", "Red Sand", "赤い砂", "natural", "#b96335"],
  ["minecraft:snow_block", "Snow Block", "雪ブロック", "natural", "#edf7f7"],
  ["minecraft:ice", "Ice", "氷", "natural", "#9fd7f4"],
  ["minecraft:basalt", "Basalt", "玄武岩", "building", "#535158"],
  ["minecraft:blackstone", "Blackstone", "ブラックストーン", "building", "#2d2a31"],
  ["minecraft:obsidian", "Obsidian", "黒曜石", "building", "#171225"],
  ["minecraft:coal_ore", "Coal Ore", "石炭鉱石", "ores", "#595958"],
  ["minecraft:iron_ore", "Iron Ore", "鉄鉱石", "ores", "#8f7d68"],
  ["minecraft:copper_ore", "Copper Ore", "銅鉱石", "ores", "#8e7a64"],
  ["minecraft:gold_ore", "Gold Ore", "金鉱石", "ores", "#b99a43"],
  ["minecraft:redstone_ore", "Redstone Ore", "レッドストーン鉱石", "ores", "#6e3535"],
  ["minecraft:diamond_ore", "Diamond Ore", "ダイヤモンド鉱石", "ores", "#6ba4a8"],
  ["minecraft:emerald_ore", "Emerald Ore", "エメラルド鉱石", "ores", "#548a63"],
  ["minecraft:lapis_ore", "Lapis Lazuli Ore", "ラピスラズリ鉱石", "ores", "#3d4e8f"],
  ["minecraft:water", "Water", "水", "fluids", "#4edfe6"],
  ["minecraft:lava", "Lava", "溶岩", "fluids", "#e66b25"],
  ["rust_rampart:niter_block", "Nitre Block", "硝石ブロック", "mod", "#d7d0b5", "./assets/rust_rampart/textures/block/niter_block.png"],
  ["rust_rampart:sulfur_block", "Sulfur Block", "硫黄ブロック", "mod", "#e3cf52", "./assets/rust_rampart/textures/block/sulfur_block.png"],
  ["rust_rampart:sulfur_deposit_block", "Sulfur Deposit", "沈着硫黄", "mod", "#f3d766", "./assets/rust_rampart/textures/block/sulfur_deposit_block.png"],
  ["rust_rampart:sulfur_vent_block", "Sulfur Vent Block", "硫黄噴出孔ブロック", "mod", "#51483d", "./assets/rust_rampart/textures/block/sulfur_vent_block.png"],
  ["rust_rampart:sulfur_crystal_block", "Sulfur Crystal Block", "硫黄結晶ブロック", "mod", "#f5da64", "./assets/rust_rampart/textures/block/sulfur_crystal_block.png"],
].map(([id, en, ja, tab, color, texture]) => ({ id, name: { en, ja }, tab, color, texture }));

const TEXTURE_PREFERENCES = {
  "minecraft:grass_block": ["minecraft:grass_block_side", "minecraft:grass_block_top"],
  "minecraft:coarse_dirt": ["minecraft:coarse_dirt"],
  "minecraft:snow_block": ["minecraft:snow"],
  "minecraft:water": ["minecraft:water_still"],
  "minecraft:lava": ["minecraft:lava_still"],
};

const TEXTURE_SUFFIXES = [
  "_top",
  "_side",
  "_front",
  "_back",
  "_bottom",
  "_end",
  "_inner",
  "_outer",
  "_still",
  "_flow",
  "_overlay",
  "_stage0",
  "_stage1",
  "_stage2",
  "_stage3",
  "_stage4",
  "_stage5",
  "_stage6",
  "_stage7",
];

const DEFAULT_STATE = {
  meta: {
    minecraft_version: TARGET.minecraftVersion,
    mod_version: TARGET.modVersion,
    mod_id: TARGET.modId,
    biome_id: TARGET.biomeId,
  },
  preview: {
    seed: 260518,
    size: 56,
    verticalScale: 1.05,
    biomeCoverage: 1,
  },
  biome: {
    id: TARGET.biomeId,
    has_precipitation: false,
    temperature: 0.8,
    downfall: 0,
    temperature_modifier: "none",
    attributes: {
      background_music: "",
      music_volume: 0,
      fog_color: "#e7d78a",
      sky_color: "#e2ca6d",
      water_fog_color: "#2b8f9f",
      ambient_particle_color: "#ead87a",
      ambient_particle_scale: 1.05,
      ambient_particle_probability: 0.026,
    },
    effects: {
      water_color: "#4edfe6",
      grass_color: "",
      foliage_color: "",
      grass_color_modifier: "none",
    },
    carvers: {
      cave: true,
      cave_extra_underground: true,
    },
    generation: {
      lake_lava_underground: true,
      monster_room: true,
      monster_room_deep: true,
      default_ores: true,
      ore_infested: true,
      spring_lava: true,
    },
    spawners: clone(SPAWNER_GROUPS),
    spawn_costs: {},
  },
  placements: {
    sulfur_basin: { enabled: true, count: 1, in_square: true, heightmap: "WORLD_SURFACE_WG", biome_filter: false },
    sulfur_spring: { enabled: true, count: 1, in_square: true, heightmap: "WORLD_SURFACE_WG", biome_filter: false },
    sulfur_vent_field: { enabled: true, count: 1, in_square: true, heightmap: "WORLD_SURFACE_WG", biome_filter: true },
    sulfur_shard_field: { enabled: true, count: 1, in_square: true, heightmap: "WORLD_SURFACE_WG", biome_filter: true },
    sulfur_vent_halo: {
      enabled: true,
      count_min: 4,
      count_max: 7,
      in_square: true,
      heightmap: "WORLD_SURFACE_WG",
      biome_filter: true,
      predicate_blocks: ["rust_rampart:sulfur_vent_block", "rust_rampart:sulfur_deposit_block"],
    },
  },
  blocks: {
    base: "minecraft:andesite",
    sulfur: "rust_rampart:sulfur_block",
    calcite: "minecraft:calcite",
    gravel: "minecraft:gravel",
    water: "minecraft:water",
    vent: "rust_rampart:sulfur_vent_block",
    deposit: "rust_rampart:sulfur_deposit_block",
    crystal: "rust_rampart:sulfur_crystal_block",
  },
  surface: {
    sulfur_shelf_y: 72,
    calcite_shelf_y: 69,
    gravel_shelf_y: 67,
    sulfur_noise_min: -0.3,
    sulfur_noise_max: 0.2,
    calcite_noise_min: -0.0125,
    calcite_noise_max: 0.0125,
    gravel_noise_min: -0.1818,
    gravel_noise_max: 0.1818,
  },
  basin: {
    cell_size: 112,
    center_jitter: 20,
    sample_points: 16,
    outer_radius_min: 50,
    outer_radius_max: 64,
    apron_width_min: 7,
    apron_width_max: 12,
    ramp_width_min: 32,
    ramp_width_max: 46,
    floor_radius_min: 14,
    floor_offset_min: 20,
    floor_offset_max: 30,
    outside_bevel_width: 3,
    floor_undulation_scale: 9,
    floor_undulation_detail_scale: 4,
    floor_pocket_broad_scale: 7,
    floor_pocket_medium_scale: 4,
    floor_pocket_detail_scale: 2,
    floor_pocket_edge_margin: 3,
    floor_pocket_depth: 4,
    floor_pocket_threshold: 0.45,
    floor_tier_broad_scale: 8,
    floor_tier_detail_scale: 4,
    floor_tier_mid_threshold: 0.42,
    floor_tier_deep_threshold: 0.64,
    floor_tier_abyss_threshold: 0.84,
    shape_long_axis_base: 0.95,
    shape_long_axis_range: 0.34,
    shape_short_axis_base: 0.7,
    shape_short_axis_range: 0.22,
    shape_lobe_offset_base: 0.24,
    shape_lobe_offset_range: 0.14,
  },
  materials: {
    floor_sulfur_threshold: 0.52,
    vent_field_sulfur_threshold: 0.48,
    scar_sulfur_threshold: 0.58,
    apron_sulfur_threshold: 0.66,
    floor_calcite_threshold: 0.88,
    vent_field_calcite_threshold: 0.9,
    wall_calcite_threshold: 0.8,
    apron_calcite_threshold: 0.93,
    scar_gravel_threshold: 0.45,
    floor_gravel_threshold: 0.68,
    apron_gravel_threshold: 0.84,
  },
  ventField: {
    cluster_count_min: 4,
    cluster_count_max: 7,
    sulfur_radius_min: 4,
    sulfur_radius_max: 5,
    sulfur_blocks_min: 7,
    sulfur_blocks_max: 11,
    deposit_blocks_min: 4,
    deposit_blocks_max: 6,
    cluster_search_radius: 6,
    slope_limit: 2,
    vent_pool_radius: 5,
    vent_pool_max_depth: 5,
    max_extra_vents: 2,
  },
  ventHalo: {
    vent_search_radius: 6,
    cluster_radius: 3,
    surface_y_variation: 3,
    calcite_min: 2,
    calcite_max: 4,
    sulfur_min: 8,
    sulfur_max: 14,
  },
  springs: {
    spring_count_min: 8,
    spring_count_max: 12,
    spring_density_multiplier: 10,
    cluster_search_radius: 11,
    pool_radius_min: 7,
    pool_radius_max: 11,
    pool_depth_max: 7,
    slope_pool_radius_min: 5,
    slope_pool_radius_max: 8,
    slope_pool_depth_max: 4,
    rim_blob_count_min: 6,
    rim_blob_count_max: 12,
    rim_blob_radius_min: 1,
    rim_blob_radius_max: 3,
    rim_band_width: 2.6,
    water_level_offset: 3,
    slope_water_level_offset: 1,
    max_support_gap: 8,
    base_support_depth_max: 3,
    slope_base_support_depth_max: 5,
    water_level_sample_count: 12,
    cluster_distance_sq_min: 169,
    relaxed_cluster_distance_sq_min: 64,
    pool_core_coverage_min: 0.84,
    pool_rim_coverage_min: 0.58,
    slope_pool_core_coverage_min: 0.78,
    slope_pool_rim_coverage_min: 0.52,
  },
  shards: {
    cluster_count_min: 4,
    cluster_count_max: 6,
    cluster_search_radius: 10,
    satellite_search_radius: 7,
    shard_height_min: 12,
    shard_height_max: 34,
    satellite_height_min: 8,
    satellite_height_max: 20,
    primary_base_radius_min: 1,
    primary_base_radius_max: 2,
    satellite_base_radius_min: 1,
    satellite_base_radius_max: 1,
    sub_shard_count_min: 2,
    sub_shard_count_max: 3,
    sub_shard_distance_min: 2,
    sub_shard_distance_max: 4,
    primary_lean_max: 14,
    satellite_lean_max: 9,
    main_taper_power: 2.15,
    sub_taper_power: 1.85,
    cluster_spacing_min: 6,
    foundation_scan_depth: 6,
  },
  customBlocks: [],
};

const DEMO_PRESETS = [
  {
    id: "default",
    labelKey: "presetDefault",
    patch: {},
  },
  {
    id: "crystal-heavy",
    labelKey: "presetCrystalHeavy",
    patch: {
      preview: { seed: 202607, verticalScale: 1.14 },
      placements: {
        sulfur_shard_field: { count: 3 },
        sulfur_vent_field: { count: 1 },
        sulfur_vent_halo: { count_min: 3, count_max: 5 },
      },
      materials: {
        floor_calcite_threshold: 0.78,
        wall_calcite_threshold: 0.68,
      },
      shards: {
        cluster_count_min: 8,
        cluster_count_max: 12,
        cluster_search_radius: 12,
        satellite_search_radius: 10,
        shard_height_min: 22,
        shard_height_max: 56,
        satellite_height_min: 14,
        satellite_height_max: 32,
        primary_base_radius_min: 2,
        primary_base_radius_max: 3,
        satellite_base_radius_max: 2,
        sub_shard_count_min: 3,
        sub_shard_count_max: 5,
        sub_shard_distance_max: 5,
        primary_lean_max: 18,
        satellite_lean_max: 12,
        main_taper_power: 1.7,
        sub_taper_power: 1.55,
        cluster_spacing_min: 4,
      },
    },
  },
  {
    id: "vent-field-heavy",
    labelKey: "presetVentFieldHeavy",
    patch: {
      preview: { seed: 808031, verticalScale: 1 },
      placements: {
        sulfur_vent_field: { count: 3 },
        sulfur_vent_halo: { count_min: 10, count_max: 16 },
        sulfur_shard_field: { count: 1 },
      },
      materials: {
        floor_sulfur_threshold: 0.45,
        vent_field_sulfur_threshold: 0.34,
        scar_sulfur_threshold: 0.48,
        apron_sulfur_threshold: 0.54,
        floor_gravel_threshold: 0.58,
      },
      ventField: {
        cluster_count_min: 10,
        cluster_count_max: 15,
        sulfur_radius_min: 5,
        sulfur_radius_max: 8,
        sulfur_blocks_min: 14,
        sulfur_blocks_max: 24,
        deposit_blocks_min: 8,
        deposit_blocks_max: 14,
        cluster_search_radius: 8,
        slope_limit: 3,
        vent_pool_radius: 7,
        vent_pool_max_depth: 7,
        max_extra_vents: 5,
      },
      ventHalo: {
        cluster_radius: 5,
        surface_y_variation: 4,
        calcite_min: 4,
        calcite_max: 8,
        sulfur_min: 16,
        sulfur_max: 28,
      },
    },
  },
];

const PARAM_SECTIONS = [
  {
    id: "meta",
    title: { ja: "対象とプレビュー", en: "Target and Preview" },
    controls: [
      range("preview.seed", "preview.seed - 乱数シード", "preview.seed - Random seed", 1, 999999, 1),
      range("preview.size", "preview.size - プレビュー範囲", "preview.size - Preview size", 32, 96, 8),
      range("preview.verticalScale", "preview.verticalScale - 高さ倍率", "preview.verticalScale - Height scale", 0.6, 2, 0.05),
      range("preview.biomeCoverage", "preview.biomeCoverage - 硫気谷の被覆率", "preview.biomeCoverage - Sulfur Valley coverage", 0.1, 1, 0.05),
      text("biome.id", "minecraft:biome id - バイオームID", "minecraft:biome id - Biome id"),
    ],
  },
  {
    id: "climate",
    title: { ja: "Biome JSON / 気候", en: "Biome JSON / Climate" },
    controls: [
      checkbox("biome.has_precipitation", "minecraft:has_precipitation - 降水の有無", "minecraft:has_precipitation - Enables precipitation"),
      range("biome.temperature", "minecraft:temperature - 気温", "minecraft:temperature - Temperature", -2, 2, 0.05),
      range("biome.downfall", "minecraft:downfall - 降水量", "minecraft:downfall - Downfall", 0, 1, 0.05),
      select("biome.temperature_modifier", "minecraft:temperature_modifier - 気温補正", "minecraft:temperature_modifier - Temperature modifier", [
        ["none", "none"],
        ["frozen", "frozen"],
      ]),
      json("biome.spawners", "minecraft:spawners - Mobスポーン設定", "minecraft:spawners - Mob spawn entries"),
      json("biome.spawn_costs", "minecraft:spawn_costs - スポーンコスト", "minecraft:spawn_costs - Spawn costs"),
    ],
  },
  {
    id: "visual",
    title: { ja: "Biome JSON / 見た目と音", en: "Biome JSON / Visuals and Audio" },
    controls: [
      color("biome.attributes.fog_color", "minecraft:visual/fog_color - 霧の色", "minecraft:visual/fog_color - Fog color"),
      color("biome.attributes.sky_color", "minecraft:visual/sky_color - 空の色", "minecraft:visual/sky_color - Sky color"),
      color("biome.effects.water_color", "minecraft:effects.water_color - 水の色", "minecraft:effects.water_color - Water color"),
      color("biome.attributes.water_fog_color", "minecraft:visual/water_fog_color - 水中霧の色", "minecraft:visual/water_fog_color - Water fog color"),
      color("biome.attributes.ambient_particle_color", "minecraft:particle/dust.color - 環境粒子の色", "minecraft:particle/dust.color - Ambient particle color"),
      range("biome.attributes.ambient_particle_scale", "minecraft:particle/dust.scale - 粒子サイズ", "minecraft:particle/dust.scale - Particle scale", 0.1, 4, 0.05),
      range("biome.attributes.ambient_particle_probability", "minecraft:particle.probability - 粒子密度", "minecraft:particle.probability - Particle probability", 0, 0.15, 0.001),
      text("biome.attributes.background_music", "minecraft:audio/background_music - BGM ID", "minecraft:audio/background_music - Music id"),
      range("biome.attributes.music_volume", "minecraft:audio/music_volume - BGM音量", "minecraft:audio/music_volume - Music volume", 0, 1, 0.05),
      color("biome.effects.grass_color", "minecraft:effects.grass_color - 草色上書き", "minecraft:effects.grass_color - Grass color override", true),
      color("biome.effects.foliage_color", "minecraft:effects.foliage_color - 葉色上書き", "minecraft:effects.foliage_color - Foliage color override", true),
      select("biome.effects.grass_color_modifier", "minecraft:effects.grass_color_modifier - 草色補正", "minecraft:effects.grass_color_modifier - Grass color modifier", [
        ["none", "none"],
        ["dark_forest", "dark_forest"],
        ["swamp", "swamp"],
      ]),
    ],
  },
  {
    id: "generation",
    title: { ja: "Biome JSON / 生成ステップ", en: "Biome JSON / Generation Steps" },
    controls: [
      checkbox("biome.carvers.cave", "minecraft:carvers.cave - 洞窟カーバー", "minecraft:carvers.cave - Cave carver"),
      checkbox("biome.carvers.cave_extra_underground", "minecraft:carvers.cave_extra_underground - 追加地下洞窟", "minecraft:carvers.cave_extra_underground - Extra underground cave"),
      checkbox("biome.generation.lake_lava_underground", "minecraft:lake_lava_underground - 地下溶岩湖", "minecraft:lake_lava_underground - Underground lava lake"),
      checkbox("biome.generation.monster_room", "minecraft:monster_room - モンスタールーム", "minecraft:monster_room - Monster room"),
      checkbox("biome.generation.monster_room_deep", "minecraft:monster_room_deep - 深層モンスタールーム", "minecraft:monster_room_deep - Deep monster room"),
      checkbox("biome.generation.default_ores", "minecraft:underground_ores - 標準鉱石群", "minecraft:underground_ores - Default ore set"),
      checkbox("biome.generation.ore_infested", "minecraft:ore_infested - 虫食い石", "minecraft:ore_infested - Infested ore decoration"),
      checkbox("biome.generation.spring_lava", "minecraft:spring_lava - 溶岩湧き出し", "minecraft:spring_lava - Lava spring"),
    ],
  },
  {
    id: "placed",
    title: { ja: "Placed Feature", en: "Placed Features" },
    controls: [
      checkbox("placements.sulfur_basin.enabled", "rust_rampart:sulfur_basin - 盆地生成", "rust_rampart:sulfur_basin - Basin feature"),
      range("placements.sulfur_basin.count", "minecraft:count - 盆地試行回数", "minecraft:count - Basin attempts", 0, 4, 1),
      checkbox("placements.sulfur_spring.enabled", "rust_rampart:sulfur_spring - 温泉生成", "rust_rampart:sulfur_spring - Spring feature"),
      range("placements.sulfur_spring.count", "minecraft:count - 温泉試行回数", "minecraft:count - Spring attempts", 0, 4, 1),
      checkbox("placements.sulfur_vent_field.enabled", "rust_rampart:sulfur_vent_field - 噴出孔群", "rust_rampart:sulfur_vent_field - Vent field"),
      range("placements.sulfur_vent_field.count", "minecraft:count - 噴出孔群試行回数", "minecraft:count - Vent field attempts", 0, 4, 1),
      checkbox("placements.sulfur_shard_field.enabled", "rust_rampart:sulfur_shard_field - 結晶柱群", "rust_rampart:sulfur_shard_field - Shard field"),
      range("placements.sulfur_shard_field.count", "minecraft:count - 結晶柱群試行回数", "minecraft:count - Shard field attempts", 0, 4, 1),
      checkbox("placements.sulfur_vent_halo.enabled", "rust_rampart:sulfur_vent_halo - 噴出孔ハロー", "rust_rampart:sulfur_vent_halo - Vent halo"),
      range("placements.sulfur_vent_halo.count_min", "minecraft:uniform.min_inclusive - ハロー最小試行", "minecraft:uniform.min_inclusive - Halo min attempts", 0, 16, 1),
      range("placements.sulfur_vent_halo.count_max", "minecraft:uniform.max_inclusive - ハロー最大試行", "minecraft:uniform.max_inclusive - Halo max attempts", 0, 24, 1),
      select("placements.sulfur_vent_halo.heightmap", "minecraft:heightmap - 高さ参照", "minecraft:heightmap - Heightmap", [
        ["WORLD_SURFACE_WG", "WORLD_SURFACE_WG"],
        ["OCEAN_FLOOR_WG", "OCEAN_FLOOR_WG"],
        ["MOTION_BLOCKING", "MOTION_BLOCKING"],
      ]),
      json("placements.sulfur_vent_halo.predicate_blocks", "minecraft:matching_blocks.blocks - 隣接判定ブロック", "minecraft:matching_blocks.blocks - Neighbor predicate blocks"),
    ],
  },
  {
    id: "blocks",
    title: { ja: "ブロック割り当て", en: "Block Assignments" },
    controls: [
      block("blocks.base", "Blocks.ANDESITE - 基盤ブロック", "Blocks.ANDESITE - Base block"),
      block("blocks.sulfur", "ModBlocks.SULFUR_BLOCK - 硫黄面", "ModBlocks.SULFUR_BLOCK - Sulfur surface"),
      block("blocks.calcite", "Blocks.CALCITE - 方解石面", "Blocks.CALCITE - Calcite surface"),
      block("blocks.gravel", "Blocks.GRAVEL - 砂利面", "Blocks.GRAVEL - Gravel surface"),
      block("blocks.water", "Blocks.WATER - 温泉水", "Blocks.WATER - Spring water"),
      block("blocks.vent", "ModBlocks.SULFUR_VENT_BLOCK - 噴出孔", "ModBlocks.SULFUR_VENT_BLOCK - Vent block"),
      block("blocks.deposit", "ModBlocks.SULFUR_DEPOSIT_BLOCK - 沈着硫黄", "ModBlocks.SULFUR_DEPOSIT_BLOCK - Sulfur deposit"),
      block("blocks.crystal", "ModBlocks.SULFUR_CRYSTAL_BLOCK - 結晶柱", "ModBlocks.SULFUR_CRYSTAL_BLOCK - Crystal block"),
    ],
  },
  {
    id: "surface",
    title: { ja: "Surface Rules", en: "Surface Rules" },
    controls: [
      range("surface.sulfur_shelf_y", "VerticalAnchor.absolute(72) - 硫黄棚Y", "VerticalAnchor.absolute(72) - Sulfur shelf Y", 32, 128, 1),
      range("surface.calcite_shelf_y", "VerticalAnchor.absolute(69) - 方解石棚Y", "VerticalAnchor.absolute(69) - Calcite shelf Y", 32, 128, 1),
      range("surface.gravel_shelf_y", "VerticalAnchor.absolute(67) - 砂利棚Y", "VerticalAnchor.absolute(67) - Gravel shelf Y", 32, 128, 1),
      range("surface.sulfur_noise_min", "Noises.SURFACE.min - 硫黄ノイズ下限", "Noises.SURFACE.min - Sulfur noise min", -1, 1, 0.01),
      range("surface.sulfur_noise_max", "Noises.SURFACE.max - 硫黄ノイズ上限", "Noises.SURFACE.max - Sulfur noise max", -1, 1, 0.01),
      range("surface.calcite_noise_min", "Noises.CALCITE.min - 方解石ノイズ下限", "Noises.CALCITE.min - Calcite noise min", -0.2, 0.2, 0.0025),
      range("surface.calcite_noise_max", "Noises.CALCITE.max - 方解石ノイズ上限", "Noises.CALCITE.max - Calcite noise max", -0.2, 0.2, 0.0025),
      range("surface.gravel_noise_min", "Noises.SURFACE.min - 砂利ノイズ下限", "Noises.SURFACE.min - Gravel noise min", -1, 1, 0.01),
      range("surface.gravel_noise_max", "Noises.SURFACE.max - 砂利ノイズ上限", "Noises.SURFACE.max - Gravel noise max", -1, 1, 0.01),
    ],
  },
  {
    id: "basin",
    title: { ja: "BasinLocator / 盆地形状", en: "BasinLocator / Basin Shape" },
    controls: [
      range("basin.cell_size", "CELL_SIZE - 盆地セル幅", "CELL_SIZE - Basin cell width", 48, 192, 1),
      range("basin.center_jitter", "CENTER_JITTER - 中心揺らぎ", "CENTER_JITTER - Center jitter", 0, 48, 1),
      range("basin.sample_points", "SAMPLE_POINTS - 外周高さサンプル", "SAMPLE_POINTS - Ring height samples", 4, 48, 1),
      range("basin.outer_radius_min", "MIN_OUTER_RADIUS - 外径最小", "MIN_OUTER_RADIUS - Min outer radius", 16, 96, 1),
      range("basin.outer_radius_max", "MAX_OUTER_RADIUS - 外径最大", "MAX_OUTER_RADIUS - Max outer radius", 16, 128, 1),
      range("basin.apron_width_min", "MIN_APRON_WIDTH - エプロン幅最小", "MIN_APRON_WIDTH - Min apron width", 0, 32, 1),
      range("basin.apron_width_max", "MAX_APRON_WIDTH - エプロン幅最大", "MAX_APRON_WIDTH - Max apron width", 0, 48, 1),
      range("basin.ramp_width_min", "MIN_RAMP_WIDTH - 壁斜面幅最小", "MIN_RAMP_WIDTH - Min ramp width", 4, 72, 1),
      range("basin.ramp_width_max", "MAX_RAMP_WIDTH - 壁斜面幅最大", "MAX_RAMP_WIDTH - Max ramp width", 4, 96, 1),
      range("basin.floor_radius_min", "MIN_FLOOR_RADIUS - 床半径最小", "MIN_FLOOR_RADIUS - Min floor radius", 3, 48, 1),
      range("basin.floor_offset_min", "MIN_FLOOR_OFFSET - 床落差最小", "MIN_FLOOR_OFFSET - Min floor drop", 0, 64, 1),
      range("basin.floor_offset_max", "MAX_FLOOR_OFFSET - 床落差最大", "MAX_FLOOR_OFFSET - Max floor drop", 0, 80, 1),
      range("basin.outside_bevel_width", "OUTSIDE_BEVEL_WIDTH - 外側面取り", "OUTSIDE_BEVEL_WIDTH - Outside bevel", 0, 12, 1),
      range("basin.floor_undulation_scale", "FLOOR_UNDULATION_SCALE - 床うねり広域", "FLOOR_UNDULATION_SCALE - Broad floor undulation", 1, 32, 1),
      range("basin.floor_undulation_detail_scale", "FLOOR_UNDULATION_DETAIL_SCALE - 床うねり細部", "FLOOR_UNDULATION_DETAIL_SCALE - Detail floor undulation", 1, 24, 1),
      range("basin.floor_pocket_broad_scale", "FLOOR_POCKET_BROAD_SCALE - 床ポケット広域", "FLOOR_POCKET_BROAD_SCALE - Broad floor pockets", 1, 32, 1),
      range("basin.floor_pocket_medium_scale", "FLOOR_POCKET_MEDIUM_SCALE - 床ポケット中域", "FLOOR_POCKET_MEDIUM_SCALE - Medium floor pockets", 1, 24, 1),
      range("basin.floor_pocket_detail_scale", "FLOOR_POCKET_DETAIL_SCALE - 床ポケット細部", "FLOOR_POCKET_DETAIL_SCALE - Detail floor pockets", 1, 16, 1),
      range("basin.floor_pocket_edge_margin", "FLOOR_POCKET_EDGE_MARGIN - 床ポケット縁余白", "FLOOR_POCKET_EDGE_MARGIN - Floor pocket edge margin", 0, 12, 1),
      range("basin.floor_pocket_depth", "FLOOR_POCKET_DEPTH - 床ポケット深さ", "FLOOR_POCKET_DEPTH - Floor pocket depth", 0, 12, 1),
      range("basin.floor_pocket_threshold", "FLOOR_POCKET_THRESHOLD - 床ポケット閾値", "FLOOR_POCKET_THRESHOLD - Floor pocket threshold", 0, 1, 0.01),
      range("basin.floor_tier_broad_scale", "FLOOR_TIER_BROAD_SCALE - 床段差広域", "FLOOR_TIER_BROAD_SCALE - Broad floor tiers", 1, 32, 1),
      range("basin.floor_tier_detail_scale", "FLOOR_TIER_DETAIL_SCALE - 床段差細部", "FLOOR_TIER_DETAIL_SCALE - Detail floor tiers", 1, 24, 1),
      range("basin.floor_tier_mid_threshold", "FLOOR_TIER_MID_THRESHOLD - 中段閾値", "FLOOR_TIER_MID_THRESHOLD - Mid tier threshold", 0, 1, 0.01),
      range("basin.floor_tier_deep_threshold", "FLOOR_TIER_DEEP_THRESHOLD - 深段閾値", "FLOOR_TIER_DEEP_THRESHOLD - Deep tier threshold", 0, 1, 0.01),
      range("basin.floor_tier_abyss_threshold", "FLOOR_TIER_ABYSS_THRESHOLD - 最深段閾値", "FLOOR_TIER_ABYSS_THRESHOLD - Abyss tier threshold", 0, 1, 0.01),
      range("basin.shape_long_axis_base", "shape.longAxis.base - 長軸基準", "shape.longAxis.base - Long axis base", 0.5, 1.8, 0.01),
      range("basin.shape_long_axis_range", "shape.longAxis.range - 長軸揺らぎ", "shape.longAxis.range - Long axis range", 0, 1, 0.01),
      range("basin.shape_short_axis_base", "shape.shortAxis.base - 短軸基準", "shape.shortAxis.base - Short axis base", 0.4, 1.4, 0.01),
      range("basin.shape_short_axis_range", "shape.shortAxis.range - 短軸揺らぎ", "shape.shortAxis.range - Short axis range", 0, 1, 0.01),
      range("basin.shape_lobe_offset_base", "shape.lobeOffset.base - 葉状ずれ基準", "shape.lobeOffset.base - Lobe offset base", 0, 1, 0.01),
      range("basin.shape_lobe_offset_range", "shape.lobeOffset.range - 葉状ずれ揺らぎ", "shape.lobeOffset.range - Lobe offset range", 0, 1, 0.01),
    ],
  },
  {
    id: "materials",
    title: { ja: "SulfurBasinFeature / 素材閾値", en: "SulfurBasinFeature / Material Thresholds" },
    controls: [
      range("materials.floor_sulfur_threshold", "FLOOR_SULFUR_THRESHOLD - 床硫黄率", "FLOOR_SULFUR_THRESHOLD - Floor sulfur threshold", 0, 1, 0.01),
      range("materials.vent_field_sulfur_threshold", "VENT_FIELD_SULFUR_THRESHOLD - 噴出域硫黄率", "VENT_FIELD_SULFUR_THRESHOLD - Vent-field sulfur threshold", 0, 1, 0.01),
      range("materials.scar_sulfur_threshold", "SCAR_SULFUR_THRESHOLD - 傷跡硫黄率", "SCAR_SULFUR_THRESHOLD - Scar sulfur threshold", 0, 1, 0.01),
      range("materials.apron_sulfur_threshold", "APRON_SULFUR_THRESHOLD - エプロン硫黄率", "APRON_SULFUR_THRESHOLD - Apron sulfur threshold", 0, 1, 0.01),
      range("materials.floor_calcite_threshold", "FLOOR_CALCITE_THRESHOLD - 床方解石率", "FLOOR_CALCITE_THRESHOLD - Floor calcite threshold", 0, 1, 0.01),
      range("materials.vent_field_calcite_threshold", "VENT_FIELD_CALCITE_THRESHOLD - 噴出域方解石率", "VENT_FIELD_CALCITE_THRESHOLD - Vent-field calcite threshold", 0, 1, 0.01),
      range("materials.wall_calcite_threshold", "WALL_CALCITE_THRESHOLD - 壁方解石率", "WALL_CALCITE_THRESHOLD - Wall calcite threshold", 0, 1, 0.01),
      range("materials.apron_calcite_threshold", "APRON_CALCITE_THRESHOLD - エプロン方解石率", "APRON_CALCITE_THRESHOLD - Apron calcite threshold", 0, 1, 0.01),
      range("materials.scar_gravel_threshold", "scar.gravelNoise - 傷跡砂利率", "scar.gravelNoise - Scar gravel threshold", 0, 1, 0.01),
      range("materials.floor_gravel_threshold", "floor.gravelNoise - 床砂利率", "floor.gravelNoise - Floor gravel threshold", 0, 1, 0.01),
      range("materials.apron_gravel_threshold", "apron.gravelNoise - エプロン砂利率", "apron.gravelNoise - Apron gravel threshold", 0, 1, 0.01),
    ],
  },
  {
    id: "vents",
    title: { ja: "噴出孔とハロー", en: "Vents and Halo" },
    controls: [
      range("ventField.cluster_count_min", "ventClusters.count.min - 噴出孔クラスタ最小", "ventClusters.count.min - Min vent clusters", 0, 16, 1),
      range("ventField.cluster_count_max", "ventClusters.count.max - 噴出孔クラスタ最大", "ventClusters.count.max - Max vent clusters", 0, 24, 1),
      range("ventField.sulfur_radius_min", "VentCluster.sulfurRadius.min - 硫黄半径最小", "VentCluster.sulfurRadius.min - Min sulfur radius", 1, 12, 1),
      range("ventField.sulfur_radius_max", "VentCluster.sulfurRadius.max - 硫黄半径最大", "VentCluster.sulfurRadius.max - Max sulfur radius", 1, 16, 1),
      range("ventField.sulfur_blocks_min", "VentCluster.sulfurBlocks.min - 硫黄ブロック最小", "VentCluster.sulfurBlocks.min - Min sulfur blocks", 0, 36, 1),
      range("ventField.sulfur_blocks_max", "VentCluster.sulfurBlocks.max - 硫黄ブロック最大", "VentCluster.sulfurBlocks.max - Max sulfur blocks", 0, 48, 1),
      range("ventField.deposit_blocks_min", "VentCluster.depositBlocks.min - 沈着硫黄最小", "VentCluster.depositBlocks.min - Min deposits", 0, 24, 1),
      range("ventField.deposit_blocks_max", "VentCluster.depositBlocks.max - 沈着硫黄最大", "VentCluster.depositBlocks.max - Max deposits", 0, 32, 1),
      range("ventField.cluster_search_radius", "CLUSTER_SEARCH_RADIUS - 噴出孔探索半径", "CLUSTER_SEARCH_RADIUS - Vent search radius", 0, 20, 1),
      range("ventField.slope_limit", "SLOPE_LIMIT - 噴出孔斜度上限", "SLOPE_LIMIT - Vent slope limit", 0, 8, 1),
      range("ventField.vent_pool_radius", "VENT_POOL_RADIUS - 噴出孔くぼみ半径", "VENT_POOL_RADIUS - Vent pool radius", 0, 16, 1),
      range("ventField.vent_pool_max_depth", "VENT_POOL_MAX_DEPTH - 噴出孔くぼみ最大深さ", "VENT_POOL_MAX_DEPTH - Vent pool max depth", 0, 16, 1),
      range("ventField.max_extra_vents", "extraVents.max - 追加噴出孔上限", "extraVents.max - Max extra vents", 0, 8, 1),
      range("ventHalo.vent_search_radius", "VENT_SEARCH_RADIUS - ハロー噴出孔探索", "VENT_SEARCH_RADIUS - Halo vent search radius", 0, 20, 1),
      range("ventHalo.cluster_radius", "CLUSTER_RADIUS - ハロー半径", "CLUSTER_RADIUS - Halo radius", 1, 12, 1),
      range("ventHalo.surface_y_variation", "SURFACE_Y_VARIATION - ハロー高低差許容", "SURFACE_Y_VARIATION - Halo surface Y tolerance", 0, 12, 1),
      range("ventHalo.calcite_min", "MIN_CALCITE - ハロー方解石最小", "MIN_CALCITE - Min halo calcite", 0, 20, 1),
      range("ventHalo.calcite_max", "MAX_CALCITE - ハロー方解石最大", "MAX_CALCITE - Max halo calcite", 0, 28, 1),
      range("ventHalo.sulfur_min", "MIN_SULFUR - ハロー硫黄最小", "MIN_SULFUR - Min halo sulfur", 0, 40, 1),
      range("ventHalo.sulfur_max", "MAX_SULFUR - ハロー硫黄最大", "MAX_SULFUR - Max halo sulfur", 0, 56, 1),
    ],
  },
  {
    id: "springs",
    title: { ja: "SulfurSpringFeature / 温泉", en: "SulfurSpringFeature / Springs" },
    controls: [
      range("springs.spring_count_min", "MIN_SPRING_COUNT - 温泉数最小", "MIN_SPRING_COUNT - Min spring count", 0, 24, 1),
      range("springs.spring_count_max", "MAX_SPRING_COUNT - 温泉数最大", "MAX_SPRING_COUNT - Max spring count", 0, 32, 1),
      range("springs.spring_density_multiplier", "SPRING_DENSITY_MULTIPLIER - 温泉密度倍率", "SPRING_DENSITY_MULTIPLIER - Spring density multiplier", 1, 20, 1),
      range("springs.cluster_search_radius", "CLUSTER_SEARCH_RADIUS - 温泉探索半径", "CLUSTER_SEARCH_RADIUS - Spring search radius", 0, 32, 1),
      range("springs.pool_radius_min", "MIN_POOL_RADIUS - 温泉半径最小", "MIN_POOL_RADIUS - Min pool radius", 1, 20, 1),
      range("springs.pool_radius_max", "MAX_POOL_RADIUS - 温泉半径最大", "MAX_POOL_RADIUS - Max pool radius", 1, 28, 1),
      range("springs.pool_depth_max", "MAX_POOL_DEPTH - 温泉深さ最大", "MAX_POOL_DEPTH - Max pool depth", 1, 16, 1),
      range("springs.slope_pool_radius_min", "MIN_SLOPE_POOL_RADIUS - 斜面温泉半径最小", "MIN_SLOPE_POOL_RADIUS - Min slope pool radius", 1, 20, 1),
      range("springs.slope_pool_radius_max", "MAX_SLOPE_POOL_RADIUS - 斜面温泉半径最大", "MAX_SLOPE_POOL_RADIUS - Max slope pool radius", 1, 28, 1),
      range("springs.slope_pool_depth_max", "MAX_SLOPE_POOL_DEPTH - 斜面温泉深さ最大", "MAX_SLOPE_POOL_DEPTH - Max slope pool depth", 1, 16, 1),
      range("springs.rim_blob_count_min", "MIN_RIM_BLOB_COUNT - 縁石粒最小", "MIN_RIM_BLOB_COUNT - Min rim blobs", 0, 24, 1),
      range("springs.rim_blob_count_max", "MAX_RIM_BLOB_COUNT - 縁石粒最大", "MAX_RIM_BLOB_COUNT - Max rim blobs", 0, 32, 1),
      range("springs.rim_blob_radius_min", "MIN_RIM_BLOB_RADIUS - 縁石粒半径最小", "MIN_RIM_BLOB_RADIUS - Min rim blob radius", 0, 8, 1),
      range("springs.rim_blob_radius_max", "MAX_RIM_BLOB_RADIUS - 縁石粒半径最大", "MAX_RIM_BLOB_RADIUS - Max rim blob radius", 0, 10, 1),
      range("springs.rim_band_width", "RIM_BAND_WIDTH - 縁帯幅", "RIM_BAND_WIDTH - Rim band width", 0, 8, 0.1),
      range("springs.water_level_offset", "WATER_LEVEL_OFFSET - 水面オフセット", "WATER_LEVEL_OFFSET - Water level offset", 0, 10, 1),
      range("springs.slope_water_level_offset", "SLOPE_WATER_LEVEL_OFFSET - 斜面水面オフセット", "SLOPE_WATER_LEVEL_OFFSET - Slope water level offset", 0, 10, 1),
      range("springs.max_support_gap", "MAX_SUPPORT_GAP - 支持ギャップ最大", "MAX_SUPPORT_GAP - Max support gap", 0, 20, 1),
      range("springs.base_support_depth_max", "MAX_BASE_SUPPORT_DEPTH - 基底支持深さ最大", "MAX_BASE_SUPPORT_DEPTH - Max base support depth", 0, 12, 1),
      range("springs.slope_base_support_depth_max", "MAX_SLOPE_BASE_SUPPORT_DEPTH - 斜面支持深さ最大", "MAX_SLOPE_BASE_SUPPORT_DEPTH - Max slope support depth", 0, 16, 1),
      range("springs.water_level_sample_count", "WATER_LEVEL_SAMPLE_COUNT - 水面サンプル数", "WATER_LEVEL_SAMPLE_COUNT - Water level samples", 1, 40, 1),
      range("springs.cluster_distance_sq_min", "MIN_CLUSTER_DISTANCE_SQ - 温泉間隔二乗", "MIN_CLUSTER_DISTANCE_SQ - Min spring distance squared", 0, 400, 1),
      range("springs.relaxed_cluster_distance_sq_min", "MIN_RELAXED_CLUSTER_DISTANCE_SQ - 緩和温泉間隔二乗", "MIN_RELAXED_CLUSTER_DISTANCE_SQ - Relaxed spring distance squared", 0, 400, 1),
      range("springs.pool_core_coverage_min", "MIN_POOL_CORE_COVERAGE - 中心被覆率", "MIN_POOL_CORE_COVERAGE - Min pool core coverage", 0, 1, 0.01),
      range("springs.pool_rim_coverage_min", "MIN_POOL_RIM_COVERAGE - 縁被覆率", "MIN_POOL_RIM_COVERAGE - Min pool rim coverage", 0, 1, 0.01),
      range("springs.slope_pool_core_coverage_min", "MIN_SLOPE_POOL_CORE_COVERAGE - 斜面中心被覆率", "MIN_SLOPE_POOL_CORE_COVERAGE - Min slope pool core coverage", 0, 1, 0.01),
      range("springs.slope_pool_rim_coverage_min", "MIN_SLOPE_POOL_RIM_COVERAGE - 斜面縁被覆率", "MIN_SLOPE_POOL_RIM_COVERAGE - Min slope pool rim coverage", 0, 1, 0.01),
    ],
  },
  {
    id: "shards",
    title: { ja: "SulfurShardFieldFeature / 結晶柱", en: "SulfurShardFieldFeature / Shards" },
    controls: [
      range("shards.cluster_count_min", "MIN_CLUSTER_COUNT - 結晶クラスタ最小", "MIN_CLUSTER_COUNT - Min shard clusters", 0, 16, 1),
      range("shards.cluster_count_max", "MAX_CLUSTER_COUNT - 結晶クラスタ最大", "MAX_CLUSTER_COUNT - Max shard clusters", 0, 24, 1),
      range("shards.cluster_search_radius", "CLUSTER_SEARCH_RADIUS - 主結晶探索半径", "CLUSTER_SEARCH_RADIUS - Main shard search radius", 0, 24, 1),
      range("shards.satellite_search_radius", "SATELLITE_SEARCH_RADIUS - 副結晶探索半径", "SATELLITE_SEARCH_RADIUS - Satellite search radius", 0, 24, 1),
      range("shards.shard_height_min", "MIN_SHARD_HEIGHT - 主結晶高さ最小", "MIN_SHARD_HEIGHT - Min main shard height", 1, 64, 1),
      range("shards.shard_height_max", "MAX_SHARD_HEIGHT - 主結晶高さ最大", "MAX_SHARD_HEIGHT - Max main shard height", 1, 96, 1),
      range("shards.satellite_height_min", "MIN_SATELLITE_HEIGHT - 副結晶高さ最小", "MIN_SATELLITE_HEIGHT - Min satellite height", 1, 48, 1),
      range("shards.satellite_height_max", "MAX_SATELLITE_HEIGHT - 副結晶高さ最大", "MAX_SATELLITE_HEIGHT - Max satellite height", 1, 64, 1),
      range("shards.primary_base_radius_min", "MIN_PRIMARY_BASE_RADIUS - 主根元半径最小", "MIN_PRIMARY_BASE_RADIUS - Min primary base radius", 1, 8, 1),
      range("shards.primary_base_radius_max", "MAX_PRIMARY_BASE_RADIUS - 主根元半径最大", "MAX_PRIMARY_BASE_RADIUS - Max primary base radius", 1, 10, 1),
      range("shards.satellite_base_radius_min", "MIN_SATELLITE_BASE_RADIUS - 副根元半径最小", "MIN_SATELLITE_BASE_RADIUS - Min satellite base radius", 1, 8, 1),
      range("shards.satellite_base_radius_max", "MAX_SATELLITE_BASE_RADIUS - 副根元半径最大", "MAX_SATELLITE_BASE_RADIUS - Max satellite base radius", 1, 10, 1),
      range("shards.sub_shard_count_min", "MIN_SUB_SHARD_COUNT - 副結晶数最小", "MIN_SUB_SHARD_COUNT - Min sub-shards", 0, 8, 1),
      range("shards.sub_shard_count_max", "MAX_SUB_SHARD_COUNT - 副結晶数最大", "MAX_SUB_SHARD_COUNT - Max sub-shards", 0, 12, 1),
      range("shards.sub_shard_distance_min", "MIN_SUB_SHARD_DISTANCE - 副結晶距離最小", "MIN_SUB_SHARD_DISTANCE - Min sub-shard distance", 1, 12, 1),
      range("shards.sub_shard_distance_max", "MAX_SUB_SHARD_DISTANCE - 副結晶距離最大", "MAX_SUB_SHARD_DISTANCE - Max sub-shard distance", 1, 16, 1),
      range("shards.primary_lean_max", "MAX_PRIMARY_LEAN - 主結晶傾き最大", "MAX_PRIMARY_LEAN - Max primary lean", 0, 32, 1),
      range("shards.satellite_lean_max", "MAX_SATELLITE_LEAN - 副結晶傾き最大", "MAX_SATELLITE_LEAN - Max satellite lean", 0, 24, 1),
      range("shards.main_taper_power", "MAIN_TAPER_POWER - 主結晶テーパー", "MAIN_TAPER_POWER - Main taper power", 0.5, 4, 0.05),
      range("shards.sub_taper_power", "SUB_TAPER_POWER - 副結晶テーパー", "SUB_TAPER_POWER - Sub taper power", 0.5, 4, 0.05),
      range("shards.cluster_spacing_min", "MIN_CLUSTER_SPACING - 結晶クラスタ間隔", "MIN_CLUSTER_SPACING - Min cluster spacing", 0, 24, 1),
      range("shards.foundation_scan_depth", "FOUNDATION_SCAN_DEPTH - 土台探索深さ", "FOUNDATION_SCAN_DEPTH - Foundation scan depth", 0, 24, 1),
    ],
  },
];

const els = {
  languageSelect: document.querySelector("#languageSelect"),
  parameterSections: document.querySelector("#parameterSections"),
  instantToggle: document.querySelector("#instantToggle"),
  generateButton: document.querySelector("#generateButton"),
  resetButton: document.querySelector("#resetButton"),
  presetButtons: document.querySelector("#presetButtons"),
  dirtyNotice: document.querySelector("#dirtyNotice"),
  previewStatus: document.querySelector("#previewStatus"),
  previewStats: document.querySelector("#previewStats"),
  jsonOutput: document.querySelector("#jsonOutput"),
  copyButton: document.querySelector("#copyButton"),
  downloadButton: document.querySelector("#downloadButton"),
  shareButton: document.querySelector("#shareButton"),
  blockDialog: document.querySelector("#blockDialog"),
  blockSearch: document.querySelector("#blockSearch"),
  blockTabs: document.querySelector("#blockTabs"),
  blockGrid: document.querySelector("#blockGrid"),
  blockTooltip: document.querySelector("#blockTooltip"),
  resourceTextureInput: document.querySelector("#resourceTextureInput"),
  resourceTextureStatus: document.querySelector("#resourceTextureStatus"),
  customBlockId: document.querySelector("#customBlockId"),
  customBlockName: document.querySelector("#customBlockName"),
  customBlockTexture: document.querySelector("#customBlockTexture"),
  addCustomBlock: document.querySelector("#addCustomBlock"),
  previewViewport: document.querySelector("#previewViewport"),
  previewLoading: document.querySelector("#previewLoading"),
};

let language = navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
let state = mergeDeep(clone(DEFAULT_STATE), loadSharedState());
let appliedState = clone(state);
let activeBlockPath = null;
let activeBlockTab = "all";
let latestTexture = null;
let generateTimer = 0;
let preview = null;
const textureOverrides = new Map();
const loadedResourceBlocks = new Map();

els.languageSelect.value = language;
window.setTimeout(init, 0);

function init() {
  preview = createPreview(els.previewViewport);
  applyTranslations();
  renderParameters();
  renderBlockPicker();
  generate();

  els.languageSelect.addEventListener("change", () => {
    language = els.languageSelect.value;
    document.documentElement.lang = language;
    applyTranslations();
    renderParameters();
    renderBlockPicker();
    updateJson();
  });

  els.instantToggle.addEventListener("change", () => {
    if (els.instantToggle.checked) {
      scheduleGenerate();
    }
  });

  els.generateButton.addEventListener("click", generate);
  els.resetButton.addEventListener("click", () => {
    state = clone(DEFAULT_STATE);
    appliedState = clone(state);
    renderParameters();
    renderBlockPicker();
    generate();
  });
  els.presetButtons.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-preset-id]") : null;
    if (!button) return;
    applyDemoPreset(button.dataset.presetId, button);
  });
  els.copyButton.addEventListener("click", copyJson);
  els.jsonOutput.addEventListener("click", copyJson);
  els.downloadButton.addEventListener("click", downloadJson);
  els.shareButton.addEventListener("click", shareState);
  els.blockSearch.addEventListener("input", renderBlockPicker);
  els.resourceTextureInput.addEventListener("change", handleResourceTextureInput);
  els.addCustomBlock.addEventListener("click", addCustomBlock);
  els.customBlockTexture.addEventListener("change", handleTextureInput);
}

function createPreview(container) {
  try {
    return new BiomePreview(container);
  } catch (error) {
    console.warn("WebGL preview unavailable; using canvas fallback.", error);
    container.querySelectorAll("canvas").forEach((canvas) => canvas.remove());
    return new CanvasPreview(container);
  }
}

function applyDemoPreset(id, sourceButton) {
  const preset = DEMO_PRESETS.find((item) => item.id === id);
  if (!preset) return;

  const customBlocks = clone(state.customBlocks || []);
  state = mergeDeep(clone(DEFAULT_STATE), clone(preset.patch));
  state.customBlocks = customBlocks;
  renderParameters();
  renderBlockPicker();
  generate();

  if (sourceButton) {
    flashButton(sourceButton, t("presetApplied"), t(preset.labelKey));
  }
}

function generate() {
  appliedState = clone(state);
  normalizeRanges(appliedState);
  preview.generate(appliedState);
  updateJson();
  setDirty(false);
}

function scheduleGenerate() {
  window.clearTimeout(generateTimer);
  generateTimer = window.setTimeout(generate, 80);
}

function markChanged() {
  if (els.instantToggle.checked) {
    scheduleGenerate();
    return;
  }
  setDirty(true);
}

function setDirty(isDirty) {
  els.dirtyNotice.hidden = !isDirty;
  els.previewStatus.textContent = isDirty ? t("previewDirty") : t("previewReady");
}

function updateJson() {
  els.jsonOutput.value = JSON.stringify(buildExport(appliedState), null, 2);
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
}

function renderParameters() {
  const open = new Set(
    [...els.parameterSections.querySelectorAll("details[open]")].map((details) => details.dataset.sectionId)
  );
  if (open.size === 0) {
    ["meta", "climate", "visual", "blocks"].forEach((id) => open.add(id));
  }

  els.parameterSections.replaceChildren(
    ...PARAM_SECTIONS.map((section) => {
      const details = document.createElement("details");
      details.className = "param-section";
      details.dataset.sectionId = section.id;
      details.open = open.has(section.id);

      const summary = document.createElement("summary");
      const title = document.createElement("h3");
      title.textContent = local(section.title);
      summary.append(title);
      details.append(summary);

      const list = document.createElement("div");
      list.className = "param-list";
      section.controls.forEach((control) => list.append(renderControl(control)));
      details.append(list);
      return details;
    })
  );
}

function renderControl(control) {
  const wrap = document.createElement("label");
  wrap.className = "param-control";
  if (control.type === "block") {
    wrap.removeAttribute("for");
  }

  const title = document.createElement("span");
  title.className = "param-title";
  title.textContent = local(control.label);
  wrap.append(title);

  const current = getByPath(state, control.path);

  if (control.type === "range") {
    const row = document.createElement("div");
    row.className = "range-row";
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = control.min;
    slider.max = control.max;
    slider.step = control.step;
    slider.value = current;
    const number = document.createElement("input");
    number.className = "pixel-input";
    number.type = "number";
    number.min = control.min;
    number.max = control.max;
    number.step = control.step;
    number.value = current;
    const update = (value) => {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        slider.value = String(parsed);
        number.value = String(parsed);
        setByPath(state, control.path, parsed);
        markChanged();
      }
    };
    slider.addEventListener("input", () => update(slider.value));
    number.addEventListener("input", () => update(number.value));
    row.append(slider, number);
    wrap.append(row);
  } else if (control.type === "checkbox") {
    const row = document.createElement("span");
    row.className = "toggle";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = Boolean(current);
    input.addEventListener("change", () => {
      setByPath(state, control.path, input.checked);
      markChanged();
    });
    const value = document.createElement("span");
    value.textContent = current ? "true" : "false";
    input.addEventListener("change", () => {
      value.textContent = input.checked ? "true" : "false";
    });
    row.append(input, value);
    wrap.append(row);
  } else if (control.type === "select") {
    const input = document.createElement("select");
    input.className = "pixel-select";
    control.options.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      input.append(option);
    });
    input.value = current;
    input.addEventListener("change", () => {
      setByPath(state, control.path, input.value);
      markChanged();
    });
    wrap.append(input);
  } else if (control.type === "json") {
    const input = document.createElement("textarea");
    input.className = "pixel-input json-control";
    input.spellcheck = false;
    input.value = JSON.stringify(current, null, 2);
    input.addEventListener("input", () => {
      try {
        setByPath(state, control.path, JSON.parse(input.value));
        input.setCustomValidity("");
        markChanged();
      } catch {
        input.setCustomValidity(t("invalidJson"));
      }
    });
    wrap.append(input);
  } else if (control.type === "color") {
    const row = document.createElement("div");
    row.className = "inline-row";
    const input = document.createElement("input");
    input.className = "pixel-input";
    input.type = "color";
    input.value = current || "#000000";
    const textInput = document.createElement("input");
    textInput.className = "pixel-input";
    textInput.type = "text";
    textInput.value = current || "";
    textInput.placeholder = control.optional ? "" : "#ffffff";
    const update = (value) => {
      if (value === "" && control.optional) {
        textInput.value = "";
        setByPath(state, control.path, "");
        markChanged();
        return;
      }
      if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
        return;
      }
      input.value = value;
      textInput.value = value;
      setByPath(state, control.path, value);
      markChanged();
    };
    input.addEventListener("input", () => update(input.value));
    textInput.addEventListener("input", () => update(textInput.value));
    row.append(input, textInput);
    wrap.append(row);
  } else if (control.type === "block") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pixel-button block-select-button";
    const blockInfo = findBlock(current);
    const swatch = document.createElement("span");
    swatch.className = "block-swatch";
    paintSwatch(swatch, blockInfo);
    const name = document.createElement("span");
    name.className = "block-name";
    name.textContent = `${current} - ${blockName(blockInfo)}`;
    button.append(swatch, name);
    button.addEventListener("click", () => openBlockDialog(control.path));
    wrap.append(button);
  } else {
    const input = document.createElement("input");
    input.className = "pixel-input";
    input.type = "text";
    input.value = current ?? "";
    input.addEventListener("input", () => {
      setByPath(state, control.path, input.value);
      markChanged();
    });
    wrap.append(input);
  }

  if (control.help) {
    const help = document.createElement("span");
    help.className = "param-help";
    help.textContent = local(control.help);
    wrap.append(help);
  }

  return wrap;
}

function openBlockDialog(path) {
  activeBlockPath = path;
  activeBlockTab = "all";
  els.blockSearch.value = "";
  renderBlockPicker();
  els.blockDialog.showModal();
}

function renderBlockPicker() {
  const tabs = ["all", "building", "natural", "ores", "fluids", "mod", "custom"];
  els.blockTabs.replaceChildren(
    ...tabs.map((tab) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `block-tab${tab === activeBlockTab ? " is-active" : ""}`;
      button.textContent = t(`${tab}Tab`);
      button.addEventListener("click", () => {
        activeBlockTab = tab;
        renderBlockPicker();
      });
      return button;
    })
  );

  const query = els.blockSearch.value.trim().toLowerCase();
  const selected = activeBlockPath ? getByPath(state, activeBlockPath) : "";
  const items = blockCatalog().filter((blockInfo) => {
    const tabMatch = activeBlockTab === "all" || blockInfo.tab === activeBlockTab;
    const nameJa = blockInfo.name.ja.toLowerCase();
    const nameEn = blockInfo.name.en.toLowerCase();
    const searchMatch = !query || blockInfo.id.toLowerCase().includes(query) || nameJa.includes(query) || nameEn.includes(query);
    return tabMatch && searchMatch;
  });

  els.blockGrid.replaceChildren(
    ...items.map((blockInfo) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `block-item${blockInfo.id === selected ? " is-selected" : ""}`;
      button.dataset.tooltipName = blockName(blockInfo);
      button.dataset.tooltipId = blockInfo.id;
      button.setAttribute("aria-label", `${blockName(blockInfo)} ${blockInfo.id}`);
      const icon = document.createElement("span");
      icon.className = "block-icon";
      paintSwatch(icon, blockInfo);
      button.append(icon);
      button.addEventListener("mouseenter", (event) => showBlockTooltip(event, blockInfo));
      button.addEventListener("mousemove", moveBlockTooltip);
      button.addEventListener("mouseleave", hideBlockTooltip);
      button.addEventListener("focus", (event) => showBlockTooltip(event, blockInfo));
      button.addEventListener("blur", hideBlockTooltip);
      button.addEventListener("click", () => {
        if (activeBlockPath) {
          setByPath(state, activeBlockPath, blockInfo.id);
          renderParameters();
          markChanged();
        }
        els.blockDialog.close();
      });
      return button;
    })
  );
}

async function handleResourceTextureInput() {
  const files = [...(els.resourceTextureInput.files || [])].filter((file) => file.type === "image/png" || file.name.endsWith(".png"));
  let loaded = 0;
  for (const file of files) {
    const textureId = textureIdFromFile(file);
    if (!textureId) continue;
    const texture = await readTexture(file);
    textureOverrides.set(textureId, texture);
    for (const blockId of blockIdsForTexture(textureId)) {
      if (!loadedResourceBlocks.has(blockId) && !BLOCKS.some((blockInfo) => blockInfo.id === blockId)) {
        loadedResourceBlocks.set(blockId, {
          id: blockId,
          name: generatedBlockName(blockId),
          tab: guessTab(blockId),
          color: texture.color,
          textureKey: textureId,
        });
      }
    }
    loaded++;
  }

  els.resourceTextureStatus.textContent = loaded > 0
    ? `${t("resourceTexturesLoaded")}: ${loaded}`
    : t("resourceTexturesNone");
  renderBlockPicker();
  renderParameters();
  if (els.instantToggle.checked) {
    scheduleGenerate();
  } else {
    generate();
  }
}

function textureIdFromFile(file) {
  const rawPath = file.webkitRelativePath || file.name;
  const path = rawPath.replaceAll("\\", "/");
  const match = path.match(/(?:^|\/)assets\/([^/]+)\/textures\/block\/(.+)\.png$/i);
  if (match) {
    return `${match[1]}:${match[2].replaceAll("/", "_")}`;
  }
  const name = file.name.replace(/\.png$/i, "");
  return name ? `minecraft:${name}` : "";
}

function blockIdsForTexture(textureId) {
  const [namespace, textureName] = textureId.split(":");
  const ids = new Set([`${namespace}:${textureName}`]);
  for (const suffix of TEXTURE_SUFFIXES) {
    if (textureName.endsWith(suffix)) {
      ids.add(`${namespace}:${textureName.slice(0, -suffix.length)}`);
    }
  }
  if (textureName.endsWith("_side_overlay")) {
    ids.add(`${namespace}:${textureName.slice(0, -"_side_overlay".length)}`);
  }
  if (textureName.includes("_stage_")) {
    ids.add(`${namespace}:${textureName.replace(/_stage_\d+$/, "")}`);
  }
  return [...ids].filter((id) => !id.endsWith(":"));
}

function generatedBlockName(blockId) {
  const [, id] = blockId.split(":");
  const title = id
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return { en: title, ja: title };
}

function guessTab(blockId) {
  if (blockId.startsWith("rust_rampart:")) return "mod";
  if (blockId.includes("ore")) return "ores";
  if (blockId.endsWith(":water") || blockId.endsWith(":lava")) return "fluids";
  if (/grass|dirt|sand|gravel|snow|ice|mud|clay|moss|nylium|netherrack|end_stone|terracotta/.test(blockId)) {
    return "natural";
  }
  return "building";
}

function showBlockTooltip(event, blockInfo) {
  els.blockTooltip.innerHTML = `${escapeHtml(blockName(blockInfo))}<span class="tooltip-id">${escapeHtml(blockInfo.id)}</span>`;
  els.blockTooltip.hidden = false;
  moveBlockTooltip(event);
}

function moveBlockTooltip(event) {
  if (els.blockTooltip.hidden) return;
  const offset = 16;
  const rect = els.blockTooltip.getBoundingClientRect();
  let left = event.clientX + offset;
  let top = event.clientY + offset;
  if (left + rect.width > window.innerWidth - 8) {
    left = event.clientX - rect.width - offset;
  }
  if (top + rect.height > window.innerHeight - 8) {
    top = event.clientY - rect.height - offset;
  }
  els.blockTooltip.style.left = `${Math.max(8, left)}px`;
  els.blockTooltip.style.top = `${Math.max(8, top)}px`;
}

function hideBlockTooltip() {
  els.blockTooltip.hidden = true;
}

async function handleTextureInput() {
  const file = els.customBlockTexture.files?.[0];
  latestTexture = file ? await readTexture(file) : null;
}

async function addCustomBlock() {
  if (!latestTexture && els.customBlockTexture.files?.[0]) {
    latestTexture = await readTexture(els.customBlockTexture.files[0]);
  }
  const id = els.customBlockId.value.trim();
  if (!id || !latestTexture) {
    els.customBlockId.setCustomValidity(t("invalidBlock"));
    els.customBlockId.reportValidity();
    return;
  }
  els.customBlockId.setCustomValidity("");
  const display = els.customBlockName.value.trim() || id.split(":").pop().replaceAll("_", " ");
  const blockInfo = {
    id,
    name: { en: display, ja: display },
    tab: "custom",
    color: latestTexture.color,
    texture: latestTexture.dataUrl,
  };
  state.customBlocks = state.customBlocks.filter((item) => item.id !== id).concat(blockInfo);
  latestTexture = null;
  els.customBlockId.value = "";
  els.customBlockName.value = "";
  els.customBlockTexture.value = "";
  activeBlockTab = "custom";
  renderBlockPicker();
  markChanged();
}

async function readTexture(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
  const canvas = document.createElement("canvas");
  const size = 16;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, size, size);
  const pixels = ctx.getImageData(0, 0, size, size).data;
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = pixels[i + 3] / 255;
    if (alpha <= 0.05) continue;
    r += pixels[i] * alpha;
    g += pixels[i + 1] * alpha;
    b += pixels[i + 2] * alpha;
    count += alpha;
  }
  return {
    dataUrl,
    color: rgbToHex(Math.round(r / count), Math.round(g / count), Math.round(b / count)),
  };
}

function buildExport(source) {
  const normalized = clone(source);
  normalizeRanges(normalized);
  const files = {};
  files[`data/${TARGET.modId}/worldgen/biome/sulfur_valley.json`] = buildBiomeJson(normalized);

  for (const id of ["sulfur_basin", "sulfur_spring", "sulfur_vent_field", "sulfur_vent_halo", "sulfur_shard_field"]) {
    if (normalized.placements[id].enabled) {
      files[`data/${TARGET.modId}/worldgen/configured_feature/${id}.json`] = {
        type: `${TARGET.modId}:${id}`,
        config: {},
      };
      files[`data/${TARGET.modId}/worldgen/placed_feature/${id}.json`] = buildPlacedFeatureJson(id, normalized.placements[id]);
    }
  }

  return {
    target: {
      minecraft_version: normalized.meta.minecraft_version,
      mod_version: normalized.meta.mod_version,
      mod_id: normalized.meta.mod_id,
      biome_id: normalized.biome.id,
    },
    files,
    "rust_rampart:generator_parameters": {
      note: "Values in this object mirror the current hard-coded Rust & Rampart 0.1.0 worldgen constants for implementation handoff.",
      preview: normalized.preview,
      blocks: normalized.blocks,
      surface: normalized.surface,
      basin: normalized.basin,
      materials: normalized.materials,
      vent_field: normalized.ventField,
      vent_halo: normalized.ventHalo,
      springs: normalized.springs,
      shards: normalized.shards,
      custom_blocks: normalized.customBlocks.map(({ id, name, color }) => ({ id, name, color })),
    },
  };
}

function buildBiomeJson(source) {
  const localFeatures = [];
  for (const id of ["sulfur_basin", "sulfur_spring", "sulfur_vent_field", "sulfur_vent_halo", "sulfur_shard_field"]) {
    if (source.placements[id].enabled) {
      localFeatures.push(`${TARGET.modId}:${id}`);
    }
  }
  const features = [
    [],
    source.biome.generation.lake_lava_underground ? ["minecraft:lake_lava_underground"] : [],
    localFeatures,
    [
      source.biome.generation.monster_room ? "minecraft:monster_room" : null,
      source.biome.generation.monster_room_deep ? "minecraft:monster_room_deep" : null,
    ].filter(Boolean),
    [],
    [],
    source.biome.generation.default_ores ? DEFAULT_FEATURES.undergroundOres : [],
    source.biome.generation.ore_infested ? DEFAULT_FEATURES.undergroundDecoration : [],
    source.biome.generation.spring_lava ? ["minecraft:spring_lava"] : [],
  ];

  const attributes = {
    "minecraft:audio/background_music": source.biome.attributes.background_music
      ? { sound: source.biome.attributes.background_music }
      : {},
    "minecraft:audio/music_volume": source.biome.attributes.music_volume,
    "minecraft:visual/fog_color": source.biome.attributes.fog_color,
    "minecraft:visual/sky_color": source.biome.attributes.sky_color,
    "minecraft:visual/water_fog_color": source.biome.attributes.water_fog_color,
    "minecraft:particle/ambient": {
      options: {
        type: "minecraft:dust",
        color: source.biome.attributes.ambient_particle_color,
        scale: source.biome.attributes.ambient_particle_scale,
      },
      probability: source.biome.attributes.ambient_particle_probability,
    },
  };

  const effects = {
    water_color: source.biome.effects.water_color,
  };
  if (source.biome.effects.grass_color) effects.grass_color = source.biome.effects.grass_color;
  if (source.biome.effects.foliage_color) effects.foliage_color = source.biome.effects.foliage_color;
  if (source.biome.effects.grass_color_modifier !== "none") {
    effects.grass_color_modifier = source.biome.effects.grass_color_modifier;
  }

  return {
    attributes,
    carvers: [
      source.biome.carvers.cave ? "minecraft:cave" : null,
      source.biome.carvers.cave_extra_underground ? "minecraft:cave_extra_underground" : null,
    ].filter(Boolean),
    downfall: source.biome.downfall,
    effects,
    features,
    has_precipitation: source.biome.has_precipitation,
    spawn_costs: source.biome.spawn_costs,
    spawners: source.biome.spawners,
    temperature: source.biome.temperature,
    temperature_modifier: source.biome.temperature_modifier,
  };
}

function buildPlacedFeatureJson(id, placement) {
  const modifiers = [];
  if (id === "sulfur_vent_halo") {
    modifiers.push({
      type: "minecraft:count",
      count: {
        type: "minecraft:uniform",
        min_inclusive: placement.count_min,
        max_inclusive: placement.count_max,
      },
    });
  } else {
    modifiers.push({ type: "minecraft:count", count: placement.count });
  }
  if (placement.in_square) modifiers.push({ type: "minecraft:in_square" });
  modifiers.push({ type: "minecraft:heightmap", heightmap: placement.heightmap });
  if (id === "sulfur_vent_halo") {
    modifiers.push({
      type: "minecraft:block_predicate_filter",
      predicate: {
        type: "minecraft:any_of",
        predicates: [
          [1, 0, 0],
          [-1, 0, 0],
          [0, 0, 1],
          [0, 0, -1],
          [0, 1, 0],
          [0, -1, 0],
        ].map((offset) => ({
          type: "minecraft:matching_blocks",
          blocks: placement.predicate_blocks,
          offset,
        })),
      },
    });
  }
  if (placement.biome_filter) modifiers.push({ type: "minecraft:biome" });
  return {
    feature: `${TARGET.modId}:${id}`,
    placement: modifiers,
  };
}

function normalizeRanges(target) {
  const pairs = [
    ["placements.sulfur_vent_halo.count_min", "placements.sulfur_vent_halo.count_max"],
    ["basin.outer_radius_min", "basin.outer_radius_max"],
    ["basin.apron_width_min", "basin.apron_width_max"],
    ["basin.ramp_width_min", "basin.ramp_width_max"],
    ["basin.floor_offset_min", "basin.floor_offset_max"],
    ["ventField.cluster_count_min", "ventField.cluster_count_max"],
    ["ventField.sulfur_radius_min", "ventField.sulfur_radius_max"],
    ["ventField.sulfur_blocks_min", "ventField.sulfur_blocks_max"],
    ["ventField.deposit_blocks_min", "ventField.deposit_blocks_max"],
    ["ventHalo.calcite_min", "ventHalo.calcite_max"],
    ["ventHalo.sulfur_min", "ventHalo.sulfur_max"],
    ["springs.spring_count_min", "springs.spring_count_max"],
    ["springs.pool_radius_min", "springs.pool_radius_max"],
    ["springs.slope_pool_radius_min", "springs.slope_pool_radius_max"],
    ["springs.rim_blob_count_min", "springs.rim_blob_count_max"],
    ["springs.rim_blob_radius_min", "springs.rim_blob_radius_max"],
    ["shards.cluster_count_min", "shards.cluster_count_max"],
    ["shards.shard_height_min", "shards.shard_height_max"],
    ["shards.satellite_height_min", "shards.satellite_height_max"],
    ["shards.primary_base_radius_min", "shards.primary_base_radius_max"],
    ["shards.satellite_base_radius_min", "shards.satellite_base_radius_max"],
    ["shards.sub_shard_count_min", "shards.sub_shard_count_max"],
    ["shards.sub_shard_distance_min", "shards.sub_shard_distance_max"],
  ];
  for (const [minPath, maxPath] of pairs) {
    const min = Number(getByPath(target, minPath));
    const max = Number(getByPath(target, maxPath));
    if (min > max) {
      setByPath(target, maxPath, min);
    }
  }
}

function copyJson() {
  copyText(els.jsonOutput.value).then(() => flashButton(els.copyButton, t("copied"), t("copyJson")));
}

function downloadJson() {
  const blob = new Blob([els.jsonOutput.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "rust-rampart-sulfur-valley-parameters.json";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function shareState() {
  const payload = clone(state);
  payload.customBlocks = payload.customBlocks.map((blockInfo) => ({
    ...blockInfo,
    texture: blockInfo.texture && blockInfo.texture.length < 30000 ? blockInfo.texture : "",
  }));
  const encoded = encodeShare(payload);
  history.replaceState(null, "", `${location.pathname}#share=${encoded}`);
  const url = location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title: "Rust & Rampart Biome Lab", url });
      return;
    } catch {
      await copyText(url);
    }
  } else {
    await copyText(url);
  }
  flashButton(els.shareButton, t("shared"), t("share"));
}

function loadSharedState() {
  if (!location.hash.startsWith("#share=")) return {};
  try {
    return JSON.parse(decodeShare(location.hash.slice("#share=".length)));
  } catch {
    return {};
  }
}

function encodeShare(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeShare(value) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

class BiomePreview {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#101716");
    this.camera = new THREE.OrthographicCamera(-40, 40, 30, -30, 0.1, 400);
    this.camera.position.set(52, 56, 52);
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = false;
    this.container.append(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.48;
    this.controls.minPolarAngle = Math.PI * 0.18;
    this.controls.target.set(0, 7, 0);
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.cube = new THREE.BoxGeometry(1, 1, 1);
    this.dummy = new THREE.Object3D();
    this.stats = { blocks: 0, vents: 0, springs: 0, shards: 0 };
    this.addLights();
    new ResizeObserver(() => this.resize()).observe(this.container);
    this.resize();
    this.animate();
    els.previewLoading.classList.add("is-hidden");
  }

  addLights() {
    const ambient = new THREE.AmbientLight("#d4c8a9", 1.4);
    const sun = new THREE.DirectionalLight("#fff0be", 2.2);
    sun.position.set(30, 70, 20);
    const fill = new THREE.DirectionalLight("#67d3d7", 0.5);
    fill.position.set(-40, 30, -30);
    this.scene.add(ambient, sun, fill);
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const aspect = width / height;
    const view = 76;
    this.camera.left = (-view * aspect) / 2;
    this.camera.right = (view * aspect) / 2;
    this.camera.top = view / 2;
    this.camera.bottom = -view / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    while (this.group.children.length) {
      const child = this.group.children.pop();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
        else child.material.dispose();
      }
      if (child.geometry && child.geometry !== this.cube) child.geometry.dispose();
    }
  }

  generate(source) {
    this.clear();
    this.stats = { blocks: 0, vents: 0, springs: 0, shards: 0 };
    const size = clamp(Math.round(source.preview.size), 24, 112);
    const half = size / 2;
    const outer = avg(source.basin.outer_radius_min, source.basin.outer_radius_max);
    const apron = avg(source.basin.apron_width_min, source.basin.apron_width_max);
    const ramp = avg(source.basin.ramp_width_min, source.basin.ramp_width_max);
    const floorRadius = Math.max(source.basin.floor_radius_min, outer - apron - ramp - 2);
    const effectRadius = outer + source.basin.outside_bevel_width;
    const scale = size / Math.max(20, effectRadius * 2.1);
    const heightMap = new Map();
    const blockMap = new Map();
    const matrices = new Map();
    const seed = Number(source.preview.seed) || 1;

    for (let ix = 0; ix < size; ix++) {
      for (let iz = 0; iz < size; iz++) {
        const wx = (ix - half) / scale;
        const wz = (iz - half) / scale;
        const zone = zoneAt(source, wx, wz, { outer, floorRadius, ramp, effectRadius });
        const h = terrainHeight(source, wx, wz, zone, { outer, floorRadius, ramp, effectRadius, seed });
        const blockId = chooseSurfaceBlock(source, wx, wz, h, zone, seed);
        heightMap.set(`${ix},${iz}`, h);
        blockMap.set(`${ix},${iz}`, blockId);
        if (!matrices.has(blockId)) matrices.set(blockId, []);
        this.dummy.position.set(ix - half, (h * source.preview.verticalScale) / 2, iz - half);
        this.dummy.scale.set(1, Math.max(0.3, h * source.preview.verticalScale), 1);
        this.dummy.updateMatrix();
        matrices.get(blockId).push(this.dummy.matrix.clone());
        this.stats.blocks++;
      }
    }

    for (const [blockId, list] of matrices) {
      const material = new THREE.MeshStandardMaterial({
        color: colorForBlock(blockId),
        roughness: 0.95,
        metalness: 0,
      });
      const mesh = new THREE.InstancedMesh(this.cube, material, list.length);
      list.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
      mesh.instanceMatrix.needsUpdate = true;
      this.group.add(mesh);
    }

    this.addFeatures(source, size, half, scale, heightMap, blockMap, { outer, floorRadius, ramp, effectRadius, seed });
    els.previewStats.textContent = `${this.stats.blocks} ${t("blocks")} / ${this.stats.vents} ${t("vents")} / ${this.stats.springs} ${t("springs")} / ${this.stats.shards} ${t("shards")}`;
  }

  addFeatures(source, size, half, scale, heightMap, blockMap, shape) {
    const seed = shape.seed;
    const rng = mulberry32(seed ^ 0x510e527f);
    const ventCount = source.placements.sulfur_vent_field.enabled
      ? Math.round(avg(source.ventField.cluster_count_min, source.ventField.cluster_count_max))
      : 0;
    const ventPositions = [];
    for (let i = 0; i < ventCount; i++) {
      const angle = rng() * Math.PI * 2;
      const radius = shape.floorRadius * (0.12 + Math.sqrt(rng()) * 0.48);
      const position = this.worldToGrid(Math.cos(angle) * radius, Math.sin(angle) * radius, half, scale, size);
      if (!position) continue;
      ventPositions.push(position);
      this.addBlockFeature(source.blocks.vent, position.x - half, this.heightAt(heightMap, position) + 0.55, position.z - half, 0.9, 0.9);
      this.stats.vents++;
      const haloRadius = Math.max(1, source.ventHalo.cluster_radius);
      const sulfurBlocks = Math.round(avg(source.ventHalo.sulfur_min, source.ventHalo.sulfur_max) / 3);
      for (let s = 0; s < sulfurBlocks; s++) {
        const ha = rng() * Math.PI * 2;
        const hr = 1 + rng() * haloRadius;
        const hx = Math.round(position.x + Math.cos(ha) * hr);
        const hz = Math.round(position.z + Math.sin(ha) * hr);
        if (!insideGrid(hx, hz, size)) continue;
        blockMap.set(`${hx},${hz}`, source.blocks.sulfur);
        this.addBlockFeature(source.blocks.sulfur, hx - half, this.heightAt(heightMap, { x: hx, z: hz }) + 0.12, hz - half, 1.02, 0.18);
        if (rng() > 0.55) {
          this.addBlockFeature(source.blocks.deposit, hx - half, this.heightAt(heightMap, { x: hx, z: hz }) + 0.92, hz - half, 0.52, 0.34);
        }
      }
      const calciteBlocks = Math.round(avg(source.ventHalo.calcite_min, source.ventHalo.calcite_max));
      for (let c = 0; c < calciteBlocks; c++) {
        const ca = rng() * Math.PI * 2;
        const cr = 1 + rng() * haloRadius;
        const cx = Math.round(position.x + Math.cos(ca) * cr);
        const cz = Math.round(position.z + Math.sin(ca) * cr);
        if (insideGrid(cx, cz, size)) {
          blockMap.set(`${cx},${cz}`, source.blocks.calcite);
          this.addBlockFeature(source.blocks.calcite, cx - half, this.heightAt(heightMap, { x: cx, z: cz }) + 0.1, cz - half, 1.01, 0.16);
        }
      }
    }

    if (source.placements.sulfur_spring.enabled) {
      const springRng = mulberry32(seed ^ 0x2b992ddf);
      const rawCount = avg(source.springs.spring_count_min, source.springs.spring_count_max) * source.springs.spring_density_multiplier;
      const count = clamp(Math.round(rawCount / 10), 1, 18);
      for (let i = 0; i < count; i++) {
        const angle = springRng() * Math.PI * 2;
        const radius = shape.floorRadius * (0.18 + springRng() * 0.72);
        const position = this.worldToGrid(Math.cos(angle) * radius, Math.sin(angle) * radius, half, scale, size);
        if (!position) continue;
        const poolRadius = avg(source.springs.pool_radius_min, source.springs.pool_radius_max) * scale * 0.42;
        this.addWaterPool(source, position.x - half, this.heightAt(heightMap, position) + 0.08, position.z - half, poolRadius);
        this.stats.springs++;
      }
    }

    if (source.placements.sulfur_shard_field.enabled) {
      const shardRng = mulberry32(seed ^ 0x51a4e3d1);
      const count = Math.round(avg(source.shards.cluster_count_min, source.shards.cluster_count_max));
      for (let i = 0; i < count; i++) {
        const angle = shardRng() * Math.PI * 2;
        const radius = shape.floorRadius * (0.14 + shardRng() * 0.7);
        const position = this.worldToGrid(Math.cos(angle) * radius, Math.sin(angle) * radius, half, scale, size);
        if (!position) continue;
        const height = avg(source.shards.shard_height_min, source.shards.shard_height_max) * 0.33;
        const base = avg(source.shards.primary_base_radius_min, source.shards.primary_base_radius_max) * 0.8;
        this.addShard(source, position.x - half, this.heightAt(heightMap, position), position.z - half, base, height);
        const subCount = Math.round(avg(source.shards.sub_shard_count_min, source.shards.sub_shard_count_max));
        for (let s = 0; s < subCount; s++) {
          const sa = shardRng() * Math.PI * 2;
          const sd = avg(source.shards.sub_shard_distance_min, source.shards.sub_shard_distance_max) * scale;
          const sx = Math.round(position.x + Math.cos(sa) * sd);
          const sz = Math.round(position.z + Math.sin(sa) * sd);
          if (!insideGrid(sx, sz, size)) continue;
          this.addShard(source, sx - half, this.heightAt(heightMap, { x: sx, z: sz }), sz - half, 0.55, height * 0.56);
        }
        this.stats.shards++;
      }
    }
  }

  addBlockFeature(blockId, x, y, z, width, height) {
    const material = new THREE.MeshStandardMaterial({ color: colorForBlock(blockId), roughness: 0.85 });
    const mesh = new THREE.Mesh(this.cube, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(width, height, width);
    this.group.add(mesh);
  }

  addWaterPool(source, x, y, z, radius) {
    const geometry = new THREE.CylinderGeometry(radius, radius, 0.16, 24);
    const material = new THREE.MeshStandardMaterial({
      color: colorForBlock(source.blocks.water),
      transparent: true,
      opacity: 0.72,
      roughness: 0.35,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.group.add(mesh);
  }

  addShard(source, x, y, z, radius, height) {
    const geometry = new THREE.ConeGeometry(radius, height, 4);
    const material = new THREE.MeshStandardMaterial({
      color: colorForBlock(source.blocks.crystal),
      roughness: 0.58,
      emissive: new THREE.Color(colorForBlock(source.blocks.crystal)).multiplyScalar(0.12),
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + height / 2, z);
    mesh.rotation.y = Math.PI / 4;
    this.group.add(mesh);
  }

  worldToGrid(wx, wz, half, scale, size) {
    const x = Math.round(wx * scale + half);
    const z = Math.round(wz * scale + half);
    if (!insideGrid(x, z, size)) return null;
    return { x, z };
  }

  heightAt(heightMap, position) {
    return heightMap.get(`${position.x},${position.z}`) ?? 1;
  }
}

class CanvasPreview {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("aria-label", "Fallback biome preview");
    this.ctx = this.canvas.getContext("2d");
    this.container.append(this.canvas);
    new ResizeObserver(() => this.resize()).observe(this.container);
    this.resize();
    els.previewLoading.classList.add("is-hidden");
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    this.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (this.lastState) this.generate(this.lastState);
  }

  generate(source) {
    this.lastState = clone(source);
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const ctx = this.ctx;
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#17201e");
    gradient.addColorStop(1, "#0e1211");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const size = clamp(Math.round(source.preview.size), 24, 96);
    const outer = avg(source.basin.outer_radius_min, source.basin.outer_radius_max);
    const apron = avg(source.basin.apron_width_min, source.basin.apron_width_max);
    const ramp = avg(source.basin.ramp_width_min, source.basin.ramp_width_max);
    const floorRadius = Math.max(source.basin.floor_radius_min, outer - apron - ramp - 2);
    const effectRadius = outer + source.basin.outside_bevel_width;
    const scale = size / Math.max(20, effectRadius * 2.1);
    const seed = Number(source.preview.seed) || 1;
    const tile = Math.min(width / (size * 0.92), height / (size * 0.56)) * 0.92;
    const originX = width / 2;
    const originY = height * 0.18;
    const half = size / 2;
    const heightMap = new Map();
    let blockCount = 0;

    for (let sum = 0; sum <= (size - 1) * 2; sum++) {
      for (let ix = 0; ix < size; ix++) {
        const iz = sum - ix;
        if (iz < 0 || iz >= size) continue;
        const wx = (ix - half) / scale;
        const wz = (iz - half) / scale;
        const zone = zoneAt(source, wx, wz, { outer, floorRadius, ramp, effectRadius, seed });
        const terrain = terrainHeight(source, wx, wz, zone, { outer, floorRadius, ramp, effectRadius, seed });
        heightMap.set(`${ix},${iz}`, terrain);
        const blockId = chooseSurfaceBlock(source, wx, wz, terrain, zone, seed);
        const sx = originX + (ix - iz) * tile * 0.5;
        const sy = originY + (ix + iz) * tile * 0.25 - terrain * source.preview.verticalScale * tile * 0.12;
        drawDiamond(ctx, sx, sy, tile, shade(colorForBlock(blockId), Math.round((terrain - 10) * 2)));
        blockCount++;
      }
    }

    const rng = mulberry32(seed ^ 0x510e527f);
    const ventCount = source.placements.sulfur_vent_field.enabled ? Math.round(avg(source.ventField.cluster_count_min, source.ventField.cluster_count_max)) : 0;
    for (let i = 0; i < ventCount; i++) {
      const angle = rng() * Math.PI * 2;
      const radius = floorRadius * (0.12 + Math.sqrt(rng()) * 0.48);
      const point = projectWorld(Math.cos(angle) * radius, Math.sin(angle) * radius, half, scale, size, tile, originX, originY, heightMap, source);
      if (!point) continue;
      drawDiamond(ctx, point.x, point.y - tile * 0.45, tile * 0.78, colorForBlock(source.blocks.vent));
      ctx.fillStyle = colorForBlock(source.blocks.deposit);
      ctx.fillRect(point.x - tile * 0.18, point.y - tile * 0.95, tile * 0.36, tile * 0.36);
    }

    const springCount = source.placements.sulfur_spring.enabled
      ? clamp(Math.round((avg(source.springs.spring_count_min, source.springs.spring_count_max) * source.springs.spring_density_multiplier) / 10), 1, 18)
      : 0;
    const springRng = mulberry32(seed ^ 0x2b992ddf);
    for (let i = 0; i < springCount; i++) {
      const angle = springRng() * Math.PI * 2;
      const radius = floorRadius * (0.18 + springRng() * 0.72);
      const point = projectWorld(Math.cos(angle) * radius, Math.sin(angle) * radius, half, scale, size, tile, originX, originY, heightMap, source);
      if (!point) continue;
      ctx.fillStyle = `${colorForBlock(source.blocks.water)}cc`;
      ctx.beginPath();
      ctx.ellipse(point.x, point.y - tile * 0.18, tile * 1.25, tile * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const shardCount = source.placements.sulfur_shard_field.enabled ? Math.round(avg(source.shards.cluster_count_min, source.shards.cluster_count_max)) : 0;
    const shardRng = mulberry32(seed ^ 0x51a4e3d1);
    for (let i = 0; i < shardCount; i++) {
      const angle = shardRng() * Math.PI * 2;
      const radius = floorRadius * (0.14 + shardRng() * 0.7);
      const point = projectWorld(Math.cos(angle) * radius, Math.sin(angle) * radius, half, scale, size, tile, originX, originY, heightMap, source);
      if (!point) continue;
      ctx.fillStyle = colorForBlock(source.blocks.crystal);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - tile * 2.4);
      ctx.lineTo(point.x + tile * 0.45, point.y - tile * 0.2);
      ctx.lineTo(point.x - tile * 0.45, point.y - tile * 0.2);
      ctx.closePath();
      ctx.fill();
    }

    els.previewStats.textContent = `${blockCount} ${t("blocks")} / ${ventCount} ${t("vents")} / ${springCount} ${t("springs")} / ${shardCount} ${t("shards")}`;
  }
}

function terrainHeight(source, x, z, zone, shape) {
  const base = 18 + smoothNoiseSigned(shape.seed ^ 0x6a09e667, x, z, 15) * 2.2;
  const floorDrop = avg(source.basin.floor_offset_min, source.basin.floor_offset_max) * 0.46;
  const floorY = Math.max(3, base - floorDrop);
  const distance = shapedDistance(source, x, z, shape.seed);
  if (zone === "outside") return Math.max(4, base);
  if (zone === "apron") {
    const progress = 1 - clamp((distance - shape.outer) / Math.max(1, source.basin.outside_bevel_width + avg(source.basin.apron_width_min, source.basin.apron_width_max)), 0, 1);
    return Math.max(3, base - progress * 2.4);
  }
  if (zone === "wall") {
    const progress = clamp((distance - shape.floorRadius) / Math.max(1, shape.ramp), 0, 1);
    const eased = smoothstep(progress);
    return Math.max(3, lerp(floorY, base - 1, eased));
  }
  const undulation =
    smoothNoiseSigned(shape.seed ^ 0xbb67ae85, x, z, source.basin.floor_undulation_scale) * 0.58 +
    smoothNoiseSigned(shape.seed ^ 0x7f4a7c15, x, z, source.basin.floor_undulation_detail_scale) * 0.24;
  const tier = tierDrop(source, x, z, shape);
  const pocket = zone === "floor" ? pocketDrop(source, x, z, shape) : 0;
  const scarDrop = zone === "scar" ? smoothNoise01(shape.seed ^ 0xa54ff53a, x, z, 8) * 1.5 : 0;
  return Math.max(2, floorY + undulation - tier - pocket - scarDrop);
}

function chooseSurfaceBlock(source, x, z, y, zone, seed) {
  const coverageNoise = smoothNoise01(seed ^ 0x27d4eb2f, x, z, 36);
  if (coverageNoise > source.preview.biomeCoverage && zone !== "vent_field") {
    return source.blocks.base;
  }
  const sulfurNoise = smoothNoise01(seed ^ 0x6c8e9cf5, x, z, 6) * 0.72 + smoothNoise01(seed ^ 0x6c8e9cf6, x + 19, z - 11, 3) * 0.28;
  const gravelNoise = smoothNoise01(seed ^ 0x5be0cd19, x, z, 5) * 0.68 + smoothNoise01(seed ^ 0x5be0cd1a, x - 13, z + 17, 3) * 0.32;
  const calciteNoise = smoothNoise01(seed ^ 0x1f83d9ab, x, z, 9) * 0.8 + smoothNoise01(seed ^ 0x1f83d9ac, x + 7, z + 29, 4) * 0.2;
  const wallNoise = smoothNoise01(seed ^ 0xcbbb9d5d, x, z, 7) * 0.76 + smoothNoise01(seed ^ 0xcbbb9d5e, x - 17, z + 5, 3) * 0.24;

  if (zone === "scar") {
    if (sulfurNoise > source.materials.scar_sulfur_threshold) return source.blocks.sulfur;
    return gravelNoise > source.materials.scar_gravel_threshold ? source.blocks.gravel : source.blocks.base;
  }
  if (zone === "vent_field" || zone === "floor") {
    const sulfurThreshold = zone === "vent_field" ? source.materials.vent_field_sulfur_threshold : source.materials.floor_sulfur_threshold;
    const calciteThreshold = zone === "vent_field" ? source.materials.vent_field_calcite_threshold : source.materials.floor_calcite_threshold;
    if (sulfurNoise > sulfurThreshold) return source.blocks.sulfur;
    if (calciteNoise > calciteThreshold) return source.blocks.calcite;
    if (gravelNoise > source.materials.floor_gravel_threshold) return source.blocks.gravel;
    return source.blocks.base;
  }
  if (zone === "wall") {
    if (wallNoise > 0.88 || calciteNoise > source.materials.wall_calcite_threshold) return source.blocks.calcite;
    return source.blocks.base;
  }
  if (zone === "apron") {
    if (sulfurNoise > source.materials.apron_sulfur_threshold) return source.blocks.sulfur;
    if (calciteNoise > source.materials.apron_calcite_threshold) return source.blocks.calcite;
    if (gravelNoise > source.materials.apron_gravel_threshold) return source.blocks.gravel;
  }
  return source.blocks.base;
}

function zoneAt(source, x, z, shape) {
  const distance = shapedDistance(source, x, z, shape.seed);
  if (distance > shape.effectRadius) return "outside";
  if (distance > shape.outer) return "apron";
  if (distance > shape.floorRadius + shape.ramp) return "apron";
  if (distance > shape.floorRadius) return "wall";
  const scarRadius = Math.max(3, shape.floorRadius - 1.5);
  const ventFieldRadius = Math.max(3, shape.floorRadius - 1);
  if (distance <= scarRadius && smoothNoise01(shape.seed ^ 0xa54ff53a, x, z, 4) > 0.64 && smoothNoise01(shape.seed ^ 0x9e3779b9, x, z, 7) > 0.36) {
    return "scar";
  }
  if (distance <= ventFieldRadius) return "vent_field";
  return "floor";
}

function shapedDistance(source, x, z, seed) {
  const orientation = smoothNoise01(seed ^ 0x9e3779b9, 0, 0, 1) * Math.PI * 2;
  const cos = Math.cos(orientation);
  const sin = Math.sin(orientation);
  const localX = x * cos - z * sin;
  const localZ = x * sin + z * cos;
  const longAxis = source.basin.shape_long_axis_base + smoothNoise01(seed ^ 0xd1b54a32, 0, 0, 1) * source.basin.shape_long_axis_range;
  const shortAxis = source.basin.shape_short_axis_base + smoothNoise01(seed ^ 0x94d049bb, 0, 0, 1) * source.basin.shape_short_axis_range;
  const floorRadius = Math.max(1, source.basin.floor_radius_min);
  const lobeOffset = floorRadius * (source.basin.shape_lobe_offset_base + smoothNoise01(seed ^ 0x2545f491, 0, 0, 1) * source.basin.shape_lobe_offset_range);
  const bend = smoothNoiseSigned(seed ^ 0x632be59b, x + 19, z - 27, 36) * Math.max(1.4, floorRadius * 0.22);
  const front = ellipseDistance(localX - lobeOffset + bend, localZ + bend * 0.44, longAxis * 1.06, shortAxis * 0.88);
  const middle = ellipseDistance(localX + bend * 0.52, localZ - bend * 0.32, longAxis * 0.84, shortAxis * 1.18);
  const back = ellipseDistance(localX + lobeOffset * 0.9 - bend * 0.62, localZ - bend * 0.34, longAxis * 1.1, shortAxis * 0.82);
  const merged = smoothMin(smoothMin(front, middle, 1.35), back, 1.35);
  const detail = 1 + smoothNoiseSigned(seed ^ 0x5deece66, x, z, 34) * 0.055;
  return merged / clamp(detail, 0.8, 1.24);
}

function tierDrop(source, x, z, shape) {
  const distance = shapedDistance(source, x, z, shape.seed);
  const centerBias = 1 - clamp(distance / Math.max(1, shape.floorRadius), 0, 1);
  const broad = smoothNoise01(shape.seed ^ 0xc2b2ae3d, x, z, source.basin.floor_tier_broad_scale);
  const detail = smoothNoise01(shape.seed ^ 0xc2b2ae3e, x - 9, z + 15, source.basin.floor_tier_detail_scale);
  const value = broad * 0.62 + detail * 0.28 + centerBias * 0.1;
  if (value > source.basin.floor_tier_abyss_threshold) return 3;
  if (value > source.basin.floor_tier_deep_threshold) return 2;
  if (value > source.basin.floor_tier_mid_threshold) return 1;
  return 0;
}

function pocketDrop(source, x, z, shape) {
  const distance = shapedDistance(source, x, z, shape.seed);
  const rimStart = shape.floorRadius - source.basin.floor_pocket_edge_margin;
  if (distance > shape.floorRadius) return 0;
  let rimFade = 1;
  if (distance > rimStart) {
    rimFade = smoothstep(1 - (distance - rimStart) / Math.max(1, source.basin.floor_pocket_edge_margin));
  }
  const broad = smoothNoise01(shape.seed ^ 0x6c8e9cf5, x, z, source.basin.floor_pocket_broad_scale);
  const medium = smoothNoise01(shape.seed ^ 0x6c8e9cf6, x + 19, z - 13, source.basin.floor_pocket_medium_scale);
  const detail = smoothNoise01(shape.seed ^ 0x6c8e9cf7, x - 11, z + 17, source.basin.floor_pocket_detail_scale);
  const field = broad * 0.54 + medium * 0.3 + detail * 0.16;
  const pocket = (field - source.basin.floor_pocket_threshold) / (1 - source.basin.floor_pocket_threshold);
  return pocket <= 0 ? 0 : smoothstep(Math.min(1, pocket)) * rimFade * source.basin.floor_pocket_depth;
}

function blockCatalog() {
  const keyed = new Map();
  for (const blockInfo of BLOCKS) keyed.set(blockInfo.id, blockInfo);
  for (const blockInfo of loadedResourceBlocks.values()) keyed.set(blockInfo.id, blockInfo);
  for (const blockInfo of state.customBlocks || []) keyed.set(blockInfo.id, blockInfo);
  return [...keyed.values()];
}

function findBlock(id) {
  return blockCatalog().find((blockInfo) => blockInfo.id === id) || {
    id,
    name: { en: id, ja: id },
    tab: "custom",
    color: "#777777",
  };
}

function blockName(blockInfo) {
  return blockInfo.name[language] || blockInfo.name.en || blockInfo.id;
}

function colorForBlock(id) {
  const blockInfo = findBlock(id);
  return textureForBlock(blockInfo)?.color || blockInfo.color || "#777777";
}

function paintSwatch(node, blockInfo) {
  const texture = textureForBlock(blockInfo);
  node.style.backgroundColor = texture?.color || blockInfo.color || "#777777";
  node.style.backgroundImage = texture?.dataUrl || texture?.url || blockInfo.texture
    ? `url("${texture?.dataUrl || texture?.url || blockInfo.texture}")`
    : pixelBackground(blockInfo.color || "#777777");
}

function textureForBlock(blockInfo) {
  const preferred = TEXTURE_PREFERENCES[blockInfo.id] || [];
  const keys = [blockInfo.textureKey, ...preferred, blockInfo.id].filter(Boolean);
  for (const key of keys) {
    if (textureOverrides.has(key)) {
      return textureOverrides.get(key);
    }
  }
  return blockInfo.texture ? { url: blockInfo.texture, color: blockInfo.color } : null;
}

function pixelBackground(colorValue) {
  const lighter = shade(colorValue, 24);
  const darker = shade(colorValue, -22);
  return `linear-gradient(135deg, ${lighter} 0 25%, transparent 25% 75%, ${darker} 75%),
    linear-gradient(135deg, transparent 0 25%, rgba(0,0,0,.22) 25% 50%, transparent 50% 100%)`;
}

function range(path, ja, en, min, max, step) {
  return { type: "range", path, label: { ja, en }, min, max, step };
}

function checkbox(path, ja, en) {
  return { type: "checkbox", path, label: { ja, en } };
}

function color(path, ja, en, optional = false) {
  return { type: "color", path, label: { ja, en }, optional };
}

function text(path, ja, en) {
  return { type: "text", path, label: { ja, en } };
}

function select(path, ja, en, options) {
  return { type: "select", path, label: { ja, en }, options };
}

function json(path, ja, en) {
  return { type: "json", path, label: { ja, en } };
}

function block(path, ja, en) {
  return { type: "block", path, label: { ja, en } };
}

function t(key) {
  return I18N[language][key] || I18N.en[key] || key;
}

function local(value) {
  if (typeof value === "string") return value;
  return value[language] || value.en || value.ja || "";
}

function getByPath(target, path) {
  return path.split(".").reduce((cursor, key) => cursor?.[key], target);
}

function setByPath(target, path, value) {
  const keys = path.split(".");
  let cursor = target;
  keys.slice(0, -1).forEach((key) => {
    cursor[key] ??= {};
    cursor = cursor[key];
  });
  cursor[keys.at(-1)] = value;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDeep(base, patch) {
  if (!patch || typeof patch !== "object") return base;
  for (const [key, value] of Object.entries(patch)) {
    if (Array.isArray(value)) {
      base[key] = value;
    } else if (value && typeof value === "object") {
      base[key] = mergeDeep(base[key] && typeof base[key] === "object" ? base[key] : {}, value);
    } else {
      base[key] = value;
    }
  }
  return base;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function avg(a, b) {
  return (Number(a) + Number(b)) / 2;
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

function smoothMin(a, b, k) {
  const h = clamp(0.5 + (0.5 * (b - a)) / k, 0, 1);
  return lerp(b, a, h) - k * h * (1 - h);
}

function ellipseDistance(x, z, axisX, axisZ) {
  const nx = x / axisX;
  const nz = z / axisZ;
  return Math.sqrt(nx * nx + nz * nz);
}

function smoothNoise01(seed, x, z, scale = 1) {
  if (scale <= 1) return noise01(seed, Math.floor(x), Math.floor(z));
  const sx = x / scale;
  const sz = z / scale;
  const cellX = Math.floor(sx);
  const cellZ = Math.floor(sz);
  const localX = sx - cellX;
  const localZ = sz - cellZ;
  const easedX = smoothstep(localX);
  const easedZ = smoothstep(localZ);
  const nw = noise01(seed, cellX, cellZ);
  const ne = noise01(seed, cellX + 1, cellZ);
  const sw = noise01(seed, cellX, cellZ + 1);
  const se = noise01(seed, cellX + 1, cellZ + 1);
  return lerp(lerp(nw, ne, easedX), lerp(sw, se, easedX), easedZ);
}

function smoothNoiseSigned(seed, x, z, scale = 1) {
  return smoothNoise01(seed, x, z, scale) * 2 - 1;
}

function noise01(seed, x, z) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(z | 0, 668265263) ^ (seed | 0);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let tValue = value;
    tValue = Math.imul(tValue ^ (tValue >>> 15), tValue | 1);
    tValue ^= tValue + Math.imul(tValue ^ (tValue >>> 7), tValue | 61);
    return ((tValue ^ (tValue >>> 14)) >>> 0) / 4294967296;
  };
}

function insideGrid(x, z, size) {
  return x >= 0 && z >= 0 && x < size && z < size;
}

function drawDiamond(ctx, x, y, tile, colorValue) {
  ctx.fillStyle = colorValue;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + tile * 0.5, y + tile * 0.25);
  ctx.lineTo(x, y + tile * 0.5);
  ctx.lineTo(x - tile * 0.5, y + tile * 0.25);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function projectWorld(wx, wz, half, scale, size, tile, originX, originY, heightMap, source) {
  const ix = Math.round(wx * scale + half);
  const iz = Math.round(wz * scale + half);
  if (!insideGrid(ix, iz, size)) return null;
  const terrain = heightMap.get(`${ix},${iz}`) || 1;
  return {
    x: originX + (ix - iz) * tile * 0.5,
    y: originY + (ix + iz) * tile * 0.25 - terrain * source.preview.verticalScale * tile * 0.12,
  };
}

function shade(hex, amount) {
  const clean = hex.replace("#", "");
  const num = Number.parseInt(clean, 16);
  const r = clamp((num >> 16) + amount, 0, 255);
  const g = clamp(((num >> 8) & 0xff) + amount, 0, 255);
  const b = clamp((num & 0xff) + amount, 0, 255);
  return rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => clamp(value, 0, 255).toString(16).padStart(2, "0")).join("")}`;
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return Promise.resolve();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[char]);
}

function flashButton(button, message, restore) {
  button.textContent = message;
  window.setTimeout(() => {
    button.textContent = restore;
  }, 1200);
}
