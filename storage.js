// js/storage.js
export class StorageManager {
    static SAVE_KEY = 'robin_adventurer_save';

    /** Menyimpan data ke LocalStorage */
    static save(data) {
        localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
    }

    /** Memuat data dari LocalStorage */
    static load() {
        const data = localStorage.getItem(this.SAVE_KEY);
        return data ? JSON.parse(data) : null;
    }

    /** Menghapus data (digunakan untuk Permadeath atau Manual Delete) */
    static delete() {
        localStorage.removeItem(this.SAVE_KEY);
    }

    /** Mengecek apakah ada save data yang aktif */
    static hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }
}