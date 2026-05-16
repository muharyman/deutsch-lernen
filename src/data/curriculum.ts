import type { Level, MaterialChapter, MaterialExercise, MaterialLesson } from '../types';

interface ChapterSeed {
  title: string;
  goal: string;
  grammar: string[];
  phrases: Array<{ de: string; id: string }>;
  vocab: Array<{ de: string; id: string; example: string }>;
}

const LEVEL_SEEDS: Record<Level, ChapterSeed[]> = {
  A1: [
    {
      title: 'Kontakte und Begruessung',
      goal: 'Memperkenalkan diri, menyapa, mengeja nama, dan bertanya kabar.',
      grammar: ['Personalpronomen ich/du/Sie', 'Praesens: sein, heissen, kommen', 'W-Fragen: wie, woher, was'],
      phrases: [
        { de: 'Wie heissen Sie?', id: 'Siapa nama Anda?' },
        { de: 'Ich komme aus Indonesien.', id: 'Saya berasal dari Indonesia.' },
        { de: 'Freut mich.', id: 'Senang berkenalan.' },
      ],
      vocab: [
        { de: 'der Name', id: 'nama', example: 'Mein Name ist Rina.' },
        { de: 'das Land', id: 'negara', example: 'Deutschland ist ein Land in Europa.' },
        { de: 'sprechen', id: 'berbicara', example: 'Ich spreche Indonesisch und ein bisschen Deutsch.' },
      ],
    },
    {
      title: 'Menschen und Alltag',
      goal: 'Menceritakan rutinitas sederhana, jam, dan kegiatan harian.',
      grammar: ['Regelmaessige Verben im Praesens', 'Satzklammer bei trennbaren Verben', 'Zeitangaben: am, um, von...bis'],
      phrases: [
        { de: 'Wann stehst du auf?', id: 'Kapan kamu bangun?' },
        { de: 'Ich arbeite von neun bis fuenf.', id: 'Saya bekerja dari jam sembilan sampai lima.' },
        { de: 'Am Abend lerne ich Deutsch.', id: 'Malam hari saya belajar bahasa Jerman.' },
      ],
      vocab: [
        { de: 'aufstehen', id: 'bangun', example: 'Ich stehe um sieben Uhr auf.' },
        { de: 'fruehstuecken', id: 'sarapan', example: 'Wir fruehstuecken zusammen.' },
        { de: 'der Abend', id: 'malam', example: 'Am Abend bin ich zu Hause.' },
      ],
    },
    {
      title: 'Wohnen und Orientierung',
      goal: 'Mendeskripsikan rumah, ruangan, benda, dan letak.',
      grammar: ['Bestimmter und unbestimmter Artikel', 'Negation mit kein', 'Lokale Praepositionen mit Dativ'],
      phrases: [
        { de: 'Das Zimmer ist hell.', id: 'Kamar itu terang.' },
        { de: 'Die Lampe steht neben dem Bett.', id: 'Lampu ada di sebelah tempat tidur.' },
        { de: 'Es gibt eine Kueche.', id: 'Ada dapur.' },
      ],
      vocab: [
        { de: 'die Wohnung', id: 'apartemen', example: 'Meine Wohnung ist klein, aber ruhig.' },
        { de: 'der Tisch', id: 'meja', example: 'Der Tisch steht am Fenster.' },
        { de: 'gemuetlich', id: 'nyaman', example: 'Das Wohnzimmer ist sehr gemuetlich.' },
      ],
    },
    {
      title: 'Essen und Einkaufen',
      goal: 'Memesan makanan, menanyakan harga, dan membeli barang dasar.',
      grammar: ['Akkusativobjekt', 'Modalverb moechten', 'Pluralformen im Alltag'],
      phrases: [
        { de: 'Ich haette gern einen Kaffee.', id: 'Saya ingin satu kopi.' },
        { de: 'Was kostet das?', id: 'Berapa harganya?' },
        { de: 'Ich nehme die Tomaten.', id: 'Saya ambil tomatnya.' },
      ],
      vocab: [
        { de: 'das Brot', id: 'roti', example: 'Ich kaufe frisches Brot.' },
        { de: 'bezahlen', id: 'membayar', example: 'Kann ich mit Karte bezahlen?' },
        { de: 'guenstig', id: 'murah', example: 'Der Apfel ist heute guenstig.' },
      ],
    },
    {
      title: 'Familie und Freunde',
      goal: 'Menceritakan keluarga, teman, usia, dan hubungan pribadi.',
      grammar: ['Possessivartikel mein/dein/sein/ihr', 'haben im Praesens', 'Adjektive praedikativ'],
      phrases: [
        { de: 'Das ist meine Schwester.', id: 'Ini saudara perempuan saya.' },
        { de: 'Wir sind gute Freunde.', id: 'Kami teman baik.' },
        { de: 'Er ist sehr freundlich.', id: 'Dia sangat ramah.' },
      ],
      vocab: [
        { de: 'die Eltern', id: 'orang tua', example: 'Meine Eltern wohnen in Bandung.' },
        { de: 'der Freund', id: 'teman laki-laki', example: 'Mein Freund lernt auch Deutsch.' },
        { de: 'nett', id: 'baik/ramah', example: 'Die Lehrerin ist nett.' },
      ],
    },
    {
      title: 'Freizeit und Termine',
      goal: 'Membuat janji, bicara hobi, dan merencanakan akhir pekan.',
      grammar: ['Modalverb koennen', 'gern/lieber/am liebsten', 'Ja/Nein-Fragen'],
      phrases: [
        { de: 'Hast du am Samstag Zeit?', id: 'Apakah kamu ada waktu hari Sabtu?' },
        { de: 'Ich spiele gern Fussball.', id: 'Saya suka bermain sepak bola.' },
        { de: 'Wir koennen ins Kino gehen.', id: 'Kita bisa pergi ke bioskop.' },
      ],
      vocab: [
        { de: 'die Freizeit', id: 'waktu luang', example: 'In meiner Freizeit lese ich.' },
        { de: 'der Termin', id: 'janji temu', example: 'Ich habe morgen einen Termin.' },
        { de: 'wandern', id: 'mendaki/jalan alam', example: 'Am Sonntag wandern wir.' },
      ],
    },
    {
      title: 'Stadt und Verkehr',
      goal: 'Menanyakan arah, memahami transportasi, dan membeli tiket sederhana.',
      grammar: ['Imperativ mit Sie', 'Lokale Angaben: links/rechts/geradeaus', 'Dativ nach mit'],
      phrases: [
        { de: 'Wie komme ich zum Bahnhof?', id: 'Bagaimana cara ke stasiun?' },
        { de: 'Nehmen Sie den Bus Nummer vier.', id: 'Naiklah bus nomor empat.' },
        { de: 'Die Haltestelle ist dort drueben.', id: 'Halte ada di sebelah sana.' },
      ],
      vocab: [
        { de: 'der Bahnhof', id: 'stasiun', example: 'Der Bahnhof ist im Zentrum.' },
        { de: 'die Haltestelle', id: 'halte', example: 'Die Haltestelle ist vor der Schule.' },
        { de: 'umsteigen', id: 'ganti kendaraan', example: 'Wir muessen in Koeln umsteigen.' },
      ],
    },
    {
      title: 'A1 Wiederholung',
      goal: 'Menggabungkan semua kemampuan A1 dalam dialog dan tulisan pendek.',
      grammar: ['Praesens Wiederholung', 'Artikel und Negation', 'W-Fragen und Satzstellung'],
      phrases: [
        { de: 'Koennen Sie das bitte wiederholen?', id: 'Bisakah Anda mengulang itu?' },
        { de: 'Ich verstehe nur ein bisschen.', id: 'Saya hanya mengerti sedikit.' },
        { de: 'Das habe ich gelernt.', id: 'Itu sudah saya pelajari.' },
      ],
      vocab: [
        { de: 'wiederholen', id: 'mengulang', example: 'Bitte wiederholen Sie den Satz.' },
        { de: 'verstehen', id: 'mengerti', example: 'Ich verstehe die Aufgabe.' },
        { de: 'die Pruefung', id: 'ujian', example: 'Die Pruefung ist am Freitag.' },
      ],
    },
  ],
  A2: [
    {
      title: 'Vergangenheit und Alltag',
      goal: 'Menceritakan rutinitas dan pengalaman lampau sederhana.',
      grammar: ['Perfekt mit haben', 'Perfekt mit sein', 'Praeteritum von sein und haben'],
      phrases: [
        { de: 'Gestern habe ich lange gearbeitet.', id: 'Kemarin saya bekerja lama.' },
        { de: 'Wir sind nach Hause gegangen.', id: 'Kami pulang ke rumah.' },
        { de: 'Frueher hatte ich mehr Zeit.', id: 'Dulu saya punya lebih banyak waktu.' },
      ],
      vocab: [
        { de: 'erleben', id: 'mengalami', example: 'Ich habe viel erlebt.' },
        { de: 'passieren', id: 'terjadi', example: 'Was ist passiert?' },
        { de: 'muede', id: 'lelah', example: 'Nach der Arbeit bin ich muede.' },
      ],
    },
    {
      title: 'Wohnen, Nachbarn, Umgebung',
      goal: 'Mendeskripsikan tempat tinggal dan menyampaikan masalah rumah.',
      grammar: ['Wechselpraepositionen', 'Dativartikel', 'Komparativ'],
      phrases: [
        { de: 'Die Wohnung liegt im dritten Stock.', id: 'Apartemen itu berada di lantai tiga.' },
        { de: 'Der Balkon ist groesser als die Kueche.', id: 'Balkon lebih besar daripada dapur.' },
        { de: 'Ich habe ein Problem mit der Heizung.', id: 'Saya punya masalah dengan pemanas.' },
      ],
      vocab: [
        { de: 'die Miete', id: 'sewa', example: 'Die Miete ist ziemlich hoch.' },
        { de: 'der Nachbar', id: 'tetangga', example: 'Mein Nachbar ist hilfsbereit.' },
        { de: 'reparieren', id: 'memperbaiki', example: 'Der Hausmeister repariert die Tuer.' },
      ],
    },
    {
      title: 'Arbeit und Ausbildung',
      goal: 'Membicarakan pekerjaan, studi, pengalaman, dan rencana karier.',
      grammar: ['Nebensatz mit weil', 'Modalverben im Praesens', 'Ordinalzahlen fuer Termine'],
      phrases: [
        { de: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten moechte.', id: 'Saya belajar Jerman karena ingin bekerja di Jerman.' },
        { de: 'Ich muss meine Bewerbung schicken.', id: 'Saya harus mengirim lamaran.' },
        { de: 'Der Termin ist am dritten Juni.', id: 'Janjinya tanggal tiga Juni.' },
      ],
      vocab: [
        { de: 'die Ausbildung', id: 'pendidikan vokasi', example: 'Sie macht eine Ausbildung als Pflegerin.' },
        { de: 'die Stelle', id: 'posisi kerja', example: 'Ich suche eine neue Stelle.' },
        { de: 'zuverlaessig', id: 'dapat diandalkan', example: 'Ein Team braucht zuverlaessige Kollegen.' },
      ],
    },
    {
      title: 'Reisen und Mobilitaet',
      goal: 'Merencanakan perjalanan, memesan akomodasi, dan melapor masalah.',
      grammar: ['Indirekte Fragen mit ob/wann/wo', 'Praepositionen mit Akkusativ und Dativ', 'Trennbare Verben im Perfekt'],
      phrases: [
        { de: 'Wissen Sie, wann der Zug abfaehrt?', id: 'Apakah Anda tahu kapan kereta berangkat?' },
        { de: 'Ich habe online eingecheckt.', id: 'Saya sudah check-in online.' },
        { de: 'Das Zimmer ist leider zu laut.', id: 'Kamarnya sayangnya terlalu berisik.' },
      ],
      vocab: [
        { de: 'die Unterkunft', id: 'akomodasi', example: 'Unsere Unterkunft ist zentral.' },
        { de: 'die Verspaetung', id: 'keterlambatan', example: 'Der Zug hat Verspaetung.' },
        { de: 'buchen', id: 'memesan', example: 'Ich buche ein Hotelzimmer.' },
      ],
    },
    {
      title: 'Gesundheit und Koerper',
      goal: 'Menjelaskan gejala, membuat janji dokter, dan memahami saran.',
      grammar: ['Imperativ du/Sie', 'Reflexive Verben', 'Sollen als Rat'],
      phrases: [
        { de: 'Ich fuehle mich nicht wohl.', id: 'Saya merasa tidak enak badan.' },
        { de: 'Sie sollten viel Wasser trinken.', id: 'Anda sebaiknya minum banyak air.' },
        { de: 'Ruhen Sie sich aus.', id: 'Beristirahatlah.' },
      ],
      vocab: [
        { de: 'die Schmerzen', id: 'rasa sakit', example: 'Ich habe Rueckenschmerzen.' },
        { de: 'das Rezept', id: 'resep dokter', example: 'Der Arzt gibt mir ein Rezept.' },
        { de: 'sich erholen', id: 'pulih', example: 'Ich erhole mich zu Hause.' },
      ],
    },
    {
      title: 'Medien und Meinungen',
      goal: 'Menyampaikan pendapat sederhana tentang media dan kebiasaan digital.',
      grammar: ['Nebensatz mit dass', 'Konjunktiv II mit wuerde', 'Konnektoren: deshalb, trotzdem'],
      phrases: [
        { de: 'Ich finde, dass Podcasts hilfreich sind.', id: 'Menurut saya podcast itu membantu.' },
        { de: 'Ich wuerde weniger Zeit online verbringen.', id: 'Saya akan menghabiskan lebih sedikit waktu online.' },
        { de: 'Trotzdem lese ich jeden Tag Nachrichten.', id: 'Meski begitu saya membaca berita setiap hari.' },
      ],
      vocab: [
        { de: 'die Nachricht', id: 'berita', example: 'Die Nachricht ist interessant.' },
        { de: 'die Meinung', id: 'pendapat', example: 'Was ist deine Meinung?' },
        { de: 'nuetzlich', id: 'berguna', example: 'Die App ist sehr nuetzlich.' },
      ],
    },
    {
      title: 'Kultur und Feste',
      goal: 'Menceritakan tradisi, undangan, dan pengalaman budaya.',
      grammar: ['Adjektive im Nominativ und Akkusativ', 'Seit/seitdem fuer Zeit', 'Relativsatz Einstieg'],
      phrases: [
        { de: 'Ich lade dich zu meiner Feier ein.', id: 'Saya mengundangmu ke acara saya.' },
        { de: 'Seit zwei Jahren lerne ich Deutsch.', id: 'Saya belajar Jerman sejak dua tahun.' },
        { de: 'Das ist ein Fest, das ich mag.', id: 'Itu acara yang saya sukai.' },
      ],
      vocab: [
        { de: 'die Einladung', id: 'undangan', example: 'Danke fuer die Einladung.' },
        { de: 'die Tradition', id: 'tradisi', example: 'Diese Tradition ist alt.' },
        { de: 'feiern', id: 'merayakan', example: 'Wir feiern zusammen.' },
      ],
    },
    {
      title: 'A2 Pruefungstraining',
      goal: 'Melatih membaca, mendengar, menulis email, dan berbicara level A2.',
      grammar: ['A2 Satzstellung Review', 'Perfekt und Nebensatz Review', 'Redemittel fuer Pruefung'],
      phrases: [
        { de: 'Meiner Meinung nach ist das wichtig.', id: 'Menurut saya itu penting.' },
        { de: 'Koennten Sie mir bitte helfen?', id: 'Bisakah Anda membantu saya?' },
        { de: 'Ich freue mich auf Ihre Antwort.', id: 'Saya menantikan jawaban Anda.' },
      ],
      vocab: [
        { de: 'die Aufgabe', id: 'tugas/soal', example: 'Die Aufgabe ist klar.' },
        { de: 'ankreuzen', id: 'mencentang', example: 'Kreuzen Sie die richtige Antwort an.' },
        { de: 'begrenzen', id: 'membatasi', example: 'Bitte begrenzen Sie den Text auf 80 Woerter.' },
      ],
    },
  ],
  B1: [
    {
      title: 'Lebenswege und Biografien',
      goal: 'Menceritakan pengalaman hidup, perubahan, dan keputusan pribadi.',
      grammar: ['Perfekt vs Praeteritum', 'Temporale Konnektoren: als, wenn, nachdem', 'Nebensaetze festigen'],
      phrases: [
        { de: 'Als ich nach Berlin kam, war alles neu.', id: 'Ketika saya datang ke Berlin, semuanya baru.' },
        { de: 'Nachdem ich den Kurs beendet hatte, suchte ich Arbeit.', id: 'Setelah menyelesaikan kursus, saya mencari kerja.' },
        { de: 'Diese Entscheidung hat mein Leben veraendert.', id: 'Keputusan ini mengubah hidup saya.' },
      ],
      vocab: [
        { de: 'die Erfahrung', id: 'pengalaman', example: 'Diese Erfahrung war wichtig fuer mich.' },
        { de: 'sich entscheiden', id: 'memutuskan', example: 'Ich entscheide mich fuer den Kurs.' },
        { de: 'veraendern', id: 'mengubah', example: 'Ein Umzug veraendert den Alltag.' },
      ],
    },
    {
      title: 'Arbeitswelt und Bewerbung',
      goal: 'Menulis lamaran, mengikuti wawancara, dan berdiskusi di tempat kerja.',
      grammar: ['Relativsaetze', 'Infinitiv mit zu', 'Hoefliche Bitten mit Konjunktiv II'],
      phrases: [
        { de: 'Ich bewerbe mich um die Stelle als Entwickler.', id: 'Saya melamar posisi sebagai developer.' },
        { de: 'Ich habe Erfahrung, die gut zu Ihrem Team passt.', id: 'Saya punya pengalaman yang cocok dengan tim Anda.' },
        { de: 'Koennten wir einen Termin vereinbaren?', id: 'Bisakah kita membuat janji?' },
      ],
      vocab: [
        { de: 'die Bewerbung', id: 'lamaran', example: 'Meine Bewerbung ist fertig.' },
        { de: 'die Faehigkeit', id: 'kemampuan', example: 'Kommunikation ist eine wichtige Faehigkeit.' },
        { de: 'vereinbaren', id: 'menyepakati', example: 'Wir vereinbaren einen Termin.' },
      ],
    },
    {
      title: 'Umwelt und Konsum',
      goal: 'Membicarakan lingkungan, konsumsi, dan solusi sehari-hari.',
      grammar: ['Passiv Praesens', 'Konnektoren: obwohl, trotzdem, deswegen', 'Vergleiche mit je...desto'],
      phrases: [
        { de: 'Plastik wird oft nur einmal benutzt.', id: 'Plastik sering hanya dipakai sekali.' },
        { de: 'Obwohl es teurer ist, kaufe ich regionale Produkte.', id: 'Walau lebih mahal, saya membeli produk lokal.' },
        { de: 'Je weniger wir verschwenden, desto besser ist es.', id: 'Semakin sedikit kita boros, semakin baik.' },
      ],
      vocab: [
        { de: 'die Umwelt', id: 'lingkungan', example: 'Wir schuetzen die Umwelt.' },
        { de: 'vermeiden', id: 'menghindari', example: 'Ich vermeide Plastik.' },
        { de: 'nachhaltig', id: 'berkelanjutan', example: 'Nachhaltige Produkte sind wichtig.' },
      ],
    },
    {
      title: 'Medien, Nachrichten, Fake News',
      goal: 'Memahami berita, mengevaluasi sumber, dan menyampaikan opini.',
      grammar: ['Indirekte Rede Einstieg', 'Vermutungen mit sollen/wollen', 'Nominalisierung Einstieg'],
      phrases: [
        { de: 'Der Artikel behauptet, dass die Preise steigen.', id: 'Artikel itu mengklaim harga naik.' },
        { de: 'Diese Quelle wirkt nicht vertrauenswuerdig.', id: 'Sumber ini tampak tidak tepercaya.' },
        { de: 'Die Nutzung sozialer Medien nimmt zu.', id: 'Penggunaan media sosial meningkat.' },
      ],
      vocab: [
        { de: 'die Quelle', id: 'sumber', example: 'Pruefe immer die Quelle.' },
        { de: 'behaupten', id: 'mengklaim', example: 'Er behauptet etwas Falsches.' },
        { de: 'vertrauenswuerdig', id: 'tepercaya', example: 'Die Zeitung ist vertrauenswuerdig.' },
      ],
    },
    {
      title: 'Gesellschaft und Engagement',
      goal: 'Berdiskusi tentang komunitas, relawan, aturan, dan tanggung jawab.',
      grammar: ['Zweiteilige Konnektoren: sowohl...als auch', 'Brauchen/nicht brauchen + zu', 'Finalsatz mit damit'],
      phrases: [
        { de: 'Ich engagiere mich, damit andere Hilfe bekommen.', id: 'Saya terlibat agar orang lain mendapat bantuan.' },
        { de: 'Man braucht nicht perfekt zu sein.', id: 'Seseorang tidak perlu sempurna.' },
        { de: 'Sowohl Zeit als auch Geduld sind wichtig.', id: 'Baik waktu maupun kesabaran itu penting.' },
      ],
      vocab: [
        { de: 'das Ehrenamt', id: 'kerja sukarela', example: 'Ein Ehrenamt kann viel bewirken.' },
        { de: 'die Verantwortung', id: 'tanggung jawab', example: 'Wir tragen Verantwortung.' },
        { de: 'unterstuetzen', id: 'mendukung', example: 'Wir unterstuetzen neue Mitglieder.' },
      ],
    },
    {
      title: 'Bildung und Lernen',
      goal: 'Membahas strategi belajar, kursus, dan pendidikan seumur hidup.',
      grammar: ['Partizipien als Adjektive', 'Kausale und konsekutive Konnektoren', 'Satzverbindungen variieren'],
      phrases: [
        { de: 'Regelmaessiges Wiederholen hilft mir.', id: 'Pengulangan rutin membantu saya.' },
        { de: 'Der gelesene Text war anspruchsvoll.', id: 'Teks yang dibaca itu menantang.' },
        { de: 'Deshalb plane ich feste Lernzeiten.', id: 'Karena itu saya merencanakan waktu belajar tetap.' },
      ],
      vocab: [
        { de: 'die Weiterbildung', id: 'pendidikan lanjutan', example: 'Weiterbildung ist im Beruf wichtig.' },
        { de: 'anspruchsvoll', id: 'menantang', example: 'Die Aufgabe ist anspruchsvoll.' },
        { de: 'sich verbessern', id: 'meningkatkan diri', example: 'Ich verbessere mich jede Woche.' },
      ],
    },
    {
      title: 'Kultur, Reisen, Perspektiven',
      goal: 'Membandingkan budaya, menjelaskan kesan, dan menulis laporan perjalanan.',
      grammar: ['Adjektivdeklination festigen', 'Praepositionen mit Genitiv Einstieg', 'Redemittel fuer Vergleich'],
      phrases: [
        { de: 'Im Vergleich zu Jakarta ist Muenchen ruhiger.', id: 'Dibanding Jakarta, Muenchen lebih tenang.' },
        { de: 'Waehrend der Reise habe ich viel gelernt.', id: 'Selama perjalanan saya belajar banyak.' },
        { de: 'Diese kulturelle Erfahrung bleibt mir in Erinnerung.', id: 'Pengalaman budaya ini akan saya ingat.' },
      ],
      vocab: [
        { de: 'der Eindruck', id: 'kesan', example: 'Mein erster Eindruck war positiv.' },
        { de: 'vergleichen', id: 'membandingkan', example: 'Wir vergleichen zwei Staedte.' },
        { de: 'die Gewohnheit', id: 'kebiasaan', example: 'Jede Kultur hat eigene Gewohnheiten.' },
      ],
    },
    {
      title: 'B1 Pruefungstraining',
      goal: 'Melatih Lesen, Hoeren, Schreiben, dan Sprechen untuk performa B1.',
      grammar: ['Argumentation mit Einleitung-Hauptteil-Schluss', 'Redemittel fuer Meinung', 'Fehlerkorrektur eigener Texte'],
      phrases: [
        { de: 'Ich bin der Ansicht, dass...', id: 'Saya berpandangan bahwa...' },
        { de: 'Ein Vorteil ist..., ein Nachteil ist...', id: 'Satu keuntungan adalah..., satu kerugian adalah...' },
        { de: 'Zusammenfassend kann man sagen...', id: 'Sebagai ringkasan dapat dikatakan...' },
      ],
      vocab: [
        { de: 'begrueden', id: 'memberi alasan', example: 'Bitte begruenden Sie Ihre Meinung.' },
        { de: 'zusammenfassen', id: 'merangkum', example: 'Fassen Sie den Text kurz zusammen.' },
        { de: 'die Loesung', id: 'solusi', example: 'Wir suchen eine passende Loesung.' },
      ],
    },
  ],
  B2: [
    {
      title: 'Komplexe Meinungen und Debatte',
      goal: 'Membangun argumen panjang, menanggapi kontra-argumen, dan memberi contoh.',
      grammar: ['Konnektoren auf B2-Niveau', 'Nominalstil vs Verbalstil', 'Einschraenkungen formulieren'],
      phrases: [
        { de: 'Das Argument ueberzeugt mich nur teilweise.', id: 'Argumen itu hanya sebagian meyakinkan saya.' },
        { de: 'Dabei sollte man jedoch beruecksichtigen, dass...', id: 'Namun perlu dipertimbangkan bahwa...' },
        { de: 'Aus meiner Sicht ueberwiegen die Vorteile.', id: 'Menurut saya keuntungannya lebih dominan.' },
      ],
      vocab: [
        { de: 'ueberwiegen', id: 'lebih dominan', example: 'Die Vorteile ueberwiegen deutlich.' },
        { de: 'beruecksichtigen', id: 'mempertimbangkan', example: 'Wir beruecksichtigen die Kosten.' },
        { de: 'der Einwand', id: 'sanggahan', example: 'Der Einwand ist berechtigt.' },
      ],
    },
    {
      title: 'Wirtschaft und Arbeit im Wandel',
      goal: 'Membahas ekonomi, kerja fleksibel, digitalisasi, dan produktivitas.',
      grammar: ['Passiv mit Modalverben', 'Funktionsverbgefuege', 'Partizipialattribute'],
      phrases: [
        { de: 'Arbeitsprozesse koennen automatisiert werden.', id: 'Proses kerja dapat diotomatisasi.' },
        { de: 'Das Unternehmen trifft eine Entscheidung.', id: 'Perusahaan mengambil keputusan.' },
        { de: 'Die steigenden Kosten belasten kleine Betriebe.', id: 'Biaya yang meningkat membebani usaha kecil.' },
      ],
      vocab: [
        { de: 'der Betrieb', id: 'usaha/perusahaan', example: 'Der Betrieb stellt neue Mitarbeiter ein.' },
        { de: 'die Produktivitaet', id: 'produktivitas', example: 'Flexible Arbeit kann die Produktivitaet erhoehen.' },
        { de: 'belasten', id: 'membebani', example: 'Hohe Mieten belasten Familien.' },
      ],
    },
    {
      title: 'Wissenschaft und Forschung',
      goal: 'Menjelaskan hasil riset, data, sebab-akibat, dan keterbatasan.',
      grammar: ['Konjunktiv I fuer Bericht', 'Kausale Nominalisierung', 'Vermutungen differenzieren'],
      phrases: [
        { de: 'Die Studie kommt zu dem Ergebnis, dass...', id: 'Studi itu sampai pada hasil bahwa...' },
        { de: 'Die Daten lassen vermuten, dass...', id: 'Data menunjukkan kemungkinan bahwa...' },
        { de: 'Die Aussagekraft ist begrenzt.', id: 'Kekuatan kesimpulannya terbatas.' },
      ],
      vocab: [
        { de: 'die Untersuchung', id: 'penelitian', example: 'Die Untersuchung dauert ein Jahr.' },
        { de: 'die Aussagekraft', id: 'daya/kekuatan kesimpulan', example: 'Die Aussagekraft der Daten ist hoch.' },
        { de: 'belegen', id: 'membuktikan/mendukung', example: 'Zahlen belegen den Trend.' },
      ],
    },
    {
      title: 'Gesellschaft, Migration, Identitaet',
      goal: 'Berdiskusi tentang integrasi, identitas, dan kehidupan multikultural.',
      grammar: ['Relativsaetze mit was/wo', 'Konzessive Strukturen', 'Abstrakte Nomen mit Artikeln'],
      phrases: [
        { de: 'Integration bedeutet mehr als Spracherwerb.', id: 'Integrasi berarti lebih dari pemerolehan bahasa.' },
        { de: 'Was oft unterschaetzt wird, ist der soziale Kontakt.', id: 'Yang sering diremehkan adalah kontak sosial.' },
        { de: 'Trotz unterschiedlicher Erfahrungen gibt es Gemeinsamkeiten.', id: 'Walau pengalaman berbeda, ada kesamaan.' },
      ],
      vocab: [
        { de: 'die Zugehoerigkeit', id: 'rasa memiliki', example: 'Zugehoerigkeit entsteht durch Austausch.' },
        { de: 'unterschaetzen', id: 'meremehkan', example: 'Man sollte den Aufwand nicht unterschaetzen.' },
        { de: 'die Gemeinsamkeit', id: 'kesamaan', example: 'Wir suchen Gemeinsamkeiten.' },
      ],
    },
    {
      title: 'Medienethik und Technologie',
      goal: 'Menganalisis AI, privasi, algoritme, dan tanggung jawab digital.',
      grammar: ['Passiversatzformen', 'Modalpartikeln in Diskussionen', 'Bedingungssaetze mit falls/sofern'],
      phrases: [
        { de: 'Daten sind sorgfaeltig zu schuetzen.', id: 'Data harus dilindungi dengan hati-hati.' },
        { de: 'Falls Algorithmen falsch trainiert werden, entstehen Risiken.', id: 'Jika algoritme dilatih salah, muncul risiko.' },
        { de: 'Das ist ja gerade der kritische Punkt.', id: 'Itu justru poin kritisnya.' },
      ],
      vocab: [
        { de: 'der Datenschutz', id: 'perlindungan data', example: 'Datenschutz betrifft alle Nutzer.' },
        { de: 'die Verantwortung', id: 'tanggung jawab', example: 'Entwickler tragen Verantwortung.' },
        { de: 'verzerren', id: 'mendistorsi', example: 'Einseitige Daten verzerren das Ergebnis.' },
      ],
    },
    {
      title: 'Akademisches Schreiben',
      goal: 'Menulis ringkasan, argumentasi, dan teks formal yang koheren.',
      grammar: ['Textkohasion mit Verweisen', 'Nominalstil dosieren', 'Zitieren und Paraphrasieren'],
      phrases: [
        { de: 'Der vorliegende Text behandelt die Frage, ob...', id: 'Teks ini membahas pertanyaan apakah...' },
        { de: 'Im Folgenden werden zwei Aspekte dargestellt.', id: 'Berikut ini akan dipaparkan dua aspek.' },
        { de: 'Daraus laesst sich schliessen, dass...', id: 'Dari situ dapat disimpulkan bahwa...' },
      ],
      vocab: [
        { de: 'darstellen', id: 'memaparkan', example: 'Der Autor stellt ein Problem dar.' },
        { de: 'schlussfolgern', id: 'menyimpulkan', example: 'Wir schlussfolgern aus den Daten.' },
        { de: 'der Verweis', id: 'rujukan', example: 'Der Verweis macht den Text klarer.' },
      ],
    },
    {
      title: 'Recht, Regeln, Konflikte',
      goal: 'Memahami aturan, menyampaikan keluhan formal, dan menegosiasikan solusi.',
      grammar: ['Konjunktiv II Vergangenheit', 'Formelle Beschwerde', 'Konditionale Strukturen'],
      phrases: [
        { de: 'Haette ich das frueher gewusst, haette ich anders reagiert.', id: 'Jika tahu lebih awal, saya akan bereaksi berbeda.' },
        { de: 'Ich bitte Sie um eine schriftliche Rueckmeldung.', id: 'Saya mohon tanggapan tertulis.' },
        { de: 'Unter diesen Bedingungen ist eine Einigung moeglich.', id: 'Dalam kondisi ini, kesepakatan mungkin.' },
      ],
      vocab: [
        { de: 'die Beschwerde', id: 'keluhan', example: 'Ich schreibe eine Beschwerde.' },
        { de: 'die Einigung', id: 'kesepakatan', example: 'Wir erzielen eine Einigung.' },
        { de: 'die Bedingung', id: 'syarat/kondisi', example: 'Die Bedingung ist fair.' },
      ],
    },
    {
      title: 'B2 Pruefung und Praesentation',
      goal: 'Melatih presentasi, diskusi, ringkasan, dan strategi ujian B2.',
      grammar: ['Redemittel fuer Praesentation', 'Argumentationsstruktur', 'Selbstkorrektur und Praezision'],
      phrases: [
        { de: 'Ich moechte zunaechst einen kurzen Ueberblick geben.', id: 'Saya ingin terlebih dahulu memberi gambaran singkat.' },
        { de: 'Damit komme ich zum naechsten Punkt.', id: 'Dengan itu saya masuk ke poin berikutnya.' },
        { de: 'Abschliessend laesst sich festhalten, dass...', id: 'Sebagai penutup dapat dinyatakan bahwa...' },
      ],
      vocab: [
        { de: 'der Ueberblick', id: 'gambaran umum', example: 'Ich gebe einen Ueberblick.' },
        { de: 'praezise', id: 'presisi/tepat', example: 'Formulieren Sie praezise.' },
        { de: 'abschliessend', id: 'sebagai penutup', example: 'Abschliessend fasse ich zusammen.' },
      ],
    },
  ],
};

function buildExercises(seed: ChapterSeed, level: Level, lessonIndex: number): MaterialExercise[] {
  const phrase = seed.phrases[lessonIndex % seed.phrases.length];
  const vocab = seed.vocab[lessonIndex % seed.vocab.length];
  const grammar = seed.grammar[lessonIndex % seed.grammar.length];

  return [
    {
      type: 'multiple_choice',
      prompt: `Pilih arti yang paling tepat untuk "${phrase.de}".`,
      choices: [phrase.id, seed.phrases[(lessonIndex + 1) % seed.phrases.length].id, seed.phrases[(lessonIndex + 2) % seed.phrases.length].id],
      answer: phrase.id,
      explanation: `Ekspresi ini dipakai dalam konteks ${seed.title.toLowerCase()}.`,
    },
    {
      type: 'short_answer',
      prompt: `Tulis satu kalimat Jerman memakai kata "${vocab.de}".`,
      answer: vocab.example,
      explanation: 'Jawaban bisa bervariasi. Bandingkan struktur kalimatmu dengan contoh.',
    },
    {
      type: 'sentence_order',
      prompt: `Susun ide berikut menjadi kalimat ${level}: subjek + verba + informasi tambahan. Fokus: ${grammar}.`,
      answer: phrase.de,
      explanation: 'Perhatikan posisi verba utama dan informasi waktu/tempat.',
    },
    {
      type: lessonIndex === 2 ? 'writing' : 'speaking',
      prompt: lessonIndex === 2
        ? `Tulis 5-7 kalimat tentang topik "${seed.title}" memakai minimal dua ekspresi kunci.`
        : `Rekam atau ucapkan 45 detik tentang "${seed.title}" memakai ekspresi "${phrase.de}".`,
      explanation: 'Target latihan adalah produksi aktif, bukan jawaban tunggal.',
    },
  ];
}

function buildLesson(seed: ChapterSeed, level: Level, chapter: number, lessonIndex: number): MaterialLesson {
  const lessonTitles = ['Input inti', 'Pola dan contoh', 'Produksi aktif'];
  const id = `${level.toLowerCase()}-${chapter}-${lessonIndex + 1}`;
  const grammar = seed.grammar.slice(lessonIndex).concat(seed.grammar.slice(0, lessonIndex)).slice(0, 2);

  return {
    id,
    level,
    chapter,
    title: `${lessonTitles[lessonIndex]}: ${seed.title}`,
    minutes: level === 'A1' ? 25 + lessonIndex * 5 : level === 'A2' ? 35 + lessonIndex * 5 : 45 + lessonIndex * 5,
    summary: `${seed.goal} Materi ini dibuat orisinal sebagai pendamping belajar bertahap: pahami input, lihat pola, lalu produksi kalimat sendiri.`,
    grammarFocus: grammar,
    keyPhrases: seed.phrases,
    vocabulary: seed.vocab,
    examples: [
      seed.phrases[lessonIndex % seed.phrases.length].de,
      seed.vocab[lessonIndex % seed.vocab.length].example,
      `Ich uebe ${seed.title.toLowerCase()}, damit ich sicherer spreche.`,
    ],
    exercises: buildExercises(seed, level, lessonIndex),
  };
}

export const CURRICULUM: MaterialChapter[] = Object.entries(LEVEL_SEEDS).flatMap(([level, seeds]) =>
  seeds.map((seed, index) => ({
    id: `${level.toLowerCase()}-${index + 1}`,
    level: level as Level,
    number: index + 1,
    title: seed.title,
    goal: seed.goal,
    lessons: [0, 1, 2].map((lessonIndex) => buildLesson(seed, level as Level, index + 1, lessonIndex)),
  }))
);

export function getMaterialChapters(level: Level) {
  return CURRICULUM.filter((chapter) => chapter.level === level);
}

export function getAllMaterialLessons() {
  return CURRICULUM.flatMap((chapter) => chapter.lessons);
}
