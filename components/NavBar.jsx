import { Menu, Smile, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  return (
    <div>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-rose-400 rounded-xl flex items-center justify-center text-white">
                <Smile className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                MedCare
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#services"
                className="text-slate-600 hover:text-rose-400 font-medium transition-colors"
              >
                Services
              </Link>
              <Link
                href="#about"
                className="text-slate-600 hover:text-rose-400 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#testimonials"
                className="text-slate-600 hover:text-rose-400 font-medium transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="/appointments"
                className="bg-rose-400 hover:bg-rose-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md shadow-teal-600/20 active:scale-95"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
