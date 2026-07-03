export const dungeonData = {
    goblin_cave_1: {
        name: "Goblin Cave",
        width: 5,
        height: 5,
        startX: 0,
        startY: 0,
        // Grid 5x5
        layout: [
            [1, 1, 0, 0, 0],
            [0, 2, 1, 3, 0],
            [0, 0, 1, 2, 1],
            [3, 1, 1, 0, 2],
            [0, 0, 2, 1, 9]
        ],
        enemies: ["goblin", "rat"],
        boss: "boss_orc"
    }
};