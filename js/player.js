export class Player {
    constructor(data = {}) {
        this.hp = data.hp || 100;
        this.maxHp = data.maxHp || 100;
        this.level = data.level || 1;
        this.exp = data.exp || 0;
        this.gold = data.gold || 50;
    }

    modifyHP(amount) {
        this.hp += amount;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
        return this.checkDeath();
    }

    gainExp(amount) {
        this.exp += amount;
        if (this.exp >= this.level * 50) {
            this.level++;
            this.exp = 0;
            this.maxHp += 10;
            this.hp = this.maxHp;
            alert(`Level Up! Kamu sekarang level ${this.level}`);
        }
    }

    checkDeath() {
        if (this.hp <= 0) {
            this.hp = 0;
            return true; // Mati
        }
        return false;
    }
}