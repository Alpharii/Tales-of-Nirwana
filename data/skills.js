export const skillData = {
    // Knight
    heavy_slash: { id: 'heavy_slash', name: 'Heavy Slash', type: 'attack', classReq: 'Knight', mp: 10, cd: 2, power: 25, reqLevel: 1 },
    shield_wall: { id: 'shield_wall', name: 'Shield Wall', type: 'buff', classReq: 'Knight', mp: 15, cd: 4, power: 0, reqLevel: 3, passive: false },
    
    // Mage
    fireball: { id: 'fireball', name: 'Fireball', type: 'magic', classReq: 'Mage', mp: 20, cd: 3, power: 35, reqLevel: 1 },
    mana_charge: { id: 'mana_charge', name: 'Mana Charge', type: 'charge', classReq: 'Mage', mp: 0, cd: 5, power: 30, reqLevel: 3 },
    
    // Priest
    heal: { id: 'heal', name: 'Holy Heal', type: 'heal', classReq: 'Priest', mp: 15, cd: 3, power: 40, reqLevel: 1 },
    smite: { id: 'smite', name: 'Smite', type: 'magic', classReq: 'Priest', mp: 12, cd: 2, power: 20, reqLevel: 2 }
};