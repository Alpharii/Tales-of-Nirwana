import { SaveManager } from './save.js';
import { UI } from './ui.js';
import { AudioSystem } from './audio.js';

export const GameOverSystem = {
    trigger(achievementStats) {
        AudioSystem.playSFX('game_over');
        
        console.warn("💀 PERMADEATH TRIGGERED! Menghapus semua save data...");
        // Hapus data dari LocalStorage
        SaveManager.deleteSave();

        // Tampilkan Statistik Terakhir
        document.getElementById('stat-rats').innerText = achievementStats.ratsKilled || 0;
        document.getElementById('stat-gold').innerText = achievementStats.goldEarned || 0;
        
        // Pindah ke layar Game Over
        UI.switchScreen('game-over-screen');
    }
};