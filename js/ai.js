export class AI {
    static decideAction(enemy, playerStats) {
        // AI Boss: ngamuk kalau HP di bawah 30%
        if (enemy.type === 'boss' && enemy.hp < (enemy.maxHp * 0.3)) {
            return { action: 'skill', name: 'Enrage Smash', power: enemy.atk * 2, msg: `${enemy.name} mengamuk dan membanting senjatanya!` };
        }
        
        // AI Bandit: curi gold (contoh mekanik unik)
        if (enemy.type === 'humanoid' && enemy.id === 'bandit' && Math.random() < 0.2) {
            return { action: 'steal', power: 0, msg: `${enemy.name} mencoba mencuri Gold-mu!` };
        }

        // Default Serangan Biasa
        return { action: 'attack', power: enemy.atk, msg: `${enemy.name} menyerang!` };
    }
}