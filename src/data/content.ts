// ============================================================================
// PUSAT KONFIGURASI KONTEN (CONTENT CONFIGURATION CENTER)
// ============================================================================
// File ini adalah SATU-SATUNYA tempat yang perlu Anda edit untuk merubah:
// - Nama Istri & Kata-kata ucapan
// - Foto-foto galeri & kenangan timeline
// - Pengaturan musik & audio
// ============================================================================

export interface TimelineMoment {
  id: string;
  yearOrDate: string;
  title: string;
  description: string;
  photoUrl: string;
  photoCaption?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface ContentConfig {
  wifeName: string;
  nickname: string;
  birthdayDate: string;
  welcomeScreen: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  audio: {
    // Anda bisa menaruh file mp3 Anda sendiri di folder public/audio/song.mp3
    // dan mengganti url di bawah menjadi "/audio/song.mp3"
    songUrl: string;
    songTitle: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    scrollButtonText: string;
  };
  cakeSection: {
    title: string;
    subtitle: string;
    manualBlowButtonText: string;
    micBlowButtonText: string;
    micInstruction: string;
    wishTitle: string;
    wishMessage: string;
  };
  timelineSection: {
    title: string;
    subtitle: string;
    moments: TimelineMoment[];
  };
  gallerySection: {
    title: string;
    subtitle: string;
    photos: GalleryPhoto[];
  };
  loveLetterSection: {
    title: string;
    salutation: string;
    paragraphs: string[];
    signature: string;
  };
  closingSection: {
    title: string;
    message: string;
    reblowButtonText: string;
    backToTopButtonText: string;
  };
  scratchCardSection: {
    title: string;
    subtitle: string;
    scratchInstruction: string;
    revealedTitle: string;
    revealedMessage: string;
    actionText: string;
  };
}

export const content: ContentConfig = {
  // --------------------------------------------------------------------------
  // 1. DATA PRIBADI & PANGGILAN SAYANG
  // --------------------------------------------------------------------------
  wifeName: "Opi Cantikku", // <-- GANTI dengan nama istri Anda
  nickname: "Sayangku",          // <-- GANTI dengan panggilan sayang
  birthdayDate: "25 Juli 2026",  // <-- GANTI dengan tanggal ulang tahun

  // --------------------------------------------------------------------------
  // 2. WELCOME SCREEN (LAYAR PEMBUKA "BUKA KEJUTAN")
  // --------------------------------------------------------------------------
  welcomeScreen: {
    title: "Satu Kejutan Spesial Untukmu...",
    subtitle: "Ada pesan rahasia yang sudah kusiapkan khusus untuk merayakan hari kelahiranmu hari ini.",
    buttonText: "💌 Buka Kejutan 💌",
  },

  // --------------------------------------------------------------------------
  // 3. MUSIK LATAR (BACKGROUND MUSIC)
  // --------------------------------------------------------------------------
  audio: {
    // TIPS: Taruh lagu favorit kalian di folder `public/audio/song.mp3` lalu ketik: "/audio/song.mp3"
    // Sebagai placeholder default, kami menggunakan musik instrumental romantis bebas hak cipta
    songUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=romantic-piano-110019.mp3",
    songTitle: "Our Romantic Soundtrack 💕",
  },

  // --------------------------------------------------------------------------
  // 4. HERO SECTION (BAGIAN ATAS HALAMAN)
  // --------------------------------------------------------------------------
  hero: {
    greeting: "Selamat Ulang Tahun, Istriku sayang!",
    title: "Sayangku cantiknya akuu", // Nama besar dengan animasi huruf-per-huruf
    subtitle: "Terima kasih sudah menjadi kebahagiaan terbesar dalam hidupku ya sayang. Hari ini adalah hari spesialmu. Semoga segala cita-cita dan harapanmu dapat tercapai tahun ini.",
    scrollButtonText: "Scroll ke Bawah untuk lihat kejutan dari aku 👇",
  },

  // --------------------------------------------------------------------------
  // 5. INTERACTIVE CAKE SECTION (KUE ULANG TAHUN & TIUP LILIN)
  // --------------------------------------------------------------------------
  cakeSection: {
    title: "Kejutan Spesial Untuk Orang Paling Spesial 🎂",
    subtitle: "Tutup mata kamu sejenak ya sayangku, buat permohonan terbaik di dalam hatimu, lalu tiup lilinnya!",
    manualBlowButtonText: "✨ Tiup Lilin Sekarang ✨", // Tombol utama yang paling menonjol
    micBlowButtonText: "🎙️ Atau Coba Tiup Lewat Mikrofon", // Fitur bonus
    micInstruction: "Izinkan akses mikrofon di HP/laptopmu, lalu tiup langsung ke layar!",
    wishTitle: "Selamat Ulang Tahun, Cintaku! 🎉",
    wishMessage: "Semoga semua doa, mimpi, dan harapan indah kamu di tahun dan seterusnya menjadi kenyataan ya sayang. Aku akan selalu ada di sampingmu, menggenggam tanganmu untuk mewujudkannya bersama-sama!",
  },

  // --------------------------------------------------------------------------
  // 6. TIMELINE SECTION (KENANGAN PERJALANAN CINTA)
  // --------------------------------------------------------------------------
  timelineSection: {
    title: "Perjalanan Cerita Kita 💕",
    subtitle: "Setiap detik bersamamu adalah momen berharga yang selalu kusyukuri.",
    moments: [
      {
        id: "m1",
        yearOrDate: "Pertama Ketemu nihh",
        title: "Pertemuan Pertama di Taman Literasi Blok M",
        description: "Hari di mana tatapan kita pertama kali bertemu di Taman Literasi Blok M. Momen indah dan seru itu akan selalu tersimpan abadi di ingatan dan hatiku.",
        photoUrl: "/photos/Pertama-bertemu.jpg",
        photoCaption: "📍 Taman Literasi Blok M 💕"
      },
      {
        id: "m2",
        yearOrDate: "Hari Jadian",
        title: "Komitmen Mengawali Kisah Kita",
        description: "Momen di mana kita berdua memutuskan untuk menjadi pasangan dan memulai kisah cinta yang indah ini. Menegaskan kalau kita akan selalu bersama, saling menguatkan, dan menjaga satu sama lain.",
        photoUrl: "/photos/Saat-jadian.jpg",
        photoCaption: "Masih malu malu hehehe"
      },
      {
        id: "m3",
        yearOrDate: "Momen Lamaran",
        title: "Langkah Menuju Ikatan Suci",
        description: "Hari di mana dua keluarga besar bersatu dan cincin tersemat di jarimu, menjadi tanda keseriusan kita untuk melangkah ke jenjang yang lebih suci.",
        photoUrl: "/photos/Saat-lamaran.JPEG",
        photoCaption: "Cincin lamaran & kebahagiaan dua keluarga 💍"
      },
      {
        id: "m4",
        yearOrDate: "Hari Pernikahan",
        title: "Momen Terindah Dalam Hidupku",
        description: "Hari di mana engkau resmi menjadi pendamping hidupku selamanya sayang. Melihatmu di altar pernikahan adalah kebahagiaan tiada tara, kebahagiaan yang akan selalu kukenang.",
        photoUrl: "/photos/Momen-pernikahan.jpg",
        photoCaption: "Janji suci sehidup semati"
      },
      {
        id: "m5",
        yearOrDate: "Hari Ini & Selamanya",
        title: "Terus Merajut Mimpi Bersama",
        description: "Ulang tahunmu hari ini adalah pengingat betapa beruntungnya aku memilikimu setiap hari. Mari terus bertumbuh dan bahagia bersama hingga masa tua.",
        photoUrl: "/photos/Saat-ini.jpg",
        photoCaption: "Cinta kita, hari ini dan selamanya"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 7. GALLERY SECTION (GALERI FOTO FAVORIT)
  // --------------------------------------------------------------------------
  gallerySection: {
    title: "Galeri Senyumanmu 📸",
    subtitle: "Beberapa potret indah yang selalu membuat duniaku terasa jauh lebih sempurna.",
    photos: [
      {
        id: "g1",
        url: "/photos/Sicantik1.JPG",
        caption: "Bidadari tercantik di duniaku ❤️"
      },
      {
        id: "g2",
        url: "/photos/Sicantik2.jpg",
        caption: "Tatapan matamu yang selalu menenangkan"
      },
      {
        id: "g3",
        url: "/photos/Momen-liburan.jpg",
        caption: "Momen liburan manis kita bersama"
      },
      {
        id: "g4",
        url: "/photos/Sicantik3.jpg",
        caption: "Tawamu adalah musik favoritku"
      },
      {
        id: "g5",
        url: "/photos/Sicantik4.jpg",
        caption: "Selalu menawan di setiap suasana"
      },
      {
        id: "g6",
        url: "/photos/Momen-takpudar.jpg",
        caption: "Cinta kita yang takkan pernah pudar"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 8. LOVE LETTER SECTION (SURAT CINTA PRIBADI)
  // --------------------------------------------------------------------------
  loveLetterSection: {
    title: "Surat Cinta Untuk Kamu Sayangku 💌",
    salutation: "Untuk Istriku Tercinta",
    paragraphs: [
      "Lewat pesan sederhana ini, aku mau mengucapkan selamat ulang tahun untuk wanita paling luar biasa, paling cantik, paling pengertian, paling segalanya yang pernah kukenal. Terima kasih karena telah memilihku untuk menjadi partnermu dalam mengarungi kehidupan ini ya sayangku.",
      "Teringat terus saat pertama kali kita bertemu di Taman Literasi Blok M, meskipun waktu itu kita tak sempat mengabadikannya dalam foto, senyumanmu hari itu terekam sempurna di ingatan dan hatiku. Dari momen indah di Taman Literasi itulah, alur cerita terindah dalam hidupku dimulai.",
      "Aku tau, perjalanan hidup tidak selalu mudah. Ada lelah, ada tantangan, dan ada dinamika setiap harinya. Namun, bersamamu, setiap rintangan terasa lebih mudah dihadapi dan setiap kebahagiaan terasa berlipat ganda sayang. Kehadiranmu menghangatkan rumah tangga kita dan memberikan kedamaian di hatiku sayang.",
      "Di usiamu yang baru ini, aku berdoa agar Tuhan senantiasa melindungimu, memberikan kesehatan yang paripurna, memberkahi setiap langkahmu, serta menjaga senyum indah di wajahmu. Aku berjanji untuk terus belajar menjadi suami yang lebih baik, mencintaimu lebih dalam, dan mendampingimu di setiap langkah mimpimu."
    ],
    signature: "Selamanya dan seutuhnya milikmu,\nSuamimu ❤️"
  },

  // --------------------------------------------------------------------------
  // 9. CLOSING SECTION (PENUTUP)
  // --------------------------------------------------------------------------
  closingSection: {
    title: "Terima Kasih Sudah Hadir Di Dunia Ini Ya Sayangku ❤️",
    message: "Aku mencintaimu hari ini, esok, dan sampai hembusan nafas terakhirku.",
    reblowButtonText: "🎂 Tiup Lilin Lagi",
    backToTopButtonText: "⬆️ Kembali ke Atas",
  },

  // --------------------------------------------------------------------------
  // 10. SCRATCH CARD SECTION (KARTU GOSOK HADIAH RAHASIA)
  // --------------------------------------------------------------------------
  scratchCardSection: {
    title: "Kartu Hadiah Rahasia 🎁",
    subtitle: "Ada satu hadiah spesial tambahan yang sudah kusiapkan khusus untuk kamu sayang!",
    scratchInstruction: "✨ Gosok di sini pakai jarimu ✨",
    revealedTitle: "Selamat Sayangku! 🎉",
    revealedMessage: "Kamu mendapatkan 1 Buket Bunga Cantik & Pelukan Paling Hangat dari aku hari ini! 💐🤗",
    actionText: "💐 Bunga untuk kamu 💐",
  }
};
