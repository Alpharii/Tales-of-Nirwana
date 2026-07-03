export class LootSystem {
    static rarities = {
        common: { chance: 60, multiplier: 1 },
        uncommon: { chance: 30, multiplier: 1.5 },
        rare: { chance: 9, multiplier: 2.5 },
        legendary: { chance: 1, multiplier: 5 }
    };

    static getDrop(lootTable) {
        let roll = Math.floor(Math.random() * 100) + 1;
        let rarity = 'common';

        if (roll > 99) rarity = 'legendary';
        else if (roll > 90) rarity = 'rare';
        else if (roll > 60) rarity = 'uncommon';

        // Ambil item acak dari lootTable sesuai rarity (asumsi lootTable array of object)
        const possibleDrops = lootTable.filter(item => item.rarity === rarity);
        if (possibleDrops.length === 0) return null;
        
        return possibleDrops[Math.floor(Math.random() * possibleDrops.length)];
    }

    static openChest(tier) {
        let goldDrop = tier * 50 + Math.floor(Math.random() * 50);
        console.log(`Membuka Chest Tier ${tier}... Mendapat ${goldDrop} Gold!`);
        return { gold: goldDrop };
    }
}