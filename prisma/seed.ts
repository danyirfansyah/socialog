import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  // Insert new questions
  await prisma.question.createMany({
    data: [
      {
        quizId: "13",
        question:
          "Setiap Warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara. Hal ini sesuai dengan UUD 1945 pasal ....",
        answer: "27 ayat 3",
        options: ["27 ayat 3", "28 ayat 1", "29 ayat 2", "27 ayat 1"],
      },
      {
        quizId: "13",
        question:
          "Sikap dan perilaku warga negara yang dijiwai oleh kecintaannya kepada Negara Kesatuan Republik Indonesia yang berdasarkan Pancasila dan UUD Negara Republik Indonesia Tahun 1945 dalam menjamin kelangsungan hidup bangsa dan negara disebut...",
        answer: "Bela Negara",
        options: [
          "Patriotisme",
          "Bela Negara",
          "Cinta tanah air",
          "Nasionalisme",
        ],
      },
      {
        quizId: "13",
        question:
          'Dalam pasal 9 ayat (1) UU No. 33 Tahun 2022 tentang pertahanan negara, "Setiap warga negara berhak dan wajib ikut serta dalam upaya bela negara yang diwujudkan dalam penyelenggaraan pertahanan negara." Makna kata kewajiban dalam ketentuan tersebut adalah ...',
        answer:
          "Negara dapat memaksa setiap warga negara untuk ikut serta dalam pembelaan negara dalam keadaan tertentu",
        options: [
          "Setiap Warga negara harus mengikuti wajib militer",
          "Bila diwajibkan setiap warga negara ikut Dalam pembelaan negara",
          "Hanya warga negara yang dipersyaratkan wajib ikut dalam pembelaan negara",
          "Negara dapat memaksa setiap warga negara untuk ikut serta dalam pembelaan negara dalam keadaan tertentu",
        ],
      },
      {
        quizId: "13",
        question: "Bela negara merupakan tugas dan tanggung jawab dari ...",
        answer: "Seluruh rakyat Indonesia",
        options: [
          "Polisi",
          "TNI",
          "Seluruh rakyat Indonesia",
          "Aparat Penegak Hukum",
        ],
      },
      {
        quizId: "13",
        question:
          "Tiap-tiap warga negara berhak dan wajib ikut serta dalam usaha pertahanan dan keamanan negara merupakan bunyi peraturan dalam UUD 1945 pasal ...",
        answer: "Pasal 30 ayat 1",
        options: [
          "Pasal 30 ayat 1",
          "Pasal 30 ayat 2",
          "Pasal 30 ayat 3",
          "Pasal 30 ayat 4",
        ],
      },
      {
        quizId: "13",
        question:
          "Salah satu bentuk pembelaan terhadap negara dalam kondisi merdeka seperti sekarang dapat dilakukan dengan cara …",
        answer: "mempertahankan Pancasila dan UUD 1945",
        options: [
          "menghafal Pancasila dan UUD 1945",
          "mempertahankan Pancasila dan UUD 1945",
          "membahas isi Pancasila dan UUD 1945",
          "mengubah isi Pancasila dan UUD 1945",
        ],
      },
      {
        quizId: "13",
        question:
          "Salah satu upaya menumbuhkan rasa nasionalisme pelajar yaitu ....",
        answer: "mengikuti upacara bendera",
        options: [
          "pembagian tugas piket",
          "mengikuti upacara bendera",
          "mengikuti les tambahan",
          "mengikuti siskamling",
        ],
      },
      {
        quizId: "13",
        question:
          "Perwujudan upaya bela negara bagi seorang pelajar adalah ....",
        answer:
          "ikut serta menjaga keamanan lingkungan sekolah masing-masing dari berbagai ancaman dan gangguan",
        options: [
          "ikut serta menjaga keamanan lingkungan sekolah masing-masing dari berbagai ancaman dan gangguan",
          "ikut serta menjaga daera-daerah yang rawan konflik",
          "ikut serta dalam demo anti Malaysia yang berusaha merebut wilayah NKRI",
          "mengajak masyarakat untuk selalu mengencangkan ikat pinggang",
        ],
      },
      {
        quizId: "13",
        question:
          "Ancaman terhadap keutuhan wilayah NKRI yang berasal dari luar negeri adalah ....",
        answer:
          "masuknya ideologi liberalisme dan komunisme yang dipermudah oleh kemajuan IPTEK",
        options: [
          "masuknya ideologi liberalisme dan komunisme yang dipermudah oleh kemajuan IPTEK",
          "aksi radikalisme yang berlatar belakang SARA",
          "gerakan separatis bersenjata yang ingin berpisah dari NKRI",
          "terorisme dengan pelaku bangsa sendiri yang memiliki jaringan Internasional",
        ],
      },
      {
        quizId: "13",
        question:
          "Contoh bela negara melalui jalur pengabdian sesuai profesi ….",
        answer: "perjuangan dokter dan paramedis menanggulangi wabah corona",
        options: [
          "perjuangan dokter dan paramedis menanggulangi wabah corona",
          "orang tua menyekolahkan anak hingga perguruan tinggi",
          "pengabdian terhadap orang tua yang lanjut usia",
          "pengabdian ibu dalam mendidik putra-putrinya",
        ],
      },
    ],
  });

  console.log("Inserted new questions");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
