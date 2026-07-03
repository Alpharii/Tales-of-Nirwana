import { Dice } from './dice.js';
import { AI } from './ai.js';
import { enemies } from '../data/enemies.js';
import { skillData } from '../data/skills.js';

export class BattleEngine {
    constructor(player, enemyId, onWin, onLose, logCallback) {
        this.player = player;
        this.enemy = { ...enemies[enemyId] }; // Copy data musuh
        this.onWin = onWin;
        this.onLose = onLose;
        this.log = logCallback; // Fungsi update text di UI
        this.turn = 1;
        this.isBattleOver = false;
        
        this.log(`Seekor ${this.enemy.name} muncul!`);
    }

    playerAttack() {
        if (this.isBattleOver) return;
        
        // Base acc player (misal 95) vs Evasion musuh
        if (Dice.rollHit(95, this.enemy.eva)) {
            let dmg = Math.max(1, 15 - this.enemy.def); // Anggap base atk player 15 sementara
            let isCrit = Dice.rollCrit(10); // 10% base crit
            if (isCrit) dmg *= 2;

            this.enemy.hp -= dmg;
            this.log(`Kamu menyerang! ${isCrit ? 'CRITICAL!' : ''} Menghasilkan ${dmg} damage.`);
        } else {
            this.log(`Seranganmu meleset!`);
        }

        this.checkState();
        if (!this.isBattleOver) this.enemyTurn();
    }

    playerSkill(skillId, skillSystem) {
        if (this.isBattleOver) return;
        
        let check = skillSystem.canUseSkill(skillId, this.player.mp);
        if (!check.ok) {
            this.log(check.msg);
            return; // Jangan buang turn kalau gagal
        }

        let skill = skillData[skillId];
        this.player.mp -= skill.mp;
        skillSystem.setCooldown(skillId);

        if (skill.type === 'attack' || skill.type === 'magic') {
            let dmg = Math.max(1, skill.power - this.enemy.def);
            this.enemy.hp -= dmg;
            this.log(`Kamu menggunakan ${skill.name}! Menghasilkan ${dmg} damage.`);
        } else if (skill.type === 'heal') {
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + skill.power);
            this.log(`Kamu menggunakan ${skill.name}! Memulihkan ${skill.power} HP.`);
        }

        this.checkState();
        if (!this.isBattleOver) {
            skillSystem.tickCooldowns();
            this.enemyTurn();
        }
    }

    enemyTurn() {
        this.log(`--- Giliran Musuh ---`);
        let aiDecision = AI.decideAction(this.enemy, this.player);
        this.log(aiDecision.msg);

        if (aiDecision.action === 'attack' || aiDecision.action === 'skill') {
            if (Dice.rollDodge(5)) { // Base dodge player 5%
                this.log(`Kamu berhasil menghindar!`);
            } else {
                let dmg = Math.max(1, aiDecision.power - 5); // Anggap def player 5
                this.player.hp -= dmg;
                this.log(`Kamu menerima ${dmg} damage!`);
            }
        }

        this.turn++;
        this.checkState();
    }

    checkState() {
        if (this.enemy.hp <= 0) {
            this.enemy.hp = 0;
            this.isBattleOver = true;
            this.log(`Menang! Kamu mengalahkan ${this.enemy.name}.`);
            this.onWin(this.enemy.exp, this.enemy.gold);
        } else if (this.player.hp <= 0) {
            this.player.hp = 0;
            this.isBattleOver = true;
            this.log(`Kamu mati...`);
            this.onLose();
        }
    }
}