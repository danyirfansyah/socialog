"use client";

import React from "react";
import Link from "next/link";

const HeaderMain = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with Border */}
      <header className="w-full bg-white shadow-sm py-4 border-b">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/Logo.svg" // Pastikan gambar Logo.svg berada di dalam folder public
              alt="Socialog"
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-black">Socialog</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:flex justify-center flex-1 gap-6 font-medium text-black">
            <Link href="#"><span className="hover:text-teal-600 transition">HOME</span></Link>
            <Link href="#"><span className="hover:text-teal-600 transition">FEATURES</span></Link>
            <Link href="#"><span className="hover:text-teal-600 transition">WHY SOCIALOG?</span></Link>
            <Link href="#"><span className="hover:text-teal-600 transition">JOIN US</span></Link>
          </div>

          {/* Sign In Button */}
          <div className="hidden lg:flex">
            <Link href="#">
              <button className="bg-[#1CA8C3] text-white font-semibold text-sm px-6 py-2 rounded-full shadow transition">
                SIGN IN
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full bg-white py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side: Text and Button */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl font-bold text-black mb-4">
              Selamat Datang di <span className="text-[#1CA8C3]">Socialog!</span>
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
            Nikmati pengalaman belajar dengan infografis, animasi, dan video edukatif.
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

      {/* Footer with Full Blue Background */}
      <footer className="bg-[#1C3D5A] text-white py-10 mt-auto">
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
            <a href="https://wa.me/085646025146" target="_blank" rel="noopener noreferrer">
              <img
                src="/WA.png" // Ganti dengan icon WhatsApp yang sesuai
                alt="WhatsApp"
                className="w-6 h-6"
              />
            </a>
            <a href="https://www.instagram.com/rakharazaqa" target="_blank" rel="noopener noreferrer">
              <img
                src="/Instagram.png" // Ganti dengan icon Instagram yang sesuai
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeaderMain;
