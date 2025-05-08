export default function Footer() {
  return (
    /* Footer with Full Blue Background */
    <footer className="bg-[#1C3D5A] text-white py-10 mt-auto font-afacad">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo - Left Side */}
        <div className="flex items-center space-x-2">
          <img
            src="/Logo.svg" // Pastikan gambar Logo.svg berada di dalam folder public
            alt="Socialog"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold">SOCIALOG</span>
        </div>

        {/* Copyright - Center */}
        <div className="text-center">
          <p>Copyright © 2025 Socialog</p>
        </div>

        {/* Contact Us & Social Media - Right Side */}
        <div className="flex items-center space-x-4">
          <a href="mailto:danyirfansyah23@gmail.com">
            <img
              src="/Gmail.png" // Ganti dengan icon email yang sesuai
              alt="Email"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://wa.me/085646025146"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/WA.png" // Ganti dengan icon WhatsApp yang sesuai
              alt="WhatsApp"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://www.instagram.com/rakharazaqa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Instagram.png" // Ganti dengan icon Instagram yang sesuai
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
