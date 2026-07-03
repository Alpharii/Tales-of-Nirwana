export const storyNodes = {
    start: {
        text: "Kamu terbangun di sebuah desa kecil. Apa yang akan kamu lakukan?",
        choices: [
            { text: "Pergi ke hutan (Battle/Event)", next: "forest_event" },
            { text: "Kunjungi Merchant", action: "open_shop" },
            { text: "Tidur (Next Day)", action: "next_day" }
        ]
    },
    forest_event: {
        text: "Kamu masuk ke hutan dan...",
        action: "random_event"
    },
    death: {
        text: "Kamu mati. Perjalananmu berakhir.",
        choices: [
            { text: "Kembali ke Main Menu", action: "go_menu" }
        ]
    }
};