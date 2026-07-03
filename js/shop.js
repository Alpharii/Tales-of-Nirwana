import { itemData } from '../data/items.js';

export class Shop {
    render(container, player, inventory, updateUI) {
        container.innerHTML = '';
        Object.keys(itemData).forEach(id => {
            const item = itemData[id];
            const div = document.createElement('div');
            div.innerHTML = `<span>${item.name} (${item.price}G)</span>`;
            
            const btn = document.createElement('button');
            btn.innerText = "Buy";
            btn.onclick = () => {
                if (player.gold >= item.price) {
                    player.gold -= item.price;
                    inventory.addItem(id);
                    updateUI();
                    alert(`Membeli ${item.name}!`);
                } else {
                    alert("Gold tidak cukup!");
                }
            };
            div.appendChild(btn);
            container.appendChild(div);
        });
    }
}