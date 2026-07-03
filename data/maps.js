export const mapNodes = {
    // Town Facilities
    town_center: { name: "Town Square", type: "town", connections: ["forest_edge"], facilities: ["Guild", "Shop", "Inn", "Church", "Blacksmith"] },
    
    // World Map
    forest_edge: { name: "Pinggiran Hutan", type: "forest", connections: ["town_center", "river_crossing", "goblin_cave"] },
    river_crossing: { name: "Sungai Deras", type: "river", connections: ["forest_edge", "mountain_path"] },
    mountain_path: { name: "Jalan Pegunungan", type: "mountain", connections: ["river_crossing"] },
    goblin_cave: { name: "Goa Goblin", type: "dungeon", dungeonId: "goblin_cave_1", connections: ["forest_edge"] }
};