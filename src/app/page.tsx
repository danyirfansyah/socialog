import Footer from "@/components/footer";
import HeaderMain from "@/components/HeaderMain";

export default function Home() {
  return (
    <main className="font-afacad">
      <HeaderMain />
      {/* Hero Section */}
      <div className="w-full bg-white py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side: Text and Button */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl font-bold text-black mb-4">
              Selamat Datang di{" "}
              <span className="text-[#1CA8C3]">Socialog!</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Belajar Lebih Mudah dan Menyenangkan!
            </p>
            <button className="bg-[#1CA8C3] text-white px-6 py-3 rounded-full hover:bg-[#1792ab] transition duration-300">
              Mulai Sekarang →
            </button>
          </div>

          {/* Right Side: Illustration */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="/Group 81.png" // Ganti dengan URL gambar yang sesuai
              alt="Hero Illustration"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>

        {/* Second Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold text-black mb-4">
            Selamat Datang di <span className="text-[#1CA8C3]">Socialog!</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Nikmati pengalaman belajar dengan infografis, animasi, dan video
            edukatif.
          </p>
          <div className="flex justify-center gap-8">
            <img
              src="/image 15.png" // Ganti dengan URL gambar yang sesuai
              alt="Learning Illustration"
              className="w-64 h-64 object-cover"
            />
            <img
              src="/image 15.png" // Ganti dengan URL gambar yang sesuai
              alt="Learning Illustration"
              className="w-64 h-64 object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
