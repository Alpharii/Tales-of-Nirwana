export class Blacksmith {
    static enchant(item, player, cost) {
        if (player.gold >= cost) {
            player.gold -= cost;
            item.val += 5; // Nambah stat
            item.name = item.name + " (+1)";
            console.log(`${item.name} berhasil di-enchant!`);
            return true;
        }
        console.log("Gold tidak cukup untuk enchant!");
        return false;
    }

    static repair(item, player, cost) {
        if (player.gold >= cost) {
            player.gold -= cost;
            item.durability = item.maxDurability; // Asumsi ada sistem durability nanti
            console.log(`${item.name} berhasil diperbaiki!`);
            return true;
        }
        return false;
    }

    static craft(recipe, inventory) {
        // Cek apakah material di inventory cukup untuk recipe
        let hasMaterials = recipe.materials.every(mat => inventory.items.includes(mat.id));
        if (hasMaterials) {
            recipe.materials.forEach(mat => inventory.removeItem(mat.id));
            inventory.addItem(recipe.resultId);
            console.log(`Berhasil crafting ${recipe.resultName}!`);
        } else {
            console.log("Material tidak cukup untuk crafting.");
        }
    }
}