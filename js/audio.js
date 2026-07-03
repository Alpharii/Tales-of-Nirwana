export const AudioSystem = {
    playBGM(trackName) {
        // Contoh implementasi, ganti path sesuai asetmu
        console.log(`🎵 [Audio] Memutar BGM: ${trackName}`);
        // const bgm = new Audio(`assets/audio/${trackName}.mp3`);
        // bgm.loop = true;
        // bgm.play();
    },
    playSFX(sfxName) {
        console.log(`🔊 [Audio] Memutar SFX: ${sfxName}`);
        // const sfx = new Audio(`assets/audio/${sfxName}.wav`);
        // sfx.play();
    }
};