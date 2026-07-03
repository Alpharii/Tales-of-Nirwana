import { mapNodes } from '../data/maps.js';

export class MapSystem {
    constructor(player, updateUI) {
        this.player = player;
        this.updateUI = updateUI;
        this.currentLocation = "town_center";
    }

    travelTo(nodeId) {
        const node = mapNodes[nodeId];
        if (!node) return;
        
        this.currentLocation = nodeId;
        console.log(`Kamu bepergian ke ${node.name}.`);
        this.updateUI(); // Panggil fungsi render UI navigasi di app.js nanti
    }

    getAvailableTravels() {
        return mapNodes[this.currentLocation].connections.map(id => ({
            id: id,
            name: mapNodes[id].name
        }));
    }

    interactFacility(facilityName) {
        switch(facilityName) {
            case "Inn":
                this.player.hp = this.player.maxHp;
                console.log("Kamu tidur di Inn. HP penuh kembali.");
                break;
            case "Shop":
                console.log("Membuka UI Merchant...");
                // Trigger event buka UI Shop
                break;
            case "Church":
                console.log("Kamu berdoa. Mendapat sedikit EXP (Berbayar Donasi).");
                break;
            case "Guild":
                console.log("Mengecek papan Quest...");
                break;
            case "Blacksmith":
                console.log("Membuka menu Upgrade Senjata...");
                break;
        }
    }
}