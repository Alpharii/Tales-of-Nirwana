import { itemData } from '../data/items.js';

export class Inventory {
    constructor(data = {}) {
        this.items = data.items || [];
        this.equipped = data.equipped || { weapon: null, armor: null };
    }

    addItem(itemId) {
        this.items.push(itemId);
    }

    removeItem(itemId) {
        const index = this.items.indexOf(itemId);
        if (index > -1) this.items.splice(index, 1);
    }

    render(container, player, updateUI) {
        container.innerHTML = '';
        document.getElementById('eq-weapon').innerText = this.equipped.weapon ? itemData[this.equipped.weapon].name : "None";
        document.getElementById('eq-armor').innerText = this.equipped.armor ? itemData[this.equipped.armor].name : "None";

        this.items.forEach(id => {
            const item = itemData[id];
            const li = document.createElement('li');
            li.innerText = item.name;
            const btn = document.createElement('button');
            
            if (item.type === 'potion') {
                btn.innerText = "Use";
                btn.onclick = () => {
                    player.modifyHP(item.val);
                    this.removeItem(id);
                    updateUI();
                    this.render(container, player, updateUI);
                };
            } else {
                btn.innerText = "Equip";
                btn.onclick = () => {
                    this.equipped[item.type] = id;
                    this.render(container, player, updateUI);
                };
            }
            li.appendChild(btn);
            container.appendChild(li);
        });
    }
}