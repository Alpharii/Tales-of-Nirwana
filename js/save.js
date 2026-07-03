export const SaveManager = {
    saveGame(data) {
        localStorage.setItem('dnd_life_save', JSON.stringify(data));
        alert("Game Saved!");
    },
    loadGame() {
        const data = localStorage.getItem('dnd_life_save');
        return data ? JSON.parse(data) : null;
    },
    deleteSave() {
        localStorage.removeItem('dnd_life_save');
        alert("Save deleted!");
    }
};