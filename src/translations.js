// ========================
// TRANSLATIONS
// id = Bahasa Indonesia (default)
// en = English
// ========================

import { eventInfo } from './data';

export const translations = {
  // -----------------------------------------------
  // NAVBAR
  // -----------------------------------------------
  nav: {
    id: {
      links: [
        { label: 'Tentang Kami', href: '/tentang-kami', isRoute: true },
        { label: 'Keunggulan', href: '#why-attend', isRoute: false },
        { label: 'Mitra dan Sponsor', href: '#sponsors', isRoute: false },
        { label: 'Booth', href: '/booth', isRoute: true },
        { label: 'Artikel', href: '/artikel', isRoute: true },
      ],
      cta: 'Registrasi',
    },
    en: {
      links: [
        { label: 'About Us', href: '/tentang-kami', isRoute: true },
        { label: 'Why Attend', href: '#why-attend', isRoute: false },
        { label: 'Partners & Sponsors', href: '#sponsors', isRoute: false },
        { label: 'Booth', href: '/booth', isRoute: true },
        { label: 'Articles', href: '/artikel', isRoute: true },
      ],
      cta: 'Register',
    },
  },

  // -----------------------------------------------
  // HERO
  // -----------------------------------------------
  hero: {
    id: {
      description:
        'Platform pertemuan {exhibitor}+ exhibitor, {targetVisitor} profesional, dan inovator industri konstruksi terbesar se-Indonesia Timur dalam 4 hari transformasi.',
      ctaPrimary: 'Booking Stand',
      ctaVisitor: 'Registrasi Visitor',
      ctaOutline: 'Apa itu ProBuild INTIM?',
      countdownLabel: 'Menghitung mundur ke hari H:',
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
    },
    en: {
      description:
        "The meeting platform for {exhibitor}+ exhibitors, {targetVisitor} professionals, and innovators of Eastern Indonesia's largest construction industry in 4 transformative days.",
      ctaPrimary: 'Book a Stand',
      ctaVisitor: 'Visitor Registration',
      ctaOutline: 'What is ProBuild INTIM?',
      countdownLabel: 'Counting down to the big day:',
      days: 'Days',
      hours: 'Hrs',
      minutes: 'Min',
      seconds: 'Sec',
    },
  },

  // -----------------------------------------------
  // ABOUT (home section)
  // -----------------------------------------------
  about: {
    id: {
      label: 'Tentang Event',
      title: ['Panggung Terbesar', 'Industri Konstruksi', 'Indonesia Timur'],
      accentIndex: 1,
      body1:
        'adalah pameran konstruksi B2B terbesar di Indonesia Timur, mempertemukan {exhibitor}+ exhibitor, {targetVisitor}+ pengunjung profesional, dan 20+ pembicara ahli dari seluruh Indonesia. Fokus pada inovasi infrastruktur, material bangunan, teknologi digital konstruksi (BIM, AI), dan proyek strategis nasional serta pengembangan kawasan timur Indonesia.',
      body2:
        'Target 2026, {targetVisitor}+ pengunjung, didukung Dinas Bina Marga & Bina Konstruksi (DBMBK) Provinsi Sulawesi Selatan, BJKW VI Makassar dan 10+ asosiasi industri.',
      tags: [
        'Konstruksi',
        'Arsitektur',
        'Properti',
        'Interior',
        'Smart Building',
        'Green Construction',
        'Infrastruktur',
      ],
      readMore: 'Selengkapnya',
      highlights: ['Exhibitor Terpilih', 'Target Pengunjung', 'Pembicara Ahli', 'Durasi Event'],
      highlightSuffixes: ['+', '+', '+', ' Hari'],
      floatCard: 'Event Terdekat',
    },
    en: {
      label: 'About the Event',
      title: ["Eastern Indonesia's", 'Biggest Stage', 'In Construction'],
      accentIndex: 1,
      body1:
        'is the largest B2B construction exhibition in Eastern Indonesia, bringing together {exhibitor}+ exhibitors, {targetVisitor}+ professional visitors, and 20+ expert speakers from across Indonesia. Focused on infrastructure innovation, building materials, digital construction technology (BIM, AI), and national strategic projects as well as Eastern Indonesian region development.',
      body2:
        'Target 2026: {targetVisitor}+ visitors, supported by the Directorate of Roads & Construction (DBMBK) South Sulawesi Province, BJKW VI Makassar and 10+ industry associations.',
      tags: [
        'Construction',
        'Architecture',
        'Property',
        'Interior',
        'Smart Building',
        'Green Construction',
        'Infrastructure',
      ],
      readMore: 'Learn More',
      highlights: ['Selected Exhibitors', 'Target Visitors', 'Expert Speakers', 'Event Duration'],
      highlightSuffixes: ['+', '+', '+', ' Days'],
      floatCard: 'Upcoming Event',
    },
  },

  // -----------------------------------------------
  // WHY ATTEND
  // -----------------------------------------------
  whyAttend: {
    id: {
      label: 'Mengapa Hadir',
      title: ['Empat Alasan Kuat', 'untuk Tidak Melewatkan'],
      subtitle:
        'Event yang tidak hanya memajang produk, tetapi membangun ekosistem bisnis konstruksi yang lebih kuat dan terkoneksi.',
      learnMore: 'Pelajari lebih lanjut',
      bottomCta: {
        ready: 'Siap bergabung?',
        sub: 'Ratusan pelaku industri sudah mendaftarkan diri.',
        bookNow: 'Booking Stand Sekarang',
        program: 'Pelajari Program',
      },
      cards: [
        {
          title: 'Exclusive Industry Networking',
          description:
            'ProBuild menghadirkan ruang networking premium yang dirancang untuk mempertemukan Anda dengan mitra bernilai tinggi dalam atmosfer profesional dan berkelas.',
        },
        {
          title: 'Future-Defining Innovation',
          description:
            'Jadilah yang pertama menyaksikan teknologi, material, dan solusi konstruksi generasi terbaru.',
        },
        {
          title: 'High-Value Business Opportunities',
          description:
            'Dengan sistem business matching terkurasi dan akses ke buyer utama, partisipasi Anda bukan hanya eksposur—melainkan investasi untuk pertumbuhan bisnis jangka panjang.',
        },
        {
          title: 'Executive-Level Insight & Forum',
          description:
            'Dapatkan perspektif langsung dari tokoh industri, regulator, dan pemimpin proyek nasional dalam forum diskusi berkelas.',
        },
      ],
    },
    en: {
      label: 'Why Attend',
      title: ['Four Compelling Reasons', 'Not to Miss'],
      subtitle:
        'An event that goes beyond product showcasing — building a stronger and more connected construction business ecosystem.',
      learnMore: 'Learn more',
      bottomCta: {
        ready: 'Ready to join?',
        sub: 'Hundreds of industry players have already registered.',
        bookNow: 'Book a Stand Now',
        program: 'Explore Program',
      },
      cards: [
        {
          title: 'Exclusive Industry Networking',
          description:
            'ProBuild offers a premium networking environment designed to connect you with high-value partners in a professional and distinguished atmosphere.',
        },
        {
          title: 'Future-Defining Innovation',
          description:
            'Be among the first to witness the next generation of construction technology, materials, and solutions.',
        },
        {
          title: 'High-Value Business Opportunities',
          description:
            'With a curated business matching system and access to key buyers, your participation is not just exposure — it is a long-term investment in business growth.',
        },
        {
          title: 'Executive-Level Insight & Forum',
          description:
            'Gain direct perspectives from industry leaders, regulators, and national project managers in premium discussion forums.',
        },
      ],
    },
  },

  // -----------------------------------------------
  // SPONSORS
  // -----------------------------------------------
  sponsors: {
    id: {
      label: 'Mitra dan Sponsor',
      title: 'Didukung Oleh yang',
      accent: 'Terbaik',
      subtitle: 'Mitra strategis yang mendukung kesuksesan ProBuild INTIM 2026.',
      mainHeader: 'Pendukung Utama Nasional',
      secondaryHeader: 'Asosiasi & Mitra Pendukung',
      ctaText: 'Ingin brand Anda tampil di sini?',
      ctaBtn: 'Jadi Sponsor',
      content: {
        main: [
          {
            id: 1,
            type: 'Pendukung Utama Nasional',
            name: 'Lembaga Pengembang Jasa Konstruksi Indonesia',
            logo: '/images/sponsors/lpjk-new.png',
            backgroundColor: '#010d40',
          },
        ],
        secondary: [
          {
            id: 1,
            type: 'Asosiasi Penyelenggara',
            name: 'PERTAPIN',
            fullName: 'Perkumpulan Tenaga Ahli Profesional Indonesia Sulawesi Selatan',
            logo: '/images/sponsors/pertapin.png',
          },
          {
            id: 2,
            type: 'Asosiasi Penyelenggara',
            name: 'PERKOPINDO',
            fullName: 'Perkumpulan Kontraktor Profesional Indonesia Sulawesi Selatan',
            logo: '/images/sponsors/perkopindo.png',
          },
          {
            id: 3,
            type: 'Event Organizer',
            name: 'PCO',
            fullName: 'PT. Perkasa Citra Organizer',
            logo: '/images/sponsors/pco.png',
          },
          {
            id: 4,
            type: 'Pihak Pendukung Tingkat Provinsi',
            name: 'Dinas BMBK Prov. Sulsel',
            fullName: 'Dinas Bina Marga dan Bina Konstruksi Provinsi Sulawesi Selatan',
            logo: '/images/sponsors/bmbk.png',
          },
          {
            id: 5,
            type: 'Mitra Kerja Sama Penyelenggaraan',
            name: 'BJKW VI Makassar',
            fullName: 'Balai Jasa Konstruksi Wilayah VI Makassar',
            logo: '/images/sponsors/bjkw.png',
          },
        ],
        supporting: [
          { id: 1, name: 'Media Partner 1', logo: '' },
          { id: 2, name: 'Media Partner 2', logo: '' },
          { id: 3, name: 'Media Partner 3', logo: '' },
          { id: 4, name: 'Media Partner 4', logo: '' },
          { id: 5, name: 'Media Partner 5', logo: '' },
          { id: 6, name: 'Community Partner 1', logo: '' },
          { id: 7, name: 'Community Partner 2', logo: '' },
          { id: 8, name: 'Tech Partner 1', logo: '' },
        ],
      },
    },
    en: {
      label: 'Partners & Sponsors',
      title: 'Supported By the',
      accent: 'Best',
      subtitle: 'Strategic partners supporting the success of ProBuild INTIM 2026.',
      mainHeader: 'National Main Supporter',
      secondaryHeader: 'Associations & Supporting Partners',
      ctaText: 'Want your brand featured here?',
      ctaBtn: 'Become a Sponsor',
      content: {
        main: [
          {
            id: 1,
            type: 'National Main Supporter',
            name: 'Indonesian Construction Services Development Agency',
            logo: '/images/sponsors/lpjk-new.png',
            backgroundColor: '#010d40',
          },
        ],
        secondary: [
          {
            id: 1,
            type: 'Organizer Association',
            name: 'PERTAPIN',
            fullName: 'Association of Indonesian Professional Experts South Sulawesi',
            logo: '/images/sponsors/pertapin.png',
          },
          {
            id: 2,
            type: 'Organizer Association',
            name: 'PERKOPINDO',
            fullName: 'Association of Indonesian Professional Contractors South Sulawesi',
            logo: '/images/sponsors/perkopindo.png',
          },
          {
            id: 3,
            type: 'Event Organizer',
            name: 'PCO',
            fullName: 'PT. Perkasa Citra Organizer',
            logo: '/images/sponsors/pco.png',
          },
          {
            id: 4,
            type: 'Provincial Level Supporter',
            name: 'Dinas BMBK Prov. Sulsel',
            fullName: 'Roads and Construction Development Agency of South Sulawesi Province',
            logo: '/images/sponsors/bmbk.png',
          },
          {
            id: 5,
            type: 'Event Cooperation Partner',
            name: 'BJKW VI Makassar',
            fullName: 'Construction Services Center Region VI Makassar',
            logo: '/images/sponsors/bjkw.png',
          },
        ],
        supporting: [
          { id: 1, name: 'Media Partner 1', logo: '' },
          { id: 2, name: 'Media Partner 2', logo: '' },
          { id: 3, name: 'Media Partner 3', logo: '' },
          { id: 4, name: 'Media Partner 4', logo: '' },
          { id: 5, name: 'Media Partner 5', logo: '' },
          { id: 6, name: 'Community Partner 1', logo: '' },
          { id: 7, name: 'Community Partner 2', logo: '' },
          { id: 8, name: 'Tech Partner 1', logo: '' },
        ],
      },
    },
  },

  // -----------------------------------------------
  // BOOKING FORM
  // -----------------------------------------------
  bookingForm: {
    id: {
      label: 'Booking Stand / Registrasi Kunjungan',
      title: 'Amankan Posisi',
      accent: 'Strategis',
      titleSuffix: 'Anda Sekarang',
      body: 'ProBuild mempertemukan brand, inovator, dan profesional industri dalam satu ekosistem yang terkurasi. Baik sebagai exhibitor maupun visitor, partisipasi Anda adalah langkah strategis untuk memperluas koneksi dan memperkuat posisi di industri konstruksi dan arsitektur.',
      benefits: [
        { icon: '📍', title: 'Lokasi Strategis', desc: '{location}, {venue}' },
        {
          icon: '🎯',
          title: 'Target Tepat',
          desc: '{targetVisitor}+ pengunjung dari kalangan profesional',
        },
        {
          icon: '🛠️',
          title: 'Fasilitas Booth Lengkap',
          desc: 'Listrik, internet, dan signage digital',
        },
        { icon: '📢', title: 'Promosi Digital', desc: 'Listing di website & media sosial event' },
      ],
      contactHelp: 'Butuh bantuan? Hubungi kami:',
      ctaTitle: 'Daftar Sekarang',
      ctaSub: 'Pilih jenis pendaftaran Anda. Formulir akan terbuka di tab baru.',
      toggleBooth: 'Booking Stand',
      toggleVisitor: 'Registrasi Pengunjung',
    },
    en: {
      label: 'Stand Booking / Visitor Registration',
      title: 'Secure Your',
      accent: 'Strategic',
      titleSuffix: 'Position Now',
      body: 'ProBuild brings together brands, innovators, and industry professionals in one curated ecosystem. Whether as an exhibitor or visitor, your participation is a strategic step to expand your network and strengthen your position in the construction and architecture industry.',
      benefits: [
        { icon: '📍', title: 'Strategic Location', desc: '{location}, {venue}' },
        { icon: '🎯', title: 'Targeted Audience', desc: '{targetVisitor}+ professional visitors' },
        {
          icon: '🛠️',
          title: 'Complete Booth Facilities',
          desc: 'Electricity, internet, and digital signage',
        },
        { icon: '📢', title: 'Digital Promotion', desc: 'Listed on event website & social media' },
      ],
      contactHelp: 'Need help? Contact us:',
      ctaTitle: 'Register Now',
      ctaSub: 'Choose your registration type. The form will open in a new tab.',
      toggleBooth: 'Book a Stand',
      toggleVisitor: 'Visitor Registration',
    },
  },

  // -----------------------------------------------
  // FOOTER
  // -----------------------------------------------
  footer: {
    id: {
      brandDesc:
        'Pameran konstruksi dan arsitektur terbesar Indonesia Timur. Platform bertemu, berinovasi, dan bertransaksi bagi seluruh ekosistem industri bangunan.',
      upcomingEvent: 'Event Terdekat',
      navTitle: 'Navigasi',
      exhibitorTitle: 'Exhibitor',
      contactTitle: 'Kontak',
      quickLinks: [
        { label: 'Tentang Event', href: '/tentang-kami' },
        { label: 'Keunggulan', href: '#why-attend' },
        { label: 'Sponsor', href: '#sponsors' },
        { label: 'Artikel', href: '/artikel' },
      ],
      exhibitorLinks: [
        { label: 'Booking Stand', href: '/#booking' },
        { label: 'Paket Sponsorship', href: '/booth', scrollTo: 'sponsorship' },
        { label: 'Layout Denah', href: '/booth', scrollTo: 'venue-layout' },
        { label: 'Peraturan Exhibitor', href: '/booth', scrollTo: 'download-documents' },
        { label: 'Jadwal Loading-Unloading', href: '/booth', scrollTo: 'download-documents' },
        {
          label: 'Jadwal Setup Booth - Move In Exhibitor',
          href: '/booth',
          scrollTo: 'download-documents',
        },
      ],
      copyright: '© 2026 ProBuild INTIM. Seluruh hak cipta dilindungi.',
    },
    en: {
      brandDesc:
        "Eastern Indonesia's largest construction and architecture exhibition. A platform to meet, innovate, and transact for the entire building industry ecosystem.",
      upcomingEvent: 'Upcoming Event',
      navTitle: 'Navigation',
      exhibitorTitle: 'Exhibitor',
      contactTitle: 'Contact',
      quickLinks: [
        { label: 'About the Event', href: '/tentang-kami' },
        { label: 'Why Attend', href: '#why-attend' },
        { label: 'Sponsors', href: '#sponsors' },
        { label: 'Articles', href: '/artikel' },
      ],
      exhibitorLinks: [
        { label: 'Book a Stand', href: '/#booking' },
        { label: 'Sponsorship Packages', href: '/booth', scrollTo: 'sponsorship' },
        { label: 'Floor Plan', href: '/booth', scrollTo: 'venue-layout' },
        { label: 'Exhibitor Regulations', href: '/booth', scrollTo: 'download-documents' },
        { label: 'Loading-Unloading Schedule', href: '/booth', scrollTo: 'download-documents' },
        { label: 'Booth Setup - Move In Schedule', href: '/booth', scrollTo: 'download-documents' },
      ],
      copyright: '© 2026 ProBuild INTIM. All rights reserved.',
    },
  },

  // -----------------------------------------------
  // ABOUT PAGE (/tentang-kami)
  // -----------------------------------------------
  aboutPage: {
    id: {
      heroSubtitle:
        'Pameran Konstruksi Terbesar di Indonesia Timur. Makassar sebagai gerbang utama inovasi dan kolaborasi infrastruktur masa depan.',
      heroTitle2: 'Bangun Masa Depan',
      heroTitle3: 'Indonesia Timur',
      statsLabels: ['Exhibitors', 'Visitors', 'Expert Speakers'],
      visionLabel: 'Tentang Kami',
      visionTitle: ['Gerbang Pembangunan', 'Berkelanjutan'],
      visionText1:
        'ProBuild 2026 adalah pameran konstruksi B2B terbesar di Indonesia Timur yang menghadirkan {exhibitor}+ exhibitor, {targetVisitor}+ pengunjung profesional, dan {speakers}+ pembicara ahli dari seluruh Indonesia. Event ini berfokus pada inovasi infrastruktur, material bangunan, teknologi digital konstruksi (BIM & AI), serta proyek strategis nasional dan pengembangan kawasan timur.',
      visionText2:
        'Didukung oleh Dinas Bina Marga & Bina Konstruksi (DBMBK) Sulawesi Selatan dan BJKW VI Makassar, ProBuild INTIM 2026 menargetkan lebih dari {targetVisitor} pengunjung profesional. Diselenggarakan di Makassar sebagai gateway Indonesia Timur, lokasi ini memiliki akses strategis melalui bandara internasional dan pelabuhan utama.',
      visionMission: [
        {
          icon: '🤝',
          title: 'Collaboration',
          description: 'Membangun sinergi antar pelaku industri.',
        },
        {
          icon: '💡',
          title: 'Innovation',
          description: 'Menampilkan teknologi konstruksi terdepan.',
        },
        {
          icon: '📈',
          title: 'Investment',
          description: 'Membuka peluang investasi untuk proyek daerah.',
        },
        {
          icon: '🌱',
          title: 'Green Infra',
          description: 'Fokus pada pembangunan ramah lingkungan.',
        },
      ],
      featuresTitle: 'Fitur Utama Event',
      features: [
        {
          icon: '👥',
          title: 'Business Matching',
          description:
            'Sesi khusus B2B untuk mempertemukan kontraktor dengan supplier material pilihan.',
        },
        {
          icon: '🎤',
          title: 'Conference & Seminar',
          description: 'Berbagi pengetahuan bersama pakar konstruksi nasional dan internasional.',
        },
        {
          icon: '🏗️',
          title: 'Expo & Demo',
          description:
            'Demonstrasi langsung alat berat dan teknologi konstruksi terbaru di lapangan.',
        },
        {
          icon: '⚙️',
          title: 'Digital Integration',
          description: 'Implementasi BIM (Building Information Modeling) dan digitalisasi proyek.',
        },
      ],
      agendaTitle: 'Jadwal Kami',
      agendaSubtitle: 'Rangkaian sesi yang dipandu oleh para ahli, wawasan terobosan, dan diskusi visioner untuk membentuk masa depan industri konstruksi.',
      agendaDays: [
{
          id: 'day_1',
          label: 'Hari 1',
          date: "24 September 2026",
          schedule: [
            {
              time: "07.00-08.00",
              title: "Registrasi Tamu & VIP",
              desc: "Registrasi tamu undangan, VIP, & media"
            },
            {
              time: "08.00-08.30",
              title: "Gladi Bersih Seremoni Pembukaan",
              desc: "Persiapan & gladi bersih seremoni pembukaan"
            },
            {
              time: "08.30-09.00",
              title: "Penyambutan Tamu VIP",
              desc: "Kedatangan & penjemputan tamu VIP / Menko AHY"
            },
            {
              time: "09.00-09.10",
              title: "Pembukaan oleh MC",
              desc: "Pembukaan MC - Pengantar Acara"
            },
            {
              time: "09.10-09.20",
              title: "Pembacaan Ayat Suci Al-Quran",
              desc: "Pembacaan Ayat Suci Al-Quran & Doa"
            },
            {
              time: "09.20-09.30",
              title: "Menyanyikan Lagu Kebangsaan",
              desc: "Menyanyikan Lagu Indonesia Raya"
            },
            {
              time: "09.30-09.40",
              title: "Pertunjukan Tari Tradisional",
              desc: "Penampilan Tari Padduppa (Tari Penyambutan Bugis-Makassar)"
            },
            {
              time: "09.40-09.55",
              title: "Sambutan Penyelenggara",
              desc: "Sambutan Penyelenggara ProBuild INTIM 2026"
            },
            {
              time: "09.55-10.05",
              title: "Sambutan Gubernur Sulsel",
              desc: "Sambutan Gubernur Provinsi Sulawesi Selatan"
            },
            {
              time: "10.05-10.55",
              title: "Keynote Speech Menko Infrastruktur",
              desc: "Sambutan & Arahan Menko Infrastruktur Bapak AHY"
            },
            {
              time: "10.55-11.20",
              title: "Seremoni Pembukaan Resmi",
              desc: "Pembukaan Resmi Pameran"
            },
            {
              time: "11.20-11.40",
              title: "Kunjungan Stan Pameran VIP",
              desc: "Peninjauan Stand Pameran oleh Tamu VIP (Guided Tour)"
            },
            {
              time: "11.40-12.00",
              title: "Konferensi Pers",
              desc: "Sesi Media / Press Conference"
            },
            {
              time: "12.00-13.00",
              title: "Talk Show 1: Kebijakan Infrastruktur Nasional",
              desc: "Talk Show - 1 \" Membangun Pondasi Masa Depan: Arah Kebijakan Infrastruktur Nasional 2026-2035\" Narasumber: Kementerian Infrastruktur"
            },
            {
              time: "13.00-17.00",
              title: "Sinergi Bisnis Rantai Pasok",
              desc: "Sinergi Bisnis 1-2 (dilakukan 2 agenda acara yang dihadirkan Perusahaan rantai pasok) ~ 2 perusahaan"
            },
            {
              time: "13.00-15.00",
              title: "Talk Show 2: Standar Konstruksi Bangunan",
              desc: "Talk Show - 2 \"Standar Konstruksi untuk Keandalan Bangunan Nasional\" Narasumber: Kementerian PU"
            },
            {
              time: "15.00-17.00",
              title: "Forum Jasa Konstruksi Wilayah",
              desc: "Forum Jasa Konstruksi Se -Sulawesi Selatan Narasumber: Kementerian PU"
            },
            {
              time: "19.30-21.00",
              title: "Pentas Seni Budaya Hari Ke-1",
              desc: "Pertunjukan Seni Budaya Sulsel (Malam Hari-1)"
            },
            {
              time: "21.00",
              title: "Penutupan Pameran Hari Pertama",
              desc: "Pameran Hari Pertama Ditutup"
            }
          ]
        },
        {
          id: 'day_2',
          label: 'Hari 2',
          date: "25 September 2026",
          schedule: [
            {
              time: "07.30-08.00",
              title: "Briefing Internal Panitia",
              desc: "Briefing pagi panitia & persiapan venue"
            },
            {
              time: "08.00-09.00",
              title: "Pembukaan Pameran & Registrasi",
              desc: "Pameran dibuka - Registrasi pengunjung"
            },
            {
              time: "08.00-12.00",
              title: "Kompetisi Tenaga Kerja Konstruksi",
              desc: "KOMPETISI HARI 1 - Kompetisi Tenaga Kerja Konstruksi (antar tukang/tenaga kerja)"
            },
            {
              time: "08.00-12.00",
              title: "Uji Sertifikasi Kompetensi Kerja Batch 1",
              desc: "Uji SKK Konstruksi - Sesi Pagi (Batch 1)"
            },
            {
              time: "09.00-12.00",
              title: "Sinergi Bisnis & Trimble Solutions",
              desc: "Sinergi Bisnis 3-4-2 perusahaan Trimble Solutions (Sesi 1)"
            },
            {
              time: "09.00-12.00",
              title: "Talk Show 3: Solusi Perumahan Rakyat",
              desc: "Talk Show - 3: Perumahan Layak dan Terjangkau, Solusi untuk Kebutuhan Masyarakt Narasumber: Kementerian Perumahan Rakyat"
            },
            {
              time: "12.00-13.30",
              title: "Istirahat & Sholat Jumat",
              desc: "ISTIRAHAT, Sholat Jumat & Makan Siang"
            },
            {
              time: "13.30-17.00",
              title: "Sinergi Bisnis Rantai Pasok Lanjutan",
              desc: "Sinergi Bisnis 5-6~2 perusahaan"
            },
            {
              time: "13.30-16.30",
              title: "Uji Sertifikasi Kompetensi Kerja Batch 2",
              desc: "Uji SKK Konstruksi - Sesi Siang (Batch 2)"
            },
            {
              time: "13.30-15.30",
              title: "Talk Show 4: Profesionalisme Jasa Konstruksi",
              desc: "Talk Show - 4: Meningkatkan Profesionalisme dan Kompetensi, Tulang Punggung Jasa Konstruksi Nasional Narasumber: LPJK"
            },
            {
              time: "13.30-16.30",
              title: "Kompetisi Estimasi Biaya & BIM Mahasiswa",
              desc: "KOMPETISI HARI 1 Sesi Siang: Kompetisi IQSI - TRIMBLE Mahasiswa Teknik Sipil/Konstruksi (Estimasi Biaya / RAB & BIM)"
            },
            {
              time: "16.00-18.00",
              title: "Talk Show 5: Perencanaan Pembangunan Berkualitas",
              desc: "Talk Show 5: Perencanaan yang Cerdas: Dasar Keberhasilan Pembangunan Berkualitas Narasumber: INKINDO"
            },
            {
              time: "18.30-21.00",
              title: "Malam Apresiasi & Seni Budaya Hari Ke-2",
              desc: "Malam Apresiasi Pelaku Konstruksi - Hiburan Seni Budaya Sulsel Hari 2"
            },
            {
              time: "21.00",
              title: "Penutupan Pameran Hari Kedua",
              desc: "Pameran Hari Kedua Ditutup"
            }
          ]
        },
        {
          id: 'day_3',
          label: 'Hari 3',
          date: "26 September 2026",
          schedule: [
            {
              time: "07.30-08.00",
              title: "Briefing Internal Panitia",
              desc: "Briefing pagi panitia & persiapan"
            },
            {
              time: "08.00-09.00",
              title: "Pembukaan Pameran Kunjungan Edukasi",
              desc: "Pameran dibuka - Registrasi pengunjung (termasuk rombongan sekolah/kampus)"
            },
            {
              time: "08.00-12.00",
              title: "Final Kompetisi Tenaga Kerja",
              desc: "KOMPETISI FINAL - Tenaga Kerja: Final & Penilaian Juri, Pengumuman Finalis"
            },
            {
              time: "08.00-12.00",
              title: "Kompetisi Estimasi Proyek Antar Instansi",
              desc: "KOMPETISI - Antar Instansi: Estimasi Proyek / Building Information Modelling (BIM)"
            },
            {
              time: "08.00-12.00",
              title: "Uji Sertifikasi Kompetensi Kerja Batch 3",
              desc: "Uji SKK Konstruksi - Sesi Pagi (Batch 3)"
            },
            {
              time: "09.00-12.00",
              title: "Sinergi Bisnis Perusahaan Partner",
              desc: "Sinergi Bisnis 7-8-2 perusahaan"
            },
            {
              time: "09.00-12.00",
              title: "Talk Show 6: Peran Kontraktor Profesional",
              desc: "Talk Show -6: Kontraktor Profesional: Pendorong Utama Pembangunan Nasional yang Andal Narasumber: PERKOPINDO - Perusahaan Kontraktor Nasional"
            },
            {
              time: "12.00-13.30",
              title: "Istirahat, Sholat & Makan Siang",
              desc: "ISTIRAHAT & Sholat Dzuhur"
            },
            {
              time: "13.00-15.00",
              title: "Talk Show 7: Pengendalian Biaya Proyek",
              desc: "Talk Show-7: Pengukuran dan Pengendalian Biaya, Kunci Keberhasilan Keuangan Proyek Narasumber: IQSI- Perusahaan Rantai Pasok"
            },
            {
              time: "13.30-16.30",
              title: "Uji Sertifikasi Kompetensi Kerja Batch 4",
              desc: "Uji SKK Konstruksi - Sesi Siang (Batch 4)"
            },
            {
              time: "13.30-15.30",
              title: "Babak Final Kompetisi",
              desc: "KOMPETISI FINAL (Continued)"
            },
            {
              time: "15.00-17.00",
              title: "Sinergi Bisnis Rantai Pasok Strategis",
              desc: "Sinergi Bisnis 9-10~2 perusahaan"
            },
            {
              time: "15.30-17.30",
              title: "Talk Show 8: Manajemen Proyek Efektif",
              desc: "Talk Show-8: Manajemen Proyek Efektif, Mengoptimalkan Sumber Daya untuk Hasil Maksimal Narasumber: HAMKI - Perusahaan Rantai Pasok"
            },
            {
              time: "17.30-19.00",
              title: "Istirahat & Sholat Maghrib",
              desc: "ISTIRAHAT & Sholat Maghrib"
            },
            {
              time: "19.00-21.00",
              title: "Malam Puncak Budaya & Live Music",
              desc: "Malam Puncak Budaya: Pertunjukan Seni & Live Music Sulsel"
            },
            {
              time: "21.00",
              title: "Penutupan Pameran Hari Ketiga",
              desc: "Pameran Hari Ketiga Ditutup"
            }
          ]
        },
        {
          id: 'day_4',
          label: 'Hari 4',
          date: "27 September 2026",
          schedule: [
            {
              time: "08.00-09.00",
              title: "Pembukaan Pameran Hari Terakhir",
              desc: "Pameran dibuka - Hari terakhir pengunjung umum"
            },
            {
              time: "08.00-10.00",
              title: "Sesi Bebas Pengunjung & Final Pameran",
              desc: "Pameran Final Konstruksi & Sesi Bebas Pengunjung"
            },
            {
              time: "08.00-12.00",
              title: "Uji Sertifikasi Kompetensi Kerja Batch 5",
              desc: "Uji SKK Konstruksi - Sesi Pagi (Batch 5)"
            },
            {
              time: "09.00-12.00",
              title: "Talk Show 9: Pengawasan & Keandalan Bangunan",
              desc: "Talk Show - 9: Pengawasan dan Inspeksi: Jaminan Keamanan dan Keandalan Setiap Bangunan Narasumber: PAKKI - JAMKRINDO - BPJS"
            },
            {
              time: "09.00-12.00",
              title: "Sinergi Bisnis Sesi Penutup",
              desc: "Sinergi Bisnis 11-12-2 perusahaan"
            },
            {
              time: "12.00-15.00",
              title: "Talk Show 10: Sinergi Ekosistem Konstruksi",
              desc: "Talk Show 10- : Sinergi Ekosistem Konstruksi, Membangun Keunggulan Bersama Menuju ProBuild INTIM 2027 Narasumber: DPD PERKOPINDO - DBMBK-BJKW 6- Perusahaan Rantai Pasok"
            },
            {
              time: "15.30-15.40",
              title: "Pembukaan Seremoni Penutupan",
              desc: "Pembukaan Acara Penutupan oleh MC"
            },
            {
              time: "15.40-15.50",
              title: "Laporan & Rangkuman Kegiatan",
              desc: "Laporan Penyelenggara & Rangkuman Kegiatan"
            },
            {
              time: "15.50-16.00",
              title: "Sambutan Kepala Balai JK Wilayah 6",
              desc: "Sambutan Ka.Balai Jasa Konstruksi Wilayah 6"
            },
            {
              time: "16.00-16.10",
              title: "Sambutan Kadis BMBK Sulsel",
              desc: "Sambutan Kadis Bina Marga & Bina Konstruksi Prov. Sulsel"
            },
            {
              time: "16.10-16.45",
              title: "Penyerahan Penghargaan & Plakat",
              desc: "Pemberian hadiah, pemenang kompetisi, Plakat & Kenang-kenangan kepada Tamu VIP"
            },
            {
              time: "16.45-17.00",
              title: "Sambutan Resmi Menteri PU",
              desc: "Sambutan & Penutupan Resmi oleh Menteri PU/Wamen PU"
            },
            {
              time: "17.00-17.10",
              title: "Seremoni Ketuk Gong Penutupan",
              desc: "Penabuhan Gong Penutupan Resmi Pameran"
            },
            {
              time: "17.10-17.30",
              title: "Sesi Foto Bersama & Ramah Tamah",
              desc: "Foto Bersama & Sesi Ramah Tamah Terakhir"
            },
            {
              time: "17.30",
              title: "Penutupan Resmi Event ProBuild",
              desc: "PAMERAN ProBuild INTIM 2026 RESMI DITUTUP"
            }
          ]
        }
      ],
    },
    en: {
      heroSubtitle:
        "Eastern Indonesia's Largest Construction Exhibition. Makassar as the main gateway for future infrastructure innovation and collaboration.",
      heroTitle2: 'Building the Future of',
      heroTitle3: 'Eastern Indonesia',
      statsLabels: ['Exhibitors', 'Visitors', 'Expert Speakers'],
      visionLabel: 'About Us',
      visionTitle: ['Gateway to Sustainable', 'Development'],
      visionText1:
        'ProBuild 2026 is the largest B2B construction exhibition in Eastern Indonesia, featuring {exhibitor}+ exhibitors, {targetVisitor}+ professional visitors, and {speakers}+ expert speakers from across Indonesia. The event focuses on infrastructure innovation, building materials, digital construction technology (BIM & AI), and national strategic projects and Eastern region development.',
      visionText2:
        'Supported by the Directorate of Roads & Construction (DBMBK) South Sulawesi Province and BJKW VI Makassar, ProBuild INTIM 2026 targets more than {targetVisitor} professional visitors. Held in Makassar as the gateway to Eastern Indonesia, the location has strategic access through international airports and major seaports.',
      visionMission: [
        {
          icon: '🤝',
          title: 'Collaboration',
          description: 'Building synergy among industry players.',
        },
        {
          icon: '💡',
          title: 'Innovation',
          description: 'Showcasing cutting-edge construction technology.',
        },
        {
          icon: '📈',
          title: 'Investment',
          description: 'Opening investment opportunities for regional projects.',
        },
        {
          icon: '🌱',
          title: 'Green Infra',
          description: 'Focus on environmentally friendly construction.',
        },
      ],
      featuresTitle: 'Key Event Features',
      features: [
        {
          icon: '👥',
          title: 'Business Matching',
          description:
            'Special B2B sessions connecting contractors with preferred material suppliers.',
        },
        {
          icon: '🎤',
          title: 'Conference & Seminar',
          description: 'Knowledge sharing with national and international construction experts.',
        },
        {
          icon: '🏗️',
          title: 'Expo & Demo',
          description:
            'Live demonstrations of heavy equipment and the latest construction technology.',
        },
        {
          icon: '⚙️',
          title: 'Digital Integration',
          description:
            'Implementation of BIM (Building Information Modeling) and project digitalization.',
        },
      ],
      agendaTitle: 'Our Schedule',
      agendaSubtitle: 'A curated lineup of expert-led sessions, breakthrough insights, and forward-thinking discussions to shape the future of construction industry.',
      agendaDays: [
{
          id: 'day_1',
          label: 'Day 1',
          date: "24 September 2026",
          schedule: [
            {
              time: "07:00-08:00",
              title: "Guest & VIP Registration",
              desc: "Registration of Invited Guests, VIPs & Media"
            },
            {
              time: "08:00-08:30",
              title: "Opening Ceremony Rehearsal",
              desc: "Preparation & Rehearsal for Opening Ceremony"
            },
            {
              time: "08:30-09:00",
              title: "VIP Arrival & Traditional Welcome",
              desc: "Arrival & Reception of VIP Guests / Coordinating Minister (Menko AHY)"
            },
            {
              time: "09:00-09:10",
              title: "Event Introduction by MC",
              desc: "Opening by MC - Introduction to the Event"
            },
            {
              time: "09:10-09:20",
              title: "Quran Recitation & Prayer",
              desc: "Recitation of the Holy Quran & Prayer"
            },
            {
              time: "09:20-09:30",
              title: "National Anthem Session",
              desc: "Singing of the National Anthem (Indonesia Raya)"
            },
            {
              time: "09:30-09:40",
              title: "Traditional Welcome Dance",
              desc: "Tari Padduppa - Traditional Bugis-Makassar Welcome Dance"
            },
            {
              time: "09:40-09:55",
              title: "Organizer Welcome Remarks",
              desc: "Welcome Remarks by ProBuild INTIM 2026 Organizer"
            },
            {
              time: "09:55-10:05",
              title: "Gubernatorial Speech",
              desc: "Speech by the Governor of South Sulawesi Province"
            },
            {
              time: "10:05-10:55",
              title: "Ministerial Keynote Address",
              desc: "Keynote Speech & Directives by Coordinating Minister for Infrastructure (Menko AHY)"
            },
            {
              time: "10:55-11:20",
              title: "Official Exhibition Opening",
              desc: "Official Opening of the Exhibition"
            },
            {
              time: "11:20-11:40",
              title: "VIP Guided Exhibition Tour",
              desc: "VIP Guided Tour of Exhibition Booths"
            },
            {
              time: "11:40-12:00",
              title: "Press Conference",
              desc: "Media Session / Press Conference"
            },
            {
              time: "12:00-13:00",
              title: "Talk Show 1: Infrastructure Policy 2026-2035",
              desc: "Talk Show 1: \"Building the Foundation of the Future: National Infrastructure Policy Direction 2026-2035\" Speakers: Ministry of Infrastructure Moderators: Lilis Suryani S.T., M.T. & Achmad Syahroni ST (DPP PERTAPIN)"
            },
            {
              time: "13:00-17:00",
              title: "Supply Chain Business Synergy",
              desc: "Business Synergy Sessions 1-2 (Supply Chain Company Presentations) - 2 Companies"
            },
            {
              time: "13:00-15:00",
              title: "Talk Show 2: Building Construction Standards",
              desc: "Talk Show 2: \"Construction Standards for National Building Reliability\" Speakers: Ministry of Public Works Moderator: BJKW 6"
            },
            {
              time: "15:00-17:00",
              title: "Regional Construction Services Forum",
              desc: "Construction Services Forum - South Sulawesi Province Speakers: Ministry of Public Works Moderator: Dinas BMBK Prov. South Sulawesi"
            },
            {
              time: "19:30-21:00",
              title: "Cultural Arts Performance Day 1",
              desc: "South Sulawesi Cultural Arts Performance (Evening - Day 1)"
            },
            {
              time: "21:00",
              title: "Exhibition Day 1 Closing",
              desc: "Exhibition Day 1 Closed"
            }
          ]
        },
        {
          id: 'day_2',
          label: 'Day 2',
          date: "25 September 2026",
          schedule: [
            {
              time: "07:30-08:00",
              title: "Morning Briefing & Preparation",
              desc: "Morning Briefing for Committee & Venue Preparation"
            },
            {
              time: "08:00-09:00",
              title: "Exhibition Opening & Registration",
              desc: "Exhibition Opens - Visitor Registration"
            },
            {
              time: "08:00-12:00",
              title: "Skilled Labor Construction Competition",
              desc: "COMPETITION DAY 1 (Morning) - Construction Workforce Competition (between skilled workers / laborers)"
            },
            {
              time: "08:00-12:00",
              title: "SKK Competency Assessment Batch 1",
              desc: "SKK Construction Competency Assessment - Morning Session (Batch 1)"
            },
            {
              time: "09:00-12:00",
              title: "Business Synergy & Trimble Session 1",
              desc: "Business Synergy Sessions 3-4-2 Companies (incl. Trimble Solutions Session 1)"
            },
            {
              time: "09:00-12:00",
              title: "Talk Show 3: Community Housing Solutions",
              desc: "Talk Show 3: \"Decent and Affordable Housing: Solutions for Community Needs\" Speakers: Ministry of Housing Moderator: DPD PERKOPINDO"
            },
            {
              time: "12:00-13:30",
              title: "Lunch Break & Friday Prayer",
              desc: "Lunch Break & Friday Prayer (Sholat Jumat)"
            },
            {
              time: "13:30-17:00",
              title: "Corporate Business Synergy Sessions",
              desc: "Business Synergy Sessions 5-6-2 Companies"
            },
            {
              time: "13:30-16:30",
              title: "SKK Competency Assessment Batch 2",
              desc: "SKK Construction Competency Assessment - Afternoon Session (Batch 2)"
            },
            {
              time: "13:30-15:30",
              title: "Talk Show 4: Professionalism in Construction",
              desc: "Talk Show 4: \"Enhancing Professionalism and Competency: The Backbone of National Construction Services\" Speakers: LPJK Moderators: INKINDO - DPD PERTAPIN"
            },
            {
              time: "13:30-16:30",
              title: "Cost Estimation & BIM Student Competition",
              desc: "COMPETITION DAY 1 - Afternoon Session: Civil Engineering / Construction Student Competition (Cost Estimation / RAB & BIM) Organized by IQSI - TRIMBLE"
            },
            {
              time: "16:00-18:00",
              title: "Talk Show 5: Smart Development Planning",
              desc: "Talk Show 5: \"Smart Planning: The Key to Quality Development\" Speakers: INKINDO Moderator: PNUP"
            },
            {
              time: "18:30-21:00",
              title: "Practitioner Appreciation & Culture Night",
              desc: "Appreciation Evening for Construction Practitioners - South Sulawesi Cultural Entertainment (Day 2)"
            },
            {
              time: "21:00",
              title: "Exhibition Day 2 Closing",
              desc: "Exhibition Day 2 Closed"
            }
          ]
        },
        {
          id: 'day_3',
          label: 'Day 3',
          date: "26 September 2026",
          schedule: [
            {
              time: "07:30-08:00",
              title: "Morning Briefing & Venue Check",
              desc: "Morning Briefing for Committee & Venue Preparation"
            },
            {
              time: "08:00-09:00",
              title: "Exhibition Opening & School Visits",
              desc: "Exhibition Opens - Visitor Registration (incl. School / University Groups)"
            },
            {
              time: "08:00-12:00",
              title: "Workforce Competition Finals",
              desc: "COMPETITION FINAL - Workforce: Finals, Jury Scoring & Finalist Announcement"
            },
            {
              time: "08:00-12:00",
              title: "Inter-Agency BIM & Project Estimation",
              desc: "COMPETITION - Inter-Agency: Project Estimation / Building Information Modelling (BIM)"
            },
            {
              time: "08:00-12:00",
              title: "SKK Competency Assessment Batch 3",
              desc: "SKK Construction Competency Assessment - Morning Session (Batch 3)"
            },
            {
              time: "09:00-12:00",
              title: "Business Matching & Synergy",
              desc: "Business Synergy Sessions 7-8-2 Companies"
            },
            {
              time: "09:00-12:00",
              title: "Talk Show 6: Reliable National Development",
              desc: "Talk Show 6: \"Professional Contractors: The Primary Driver of Reliable National Development\" Speakers: PERKOPINDO - National Contractor Companies Moderator: UMI"
            },
            {
              time: "12:00-13:30",
              title: "Midday Break & Prayer",
              desc: "Lunch Break & Midday Prayer (Sholat Dzuhur)"
            },
            {
              time: "13:00-15:00",
              title: "Talk Show 7: Project Cost Control",
              desc: "Talk Show 7: \"Cost Measurement and Control: The Key to Financial Success in Projects\" Speakers: IQSI - Supply Chain Companies Moderator: ARDEV"
            },
            {
              time: "13:30-16:30",
              title: "SKK Competency Assessment Batch 4",
              desc: "SKK Construction Competency Assessment - Afternoon Session (Batch 4)"
            },
            {
              time: "13:30-15:30",
              title: "Final Stage Competition Continuation",
              desc: "COMPETITION FINAL (Continued)"
            },
            {
              time: "15:00-17:00",
              title: "B2B Supply Chain Synergy",
              desc: "Business Synergy Sessions 9-10-2 Companies"
            },
            {
              time: "15:30-17:30",
              title: "Talk Show 8: Effective Project Management",
              desc: "Talk Show 8: \"Effective Project Management: Optimizing Resources for Maximum Results\" Speakers: HAMKI - Supply Chain Companies Moderator: BJKW 6"
            },
            {
              time: "17:30-19:00",
              title: "Rest & Evening Prayer Break",
              desc: "Break & Maghrib Prayer (Sholat Maghrib)"
            },
            {
              time: "19:00-21:00",
              title: "Cultural Gala & Live Music Night",
              desc: "Cultural Gala Night: Arts Performance & South Sulawesi Live Music"
            },
            {
              time: "21:00",
              title: "Exhibition Day 3 Closing",
              desc: "Exhibition Day 3 Closed"
            }
          ]
        },
        {
          id: 'day_4',
          label: 'Day 4',
          date: "27 September 2026",
          schedule: [
            {
              time: "08:00-09:00",
              title: "Exhibition Final Day Opening",
              desc: "Exhibition Opens - Last Day for General Public"
            },
            {
              time: "08:00-10:00",
              title: "Public Free Exhibition Session",
              desc: "Final Construction Exhibition & Free Visitor Session"
            },
            {
              time: "08:00-12:00",
              title: "SKK Competency Assessment Batch 5",
              desc: "SKK Construction Competency Assessment - Morning Session (Batch 5)"
            },
            {
              time: "09:00-12:00",
              title: "Talk Show 9: Structural Safety & Inspection",
              desc: "Talk Show 9: \"Supervision and Inspection: Ensuring Safety and Reliability of Every Structure\" Speakers: PAKKI - JAMKRINDO - BPJS Moderator: BJKW 6"
            },
            {
              time: "09:00-12:00",
              title: "Final Supply Chain Synergy",
              desc: "Business Synergy Sessions 11-12-2 Companies"
            },
            {
              time: "12:00-15:00",
              title: "Talk Show 10: Construction Ecosystem Synergy",
              desc: "Talk Show 10: \"Construction Ecosystem Synergy: Building Excellence Together Toward ProBuild INTIM 2027\" Speakers: DPD PERKOPINDO-DBMBK-BJKW 6-Supply Chain Companies Moderator: PCO"
            },
            {
              time: "15:30-15:40",
              title: "Closing Ceremony Commencement",
              desc: "Opening of Closing Ceremony by MC"
            },
            {
              time: "15:40-15:50",
              title: "Organizer's Final Summary Report",
              desc: "Organizer's Report & Event Summary"
            },
            {
              time: "15:50-16:00",
              title: "Regional Construction Office Remarks",
              desc: "Remarks by Head of Construction Services Regional Office Wilayah 6"
            },
            {
              time: "16:00-16:10",
              title: "Provincial Infrastructure Agency Speech",
              desc: "Remarks by Head of Roads & Construction Agency, South Sulawesi Province"
            },
            {
              time: "16:10-16:45",
              title: "Awards & Awarding Ceremony",
              desc: "Prize Giving - Competition Winners, Plaques & Mementos for VIP Guests"
            },
            {
              time: "16:45-17:00",
              title: "Ministerial Closing Remarks",
              desc: "Remarks & Official Closing by Minister of Public Works / Deputy Minister"
            },
            {
              time: "17:00-17:10",
              title: "Official Gong Closing Ceremony",
              desc: "Gong Ceremony - Official Closing of the Exhibition"
            },
            {
              time: "17:10-17:30",
              title: "Final Group Photo & Networking",
              desc: "Group Photo & Final Networking Session"
            },
            {
              time: "17:30",
              title: "Official Event Closure",
              desc: "ProBuild INTIM 2026 OFFICIALLY CLOSED"
            }
          ]
        }
      ],
    },
  },

  // -----------------------------------------------
  // BOOTH PAGE (/booth)
  // -----------------------------------------------
  boothPage: {
    id: {
      heroTitle: 'Venue & Booth',
      heroSubtitle:
        'Pilih lokasi booth strategis Anda untuk eksposur maksimal selama ProBuild INTIM 2026.',
      venueLabel: 'VENUE LAYOUT',
      venueTitle: 'Venue Layout',
      venueSubtitle: 'Denah lokasi pameran ProBuild INTIM 2026',
      zoomHint: 'Klik untuk memperbesar',
      packagesLabel: 'EXHIBITION PACKAGE',
      packagesTitle: 'Pilih Paket Exhibitor',
      packagesSubtitle: 'Sesuaikan dengan target pemasaran dan kebutuhan branding Anda.',
      popularBadge: 'PALING POPULER',
      contactBtn: 'Contact for Pricing',
      sponsorLabel: 'SPONSORSHIP PACKAGE',
      sponsorTitle: 'Paket Sponsorship',
      sponsorSubtitle: 'Perkuat kehadiran brand Anda di industri konstruksi nasional.',
      sponsorColLevel: 'TINGKAT LEVEL',
      sponsorColPrivileges: 'HAK ISTIMEWA (KEY PRIVILEGES)',
      sponsorCta: 'Hubungi Kami untuk Penawaran',
      downloadLabel: 'DOKUMEN PENTING',
      downloadTitle: 'Download Dokumen',
      downloadSubtitle: 'Unduh dokumen penting terkait ProBuild INTIM 2026.',
      docs: [
        {
          title: 'Peraturan Exhibition',
          desc: 'Peraturan dan ketentuan yang harus dipatuhi oleh seluruh exhibitor selama event berlangsung.',
          btn: 'Download PDF',
        },
        {
          title: 'Jadwal Setup Booth',
          desc: 'Jadwal lengkap setup booth dan move-in exhibitor untuk mempersiapkan area pameran Anda.',
          btn: 'Download PDF',
        },
        {
          title: 'Jadwal Loading & Unloading',
          desc: 'Jadwal loading dan unloading booth untuk memastikan kelancaran proses bongkar muat barang.',
          btn: 'Download PDF',
        },
      ],
      packages: [
        {
          tagline: 'Eksisi untuk startup & UKM',
          features: [
            'Ukuran Booth 9 m²',
            'Booth standar',
            'Listrik 450 watt',
            'Logo di website ProBuild',
          ],
        },
        {
          tagline: 'Untuk brand yang berkembang',
          features: ['Ukuran Booth 18 m²', 'Booth custom', 'Demo area', 'Slot seminar 30 menit'],
        },
        {
          tagline: 'Dominasi pasar utama',
          features: [
            'Ukuran Booth 36 m²',
            'Booth paviliun',
            'Sponsorship seminar utama',
            'Booth di area VIP',
          ],
        },
      ],
      sponsorPackages: [
        {
          privileges: [
            'Naming rights (ProBuild Platinum Sponsor)',
            'Booth 54 m²',
            'Keynote slot',
            'Banner utama',
            'Slot iklan di medsos dan media kolaborasi konstruksi nusantara',
          ],
        },
        {
          privileges: [
            'Co-branding seminar',
            'Booth 36 m²',
            'Logo di semua materi promo',
            'Slot iklan di medsos dan media kolaborasi konstruksi nusantara',
          ],
        },
        {
          privileges: [
            'Co-branding seminar',
            'Booth 36 m²',
            'Logo di semua materi promo',
            'Slot iklan di medsos dan media kolaborasi konstruksi nusantara',
          ],
        },
        {
          privileges: [
            'Slot iklan di aplikasi ProBuild & LED venue',
            'Sesi interview eksklusif dengan media partner',
            'Akses ke media center & press room',
            'Penyebutan di press release resmi',
          ],
        },
      ],
      waMessageBooth: (name) =>
        `Halo, saya tertarik untuk booking booth di ProBuild INTIM 2026. Saya ingin mengetahui lebih lanjut mengenai Paket ${name} — termasuk ketersediaan lokasi, fasilitas yang didapat, serta proses pendaftarannya. Bisakah Anda membantu saya?`,
      waMessageSponsor: (name) =>
        `Halo, saya tertarik untuk menjadi sponsor di ProBuild INTIM 2026. Saya ingin mengetahui lebih lanjut mengenai Paket Sponsorship ${name} — termasuk hak istimewa, visibilitas brand, dan detail kerja samanya. Bisakah Anda memberikan informasi lebih lanjut?`,
    },
    en: {
      heroTitle: 'Venue & Booth',
      heroSubtitle:
        'Choose your strategic booth location for maximum exposure during ProBuild INTIM 2026.',
      venueLabel: 'VENUE LAYOUT',
      venueTitle: 'Venue Layout',
      venueSubtitle: 'Floor plan of the ProBuild INTIM 2026 exhibition venue',
      zoomHint: 'Click to zoom',
      packagesLabel: 'EXHIBITION PACKAGE',
      packagesTitle: 'Choose Your Exhibitor Package',
      packagesSubtitle: 'Tailored to your marketing goals and branding needs.',
      popularBadge: 'MOST POPULAR',
      contactBtn: 'Contact for Pricing',
      sponsorLabel: 'SPONSORSHIP PACKAGE',
      sponsorTitle: 'Sponsorship Packages',
      sponsorSubtitle: 'Strengthen your brand presence in the national construction industry.',
      sponsorColLevel: 'LEVEL TIER',
      sponsorColPrivileges: 'KEY PRIVILEGES',
      sponsorCta: 'Contact Us for Offer',
      downloadLabel: 'IMPORTANT DOCUMENTS',
      downloadTitle: 'Download Documents',
      downloadSubtitle: 'Download important documents related to ProBuild INTIM 2026.',
      docs: [
        {
          title: 'Exhibition Regulations',
          desc: 'Regulations and terms that all exhibitors must comply with during the event.',
          btn: 'Download PDF',
        },
        {
          title: 'Booth Setup Schedule',
          desc: 'Complete booth setup and exhibitor move-in schedule to prepare your exhibition area.',
          btn: 'Download PDF',
        },
        {
          title: 'Loading & Unloading Schedule',
          desc: 'Booth loading and unloading schedule to ensure a smooth goods handling process.',
          btn: 'Download PDF',
        },
      ],
      packages: [
        {
          tagline: 'Exposure for startups & SMEs',
          features: [
            'Booth Size 9 m²',
            'Standard booth',
            '450 watt electricity',
            'Logo on ProBuild website',
          ],
        },
        {
          tagline: 'For growing brands',
          features: ['Booth Size 18 m²', 'Custom booth', 'Demo area', '30-minute seminar slot'],
        },
        {
          tagline: 'Dominate the main market',
          features: [
            'Booth Size 36 m²',
            'Pavilion booth',
            'Main seminar sponsorship',
            'Booth in VIP area',
          ],
        },
      ],
      sponsorPackages: [
        {
          privileges: [
            'Main event naming rights',
            'Strategic booth 54m²',
            'Keynote speaker slot at main seminar',
            'Logo placement on main banners & promo materials',
          ],
        },
        {
          privileges: [
            'Co-branding selected seminar sessions',
            'Strategic booth 36m²',
            'Exclusive logo on digital promo materials',
            'Brand mention by MC at every session',
          ],
        },
        {
          privileges: [
            'Booth 18m²',
            'Logo placement on main stage backdrop',
            '10 VIP Tickets for invited guests',
            'Brochure distribution at registration area',
          ],
        },
        {
          privileges: [
            'Ad slot on ProBuild app & venue LED',
            'Exclusive interview session with media partner',
            'Access to media center & press room',
            'Mentioned in official press release',
          ],
        },
      ],
      waMessageBooth: (name) =>
        `Hello, I am interested in booking a booth at ProBuild INTIM 2026. I would like to know more about the ${name} Package — including location availability, included facilities, and the registration process. Could you help me?`,
      waMessageSponsor: (name) =>
        `Hello, I am interested in becoming a sponsor at ProBuild INTIM 2026. I would like to know more about the ${name} Sponsorship Package — including privileges, brand visibility, and partnership details. Could you provide more information?`,
    },
  },

  // -----------------------------------------------
  // PARALLAX (home section)
  // -----------------------------------------------
  parallax: {
    id: {
      headline1: 'Jelajahi Inovasi,',
      headline2: 'Perluas Koneksi, dan',
      headlineAccent: 'Peluang Baru',
      body: 'ProBuild menghadirkan ribuan pelaku industri dalam satu ekosistem kolaboratif.\n Dapatkan insight strategis, temukan solusi inovatif, dan bangun koneksi langsung dengan pengambil keputusan proyek nasional.',
      cta: 'Daftar Sebagai Visitor',
      features: [
        { icon: '🤝', text: '100+ Exhibitor' },
        { icon: '👥', text: '15.000+ Pengunjung' },
        { icon: '💡', text: '20+ Pembicara Profesional' },
        { icon: '📍', text: eventInfo.venue },
      ],
    },
    en: {
      headline1: 'Explore Innovation,',
      headline2: 'Your Network, and',
      headlineAccent: 'New Opportunities',
      body: 'ProBuild brings thousands of industry players together in one collaborative ecosystem.\n Gain strategic insights, discover innovative solutions, and build direct connections with national project decision-makers.',
      cta: 'Register as a Visitor',
      features: [
        { icon: '🤝', text: '100+ Exhibitors' },
        { icon: '👥', text: '15,000+ Visitors' },
        { icon: '💡', text: '20+ Professional Speakers' },
        { icon: '📍', text: eventInfo.venue },
      ],
    },
  },

  // -----------------------------------------------
  // PROJECT PREPARATION (home section)
  // -----------------------------------------------
  projectPreparation: {
    id: {
      label: 'Project Preparation',
      titleAccent: 'Strategi',
      titleSuffix: 'di Balik Panggung',
      subtitle:
        'Sebuah event berskala industri tidak dibangun dalam semalam. Ia lahir dari diskusi strategis bersama mitra, koordinasi lintas sektor, dan perencanaan detail yang matang.',
      strong: 'Karena kualitas sebuah expo ditentukan jauh sebelum pintu dibuka.',
    },
    en: {
      label: 'Project Preparation',
      titleAccent: 'The Strategy',
      titleSuffix: 'Behind the Stage',
      subtitle:
        'An industry-scale event is not built overnight. It is born from strategic discussions with partners, cross-sector coordination, and thorough detailed planning.',
      strong: 'Because the quality of an expo is determined long before the doors open.',
    },
  },
};
