export class PartySystem {
    constructor() {
        this.members = [];
    }

    addMember(characterId) {
        const roster = {
            ordinary_peasant: { name: "Ordinary Peasant", role: "Tank", hp: 120 },
            gugalanna: { name: "Gugalanna", role: "DPS", hp: 80 },
            qwetzal: { name: "Qwetzal", role: "Healer", hp: 90 }
        };

        if (roster[characterId] && this.members.length < 3) {
            this.members.push(roster[characterId]);
            console.log(`${roster[characterId].name} bergabung dengan party!`);
        }
    }
}