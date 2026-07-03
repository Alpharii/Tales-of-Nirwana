import { skillData } from '../data/skills.js';

export class SkillSystem {
    constructor(playerClass) {
        this.playerClass = playerClass; // 'Knight', 'Mage', 'Priest'
        this.unlockedSkills = [];
        this.cooldowns = {}; // { skillId: turnsLeft }
    }

    checkUnlocks(currentLevel) {
        for (let key in skillData) {
            let skill = skillData[key];
            if (skill.classReq === this.playerClass && skill.reqLevel <= currentLevel && !this.unlockedSkills.includes(skill.id)) {
                this.unlockedSkills.push(skill.id);
                console.log(`[Skill Unlocked] ${skill.name}`);
            }
        }
    }

    canUseSkill(skillId, currentMp) {
        const skill = skillData[skillId];
        if (currentMp < skill.mp) return { ok: false, msg: 'MP tidak cukup!' };
        if (this.cooldowns[skillId] > 0) return { ok: false, msg: 'Skill masih Cooldown!' };
        return { ok: true, msg: '' };
    }

    setCooldown(skillId) {
        this.cooldowns[skillId] = skillData[skillId].cd;
    }

    tickCooldowns() {
        for (let id in this.cooldowns) {
            if (this.cooldowns[id] > 0) this.cooldowns[id]--;
        }
    }
}