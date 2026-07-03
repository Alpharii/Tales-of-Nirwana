import { storyNodes } from '../data/stories.js';
import { mainStory } from '../data/stories_quest.js';
import { randomEvents } from '../data/events.js';
import { UI } from './ui.js';

export class StoryEngine {
    constructor(player, updateUI, context) {
        this.player = player;
        this.updateUI = updateUI;
        this.context = context; 
        this.currentNode = "opening_1"; 
        this.day = 1;
        this.allNodes = { ...storyNodes, ...mainStory };
    }

    loadNode(nodeId) {
        if (this.player.checkDeath()) nodeId = "death";
        
        if (this.player.level === 3 && nodeId === "start" && this.currentNode !== "party_selection") {
            nodeId = "party_selection";
        } else if (this.player.level === 6 && nodeId === "start" && this.currentNode !== "goblin_cave_cutscene") {
            nodeId = "goblin_cave_cutscene";
        }

        this.currentNode = nodeId;
        const node = this.allNodes[nodeId];
        
        if (!node) {
            console.error(`Node cerita tidak ditemukan: ${nodeId}`);
            return;
        }

        const container = document.getElementById('story-choices');
        UI.renderStory(node.text, container);

        if (node.action === "random_event") {
            this.handleEvent(container);
            return;
        }
        
        if (node.action === "battle_rat") {
            window.dispatchEvent(new CustomEvent('game-action', { detail: { type: 'battle', id: 'rat' } }));
            return;
        }

        if (node.action === "enter_dungeon_goblin") {
            window.dispatchEvent(new CustomEvent('game-action', { detail: { type: 'dungeon', id: 'goblin_cave_1' } }));
            return;
        }

        if (node.choices) {
            node.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.innerText = choice.text;
                btn.onclick = () => this.handleChoice(choice);
                container.appendChild(btn);
            });
        }
    }

    handleChoice(choice) {
        if (choice.next) {
            this.loadNode(choice.next);
        } else if (choice.action === "open_shop") {
            window.dispatchEvent(new CustomEvent('game-action', { detail: { type: 'shop' } }));
        } else if (choice.action === "next_day") {
            this.day++;
            this.player.modifyHP(this.player.maxHp); 
            this.updateUI();
            alert("Hari berganti. HP pulih sepenuhnya.");
            this.loadNode("start");
        } else if (choice.action === "go_menu") {
            UI.switchScreen('menu-screen');
        } else if (choice.action === "decline_goblin") {
            alert("Kamu menolak quest. Reputasi Kingdom menurun!");
            this.loadNode("start");
        } else if (choice.action && choice.action.startsWith("recruit_")) {
            const hero = choice.action.replace("recruit_", "");
            alert(`Kamu berhasil merekrut ${hero.replace("_", " ").toUpperCase()}!`);
            this.loadNode("start");
        }
    }

    handleEvent(container) {
        const ev = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        document.getElementById('story-text').innerText += `\n\n${ev.text}`;
        
        if (ev.hp) this.player.modifyHP(ev.hp);
        if (ev.gold) this.player.gold += ev.gold;
        if (ev.exp) this.player.gainExp(ev.exp);
        
        this.updateUI();

        const btn = document.createElement('button');
        btn.innerText = "Lanjut";
        btn.onclick = () => this.loadNode(ev.next);
        container.appendChild(btn);
    }
}