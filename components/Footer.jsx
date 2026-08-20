import { MapPin, Phone, Smile } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <footer className="bg-neutral-800 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6 text-white">
                <Smile className="w-8 h-8 text-rose-500" />
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-rose-400">
                  Med Care
                </span>
              </div>
              <p className="text-gray-200 mb-6 leading-relaxed">
                Providing exceptional care with a gentle touch. Your health is
                our top priority.
              </p>
              <div className="flex items-center gap-4 text-gray-200">
                <Phone className="w-5 h-5" />
                <span>0972 712779</span>
              </div>
              <div className="flex items-center gap-4 text-gray-200 mt-3">
                <MapPin color="red" className="w-5 h-5" />
                <span>
                  Lusaka, Shantumbu Rd
                  <br />
                  Lusaka, Zambia, 10101
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-lg">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#services"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="hover:text-rose-500 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Administrator Panel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feedback"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Give us Feedback
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-lg">
                Hours
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-gray-600 pb-2">
                  <span>Monday - Friday</span>
                  <span className="text-white">Open 24 hours</span>
                </li>
                <li className="flex justify-between border-b border-gray-600 pb-2">
                  <span>Saturday</span>
                  <span className="text-white">Open 24 hours</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Sunday</span>
                  <span className="text-rose-400 font-medium">
                    08:00 - 18-00 hours
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-white text-sm">
            <p>
              &copy; {new Date().getFullYear()} Med Care. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
