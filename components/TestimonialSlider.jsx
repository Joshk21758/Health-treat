"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "I had a good experience.",
    author: "Ruth Mubanga",
    role: "Pharmacetical patient",
    rating: 5,
    image: "https://picsum.photos/seed/patient6/150/150",
  },
  {
    id: 2,
    content: "I had a wonderful experience.",
    author: "Lovemore Kayumba",
    role: "Emergency Patient",
    rating: 5,
    image: "https://picsum.photos/seed/patient7/150/150",
  },
  {
    id: 3,
    content: "They are good at their work.",
    author: "Joseph J. Samwenda",
    role: "Dental patient",
    rating: 5,
    image: "https://picsum.photos/seed/patient8/150/150",
  },
  {
    id: 4,
    content: "Good expertise.",
    author: "G Mambo",
    role: "Orthodontics Patient",
    rating: 5,
    image: "https://picsum.photos/seed/patient9/150/150",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
      <div className="overflow-hidden relative pb-12">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative">
                <Quote className="absolute top-8 right-8 w-16 h-16 text-teal-50" />

                <div className="flex gap-1 mb-6 text-yellow-400 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-8 relative z-10">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-teal-50 hover:text-rose-600 hover:border-teal-200 transition-colors shadow-sm"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-rose-500 w-8" : (
                  "bg-slate-300 hover:bg-teal-400"
                )
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-teal-50 hover:text-rose-400 hover:border-teal-200 transition-colors shadow-sm"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
