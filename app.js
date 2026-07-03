import { UI } from './js/ui.js';
import { SaveManager } from './js/save.js';
import { Player } from './js/player.js';
import { Inventory } from './js/inventory.js';
import { Shop } from './js/shop.js';
import { StoryEngine } from './js/story.js';

// INTEGRASI PART 6 - 30
import { BattleEngine } from './js/battle.js';
import { SkillSystem } from './js/skills.js';
import { MapSystem } from './js/map.js';
import { DungeonEngine } from './js/dungeon.js';
import { AchievementSystem } from './js/achievement.js';
import { AudioSystem } from './js/audio.js';
import { GameOverSystem } from './js/gameover.js';
import { PartySystem } from './js/party.js';

let player, inventory, story, shop;
let skillSystem, mapSystem, dungeon, achievement, party;

function initGame(saveData = null) {
    if (saveData) {
        player = new Player(saveData.player);
        inventory = new Inventory(saveData.inventory);
        story = new StoryEngine(player, updateCoreUI, { inventory });
        story.day = saveData.day || 1;
        story.currentNode = saveData.currentNode || "start";
        
        skillSystem = new SkillSystem(saveData.playerClass || 'Knight');
        skillSystem.unlockedSkills = saveData.unlockedSkills || [];
        achievement = new AchievementSystem(saveData.stats);
        party = new PartySystem();
        party.members = saveData.partyMembers || [];
    } else {
        player = new Player();
        player.mp = 50;
        player.maxMp = 50;
        
        inventory = new Inventory();
        story = new StoryEngine(player, updateCoreUI, { inventory });
        
        skillSystem = new SkillSystem('Knight'); 
        achievement = new AchievementSystem();
        party = new PartySystem();
    }
    
    mapSystem = new MapSystem(player, updateCoreUI);
    shop = new Shop();
    
    AudioSystem.playBGM('town_theme');
    UI.switchScreen('game-screen');
    updateCoreUI();
    
    skillSystem.checkUnlocks(player.level);
    story.loadNode(story.currentNode);
}

function updateCoreUI() {
    UI.updateStatus(player, story.day);
}

// Handler Pemicu Sistem Utama (Mencegah Circular Crash)
window.addEventListener('game-action', (e) => {
    const { type, id } = e.detail;
    if (type === 'battle') startBattle(id);
    if (type === 'dungeon') enterDungeon(id);
    if (type === 'shop') openMerchantShop();
});

function startBattle(enemyId) {
    AudioSystem.playBGM('battle_theme');
    
    const battle = new BattleEngine(
        player, 
        enemyId, 
        (expGained, goldGained) => {
            player.gainExp(expGained);
            player.gold += goldGained;
            achievement.trackKill(enemyId);
            achievement.trackGold(goldGained);
            skillSystem.checkUnlocks(player.level);
            
            alert(`Kemenangan! Mendapat ${expGained} EXP dan ${goldGained} Gold.`);
            AudioSystem.playBGM('town_theme');
            UI.switchScreen('game-screen');
            story.loadNode("start");
        },
        () => {
            GameOverSystem.trigger(achievement.stats);
        },
        (logText) => {
            document.getElementById('story-text').innerText += `\n\n${logText}`;
        }
    );

    const container = document.getElementById('story-choices');
    container.innerHTML = '';
    
    const btnAttack = document.createElement('button');
    btnAttack.innerText = "⚔️ Attack";
    btnAttack.onclick = () => battle.playerAttack();
    container.appendChild(btnAttack);

    skillSystem.unlockedSkills.forEach(skillId => {
        const btnSkill = document.createElement('button');
        btnSkill.innerText = `✨ Cast Skill (ID: ${skillId})`;
        btnSkill.onclick = () => battle.playerSkill(skillId, skillSystem);
        container.appendChild(btnSkill);
    });
}

function enterDungeon(dungeonId) {
    AudioSystem.playBGM('dungeon_theme');
    
    dungeon = new DungeonEngine(
        dungeonId,
        (monsterId) => { startBattle(monsterId); },
        () => { player.gold += 100; alert("Mendapat 100 Gold dari peti!"); },
        (bossId) => { startBattle(bossId); }
    );

    const container = document.getElementById('story-choices');
    container.innerHTML = '<h3>Dungeon Exploration</h3>';
    
    const directions = [
        { name: '⬆️ Up', x: 0, y: -1 },
        { name: '⬅️ Left', x: -1, y: 0 },
        { name: '➡️ Right', x: 1, y: 0 },
        { name: '⬇️ Down', x: 0, y: 1 }
    ];

    directions.forEach(dir => {
        const btn = document.createElement('button');
        btn.innerText = dir.name;
        btn.onclick = () => {
            dungeon.move(dir.x, dir.y);
            document.getElementById('story-text').innerText = `Kamu berada di Dungeon. Koordinat: X:${dungeon.playerPos.x}, Y:${dungeon.playerPos.y}`;
        };
        container.appendChild(btn);
    });

    const btnLeave = document.createElement('button');
    btnLeave.innerText = "🏃 Keluar Dungeon";
    btnLeave.style.background = "#8b0000";
    btnLeave.onclick = () => {
        AudioSystem.playBGM('town_theme');
        UI.switchScreen('game-screen');
        story.loadNode("start");
    };
    container.appendChild(btnLeave);
}

function openMerchantShop() {
    UI.switchScreen('shop-screen');
    if (shop) {
        shop.render(document.getElementById('shop-list'), player, inventory, updateCoreUI);
    }
}

// Event Menu Listeners
document.getElementById('btn-new-game').onclick = () => initGame();

document.getElementById('btn-continue').onclick = () => {
    const data = SaveManager.loadGame();
    if (data) initGame(data);
    else alert("Tidak ada save data!");
};

document.getElementById('btn-delete-save').onclick = () => SaveManager.deleteSave();

document.getElementById('btn-save').onclick = () => {
    SaveManager.saveGame({
        player: player,
        inventory: inventory,
        day: story.day,
        currentNode: story.currentNode,
        playerClass: skillSystem.playerClass,
        unlockedSkills: skillSystem.unlockedSkills,
        stats: achievement.stats,
        partyMembers: party.members
    });
};

document.getElementById('btn-to-menu').onclick = () => {
    AudioSystem.playBGM('menu_theme');
    UI.switchScreen('menu-screen');
};

document.getElementById('btn-open-inv').onclick = () => {
    UI.switchScreen('inv-screen');
    inventory.render(document.getElementById('inv-list'), player, updateCoreUI);
};

document.getElementById('btn-close-inv').onclick = () => UI.switchScreen('game-screen');
document.getElementById('btn-close-shop').onclick = () => UI.switchScreen('game-screen');