export class AchievementSystem {
    constructor(savedStats = null) {
        this.stats = savedStats || { ratsKilled: 0, goldEarned: 0, deaths: 0 };
        this.unlocked = [];
    }

    trackKill(enemyId) {
        if (enemyId === 'rat') this.stats.ratsKilled++;
        this.checkUnlocks();
    }

    trackGold(amount) {
        this.stats.goldEarned += amount;
        this.checkUnlocks();
    }

    checkUnlocks() {
        if (this.stats.ratsKilled >= 100 && !this.unlocked.includes('rat_slayer')) {
            this.unlocked.push('rat_slayer');
            console.log("🌟 ACHIEVEMENT UNLOCKED: 100 Tikus (Rat Slayer)!");
        }
        if (this.stats.goldEarned >= 10000 && !this.unlocked.includes('rich')) {
            this.unlocked.push('rich');
            console.log("🌟 ACHIEVEMENT UNLOCKED: Rich (Sultan Kota)!");
        }
    }
}