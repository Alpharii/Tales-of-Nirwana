import { dungeonData } from '../data/dungeons.js';

export class DungeonEngine {
    constructor(dungeonId, onEncounter, onLoot, onBoss) {
        this.data = JSON.parse(JSON.stringify(dungeonData[dungeonId])); // Deep copy biar bisa diubah
        this.playerPos = { x: this.data.startX, y: this.data.startY };
        
        // Buat Fog of War (false = belum terjelajahi)
        this.fog = Array.from({ length: this.data.height }, () => Array(this.data.width).fill(false));
        this.revealFog(this.playerPos.x, this.playerPos.y);

        this.onEncounter = onEncounter; // Callback kalau ketemu monster
        this.onLoot = onLoot;           // Callback kalau nemu harta
        this.onBoss = onBoss;           // Callback kalau ketemu boss
    }

    revealFog(x, y) {
        if (x >= 0 && x < this.data.width && y >= 0 && y < this.data.height) {
            this.fog[y][x] = true;
        }
    }

    move(dirX, dirY) {
        let targetX = this.playerPos.x + dirX;
        let targetY = this.playerPos.y + dirY;

        // Cek mentok tembok atau luar map
        if (targetX < 0 || targetX >= this.data.width || targetY < 0 || targetY >= this.data.height) {
            console.log("Mentok ujung dungeon!");
            return;
        }

        let tile = this.data.layout[targetY][targetX];
        if (tile === 0) {
            console.log("Itu tembok, nggak bisa lewat sana!");
            return;
        }

        // Pindah posisi
        this.playerPos.x = targetX;
        this.playerPos.y = targetY;
        this.revealFog(targetX, targetY);

        this.resolveTile(tile, targetX, targetY);
    }

    resolveTile(tile, x, y) {
        if (tile === 2) {
            console.log("Awas! Ada monster mengadang!");
            this.data.layout[y][x] = 1; // Ubah jadi jalan kosong setelah di-trigger
            let randomEnemy = this.data.enemies[Math.floor(Math.random() * this.data.enemies.length)];
            this.onEncounter(randomEnemy);
        } else if (tile === 3) {
            console.log("Nemuin harta karun!");
            this.data.layout[y][x] = 1; 
            this.onLoot();
        } else if (tile === 9) {
            console.log("Pintu Boss terbuka...");
            this.onBoss(this.data.boss);
        } else {
            console.log("Lorong kosong.");
        }
    }
}