import connect from "@/lib/mongodb";
import Course from "@/models/course"; // Make sure you have this model defined

const populateCourses = async () => {
  try {
    await connect();
    console.log("Connected to MongoDB");

    const courses = [
      { title: "Dinamika Kependudukan Indonesia", category: "IPS" },
      { title: "Globalisasi dan Dampaknya", category: "IPS" },
      { title: "Perkembangan Ekonomi Indonesia", category: "IPS" },
      { title: "Sistem Pemerintahan Indonesia", category: "IPS" },
      { title: "Keragaman Sosial Budaya Indonesia", category: "IPS" },
      { title: "Geografi Indonesia", category: "IPS" },
      { title: "Interaksi Sosial dan Perubahan Sosial", category: "IPS" },
      {
        title:
          "Dinamika Perwujudan Pancasila sebagai Dasar Negara dan Pandangan Hidup Bangsa",
        category: "PPKN",
      },
      {
        title:
          "Pembukaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945",
        category: "PPKN",
      },
      {
        title: "Kedaulatan Negara Kesatuan Republik Indonesia",
        category: "PPKN",
      },
      {
        title:
          "Keberagaman Masyarakat Indonesia dalam Bingkai Bhinneka Tunggal Ika",
        category: "PPKN",
      },
      { title: "Harmoni Keberagaman Masyarakat Indonesia", category: "PPKN" },
      {
        title: "Bela Negara dalam Konteks Negara Kesatuan Republik Indonesia",
        category: "PPKN",
      },
    ];

    await Course.insertMany(courses);
    console.log("Courses inserted successfully");
  } catch (error) {
    console.error("Error populating courses", error);
  }
};

populateCourses()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });
