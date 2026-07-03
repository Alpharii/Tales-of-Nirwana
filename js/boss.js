export class BossEngine {
    static processGreedyGoblin(boss, log) {
        // Cek Phase 2 (HP di bawah 50%)
        if (boss.hp < (boss.maxHp * 0.5) && !boss.isEnraged) {
            boss.isEnraged = true;
            boss.atk += 10;
            log("[CUTSCENE] Greedy Goblin meminum ramuan misterius! Ototnya membesar dan matanya memerah! (PHASE 2 - ENRAGE)");
            return { action: 'buff', power: 0, msg: "Pertahanan dan serangannya meningkat drastis!" };
        }

        if (boss.isEnraged && Math.random() < 0.4) {
            return { action: 'skill', power: boss.atk * 1.5, msg: "Greedy Goblin menggunakan [Desperate Cleave]!" };
        }

        return { action: 'attack', power: boss.atk, msg: "Greedy Goblin menyerang dengan koin beracun!" };
    }
}