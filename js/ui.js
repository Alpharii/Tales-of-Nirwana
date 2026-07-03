export const UI = {
    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.getElementById(screenId).classList.remove('hidden');
    },
    updateStatus(player, day) {
        document.getElementById('ui-hp').innerText = player.hp;
        document.getElementById('ui-maxhp').innerText = player.maxHp;
        document.getElementById('ui-level').innerText = player.level;
        document.getElementById('ui-exp').innerText = player.exp;
        document.getElementById('ui-gold').innerText = player.gold;
        document.getElementById('ui-day').innerText = day;
    },
    renderStory(text, choicesContainer) {
        document.getElementById('story-text').innerText = text;
        choicesContainer.innerHTML = '';
    }
};