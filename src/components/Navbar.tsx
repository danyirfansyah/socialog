"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <>
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
            <Link href="#">
              <span className="hover:text-teal-600 transition">HOME</span>
            </Link>
            <Link href="#">
              <span className="hover:text-teal-600 transition">BELAJAR</span>
            </Link>
            <Link href="#">
              <span className="hover:text-teal-600 transition">LATIHAN</span>
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="hidden lg:flex">
            <Link href="/signin">
              <button className="bg-[#1CA8C3] text-white font-semibold text-sm px-6 py-2 rounded-full shadow transition">
                SIGN IN
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
