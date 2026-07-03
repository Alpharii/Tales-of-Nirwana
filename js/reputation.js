export class ReputationSystem {
    constructor(data = {}) {
        this.factions = {
            guild: data.guild || 0,
            church: data.church || 0,
            kingdom: data.kingdom || 0,
            bandit: data.bandit || -50 // Default musuhan sama bandit
        };
    }

    changeRep(faction, amount) {
        if (this.factions[faction] !== undefined) {
            this.factions[faction] += amount;
            // Batasi mentok di -100 (Hated) sampai 100 (Revered)
            if (this.factions[faction] > 100) this.factions[faction] = 100;
            if (this.factions[faction] < -100) this.factions[faction] = -100;
            console.log(`[Reputation] ${faction} berubah menjadi ${this.factions[faction]}`);
        }
    }

    getRep(faction) {
        return this.factions[faction] || 0;
    }
}