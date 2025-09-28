// Datos de sonidos con URLs locales (versión temporal para desarrollo)
const SOUNDS_DATA = [
  {
    "id": 1,
    "name": "Hornet GIT GUD",
    "url": "./audio/Hornet_GIT_GUD.mp3",
    "category": "hornet",
    "tags": ["hornet", "git", "gud", "boss"],
    "duration": null,
    "color": "#e74c3c"
  },
  {
    "id": 2,
    "name": "Hornet EDINO",
    "url": "./audio/Hornet_EDINO.mp3",
    "category": "hornet",
    "tags": ["hornet", "edino", "boss"],
    "duration": null,
    "color": "#9b59b6"
  },
  {
    "id": 3,
    "name": "Hornet SHAA",
    "url": "./audio/Hornet_SHAA.mp3",
    "category": "hornet",
    "tags": ["hornet", "shaa", "boss"],
    "duration": null,
    "color": "#f39c12"
  },
  {
    "id": 4,
    "name": "Hollow Knight - Bapanada",
    "url": "./audio/Hollow_Knight_Bapanada.mp3",
    "category": "otros",
    "tags": ["hollow", "knight", "bapanada"],
    "duration": null,
    "color": "#e67e22"
  },
  {
    "id": 5,
    "name": "Hornet shhaa hollow knight",
    "url": "./audio/Hornet_shhaa_hollow_knight.mp3",
    "category": "hornet",
    "tags": ["hornet", "shhaa", "hollow", "knight"],
    "duration": null,
    "color": "#16a085"
  },
  {
    "id": 6,
    "name": "WAH (hollow knight)",
    "url": "./audio/WAH_hollow_knight.mp3",
    "category": "otros",
    "tags": ["wah", "hollow", "knight"],
    "duration": null,
    "color": "#2980b9"
  },
  {
    "id": 7,
    "name": "grub hollow knight",
    "url": "./audio/grub_hollow_knight.mp3",
    "category": "grub",
    "tags": ["grub", "hollow", "knight"],
    "duration": null,
    "color": "#27ae60"
  },
  {
    "id": 8,
    "name": "GIT GUD hornet",
    "url": "./audio/GIT_GUD_hornet.mp3",
    "category": "hornet",
    "tags": ["git", "gud", "hornet"],
    "duration": null,
    "color": "#8e44ad"
  },
  {
    "id": 9,
    "name": "Hollow Knight Scream",
    "url": "./audio/Hollow_Knight_Scream.mp3",
    "category": "otros",
    "tags": ["hollow", "knight", "scream"],
    "duration": null,
    "color": "#16a085"
  },
  {
    "id": 10,
    "name": "baitola Hollow Knight Silksong",
    "url": "./audio/baitola_Hollow_Knight_Silksong.mp3",
    "category": "otros",
    "tags": ["baitola", "hollow", "knight", "silksong"],
    "duration": null,
    "color": "#f1c40f"
  },
  {
    "id": 11,
    "name": "Dung Defender Voice 4",
    "url": "./audio/Dung_Defender_Voice_4.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#16a085"
  },
  {
    "id": 12,
    "name": "Dung Defender Voice 8",
    "url": "./audio/Dung_Defender_Voice_8.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#3498db"
  },
  {
    "id": 13,
    "name": "Silksong Flea Howl 03 [raw]",
    "url": "./audio/Silksong_Flea_Howl_03_raw.mp3",
    "category": "otros",
    "tags": ["silksong", "flea", "howl"],
    "duration": null,
    "color": "#f1c40f"
  },
  {
    "id": 14,
    "name": "caterpillar",
    "url": "./audio/caterpillar.mp3",
    "category": "otros",
    "tags": ["caterpillar"],
    "duration": null,
    "color": "#e74c3c"
  },
  {
    "id": 15,
    "name": "Silksong Flea Howl 02 [raw]",
    "url": "./audio/Silksong_Flea_Howl_02_raw.mp3",
    "category": "otros",
    "tags": ["silksong", "flea", "howl"],
    "duration": null,
    "color": "#3498db"
  },
  {
    "id": 16,
    "name": "Dung Defender Voice 5",
    "url": "./audio/Dung_Defender_Voice_5.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#e74c3c"
  },
  {
    "id": 17,
    "name": "Grub Sound 1 Hollow Knight",
    "url": "./audio/Grub_Sound_1_Hollow_Knight.mp3",
    "category": "grub",
    "tags": ["grub", "sound", "hollow", "knight"],
    "duration": null,
    "color": "#34495e"
  },
  {
    "id": 18,
    "name": "Mantis lords be like",
    "url": "./audio/Mantis_lords_be_like.mp3",
    "category": "otros",
    "tags": ["mantis", "lords"],
    "duration": null,
    "color": "#e67e22"
  },
  {
    "id": 19,
    "name": "Hornet how you doing",
    "url": "./audio/Hornet_how_you_doing.mp3",
    "category": "hornet",
    "tags": ["hornet", "how", "doing"],
    "duration": null,
    "color": "#9b59b6"
  },
  {
    "id": 20,
    "name": "Dung Defender Voice 7",
    "url": "./audio/Dung_Defender_Voice_7.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#9b59b6"
  },
  {
    "id": 21,
    "name": "Dung Defender Voice 2",
    "url": "./audio/Dung_Defender_Voice_2.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#34495e"
  },
  {
    "id": 22,
    "name": "Dung Defender Voice 1",
    "url": "./audio/Dung_Defender_Voice_1.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#9b59b6"
  },
  {
    "id": 23,
    "name": "Hollow knight dead people",
    "url": "./audio/Hollow_knight_dead_people.mp3",
    "category": "otros",
    "tags": ["hollow", "knight", "dead", "people"],
    "duration": null,
    "color": "#8e44ad"
  },
  {
    "id": 24,
    "name": "Dung Defender Voice 6",
    "url": "./audio/Dung_Defender_Voice_6.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#2980b9"
  },
  {
    "id": 25,
    "name": "You're such a traitor I'm sad...",
    "url": "./audio/Youre_such_a_traitor_Im_sad.mp3",
    "category": "otros",
    "tags": ["traitor", "sad"],
    "duration": null,
    "color": "#c0392b"
  },
  {
    "id": 26,
    "name": "Emilia Oh",
    "url": "./audio/Emilia_Oh.mp3",
    "category": "otros",
    "tags": ["emilia", "oh"],
    "duration": null,
    "color": "#e67e22"
  },
  {
    "id": 27,
    "name": "(Hollow Knight) Fluke Noises",
    "url": "./audio/Hollow_Knight_Fluke_Noises.mp3",
    "category": "otros",
    "tags": ["hollow", "knight", "fluke", "noises"],
    "duration": null,
    "color": "#16a085"
  },
  {
    "id": 28,
    "name": "zote bera bera",
    "url": "./audio/zote_bera_bera.mp3",
    "category": "otros",
    "tags": ["zote", "bera"],
    "duration": null,
    "color": "#f39c12"
  },
  {
    "id": 29,
    "name": "BZZAHHHH (Hive Knight)",
    "url": "./audio/BZZAHHHH_Hive_Knight.mp3",
    "category": "otros",
    "tags": ["bzzahhhh", "hive", "knight"],
    "duration": null,
    "color": "#8e44ad"
  },
  {
    "id": 30,
    "name": "Grub Sound 2 Hollow Knight",
    "url": "./audio/Grub_Sound_2_Hollow_Knight.mp3",
    "category": "grub",
    "tags": ["grub", "sound", "hollow", "knight"],
    "duration": null,
    "color": "#e67e22"
  },
  {
    "id": 31,
    "name": "Ghost pitter-patter",
    "url": "./audio/Ghost_pitter_patter.mp3",
    "category": "otros",
    "tags": ["ghost", "pitter", "patter"],
    "duration": null,
    "color": "#8e44ad"
  },
  {
    "id": 32,
    "name": "ceiling dropper form hk",
    "url": "./audio/ceiling_dropper_form_hk.mp3",
    "category": "otros",
    "tags": ["ceiling", "dropper"],
    "duration": null,
    "color": "#95a5a6"
  },
  {
    "id": 33,
    "name": "Dung Defender Voice 3",
    "url": "./audio/Dung_Defender_Voice_3.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#8e44ad"
  },
  {
    "id": 34,
    "name": "Dung Defender Voice 9",
    "url": "./audio/Dung_Defender_Voice_9.mp3",
    "category": "dung_defender",
    "tags": ["dung", "defender", "voice"],
    "duration": null,
    "color": "#3498db"
  },
  {
    "id": 35,
    "name": "TEH! (Hollow Knight Grimm)",
    "url": "./audio/TEH_Hollow_Knight_Grimm.mp3",
    "category": "grimm",
    "tags": ["teh", "hollow", "knight", "grimm"],
    "duration": null,
    "color": "#27ae60"
  },
  {
    "id": 36,
    "name": "Salenmah. (Tiso Hollow Knight)",
    "url": "./audio/Salenmah_Tiso_Hollow_Knight.mp3",
    "category": "otros",
    "tags": ["salenmah", "tiso", "hollow", "knight"],
    "duration": null,
    "color": "#16a085"
  },
  {
    "id": 37,
    "name": "HOOSEH! (Hollow Knight Grimm)",
    "url": "./audio/HOOSEH_Hollow_Knight_Grimm.mp3",
    "category": "grimm",
    "tags": ["hooseh", "hollow", "knight", "grimm"],
    "duration": null,
    "color": "#2c3e50"
  },
  {
    "id": 38,
    "name": "Watafah (Hollow Knight Old Stag)",
    "url": "./audio/Watafah_Hollow_Knight_Old_Stag.mp3",
    "category": "otros",
    "tags": ["watafah", "hollow", "knight", "old", "stag"],
    "duration": null,
    "color": "#c0392b"
  },
  {
    "id": 39,
    "name": "ToastedMango-Yippee",
    "url": "./audio/ToastedMango_Yippee.mp3",
    "category": "otros",
    "tags": ["toastedmango", "yippee"],
    "duration": null,
    "color": "#e91e63"
  },
  {
    "id": 40,
    "name": "АГА, НА ЖУКОВ ДРОЧИШЬ!!!",
    "url": "./audio/АГА_НА_ЖУКОВ_ДРОЧИШЬ.mp3",
    "category": "otros",
    "tags": ["russian", "meme"],
    "duration": null,
    "color": "#8e44ad"
  },
  {
    "id": 41,
    "name": "trobbio",
    "url": "./audio/trobbio.mp3",
    "category": "otros",
    "tags": ["trobbio"],
    "duration": null,
    "color": "#f1c40f"
  },
  {
    "id": 42,
    "name": "trobbio 2",
    "url": "./audio/trobbio_2.mp3",
    "category": "otros",
    "tags": ["trobbio"],
    "duration": null,
    "color": "#8e44ad"
  },
  {
    "id": 43,
    "name": "Trobbioo 5",
    "url": "./audio/Trobbioo_5.mp3",
    "category": "otros",
    "tags": ["trobbioo"],
    "duration": null,
    "color": "#27ae60"
  },
  {
    "id": 44,
    "name": "trobbio 3",
    "url": "./audio/trobbio_3.mp3",
    "category": "otros",
    "tags": ["trobbio"],
    "duration": null,
    "color": "#f39c12"
  },
  {
    "id": 45,
    "name": "trobbio 4",
    "url": "./audio/trobbio_4.mp3",
    "category": "otros",
    "tags": ["trobbio"],
    "duration": null,
    "color": "#f1c40f"
  },
  {
    "id": 46,
    "name": "trobbio 5",
    "url": "./audio/trobbio_5.mp3",
    "category": "otros",
    "tags": ["trobbio"],
    "duration": null,
    "color": "#f4d03f"
  }
];

// Para uso con módulos ES6
export { SOUNDS_DATA };