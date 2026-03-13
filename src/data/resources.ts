import type { Resource } from '../types';

export const RESOURCES: Resource[] = [
  {
    name: 'Slow German',
    desc: 'Podcast dengan kecepatan lambat, cocok untuk A2-B1. Topik budaya dan kehidupan Jerman.',
    level: 'A2-B1',
    free: true,
    url: 'https://slowgerman.com',
    type: 'podcast',
  },
  {
    name: 'DW Deutsch Lernen',
    desc: 'Kursus resmi Deutsche Welle untuk semua level. Ada video, audio, dan latihan interaktif.',
    level: 'A1-C1',
    free: true,
    url: 'https://learngerman.dw.com',
    type: 'video',
  },
  {
    name: 'Easy German (YouTube)',
    desc: 'Video jalanan dengan subtitle Jerman dan Inggris. Sangat bagus untuk listening dan kosakata.',
    level: 'A2-B2',
    free: true,
    url: 'https://www.youtube.com/@EasyGerman',
    type: 'video',
  },
  {
    name: "Nicos Weg (ARD/DW)",
    desc: 'Serial video pembelajaran untuk A1-B1 dengan latihan online terintegrasi.',
    level: 'A1-B1',
    free: true,
    url: 'https://www.dw.com/de/deutsch-lernen/nicos-weg/s-52715',
    type: 'video',
  },
  {
    name: 'SWR Extra',
    desc: 'Berita bahasa Jerman sederhana dari SWR. Artikel pendek dengan kosakata B1.',
    level: 'B1',
    free: true,
    url: 'https://www.swr.de/extra/article-swr-bescheid-wissen-100.html',
    type: 'podcast',
  },
  {
    name: 'Goethe Institut Online',
    desc: 'Materi resmi dari Goethe Institut. Latihan ujian, kosakata, dan tata bahasa terstruktur.',
    level: 'A1-C2',
    free: false,
    url: 'https://www.goethe.de/en/spr/ueb.html',
    type: 'video',
  },
  {
    name: 'Anki',
    desc: 'Aplikasi flashcard berbasis spaced repetition. Import deck Jerman gratis dari AnkiWeb.',
    level: 'A1-C2',
    free: true,
    url: 'https://apps.ankiweb.net',
    type: 'app',
  },
  {
    name: 'Tandem',
    desc: 'Language exchange app. Cari partner native speaker Jerman untuk latihan percakapan.',
    level: 'A2-C2',
    free: true,
    url: 'https://www.tandem.net',
    type: 'app',
  },
  {
    name: 'italki',
    desc: 'Platform les privat dengan tutor native. Ada community tutor yang lebih terjangkau.',
    level: 'A1-C2',
    free: false,
    url: 'https://www.italki.com',
    type: 'app',
  },
  {
    name: 'Preply',
    desc: 'Les online dengan tutor bersertifikat. Jadwal fleksibel, bisa pilih spesialisasi.',
    level: 'A1-C2',
    free: false,
    url: 'https://preply.com',
    type: 'app',
  },
  {
    name: 'Deutsche Welle Podcast',
    desc: 'Beragam podcast topik dari DW: berita, budaya, sains. Kecepatan normal B2-C1.',
    level: 'B2-C1',
    free: true,
    url: 'https://www.dw.com/de/podcasts/s-103070',
    type: 'podcast',
  },
  {
    name: 'Deutsch Warum Nicht (DW)',
    desc: 'Serial radio klasik A1-B1. Cerita seru belajar bahasa sambil mengikuti petualangan.',
    level: 'A1-B1',
    free: true,
    url: 'https://www.dw.com/de/deutsch-warum-nicht/s-2119',
    type: 'podcast',
  },
];

export const GRAMMAR_TIPS = [
  // ── A1 ──────────────────────────────────────────────────────────────────────
  {
    title: 'Artikel: der, die, das',
    content:
      'Setiap kata benda dalam bahasa Jerman memiliki artikel grammatikal yang harus dihafal bersama kata bendanya. der = maskulin (der Mann, der Tisch), die = feminin (die Frau, die Schule), das = netral (das Kind, das Haus). Tidak ada aturan sempurna, tapi ada petunjuk: kata berakhiran -ung, -heit, -keit, -tion biasanya die; kata berakhiran -er, -ig, -ling biasanya der; kata berakhiran -chen, -lein, -um biasanya das. Contoh kalimat: "Der Hund ist groß." (Anjing itu besar.) | "Die Katze schläft." (Kucing itu tidur.) | "Das Auto ist neu." (Mobilnya baru.) Tips: selalu catat kata benda dengan artikelnya, misalnya "der Tisch" bukan hanya "Tisch".',
    level: 'A1',
  },
  {
    title: 'Konjugasi sein & haben',
    content:
      'sein (menjadi/adalah) dan haben (memiliki) adalah dua kata kerja terpenting dalam bahasa Jerman karena juga digunakan sebagai kata kerja bantu. Konjugasi sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. Konjugasi haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben. Contoh: "Ich bin müde." (Saya lelah.) | "Du hast Hunger." (Kamu lapar.) | "Wir sind Studenten." (Kami mahasiswa.) | "Sie hat ein Auto." (Dia punya mobil.) Kedua kata kerja ini juga membentuk Perfekt (masa lampau): "Ich habe gegessen." dan "Ich bin gegangen."',
    level: 'A1',
  },
  {
    title: 'Bestimmter & Unbestimmter Artikel',
    content:
      'Artikel tertentu (bestimmter Artikel) dipakai untuk sesuatu yang sudah dikenal/spesifik, sedangkan artikel tak tertentu (unbestimmter Artikel) untuk sesuatu yang baru disebutkan pertama kali atau tidak spesifik. Tabel artikel tertentu — Nominativ: der/die/das/die (Pl.) | Akkusativ: den/die/das/die. Tabel artikel tak tertentu — Nominativ: ein/eine/ein (tidak ada bentuk jamak) | Akkusativ: einen/eine/ein. Contoh: "Ich sehe einen Mann." (Saya melihat seorang pria — pertama kali disebut.) Lalu: "Der Mann ist groß." (Pria itu tinggi — sudah dikenal.) "Hast du ein Buch?" → "Ja, das Buch ist interessant." Perhatikan: artikel tak tertentu tidak memiliki bentuk jamak; gunakan kalimat tanpa artikel atau dengan "keine".',
    level: 'A1',
  },
  {
    title: 'Personalpronomen & Konjugasi Verba Reguler',
    content:
      'Kata ganti orang (Personalpronomen): ich (saya), du (kamu/informal), er (dia lk.), sie (dia pr.), es (itu), wir (kami/kita), ihr (kalian), sie (mereka), Sie (Anda/formal). Konjugasi verba reguler mengikuti pola akhiran: -e, -st, -t, -en, -t, -en. Contoh dengan "lernen" (belajar): ich lerne, du lernst, er/sie/es lernt, wir lernen, ihr lernt, sie/Sie lernen. Contoh dengan "wohnen" (tinggal): ich wohne, du wohnst, er wohnt, wir wohnen, ihr wohnt, sie wohnen. Kalimat: "Ich lerne Deutsch." (Saya belajar bahasa Jerman.) | "Du wohnst in Berlin." (Kamu tinggal di Berlin.) | "Sie arbeiten viel." (Mereka/Anda banyak bekerja.) Perhatikan: verba dengan batang berakhiran -t atau -d (arbeiten, finden) mendapat tambahan -e sebelum akhiran: du arbeit-e-st, er arbeit-e-t.',
    level: 'A1',
  },
  {
    title: 'Negation: nicht vs kein',
    content:
      'Untuk menegasikan kalimat dalam bahasa Jerman, gunakan "nicht" atau "kein" tergantung konteksnya. Gunakan "kein" untuk menegasikan kata benda yang didahului artikel tak tertentu atau tanpa artikel: "Ich habe ein Auto." → "Ich habe kein Auto." | "Er ist Arzt." → "Er ist kein Arzt." Kein berkonjugasi seperti artikel tak tertentu: kein/keine/kein (Nom.) | keinen/keine/kein (Akk.). Gunakan "nicht" untuk segala hal lainnya: menegasikan kata kerja, kata sifat, kata keterangan, atau kata benda dengan artikel tertentu. Contoh: "Ich komme nicht." (Saya tidak datang.) | "Das ist nicht schön." (Itu tidak indah.) | "Ich trinke den Kaffee nicht." (Saya tidak minum kopi itu.) Posisi "nicht": biasanya di akhir kalimat, atau tepat sebelum unsur yang dinegasikan.',
    level: 'A1',
  },
  {
    title: 'Possessivpronomen (Kata Ganti Kepemilikan)',
    content:
      'Possessivpronomen menunjukkan kepemilikan dan berkonjugasi seperti artikel tak tertentu. Bentuk dasar: mein (saya), dein (kamu), sein (dia lk./itu), ihr (dia pr.), unser (kami), euer (kalian), ihr (mereka), Ihr (Anda). Contoh deklinasi "mein" — Nominativ: mein/meine/mein | Akkusativ: meinen/meine/mein. Kalimat contoh: "Das ist mein Bruder." (Itu adalah saudaraku.) | "Ich liebe meine Familie." (Saya mencintai keluargaku.) | "Sein Haus ist groß." (Rumahnya [lk.] besar.) | "Ihr Auto ist rot." (Mobilnya [pr.] merah.) | "Unser Lehrer ist nett." (Guru kami baik.) Catatan khusus: "euer" kehilangan satu -e- saat diberi akhiran: euer → eu(e)re, eu(e)ren. Contoh: "Euer Hund ist süß." tapi "Ich sehe euren Hund."',
    level: 'A1',
  },
  {
    title: 'W-Fragen und Ja/Nein-Fragen',
    content:
      'Ada dua jenis pertanyaan dalam bahasa Jerman. (1) Ja/Nein-Fragen: kata kerja berada di posisi pertama, subjek di posisi kedua. Pola: Verb + Subjek + ...? Contoh: "Kommst du heute?" (Apakah kamu datang hari ini?) | "Ist er Lehrer?" (Apakah dia guru?) | "Haben Sie Zeit?" (Apakah Anda punya waktu?) (2) W-Fragen: diawali kata tanya W-, lalu kata kerja, lalu subjek. Kata tanya umum: wer (siapa), was (apa), wo (di mana), woher (dari mana), wohin (ke mana), wann (kapan), warum (mengapa), wie (bagaimana), wie viel(e) (berapa). Pola: W-Wort + Verb + Subjek + ...? Contoh: "Wo wohnst du?" (Di mana kamu tinggal?) | "Was machst du?" (Apa yang kamu lakukan?) | "Wann kommst du?" (Kapan kamu datang?) | "Warum lernst du Deutsch?" (Mengapa kamu belajar bahasa Jerman?)',
    level: 'A1',
  },
  {
    title: 'Satzstellung: Verb auf Position 2',
    content:
      'Aturan dasar susunan kalimat bahasa Jerman: kata kerja (finites Verb) selalu berada di posisi kedua dalam kalimat pernyataan (Aussagesatz). "Posisi kedua" bukan berarti kata ke-2, melainkan unsur kalimat ke-2. Pola normal: Subjek (Pos.1) + Verb (Pos.2) + ... Contoh: "Ich lerne jeden Tag Deutsch." (Saya belajar bahasa Jerman setiap hari.) Jika unsur lain ditempatkan di depan (topikalisasi), subjek berpindah ke posisi ke-3, tapi kata kerja tetap di posisi ke-2 (inversi): "Jeden Tag lerne ich Deutsch." (Setiap hari saya belajar bahasa Jerman.) | "In Berlin wohnt er." (Di Berlin dia tinggal.) Ini disebut Inversion. Aturan ini TIDAK berlaku untuk kalimat anak (Nebensatz), di mana kata kerja pergi ke akhir: "Ich weiß, dass er jeden Tag Deutsch lernt."',
    level: 'A1',
  },
  {
    title: 'Präpositionen mit Dativ',
    content:
      'Beberapa preposisi selalu diikuti kasus Dativ. Daftar tetap (wajib Dativ): aus (dari/terbuat dari), bei (di tempat/dekat), mit (dengan), nach (setelah/ke — untuk kota/negara), seit (sejak), von (dari/oleh), zu (ke), gegenüber (di seberang), außer (selain), ab (mulai dari). Perubahan artikel di Dativ: der → dem, die → der, das → dem, die (Pl.) → den (+n pada kata benda). Contoh: "Ich fahre mit dem Bus." (Saya naik bus.) | "Er wohnt bei seiner Mutter." (Dia tinggal di tempat ibunya.) | "Ich komme aus der Türkei." (Saya berasal dari Turki.) | "Nach dem Essen trinke ich Tee." (Setelah makan saya minum teh.) | "Seit einem Jahr lerne ich Deutsch." (Sudah satu tahun saya belajar bahasa Jerman.) Hafal daftar ini sebagai satu kesatuan!',
    level: 'A1',
  },
  {
    title: 'Plural-Bildung (Pembentukan Jamak)',
    content:
      'Pembentukan jamak kata benda Jerman tidak seragam; ada beberapa pola yang perlu dihafal. Pola utama: (1) Tanpa perubahan atau dengan Umlaut: der Lehrer → die Lehrer | der Vater → die Väter. (2) Akhiran -e atau -(ü/ö/ä)+e: der Tag → die Tage | der Stuhl → die Stühle. (3) Akhiran -er atau dengan Umlaut +er: das Kind → die Kinder | das Buch → die Bücher. (4) Akhiran -en/-n: die Frau → die Frauen | die Schule → die Schulen. (5) Akhiran -s (kata serapan): das Auto → die Autos | das Café → die Cafés. Tips: kata benda maskulin dan netral sering pakai -e atau -er; kata benda feminin hampir selalu pakai -en/-n. Selalu catat bentuk jamak saat belajar kosakata baru: "der Hund, die Hunde".',
    level: 'A1',
  },

  // ── A2 ──────────────────────────────────────────────────────────────────────
  {
    title: 'Kasus Nominativ & Akkusativ',
    content:
      'Nominativ adalah kasus subjek — pelaku utama dalam kalimat. Akkusativ adalah kasus objek langsung — yang dikenai tindakan. Perubahan artikel: Maskulin der → den (Akk.), ein → einen; Feminin die → die, eine → eine; Netral das → das, ein → ein; Jamak die → die. Preposisi yang selalu Akkusativ: durch (melalui), für (untuk), gegen (melawan/terhadap), ohne (tanpa), um (di sekitar/jam). Contoh: "Der Hund (Nom.) beißt den Mann (Akk.)." (Anjing menggigit pria itu.) | "Ich kaufe einen Apfel (Akk.)." (Saya membeli sebuah apel.) | "Das Buch ist für dich (Akk.)." (Buku itu untukmu.) | "Wir gehen durch den Park (Akk.)." (Kami berjalan melewati taman.)',
    level: 'A2',
  },
  {
    title: 'Trennbare Verben (Kata Kerja Terpisah)',
    content:
      'Kata kerja terpisah (trennbare Verben) memiliki awalan yang dapat dipisah. Di kalimat utama (Hauptsatz), awalan dipisah dan ditempatkan di akhir kalimat: aufstehen → "Ich stehe um 7 Uhr auf." | einkaufen → "Er kauft im Supermarkt ein." | anrufen → "Sie ruft ihren Freund an." Awalan umum yang dapat dipisah: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-, los-, fest-. Di kalimat anak (Nebensatz) tidak dipisah: "Ich weiß, dass er früh aufsteht." Di Infinitiv dengan "zu", sisipkan "zu" di antara awalan dan verba: "Er versucht, früh aufzustehen." Di Perfekt, "ge-" disisipkan setelah awalan: aufgestanden, eingekauft, angerufen. Cara membedakan: awalan yang dapat dipisah biasanya mendapat tekanan (stress) saat diucapkan: AUFstehen vs verSTEHen.',
    level: 'A2',
  },
  {
    title: 'Perfekt (Masa Lampau)',
    content:
      'Perfekt adalah bentuk lampau yang paling sering digunakan dalam percakapan lisan. Dibentuk dengan: haben atau sein (terkonjugasi) + Partizip II. Partizip II verba reguler: ge- + batang + -t (machen → gemacht, lernen → gelernt). Partizip II verba tidak reguler harus dihafal: gehen → gegangen, essen → gegessen, trinken → getrunken. Kapan pakai sein: (1) verba gerak yang menunjukkan perpindahan tempat: gehen, fahren, fliegen, kommen, laufen; (2) verba perubahan kondisi: aufwachen, einschlafen, sterben, wachsen; (3) sein dan bleiben sendiri. Semua verba lain pakai haben. Contoh: "Ich habe Pizza gegessen." (Saya sudah makan pizza.) | "Wir sind nach Berlin gefahren." (Kami pergi ke Berlin.) | "Er hat ein Buch gelesen." (Dia sudah membaca buku.) | "Sie ist früh aufgewacht." (Dia terbangun lebih awal.)',
    level: 'A2',
  },
  {
    title: 'Dativkasus (Kasus Dativ)',
    content:
      'Dativ adalah kasus objek tidak langsung — menunjukkan kepada/untuk siapa sesuatu dilakukan. Perubahan artikel di Dativ: der → dem, die → der, das → dem, die (Pl.) → den (kata benda + -n). Perubahan artikel tak tertentu: ein → einem, eine → einer, ein → einem. Kata kerja yang memerlukan Dativ (Dativverben): helfen (membantu), danken (berterima kasih), gehören (milik), gefallen (menyukai/cocok), antworten (menjawab), folgen (mengikuti), glauben (percaya). Contoh: "Ich helfe dem Mann." (Saya membantu pria itu.) | "Das gehört meiner Schwester." (Itu milik saudariku.) | "Ich gebe dem Kind ein Buch." (Saya memberikan buku kepada anak itu — Kind = Dativ, Buch = Akkusativ.) | "Die Stadt gefällt mir sehr." (Kota ini sangat kusuka.) Ingat: kalimat dengan dua objek, orang = Dativ, benda = Akkusativ.',
    level: 'A2',
  },
  {
    title: 'Wechselpräpositionen (Preposisi Dua Kasus)',
    content:
      'Sembilan preposisi ini dapat diikuti Akkusativ ATAU Dativ tergantung maknanya. Daftar: in, an, auf, über, unter, vor, hinter, neben, zwischen. Aturan: Akkusativ = gerakan/arah menuju (wohin? → ke mana?), Dativ = posisi/lokasi (wo? → di mana?). Contoh dengan "in": "Ich gehe in die Schule." (Saya pergi ke sekolah — Akk., gerakan) vs "Ich bin in der Schule." (Saya ada di sekolah — Dat., posisi.) Contoh dengan "auf": "Leg das Buch auf den Tisch!" (Taruh buku itu di meja! — Akk.) vs "Das Buch liegt auf dem Tisch." (Buku itu terletak di meja — Dat.) Kontraksi umum: in + dem = im, in + das = ins, an + dem = am, an + das = ans, auf + das = aufs. Kata kerja aksi (legen, stellen, hängen, setzen) → Akk. | Kata kerja kondisi (liegen, stehen, hängen, sitzen) → Dat.',
    level: 'A2',
  },
  {
    title: 'Komparativ & Superlativ',
    content:
      'Untuk membandingkan, bahasa Jerman menggunakan tiga tingkat: Positiv, Komparativ, dan Superlativ. Pembentukan: Positiv (dasar) → Komparativ (tambah -er) → Superlativ (tambah -(e)sten). Contoh: schnell → schneller → am schnellsten (cepat → lebih cepat → tercepat) | klein → kleiner → am kleinsten | interessant → interessanter → am interessantesten. Banyak kata satu suku mendapat Umlaut: alt → älter → am ältesten | groß → größer → am größten | jung → jünger → am jüngsten | warm → wärmer → am wärmsten. Bentuk tidak beraturan: gut → besser → am besten | viel → mehr → am meisten | gern → lieber → am liebsten. Perbandingan: "Er ist so groß wie ich." (Dia setinggi saya — sama.) | "Sie ist größer als ich." (Dia lebih tinggi dari saya.) Komparativ sebagai atribut mendapat akhiran adjektif: "ein schnelleres Auto" (mobil yang lebih cepat).',
    level: 'A2',
  },
  {
    title: 'Imperativ (Kalimat Perintah)',
    content:
      'Imperativ (kalimat perintah) memiliki tiga bentuk sesuai siapa yang disapa. (1) du-Form: ambil batang verba, hilangkan akhiran -en, tidak perlu pronomen. Contoh: kommen → Komm! | lernen → Lern! | aufstehen → Steh auf! Verba dengan perubahan vokal e→i/ie mempertahankan perubahan: lesen → Lies! | geben → Gib! (2) ihr-Form: sama dengan konjugasi ihr tapi tanpa pronomen. Contoh: Kommt! | Lernt! | Steht auf! (3) Sie-Form: sama dengan konjugasi Sie tapi pronomen "Sie" tetap ditulis setelah verba. Contoh: Kommen Sie! | Lernen Sie! | Stehen Sie auf! Bentuk khusus sein: Sei ruhig! (du) | Seid ruhig! (ihr) | Seien Sie ruhig! (Sie). Contoh lengkap: "Mach die Tür zu!" (Tutup pintunya! — du) | "Macht eure Hausaufgaben!" (Kerjakan PR kalian! — ihr) | "Sprechen Sie bitte langsamer!" (Tolong berbicara lebih pelan! — Sie)',
    level: 'A2',
  },
  {
    title: 'Reflexive Verben (Kata Kerja Refleksif)',
    content:
      'Verba refleksif menggunakan kata ganti refleksif (Reflexivpronomen) karena subjek dan objeknya sama. Reflexivpronomen Akkusativ: mich, dich, sich, uns, euch, sich. Reflexivpronomen Dativ: mir, dir, sich, uns, euch, sich. Verba refleksif umum: sich waschen (mandi/mencuci diri), sich anziehen (berpakaian), sich setzen (duduk), sich freuen (senang), sich interessieren für (tertarik pada), sich erinnern an (mengingat), sich vorstellen (memperkenalkan diri / membayangkan), sich beeilen (terburu-buru). Contoh: "Ich wasche mich jeden Morgen." (Saya mandi setiap pagi — Akk.) | "Er freut sich über das Geschenk." (Dia senang dengan hadiahnya.) | "Wir setzen uns." (Kami duduk.) | "Kannst du dich an mich erinnern?" (Bisakah kamu mengingatku?) Dativ refleksif: "Ich wasche mir die Hände." (Saya mencuci tangan [saya sendiri] — Hände = Akk., mir = Dat.)',
    level: 'A2',
  },
  {
    title: 'Modalverben Komplett',
    content:
      'Modalverben (kata kerja modal) digunakan bersama infinitiv dan selalu mengirim infinitiv ke akhir kalimat. Enam modalverben: können (bisa/mampu), müssen (harus — keharusan internal/logis), wollen (mau/ingin), sollen (seharusnya — perintah dari orang lain), dürfen (boleh/diizinkan), mögen/möchten (suka/ingin — lebih sopan). Konjugasi — semua mengalami perubahan vokal di bentuk tunggal: können: ich kann, du kannst, er kann, wir können, ihr könnt, sie können | müssen: muss, musst, muss, müssen, müsst, müssen | wollen: will, willst, will, wollen, wollt, wollen | sollen: soll, sollst, soll, sollen, sollt, sollen | dürfen: darf, darfst, darf, dürfen, dürft, dürfen | möchten: möchte, möchtest, möchte, möchten, möchtet, möchten. Contoh: "Ich kann Deutsch sprechen." (Saya bisa berbicara bahasa Jerman.) | "Du musst schlafen." (Kamu harus tidur.) | "Er will reisen." (Dia mau bepergian.) | "Darf ich rauchen?" (Bolehkah saya merokok?) | "Sie möchte Kaffee trinken." (Dia ingin minum kopi.)',
    level: 'A2',
  },

  // ── B1 ──────────────────────────────────────────────────────────────────────
  {
    title: 'Konjunktionen: weil & dass',
    content:
      'weil (karena) dan dass (bahwa) adalah konjungsi subordinat yang memindahkan kata kerja ke akhir kalimat anak (Nebensatz). Pola: kalimat utama + Komma + konjungsi + subjek + ... + Verb. Contoh weil: "Ich lerne Deutsch, weil es sehr interessant ist." (Saya belajar bahasa Jerman karena sangat menarik.) | "Er bleibt zu Hause, weil er krank ist." (Dia tinggal di rumah karena dia sakit.) Contoh dass: "Ich weiß, dass er heute kommt." (Saya tahu bahwa dia datang hari ini.) | "Es ist wichtig, dass du pünktlich bist." (Penting bahwa kamu tepat waktu.) Catatan: dalam percakapan santai, "weil" kadang digunakan dengan kata kerja di posisi kedua (bukan standar): "Ich komme nicht, weil ich bin müde." — ini tidak benar secara gramatikal tapi sering terdengar. Dalam tulisan formal, selalu gunakan aturan baku: kata kerja di akhir.',
    level: 'B1',
  },
  {
    title: 'Relativsatz (Kalimat Relatif)',
    content:
      'Relativsatz mendeskripsikan kata benda secara lebih detail dan diawali oleh Relativpronomen (der, die, das, den, dem, deren, dessen, denen). Relativpronomen bergantung pada: (1) genus kata benda yang dideskripsikan, dan (2) kasus dalam kalimat relatif. Tabel Relativpronomen: Nom: der/die/das/die | Akk: den/die/das/die | Dat: dem/der/dem/denen | Gen: dessen/deren/dessen/deren. Contoh Nominativ: "Das ist der Mann, der Deutsch spricht." (Itu pria yang berbicara bahasa Jerman.) Akkusativ: "Das ist der Mann, den ich kenne." (Itu pria yang saya kenal.) Dativ: "Das ist der Mann, dem ich helfe." (Itu pria yang saya bantu.) Dengan preposisi: "Das ist der Freund, mit dem ich wohne." (Itu teman yang tinggal bersamaku.) Kata kerja Relativsatz selalu di akhir kalimat anak. Koma wajib sebelum relativpronomen.',
    level: 'B1',
  },
  {
    title: 'Konjunktiv II',
    content:
      'Konjunktiv II digunakan untuk: (1) Kondisi hipotetis/tidak nyata, (2) permintaan sopan, (3) saran. Dua cara pembentukan: (A) würde + Infinitiv (paling umum untuk verba biasa): "Ich würde gern reisen." (Saya ingin bepergian.) (B) Bentuk Konjunktiv II khusus untuk verba penting: sein → wäre, haben → hätte, können → könnte, müssen → müsste, dürfen → dürfte, wissen → wüsste, gehen → ginge (jarang). Kalimat bersyarat dengan "wenn": "Wenn ich Zeit hätte, würde ich mehr lesen." (Jika saya punya waktu, saya akan lebih banyak membaca.) | "Wenn ich reich wäre, würde ich ein Haus kaufen." (Jika saya kaya, saya akan membeli rumah.) Permintaan sopan: "Könnten Sie mir helfen?" (Bisakah Anda membantu saya?) | "Ich hätte gern einen Kaffee." (Saya ingin kopi — di restoran.) | "Dürfte ich fragen...?" (Bolehkah saya bertanya...?)',
    level: 'B1',
  },
  {
    title: 'Genitiv (Kasus Kepunyaan)',
    content:
      'Genitiv menunjukkan kepemilikan atau relasi antara dua benda, setara dengan "-nya" atau "dari" dalam bahasa Indonesia. Perubahan artikel: der → des (+ -s/-es pada kata benda msk./ntrl.), die → der, das → des (+ -s/-es), die Pl. → der. Kata benda maskulin dan netral mendapat akhiran -s (jika sudah berakhiran -s/-sch/-z/-tz tambahkan -es): des Mannes, des Kindes, des Buches, der Frau, der Kinder. Contoh: "Das Buch des Mannes" (Buku pria itu.) | "Die Tasche der Frau" (Tas wanita itu.) | "Das Spielzeug des Kindes" (Mainan anak itu.) Genitiv dalam preposisi: wegen (karena), trotz (meskipun), während (selama), statt/anstatt (sebagai ganti), innerhalb (di dalam), außerhalb (di luar). Contoh: "Wegen des Wetters bleibe ich zu Hause." (Karena cuaca, saya tinggal di rumah.) Dalam percakapan sehari-hari, Genitiv sering diganti dengan von + Dativ: "Das Buch von dem Mann."',
    level: 'B1',
  },
  {
    title: 'Plusquamperfekt (Masa Lampau Sebelum Lampau)',
    content:
      'Plusquamperfekt digunakan untuk menyatakan kejadian yang terjadi SEBELUM kejadian lampau lainnya — urutan waktu dalam cerita. Dibentuk dengan: hatte/war (Präteritum dari haben/sein) + Partizip II. Aturan penggunaan haben/sein sama seperti Perfekt. Contoh: "Als ich ankam, hatte er schon gegessen." (Ketika saya tiba, dia sudah makan terlebih dahulu.) | "Nachdem sie die Prüfung bestanden hatte, feierte sie." (Setelah dia lulus ujian, dia merayakannya.) | "Er war müde, weil er lange gearbeitet hatte." (Dia lelah karena sudah lama bekerja.) Sering digunakan bersama konjungsi temporal: nachdem (setelah — selalu diikuti Plusquamperfekt di kalimat anak), als, weil. Pola umum: Nebensatz dengan Plusquamperfekt + Hauptsatz dengan Präteritum/Perfekt. "Bevor ich schlafen ging, hatte ich meine Hausaufgaben gemacht." (Sebelum tidur, saya sudah mengerjakan PR saya.)',
    level: 'B1',
  },
  {
    title: 'Futur I (Masa Depan)',
    content:
      'Futur I dibentuk dengan: werden (terkonjugasi) + Infinitiv di akhir kalimat. Konjugasi werden: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden. Futur I digunakan untuk: (1) Rencana atau janji di masa depan: "Ich werde dich anrufen." (Saya akan meneleponmu.) (2) Prediksi atau perkiraan: "Es wird morgen regnen." (Besok akan hujan.) (3) Asumsi tentang sekarang (mit "wohl"): "Er wird wohl zu Hause sein." (Dia mungkin ada di rumah.) Catatan penting: dalam bahasa Jerman sehari-hari, Präsens + keterangan waktu sering digunakan sebagai ganti Futur I: "Ich rufe dich morgen an." = "Ich werde dich morgen anrufen." Futur I lebih formal atau digunakan ketika ingin menekankan aspek masa depan atau membuat pernyataan yang tegas. Contoh: "Wir werden siegen!" (Kami akan menang!) | "Du wirst das bereuen." (Kamu akan menyesali ini.)',
    level: 'B1',
  },
  {
    title: 'Indirekte Fragen (Pertanyaan Tidak Langsung)',
    content:
      'Pertanyaan tidak langsung digunakan saat kita menyampaikan pertanyaan dalam kalimat yang lebih besar, bukan sebagai pertanyaan langsung. Kata kerja pindah ke akhir kalimat anak. Untuk Ja/Nein-Fragen, gunakan "ob" (apakah): "Kommt er?" → "Ich weiß nicht, ob er kommt." (Saya tidak tahu apakah dia datang.) | "Ist sie müde?" → "Er fragt, ob sie müde ist." (Dia bertanya apakah dia lelah.) Untuk W-Fragen, gunakan kata tanya yang sama: "Wo wohnst du?" → "Ich frage ihn, wo er wohnt." (Saya bertanya kepadanya di mana dia tinggal.) | "Wann fährt der Zug?" → "Weißt du, wann der Zug fährt?" (Apakah kamu tahu kapan kereta berangkat?) Kata pengantar umum: Ich weiß nicht..., Ich frage mich..., Kannst du mir sagen..., Ich möchte wissen..., Es ist unklar... Contoh lengkap: "Kannst du mir sagen, wie viel das kostet?" (Bisakah kamu memberitahuku berapa harganya?)',
    level: 'B1',
  },
  {
    title: 'Infinitivsätze mit zu',
    content:
      'Kalimat infinitif dengan "zu" digunakan sebagai alternatif kalimat anak dengan "dass", ketika subjek kedua kalimat sama. Pola: ... + zu + Infinitiv (di akhir). Untuk verba terpisah (trennbare Verben), "zu" disisipkan: aufzustehen, einzukaufen, anzurufen. Penggunaan: (1) Setelah kata kerja tertentu: versuchen (mencoba), vergessen (lupa), beginnen/anfangen (mulai), aufhören (berhenti), hoffen (berharap), versprechen (berjanji): "Ich versuche, jeden Tag zu lernen." | "Er vergisst immer, die Tür abzuschließen." (2) Setelah kata sifat + sein/finden: "Es ist wichtig, Deutsch zu lernen." | "Ich finde es schwierig, früh aufzustehen." (3) Setelah kata benda: "Ich habe keine Zeit, Sport zu treiben." | "Er hat die Möglichkeit, ins Ausland zu gehen." (4) Dengan um...zu (untuk tujuan): "Ich lerne Deutsch, um in Deutschland zu arbeiten." (Saya belajar bahasa Jerman untuk bekerja di Jerman.) Catatan: jika subjeknya berbeda, gunakan "dass": "Ich hoffe, dass du kommst." (bukan "Ich hoffe, zu kommen.")',
    level: 'B1',
  },
  {
    title: 'Temporale Nebensätze (Kalimat Anak Waktu)',
    content:
      'Kalimat anak temporal menjelaskan hubungan waktu antara dua kejadian. Konjungsi utama dan penggunaannya: als — satu kejadian di masa lampau (sekali terjadi): "Als ich jung war, wohnte ich in Jakarta." (Ketika saya muda, saya tinggal di Jakarta.) | wenn — kejadian berulang (dulu/sekarang/masa depan), atau kondisi: "Wenn ich Zeit habe, lese ich." (Ketika/Jika saya punya waktu, saya membaca.) | nachdem — setelah (umumnya diikuti Plusquamperfekt di kalimat anak): "Nachdem ich gegessen hatte, schlief ich." (Setelah saya makan, saya tidur.) | bevor — sebelum: "Bevor du schläfst, putz die Zähne." (Sebelum tidur, sikat gigi.) | während — selama/sementara (dua kejadian bersamaan): "Während ich kochte, hörte er Musik." (Sementara saya memasak, dia mendengarkan musik.) | bis — sampai: "Ich warte, bis du kommst." (Saya tunggu sampai kamu datang.) | seit/seitdem — sejak: "Seitdem ich hier wohne, bin ich glücklich." (Sejak saya tinggal di sini, saya bahagia.) Ingat: kata kerja selalu di akhir kalimat anak!',
    level: 'B1',
  },
  {
    title: 'Kausale & Konzessive Konnektoren',
    content:
      'Konektor kausal menyatakan sebab-akibat, sedangkan konektor konsesif menyatakan pertentangan/kontras. KAUSAL — weil (karena, Nebensatz — kata kerja di akhir): "Ich bleibe zu Hause, weil ich krank bin." | da (karena — lebih formal, sering di awal kalimat): "Da es regnet, nehme ich einen Regenschirm." | deshalb/deswegen/daher (oleh karena itu — Hauptsatz, tapi menyebabkan inversi): "Es regnet, deshalb bleibe ich zu Hause." (Hujan, oleh karena itu saya tinggal di rumah.) KONSESIF — obwohl (meskipun, Nebensatz): "Er geht spazieren, obwohl es regnet." (Dia jalan-jalan meskipun hujan.) | trotzdem (meskipun demikian — Hauptsatz, menyebabkan inversi): "Es regnet. Trotzdem geht er spazieren." | jedoch/allerdings (namun/akan tetapi — Hauptsatz): "Das Essen war gut. Die Rechnung war jedoch teuer." Perbedaan deshalb vs trotzdem: deshalb = hasilnya logis (sebab → akibat) | trotzdem = hasilnya berlawanan dengan yang diharapkan.',
    level: 'B1',
  },

  // ── B2 ──────────────────────────────────────────────────────────────────────
  {
    title: 'Passiv (Kalimat Pasif)',
    content:
      'Kalimat pasif menekankan tindakan, bukan pelakunya. Dua jenis pasif: (1) Vorgangspassiv (pasif proses) dengan werden + Partizip II: Präsens: "Das Buch wird gelesen." (Buku itu sedang dibaca.) | Präteritum: "Der Kuchen wurde gebacken." (Kue itu dipanggang.) | Perfekt: "Das Haus ist gebaut worden." (Rumah itu sudah dibangun.) (2) Zustandspassiv (pasif kondisi/hasil) dengan sein + Partizip II: "Die Tür ist geöffnet." (Pintu itu terbuka — kondisi sekarang, hasil dari tindakan.) Untuk menyebutkan pelaku gunakan "von" + Dativ: "Das Buch wird von ihm gelesen." | Untuk sarana/alat gunakan "durch" + Akkusativ: "Das Fenster wurde durch den Wind geöffnet." Pasif dengan modalverben: "Das muss gemacht werden." (Ini harus diselesaikan.) | "Der Brief kann morgen abgeschickt werden." Verba yang tidak bisa dibentuk pasif: verba Dativ tanpa Akkusativ (helfen, danken), verba refleksif, dan haben, sein, werden.',
    level: 'B2',
  },
  {
    title: 'Nominalisierung (Nominalisasi)',
    content:
      'Nominalisasi adalah mengubah kata dari kelas lain menjadi kata benda (Nomen). Sangat umum dalam bahasa formal, akademis, dan tulisan bisnis. Jenis-jenis nominalisasi: (1) Dari kata kerja (Verben): semua kata kerja bisa dijadikan das + Infinitiv: das Lesen (membaca), das Schreiben (menulis), das Arbeiten (bekerja). Contoh: "Das Rauchen ist hier verboten." (Merokok dilarang di sini.) (2) Dari kata sifat (Adjektive): das/ein + Adjektiv dengan akhiran kuat: das Gute (kebaikan), das Neue (hal baru), ein Bekannter (kenalan lk.), eine Bekannte (kenalan pr.). Contoh: "Er erzählt nur das Beste." (Dia hanya menceritakan hal terbaik.) (3) Sufiks nominalisasi umum: -ung (die Lösung, Hoffnung, Rechnung), -heit/-keit (die Freiheit, Möglichkeit), -schaft (die Freundschaft, Gesellschaft), -nis (das Ergebnis, Geheimnis). Mengapa penting: teks akademis Jerman sangat suka nominalisasi. "Man hat das Problem gelöst." → "Die Lösung des Problems erfolgte..." (Penyelesaian masalah itu dilakukan...)',
    level: 'B2',
  },
  {
    title: 'Erweiterte Partizipialattribute',
    content:
      'Atribut partisip yang diperluas adalah frasa panjang sebelum kata benda yang menggantikan kalimat relatif. Sangat khas dalam teks tulis formal, ilmiah, dan berita. Struktur: artikel + [modifikator...] + Partizip I/II + kata benda. Partizip I (tindakan berlangsung, aktif): Partizip I = Infinitiv + -d. Contoh: "der lesende Mann" (pria yang sedang membaca) | "das lachende Kind" (anak yang sedang tertawa) → "der gestern in der Bibliothek ein Buch lesende Mann" = "der Mann, der gestern in der Bibliothek ein Buch las." Partizip II (tindakan selesai, pasif): "das gelesene Buch" (buku yang sudah dibaca) → "das von mir gestern gelesene Buch" = "das Buch, das ich gestern gelesen habe." Cara membaca: temukan kata benda (di akhir frasa), lalu baca modifikator dari kanan ke kiri. Contoh teks berita: "Der von der Polizei gesuchte Verdächtige wurde verhaftet." = "Der Verdächtige, der von der Polizei gesucht wurde, wurde verhaftet." (Tersangka yang dicari polisi ditangkap.)',
    level: 'B2',
  },
  {
    title: 'Konjunktiv I (Indirekte Rede)',
    content:
      'Konjunktiv I digunakan terutama dalam laporan tidak langsung (indirekte Rede) untuk menandakan bahwa pembicara tidak mengkonfirmasi kebenaran informasi tersebut. Sangat umum dalam jurnalisme dan laporan resmi. Pembentukan: batang infinitiv + akhiran Konjunktiv I (-e, -est, -e, -en, -et, -en). Bentuk penting: sein → sei, haben → habe, werden → werde, können → könne, müssen → müsse, sagen → sage, kommen → komme. Contoh: Ucapan langsung: "Ich bin krank." → Ucapan tidak langsung: "Er sagt, er sei krank." | "Die Preise steigen." → "Der Minister sagt, die Preise stiegen." Jika Konjunktiv I sama dengan Präsens (sulit dibedakan), gunakan Konjunktiv II sebagai pengganti: "sie kommen" (Ind.) = "sie kommen" (Konj. I) → gunakan "sie kämen" (Konj. II). Kata pengantar umum: sagen, berichten, behaupten, erklären, mitteilen. Contoh kalimat berita: "Der Präsident erklärte, das Land sei auf dem richtigen Weg." (Presiden menjelaskan bahwa negara berada di jalur yang benar.)',
    level: 'B2',
  },
  {
    title: 'Subjunktionen & Konjunktionaladverbien',
    content:
      'Dua kategori penghubung kalimat dengan efek yang berbeda pada urutan kata. SUBJUNKTIONEN (kata kerja ke akhir kalimat anak): Kausal: weil, da | Konsesif: obwohl, auch wenn, wenngleich | Temporal: als, wenn, nachdem, bevor, während, bis, seit | Konditional: wenn, falls, sofern | Final: damit, um...zu | Konsekutif: sodass, so...dass | Modal: indem, ohne dass, anstatt dass | Adversatif: während, wohingegen. KONJUNKTIONALADVERBIEN (menyebabkan inversi di Hauptsatz — Verb di posisi ke-2): Kausal: deshalb, deswegen, daher, folglich, darum | Konsesif: trotzdem, dennoch, gleichwohl, nichtsdestoweniger | Adversatif: jedoch, allerdings, aber (juga konjungsi), dagegen, hingegen | Additif: außerdem, zudem, überdies, darüber hinaus | Temporal: dann, danach, anschließend, schließlich, vorher, seitdem | Illustratif: zum Beispiel, nämlich, und zwar. Contoh inversi: "Es regnete. Trotzdem gingen wir spazieren." (posisi: trotzdem-gingen-wir) | "Er war müde. Dennoch arbeitete er weiter." Tips: jika penghubung bisa dipindah ke posisi ke-3 dalam kalimat, itu Konjunktionaladverb: "Er arbeitete dennoch weiter."',
    level: 'B2',
  },
  {
    title: 'Futur II (Masa Depan Selesai)',
    content:
      'Futur II menyatakan tindakan yang akan sudah selesai pada suatu titik waktu di masa depan, atau asumsi bahwa sesuatu sudah terjadi. Dibentuk dengan: werden + Partizip II + haben/sein (akhiran). Konjugasi: ich werde...gemacht haben, du wirst...gemacht haben, er wird...gemacht haben, dst. Penggunaan: (1) Tindakan akan selesai di masa depan: "Bis nächste Woche werde ich den Bericht fertiggeschrieben haben." (Sampai minggu depan saya akan sudah selesai menulis laporan.) | "Wenn du ankommst, werden wir schon gegessen haben." (Ketika kamu tiba, kami sudah akan makan.) (2) Asumsi tentang masa lampau (sering dengan "wohl"): "Er wird wohl schon nach Hause gegangen sein." (Dia pasti sudah pulang ke rumah.) | "Sie wird das vergessen haben." (Dia pasti sudah melupakan itu.) Futur II lebih umum dalam tulisan formal. Dalam percakapan, sering diganti dengan Perfekt + keterangan waktu: "Bis morgen habe ich das erledigt." Contoh: "In zehn Jahren wirst du alles verstanden haben." (Dalam sepuluh tahun kamu akan sudah memahami segalanya.)',
    level: 'B2',
  },
  {
    title: 'Doppelkonjunktionen (Konjungsi Berpasangan)',
    content:
      'Konjungsi berpasangan menghubungkan dua elemen yang sejajar (kata, frasa, atau kalimat) dan memberikan nuansa makna tertentu. Daftar lengkap: (1) sowohl...als auch (baik...maupun — additif positif): "Ich spreche sowohl Deutsch als auch Englisch." (Saya berbicara baik bahasa Jerman maupun Inggris.) (2) weder...noch (tidak...maupun tidak — additif negatif): "Er trinkt weder Alkohol noch Kaffee." (Dia tidak minum alkohol maupun kopi.) (3) entweder...oder (entah...atau — alternatif): "Entweder kommst du mit, oder ich gehe alleine." (Entah kamu ikut, atau saya pergi sendiri.) (4) nicht nur...sondern auch (bukan hanya...tetapi juga): "Sie ist nicht nur intelligent, sondern auch fleißig." (Dia bukan hanya cerdas, tetapi juga rajin.) (5) je...desto/umso (semakin...semakin): "Je mehr ich lerne, desto besser werde ich." (Semakin banyak saya belajar, semakin baik saya.) — Perhatikan: setelah "desto/umso" terjadi inversi! (6) zwar...aber (memang...tapi): "Das Buch ist zwar lang, aber sehr interessant." (Buku itu memang panjang, tapi sangat menarik.) (7) mal...mal (kadang...kadang): "Mal bin ich müde, mal bin ich energievoll."',
    level: 'B2',
  },
  {
    title: 'Nomen-Verb-Verbindungen (Funktionsverbgefüge)',
    content:
      'Nomen-Verb-Verbindungen (NVV) atau Funktionsverbgefüge adalah kombinasi kata benda + kata kerja "ringan" yang bersama-sama memiliki makna khusus. Kata kerja yang umum: bringen, stellen, nehmen, kommen, stehen, setzen, haben, machen, geben, geraten. Contoh penting: in Frage stellen (mempertanyakan) ← bukan "stellen + in Frage" secara harfiah | zur Verfügung stehen (tersedia) | in Betrieb nehmen (mulai mengoperasikan) | zum Ausdruck bringen (mengungkapkan) | Kritik üben an (mengkritik) | eine Entscheidung treffen (membuat keputusan) | Rücksicht nehmen auf (memperhatikan/mempertimbangkan) | in Anspruch nehmen (memanfaatkan) | auf den Markt kommen (memasuki pasar) | unter Druck geraten (berada di bawah tekanan). Mengapa penting: NVV sangat umum dalam bahasa formal, bisnis, dan akademis Jerman. Sering tidak bisa diterjemahkan kata per kata. Contoh: "Die neue Technologie wird in Frage gestellt." (Teknologi baru itu dipertanyakan.) | "Das Produkt kommt nächstes Jahr auf den Markt." (Produk itu akan memasuki pasar tahun depan.)',
    level: 'B2',
  },
  {
    title: 'Partizip I & II als Adjektiv',
    content:
      'Partizip I dan II dapat digunakan sebagai adjektif yang mendahului kata benda, dan harus mendapat akhiran adjektif sesuai kasus dan genus. Partizip I (= Infinitiv + -d): menyatakan tindakan yang berlangsung bersamaan, aktif. Contoh: singen → singend → "der singende Mann" (pria yang sedang bernyanyi) | lachen → lachend → "das lachende Kind" (anak yang tertawa) | fließen → fließend → "fließendes Wasser" (air yang mengalir) | "fließendes Deutsch" (bahasa Jerman yang lancar). Partizip II: menyatakan tindakan yang sudah selesai, biasanya pasif untuk verba transitif. Contoh: lesen → gelesen → "das gelesene Buch" (buku yang sudah dibaca) | backen → gebacken → "der gebackene Kuchen" (kue yang sudah dipanggang). Untuk verba intransitif dengan sein, Partizip II bersifat aktif: ankommen → angekommen → "der angekommene Gast" (tamu yang sudah tiba) | schlafen → geschlafen → "das schlafende Kind" (anak yang sedang/sudah tidur). Deklinasi: ikuti aturan adjektif biasa. Contoh lengkap: "Ich gebe dem schlafenden Kind eine Decke." (Saya memberikan selimut kepada anak yang tidur.) | "Er kauft den reparierten Computer." (Dia membeli komputer yang sudah diperbaiki.)',
    level: 'B2',
  },
  {
    title: 'Modalpartikeln (Partikel Modal)',
    content:
      'Modalpartikeln adalah kata-kata kecil yang memberikan nuansa emosional, sikap, atau konteks pada kalimat. Tidak dapat diterjemahkan secara harfiah dan sangat penting untuk terdengar alami dalam percakapan Jerman. Partikel utama dan nuansanya: ja — menegaskan sesuatu yang dianggap sudah diketahui bersama: "Das ist ja interessant!" (Itu memang menarik, kan!) | doch — kontradiksi, meyakinkan ulang, atau ajakan: "Komm doch mit!" (Ayolah ikut!) | "Das stimmt doch nicht!" (Itu memang tidak benar!) | mal — membuat permintaan lebih lembut/santai: "Warte mal!" (Tunggu sebentar!) | "Kannst du mir mal helfen?" (Bisakah kamu bantu saya sebentar?) | eben/halt — menyatakan fakta tak terhindarkan, pasrah: "Das ist eben so." (Memang begitulah adanya.) | "Es ist halt schwierig." (Memang susah, mau bagaimana lagi.) | wohl — kemungkinan/dugaan: "Er ist wohl krank." (Dia sepertinya sakit.) | schon — meyakinkan atau mengakui dengan sedikit keraguan: "Das wird schon klappen." (Itu pasti akan berhasil.) | eigentlich — sebenarnya/sebetulnya: "Ich wollte eigentlich früh schlafen." (Sebenarnya saya ingin tidur lebih awal.) Modalpartikeln tidak dapat berada di posisi pertama kalimat dan tidak mendapat tekanan (biasanya).',
    level: 'B2',
  },
];

