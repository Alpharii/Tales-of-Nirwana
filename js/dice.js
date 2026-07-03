export const Dice = {
    roll(max) {
        return Math.floor(Math.random() * max) + 1;
    },
    // Menggunakan sistem D100 (Persentase)
    rollHit(accuracy, evasion) {
        let chance = accuracy - evasion;
        return this.roll(100) <= chance;
    },
    rollDodge(dodgeRate) {
        return this.roll(100) <= dodgeRate;
    },
    rollCrit(critRate) {
        return this.roll(100) <= critRate;
    }
};