export const mainStory = {
    // Part 23 - Opening
    opening_1: {
        text: "Kamu hanyalah seorang anak miskin di jalanan kumuh. Perutmu keroncongan, tapi kamu punya mimpi besar.",
        choices: [
            { text: "Cari makan di tong sampah", action: "random_event" },
            { text: "Pergi ke Guild Petualang", next: "opening_guild" }
        ]
    },
    opening_guild: {
        text: "Kamu masuk ke bangunan megah Guild. Resepsionis menatapmu dengan remeh. 'Mau daftar? Selesaikan Quest ini dulu!'",
        choices: [
            { text: "Ambil Quest Pertama (Bunuh 3 Tikus)", next: "quest_rats" }
        ]
    },
    quest_rats: {
        text: "Kamu pergi ke ruang bawah tanah Guild...",
        action: "battle_rat", // Nanti trigger Battle Engine
        next: "start" // Balik ke node start setelah menang
    },

    // Part 24 - Level 3 Party Selection (Triggered when player.level == 3)
    party_selection: {
        text: "Kariermu mulai menanjak! Saat santai di Tavern, ada tiga orang yang menawarimu kerjasama. Siapa yang akan kamu rekrut?",
        choices: [
            { text: "Ordinary Peasant (Tank andal, murah senyum)", action: "recruit_peasant" },
            { text: "Gugalanna (Banteng ngamuk, DPS sakit)", action: "recruit_gugalanna" },
            { text: "Qwetzal (Dewa burung nyasar, Healer)", action: "recruit_qwetzal" }
        ]
    },

    // Part 25 - Level 6 Goblin Cave Quest (Triggered when player.level == 6)
    goblin_cave_cutscene: {
        text: "[CUTSCENE] Kepala Desa berlari ke arahmu dengan panik. 'Desa kita diserang! Para Goblin menculik warga dan membawanya ke Goa!'",
        choices: [
            { text: "Terima Quest Khusus: Selamatkan Warga", next: "goblin_cave_enter" },
            { text: "Tolak (Reputasi Kingdom -10)", action: "decline_goblin" }
        ]
    },
    goblin_cave_enter: {
        text: "Kamu berdiri di depan Goa yang gelap dan berbau anyir...",
        action: "enter_dungeon_goblin" // Nanti trigger Dungeon Engine yang kemarin dibikin
    }
};