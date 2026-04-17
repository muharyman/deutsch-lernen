import type { DailyConversation, DailyLessonPayload, DailyWord, PracticeQuestion } from '../types';
import { WORD_POOL } from './wordPool';

interface ConversationTemplate {
  title: string;
  situation: string;
  lines: DailyConversation['lines'];
  grammarNotes: DailyConversation['grammarNotes'];
  keyExpressions: DailyConversation['keyExpressions'];
  practice: PracticeQuestion[];
}

const FALLBACK_CONVERSATIONS: ConversationTemplate[] = [
  {
    title: 'Di Kedai Kopi',
    situation: 'Memesan minuman dan menanyakan rekomendasi menu.',
    lines: [
      { role: 'Barista', de: 'Guten Morgen, was möchten Sie bestellen?', id: 'Selamat pagi, Anda ingin memesan apa?' },
      { role: 'Kunde', de: 'Ich hätte gern einen Kaffee und ein kleines Croissant.', id: 'Saya ingin kopi dan satu croissant kecil.' },
      { role: 'Barista', de: 'Möchten Sie hier trinken oder mitnehmen?', id: 'Anda ingin minum di sini atau dibawa?' },
      { role: 'Kunde', de: 'Ich trinke hier. Können Sie mir etwas Süßes empfehlen?', id: 'Saya minum di sini. Bisakah Anda merekomendasikan sesuatu yang manis?' },
      { role: 'Barista', de: 'Unser Apfelkuchen ist heute sehr beliebt.', id: 'Kue apel kami hari ini sangat populer.' },
    ],
    grammarNotes: [
      {
        title: 'Ich hätte gern',
        explanation: 'Pola ini terdengar lebih sopan daripada hanya mengatakan "ich will". Cocok untuk memesan makanan atau minuman.',
        pattern: 'Ich hätte gern + objek',
        examples: ['Ich hätte gern einen Tee.', 'Ich hätte gern ein Wasser ohne Eis.'],
      },
      {
        title: 'Möchten Sie ...?',
        explanation: 'Dipakai untuk menawarkan pilihan secara formal. Kata kerja tetap di posisi kedua.',
        pattern: 'Möchten Sie + infinitif/objek ...?',
      },
    ],
    keyExpressions: [
      { de: 'mitnehmen', id: 'dibawa pulang / takeaway' },
      { de: 'empfehlen', id: 'merekomendasikan' },
      { de: 'beliebt', id: 'populer' },
    ],
    practice: [
      {
        type: 'multiple_choice',
        prompt: 'Ungkapan paling sopan untuk memesan adalah ...',
        choices: ['Ich will Kaffee.', 'Ich hätte gern Kaffee.', 'Gib mir Kaffee.'],
        answer: 'Ich hätte gern Kaffee.',
        explanation: 'Dalam konteks layanan, "Ich hätte gern ..." paling natural dan sopan.',
      },
      {
        type: 'short_answer',
        prompt: 'Terjemahkan ke Jerman: "Saya minum di sini."',
        answer: 'Ich trinke hier.',
        explanation: 'Gunakan Präsens sederhana: "Ich trinke hier."',
      },
    ],
  },
  {
    title: 'Di Stasiun',
    situation: 'Menanyakan jalur kereta dan keterlambatan.',
    lines: [
      { role: 'Reisende', de: 'Entschuldigung, von welchem Gleis fährt der Zug nach München ab?', id: 'Permisi, kereta ke München berangkat dari jalur berapa?' },
      { role: 'Mitarbeiter', de: 'Heute fährt er von Gleis sieben ab.', id: 'Hari ini kereta itu berangkat dari jalur tujuh.' },
      { role: 'Reisende', de: 'Hat der Zug Verspätung?', id: 'Apakah keretanya terlambat?' },
      { role: 'Mitarbeiter', de: 'Ja, leider etwa zehn Minuten.', id: 'Ya, sayangnya sekitar sepuluh menit.' },
      { role: 'Reisende', de: 'Danke, dann kaufe ich noch schnell etwas zu trinken.', id: 'Terima kasih, kalau begitu saya beli sesuatu untuk diminum dulu.' },
    ],
    grammarNotes: [
      {
        title: 'Von welchem Gleis ...?',
        explanation: 'Pertanyaan dengan preposisi "von" membutuhkan Dativ. "welchem" adalah bentuk Dativ netral/maskulin.',
        pattern: 'von welchem + Nomen',
      },
      {
        title: 'Dann',
        explanation: 'Adverb "dann" sering dipakai untuk menyatakan konsekuensi singkat: kalau begitu, lalu.',
        examples: ['Dann warte ich hier.', 'Dann gehen wir jetzt.'],
      },
    ],
    keyExpressions: [
      { de: 'Gleis', id: 'jalur / peron' },
      { de: 'abfahren', id: 'berangkat' },
      { de: 'Verspätung', id: 'keterlambatan' },
    ],
    practice: [
      {
        type: 'multiple_choice',
        prompt: 'Kalimat yang benar untuk menanyakan keterlambatan adalah ...',
        choices: ['Hat der Zug Verspätung?', 'Der Zug hat Verspätung?', 'Verspätung hat der Zug?'],
        answer: 'Hat der Zug Verspätung?',
        explanation: 'Pertanyaan ya/tidak memakai verb di posisi pertama.',
      },
      {
        type: 'short_answer',
        prompt: 'Apa arti "Leider etwa zehn Minuten"?',
        answer: 'Sayangnya sekitar sepuluh menit.',
        explanation: 'Sayangnya = leider, sekitar = etwa.',
      },
    ],
  },
  {
    title: 'Di Kantor',
    situation: 'Mengatur rapat ulang karena jadwal bentrok.',
    lines: [
      { role: 'Mina', de: 'Hast du morgen um zehn Uhr Zeit für die Besprechung?', id: 'Besok jam sepuluh kamu ada waktu untuk rapat?' },
      { role: 'Jonas', de: 'Leider nicht, weil ich dann einen Kundentermin habe.', id: 'Sayangnya tidak, karena saya punya janji dengan klien saat itu.' },
      { role: 'Mina', de: 'Kein Problem. Können wir den Termin auf den Nachmittag verschieben?', id: 'Tidak masalah. Bisakah kita memindahkan jadwalnya ke sore hari?' },
      { role: 'Jonas', de: 'Ja, das passt besser. Sagen wir um vierzehn Uhr?', id: 'Ya, itu lebih cocok. Bagaimana kalau pukul dua siang?' },
      { role: 'Mina', de: 'Perfekt, ich schicke gleich eine neue Einladung.', id: 'Sempurna, saya akan segera mengirim undangan baru.' },
    ],
    grammarNotes: [
      {
        title: 'Weil-Satz',
        explanation: 'Setelah "weil", kata kerja finite pindah ke akhir anak kalimat.',
        pattern: '..., weil ich dann einen Termin habe.',
      },
      {
        title: 'Können wir ... verschieben?',
        explanation: 'Modalverb dipakai untuk membuat permintaan atau usulan terdengar lebih halus.',
      },
    ],
    keyExpressions: [
      { de: 'Besprechung', id: 'rapat' },
      { de: 'verschieben', id: 'memindahkan / menjadwal ulang' },
      { de: 'Einladung', id: 'undangan' },
    ],
    practice: [
      {
        type: 'multiple_choice',
        prompt: 'Dalam kalimat dengan "weil", posisi kata kerja adalah ...',
        choices: ['di awal', 'di posisi kedua', 'di akhir'],
        answer: 'di akhir',
        explanation: 'Anak kalimat dengan "weil" menempatkan kata kerja di akhir.',
      },
      {
        type: 'short_answer',
        prompt: 'Lengkapi: "..., weil ich dann einen Kundentermin ___."',
        answer: 'habe',
        explanation: 'Subjek "ich" dengan kata kerja "haben" menjadi "habe".',
      },
    ],
  },
  {
    title: 'Belanja Kebutuhan',
    situation: 'Mencari ukuran dan menanyakan diskon.',
    lines: [
      { role: 'Kundin', de: 'Haben Sie dieses Hemd auch in Größe M?', id: 'Apakah Anda punya kemeja ini juga dalam ukuran M?' },
      { role: 'Verkäufer', de: 'Einen Moment bitte, ich schaue kurz nach.', id: 'Sebentar ya, saya cek dulu.' },
      { role: 'Verkäufer', de: 'Ja, wir haben noch zwei Stück auf Lager.', id: 'Ya, kami masih punya dua buah di stok.' },
      { role: 'Kundin', de: 'Super. Gibt es heute vielleicht einen Rabatt?', id: 'Bagus. Apakah hari ini mungkin ada diskon?' },
      { role: 'Verkäufer', de: 'Ja, ab zwei Artikeln bekommen Sie zehn Prozent.', id: 'Ya, untuk dua barang atau lebih Anda mendapat sepuluh persen.' },
    ],
    grammarNotes: [
      {
        title: 'Auch in Größe M',
        explanation: 'Keterangan tambahan sering ditempatkan setelah objek utama untuk memperjelas permintaan.',
      },
      {
        title: 'Ab zwei Artikeln',
        explanation: 'Preposisi "ab" dipakai untuk batas minimum: mulai dari dua item.',
      },
    ],
    keyExpressions: [
      { de: 'auf Lager', id: 'tersedia di stok' },
      { de: 'Rabatt', id: 'diskon' },
      { de: 'bekommen', id: 'mendapatkan' },
    ],
    practice: [
      {
        type: 'multiple_choice',
        prompt: 'Apa arti "auf Lager"?',
        choices: ['sedang didiskon', 'tersedia di stok', 'sudah terjual'],
        answer: 'tersedia di stok',
        explanation: '"Auf Lager" menunjukkan barang masih tersedia.',
      },
      {
        type: 'short_answer',
        prompt: 'Terjemahkan: "Kami masih punya dua buah."',
        answer: 'Wir haben noch zwei Stück.',
        explanation: 'Struktur inti: "Wir haben noch zwei Stück."',
      },
    ],
  },
  {
    title: 'Janji ke Dokter',
    situation: 'Menjelaskan gejala dan mencari jadwal kosong.',
    lines: [
      { role: 'Patient', de: 'Guten Tag, ich möchte gern einen Termin vereinbaren.', id: 'Selamat siang, saya ingin membuat janji.' },
      { role: 'Empfang', de: 'Natürlich. Welche Beschwerden haben Sie?', id: 'Tentu. Keluhan apa yang Anda alami?' },
      { role: 'Patient', de: 'Ich habe seit gestern Fieber und starke Kopfschmerzen.', id: 'Sejak kemarin saya demam dan sakit kepala parah.' },
      { role: 'Empfang', de: 'Dann kommen Sie bitte heute um halb vier vorbei.', id: 'Kalau begitu silakan datang hari ini pukul setengah empat.' },
      { role: 'Patient', de: 'Vielen Dank, das passt gut.', id: 'Terima kasih banyak, itu cocok.' },
    ],
    grammarNotes: [
      {
        title: 'Seit + Zeitpunkt',
        explanation: 'Pakai "seit" untuk menyatakan kondisi yang dimulai pada titik waktu tertentu dan masih berlangsung.',
        pattern: 'seit gestern / seit Montag / seit einer Woche',
      },
      {
        title: 'Einen Termin vereinbaren',
        explanation: 'Kolokasi umum untuk membuat janji resmi.',
      },
    ],
    keyExpressions: [
      { de: 'Beschwerden', id: 'keluhan' },
      { de: 'vorbeikommen', id: 'datang / mampir' },
      { de: 'das passt gut', id: 'itu cocok / sesuai' },
    ],
    practice: [
      {
        type: 'multiple_choice',
        prompt: 'Ungkapan yang berarti "membuat janji" adalah ...',
        choices: ['einen Termin vereinbaren', 'einen Termin sagen', 'einen Termin finden'],
        answer: 'einen Termin vereinbaren',
        explanation: 'Kolokasi yang benar adalah "einen Termin vereinbaren".',
      },
      {
        type: 'short_answer',
        prompt: 'Apa arti "seit gestern"?',
        answer: 'sejak kemarin',
        explanation: '"Seit" dipakai untuk rentang yang masih berjalan.',
      },
    ],
  },
  {
    title: 'Rencana Akhir Pekan',
    situation: 'Mengajak teman jalan dan menyesuaikan cuaca.',
    lines: [
      { role: 'Lea', de: 'Hast du am Samstag Lust auf einen Ausflug?', id: 'Apakah kamu mau ikut jalan-jalan hari Sabtu?' },
      { role: 'Noah', de: 'Ja, gern. Wohin möchtest du fahren?', id: 'Ya, mau. Kamu ingin pergi ke mana?' },
      { role: 'Lea', de: 'Ich würde gern an den See fahren, wenn das Wetter schön ist.', id: 'Aku ingin pergi ke danau kalau cuacanya bagus.' },
      { role: 'Noah', de: 'Gute Idee. Sonst können wir auch ins Museum gehen.', id: 'Ide bagus. Kalau tidak, kita juga bisa pergi ke museum.' },
      { role: 'Lea', de: 'Dann entscheiden wir am Freitagabend.', id: 'Kalau begitu kita putuskan Jumat malam.' },
    ],
    grammarNotes: [
      {
        title: 'Ich würde gern',
        explanation: 'Konjunktiv II sederhana ini membuat usulan terasa lebih halus dan natural.',
      },
      {
        title: 'Wenn das Wetter schön ist',
        explanation: 'Kalimat kondisi memakai "wenn"; kata kerja di anak kalimat berada di akhir.',
      },
    ],
    keyExpressions: [
      { de: 'Lust auf', id: 'berminat / ingin' },
      { de: 'sonst', id: 'kalau tidak / jika tidak' },
      { de: 'entscheiden', id: 'memutuskan' },
    ],
    practice: [
      {
        type: 'multiple_choice',
        prompt: 'Kata yang berarti "kalau tidak" adalah ...',
        choices: ['sonst', 'dann', 'gern'],
        answer: 'sonst',
        explanation: '"Sonst" dipakai untuk alternatif bila kondisi utama tidak terjadi.',
      },
      {
        type: 'short_answer',
        prompt: 'Lengkapi: "..., wenn das Wetter schön ___."',
        answer: 'ist',
        explanation: 'Subjek "das Wetter" memakai "ist".',
      },
    ],
  },
];

function dateSeed(date: string) {
  return Number.parseInt(date.replace(/-/g, ''), 10) || 1;
}

function pickWords(date: string): DailyWord[] {
  const seed = dateSeed(date);
  const start = seed % WORD_POOL.length;

  return Array.from({ length: 3 }, (_, index) => {
    const word = WORD_POOL[(start + index) % WORD_POOL.length];
    return {
      ...word,
      level: undefined,
    };
  });
}

function pickConversations(date: string): DailyConversation[] {
  const seed = dateSeed(date);
  const start = seed % FALLBACK_CONVERSATIONS.length;

  return Array.from({ length: 3 }, (_, index) => {
    const template = FALLBACK_CONVERSATIONS[(start + index) % FALLBACK_CONVERSATIONS.length];
    return {
      ...template,
      lines: template.lines.map((line) => ({ ...line })),
      grammarNotes: template.grammarNotes.map((note) => ({
        ...note,
        examples: note.examples ? [...note.examples] : undefined,
      })),
      keyExpressions: template.keyExpressions.map((item) => ({ ...item })),
      practice: template.practice.map((item) => ({
        ...item,
        choices: item.choices ? [...item.choices] : undefined,
      })),
    };
  });
}

export function createFallbackDailyLesson(date: string): DailyLessonPayload {
  const conversations = pickConversations(date);
  const words = pickWords(date);
  const theme = conversations.map((item) => item.title).join(' • ');

  return {
    date,
    theme,
    conversations,
    words,
    source: 'static',
    cachedAt: new Date().toISOString(),
  };
}
