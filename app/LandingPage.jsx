"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TestimonialSlider from "../components/TestimonialSlider";
import Hero from "../assets/images/hero.jpeg";
import Serv from "../assets/images/image1.jpg";
import Place from "../assets/images/place.jpg";
import Team from "../assets/images/team.jpg";
import General from "../assets/images/general.jpg";
import Spec from "../assets/images/spec.jpeg";
import Repro from "../assets/images/repro.jpg";
import Lab from "../assets/images/lab.webp";
import Teeth from "../assets/images/dental.jpeg";
import Anten from "../assets/images/baby.jpeg";
import Ultra from "../assets/images/ultra.webp";
import Pharm from "../assets/images/pharm.jpg";
import Male from "../assets/images/male.jpeg";
import Banner from "../assets/images/banner.jpeg";
import {
  Smile,
  Sparkles,
  BriefcaseMedical,
  FlaskConical,
  HeartHandshake,
  Scan,
  Heart,
  Scissors,
  Pill,
  Stethoscope,
  ShieldCheck,
  Baby,
  Clock,
  Phone,
  MapPin,
  CalendarDays,
  Menu,
  X,
  CheckCircle2,
  Users,
  Award,
  MessageCircleMore,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "You can book online through our appointment page or call our clinic directly. We will confirm your preferred date and time shortly after submission.",
    },
    {
      question: "Do you offer same-day consultations?",
      answer:
        "Yes, depending on availability. We recommend booking early so our team can reserve the most suitable time for you.",
    },
    {
      question: "Are your services suitable for children and adults?",
      answer:
        "Absolutely. We provide a wide range of medical care for both adults and children, including family planning and antenatal services.",
    },
    {
      question: "Can I receive lab results the same day?",
      answer:
        "Some results are available quickly, while others may take longer depending on the test. Our team will advise you on expected turnaround times.",
    },
  ];

  const services = [
    {
      title: "General Consultation",
      description:
        "Primary evaluation and diagnosis by general practitioner form common illnesses, routine assessments & treatment recommendations.",
      icon: <Stethoscope className="w-6 h-6 text-rose-400" />,
      image: General,
    },
    {
      title: "Specialist Consultation",
      description:
        "Advanced medical evaluation and care provided by specialized doctors focused on specific fields of medicine.",
      icon: <BriefcaseMedical className="w-6 h-6 text-rose-400" />,
      image: Spec,
    },
    {
      title: "Laboratory",
      description:
        "On-site diagnostic testing (such as blood tests, urinalysis & infection screenings) to support accurate diagnosis.",
      icon: <FlaskConical className="w-6 h-6 text-rose-400" />,
      image: Lab,
    },
    {
      title: "Dental",
      description:
        "Preventive, diagnostic and corrective oral health care, including routine check-ups, cleaning, fillings & extractions.",
      icon: <Smile className="w-6 h-6 text-rose-400" />,
      image: Teeth,
    },
    {
      title: "Antenatal",
      description:
        "Dedicated healthcare and monitoring for pregnant women to track maternal health & fetal development.",
      icon: <Baby className="w-6 h-6 text-rose-400" />,
      image: Anten,
    },
    {
      title: "Reproductive Health",
      description:
        "Comprehensive medical services addressing fertility, hormonal health, sexual health & reproductive system wellness.",
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      image: Repro,
    },
  ];

  return (
    <div className="min-h-screen bg-rose-100 font-sans text-slate-900">
      {/* Hero Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="slide-up-reveal relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50/90 to-rose-100 mix-blend-multiply" />
          {/* Abstract Shapes for background */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl -z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Your Journey to a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-rose-400">
                  Healthier Life
                </span>{" "}
                Starts Here.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
                Experience modern, pain-free health care services in a relaxing
                environment. Our expert team is dedicated to giving you the
                best, healthy and professionalized treatment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointments"
                  className="bg-neutral-800 hover:bg-rose-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-teal-600/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <CalendarDays className="w-5 h-5" />
                  Book an Appointment
                </Link>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src={Hero}
                  alt="Friendly dentist"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-neutral-700">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Top Rated Medical Centre
                      </h4>
                      <p className="text-sm text-rose-400">
                        5-Star Google Reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={(el) => (sectionRefs.current[1] = el)}
        className="slide-up-reveal py-24 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-rose-500 font-semibold tracking-wide uppercase text-3xl mb-3">
              Our Services
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-700 mb-4">
              Comprehensive Care for best results
            </h3>
            <p className="text-lg text-neutral-800">
              We offer a full range of medical services using the latest
              technology to ensure you receive the best possible care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 hover:border-slate-100 hover:bg-rose-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 opacity-35">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/15 transition-colors" />
                </div>

                <div className="relative p-8">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-50 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">
                    {service.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current[2] = el)}
        className="slide-up-reveal py-24 bg-slate-50 relative border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
                    <Image
                      src={Place}
                      alt="Modern dental clinic"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
                    <Image
                      src={Serv}
                      alt="Dental equipment"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
                    <Image
                      src={Team}
                      alt="Dental team"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
                    <Image
                      src={Banner}
                      alt="Medical centre"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-rose-500 font-semibold tracking-wide uppercase text-3xl mb-3">
                About Us
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6 leading-tight">
                Reshaping your healthy living
              </h3>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                At New Life Medical Centre, we believe that a visit to our
                location should be stress-free, comfortable, and highly
                effective. Since 2021, our state-of-the-art facility has
                combined advanced health treatment technology with a warm,
                welcoming environment.
              </p>

              <ul className="space-y-5 mb-10">
                {[
                  "Experienced and compassionate specialists.",
                  "Cutting-edge 3D imaging and laser technology.",
                  "Personalized treatment plans tailored to your needs.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        ref={(el) => (sectionRefs.current[3] = el)}
        className="slide-up-reveal py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-rose-600 font-semibold tracking-wide uppercase text-3xl mb-3">
              Frequently Asked Questions
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Everything you need to know before your visit
            </h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {faq.question}
                    </h4>
                    <p className="mt-3 text-slate-600">{faq.answer}</p>
                  </div>
                  <div className="rounded-full bg-green-100 p-2 text-rose-400">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={(el) => (sectionRefs.current[5] = el)}
        className="slide-up-reveal py-24 bg-white relative"
      >
        <div className="absolute inset-0 bg-rose-50/30 -skew-y-2 transform origin-top-left -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-rose-600 font-semibold tracking-wide uppercase text-3xl mb-3">
              Patient Stories
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              What Our Patients Say
            </h3>
            <p className="text-lg text-slate-600">
              Do not just take our word for it. Read about the experiences of
              our real patients.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>
      {/* Footer */}
    </div>
  );
}
