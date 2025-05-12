import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  // Insert new questions
  await prisma.question.createMany({
    data: [
      {
        quizId: "7",
        question: "Apa yang dimaksud dengan interaksi sosial?",
        answer: "Hubungan timbal balik antara individu dan kelompok",
        options: [
          "Hubungan antara kelompok dan kelompok",
          "Hubungan antara individu dan individu",
          "Hubungan antara individu dan lingkungan",
          "Hubungan timbal balik antara individu dan kelompok",
        ],
      },
      {
        quizId: "7",
        question: "Apa saja bentuk interaksi manusia dengan lingkungan sosial?",
        answer:
          "Individu dengan individu, individu dengan kelompok, kelompok dengan kelompok",
        options: [
          "Individu dengan individu, individu dengan kelompok, kelompok dengan kelompok",
          "Individu dengan alam, individu dengan budaya, individu dengan ekonomi",
          "Kelompok dengan budaya, kelompok dengan ekonomi, kelompok dengan individu",
          "Individu dengan individu, kelompok dengan ekonomi, kelompok dengan budaya",
        ],
      },
      {
        quizId: "7",
        question: "Apa yang termasuk dalam lingkungan alam?",
        answer: "Lingkungan biotik dan lingkungan abiotic",
        options: [
          "Lingkungan biotik dan lingkungan abiotic",
          "Lingkungan biotik dan lingkungan ekonomi",
          "Lingkungan biotik dan lingkungan sosial",
          "Lingkungan sosial dan lingkungan budaya",
        ],
      },
      {
        quizId: "7",
        question: "Apa yang dimaksud dengan globalisasi?",
        answer:
          "Proses integrasi dan interaksi antara individu, perusahaan, dan negara",
        options: [
          "Proses pembangunan infrastruktur",
          "Proses adaptasi budaya lokal",
          "Proses integrasi dan interaksi antara individu, perusahaan, dan negara",
          "Proses perubahan dalam struktur Masyarakat",
        ],
      },
      {
        quizId: "7",
        question:
          "Apa dampak positif dari perubahan sosial pada masa Orde Baru?",
        answer: "Menstabilkan kondisi politik",
        options: [
          "Kebebasan berpendapat",
          "Menstabilkan kondisi politik",
          "Pembangunan merata di seluruh Indonesia",
          "Pemerintah bersifat desentralistik",
        ],
      },
      {
        quizId: "7",
        question: "Apa yang menjadi fokus utama pada masa reformasi?",
        answer: "Pembatasan masa jabatan presiden",
        options: [
          "Program transmigrasi",
          "Pembatasan masa jabatan presiden",
          "Pembangunan infrastruktur",
          "Kebijakan investasi",
        ],
      },
      {
        quizId: "7",
        question: "Apa dampak negatif dari globalisasi?",
        answer: "Lunturnya nilai-nilai budaya asli",
        options: [
          "Lunturnya nilai-nilai budaya asli",
          "Peningkatan kualitas hidup",
          "Berkembangnya ilmu pengetahuan",
          "Masyarakat menjadi lebih terbuka",
        ],
      },
      {
        quizId: "7",
        question:
          "Apa yang dimaksud dengan interaksi manusia dengan lingkungan budaya?",
        answer: "Adaptasi terhadap aturan dan norma",
        options: [
          "Kegiatan ekonomi sehari-hari",
          "Adaptasi terhadap aturan dan norma",
          "Hubungan dengan lingkungan alam",
          "Interaksi sosial antar individu",
        ],
      },
      {
        quizId: "7",
        question: "Apa yang menjadi ciri dari masa Orde Baru?",
        answer: "Pemerintah bersifat sentralistik",
        options: [
          "Sistem pemerintahan desentralistik",
          "Kebebasan berpendapat",
          "Pemerintah bersifat sentralistik",
          "Banyaknya partai politik baru",
        ],
      },
      {
        quizId: "7",
        question:
          "Apa yang menjadi salah satu dampak negatif dari masa reformasi?",
        answer: "Ketidakstabilan kondisi politik",
        options: [
          "Kebebasan berpendapat yang bertanggung jawab",
          "Peningkatan kualitas hidup",
          "Ketidakstabilan kondisi politik",
          "Pembangunan infrastruktur yang merata",
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
