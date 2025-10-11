'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function WorkPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "FAYAD AI",
      subtitle: "PERSONAL AI ASSISTANT",
      description: "A custom-built, conversational AI application created from scratch, demonstrating expertise in modern frontend development and API integration.",
      image: "/fayad-ai-preview.png",
      fallbackEmoji: "🤖",
      gradient: "from-red-600/20 to-red-800/20",
      badge: "LIVE",
      badgeColor: "bg-red-600",
      link: "https://fayad-ai.vercel.app",
      technologies: ["React", "Gemini API", "Vercel", "Tailwind CSS"],
      status: "live"
    },
    {
      id: 2,
      title: "LUXIGOO TRAVEL",
      subtitle: "TRAVEL BOOKING PLATFORM",
      description: "Developed a live travel-based web application enabling users to explore and book travel packages with dynamic search and real-time booking management.",
      image: "/luxigoo-preview.png",
      fallbackEmoji: "✈️",
      gradient: "from-green-600/20 to-green-800/20",
      badge: "LIVE",
      badgeColor: "bg-green-600",
      link: "https://luxigoo.com",
      technologies: ["MERN Stack", "MongoDB", "Express", "React"],
      status: "live"
    },
    {
      id: 3,
      title: "FLORAWY E-COMMERCE",
      subtitle: "ONLINE FLOWER STORE",
      description: "Created an online flower store allowing users to browse and purchase a variety of floral products with modern e-commerce functionality.",
      image: "/florawy-preview.png",
      fallbackEmoji: "🌸",
      gradient: "from-pink-600/20 to-pink-800/20",
      badge: "LIVE",
      badgeColor: "bg-pink-600",
      link: "https://florawy.com",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "live"
    },
    {
      id: 4,
      title: "YADRO E-COMMERCE",
      subtitle: "PREMIUM HEADSET STORE",
      description: "Developed a premium e-commerce platform for wireless headsets with AI-driven product recommendations and personalized shopping experiences.",
      image: "/yadro-preview.png",
      fallbackEmoji: "🎧",
      gradient: "from-blue-600/20 to-blue-800/20",
      badge: "COMPLETED",
      badgeColor: "bg-blue-600",
      link: "#",
      technologies: ["React", "AI/ML", "Node.js", "MySQL"],
      status: "completed"
    },
    {
      id: 5,
      title: "OPTICAL WORLD",
      subtitle: "EYEWEAR COLLECTIONS",
      description: "Built a modern optical store website showcasing eyewear collections with elegant design and seamless user experience.",
      image: "/optical-world-preview.png",
      fallbackEmoji: "👓",
      gradient: "from-purple-600/20 to-purple-800/20",
      badge: "LIVE",
      badgeColor: "bg-purple-600",
      link: "#",
      technologies: ["React", "Tailwind CSS", "Responsive Design"],
      status: "live"
    },
    {
      id: 6,
      title: "FILE ORGANIZER",
      subtitle: "AUTOMATED DESKTOP APP",
      description: "Created an intelligent desktop application that automatically organizes files based on type, date, and custom rules with a clean interface.",
      image: "/file-organizer-preview.png",
      fallbackEmoji: "📁",
      gradient: "from-orange-600/20 to-orange-800/20",
      badge: "DESKTOP",
      badgeColor: "bg-orange-600",
      link: "#",
      technologies: ["Node.js", "Electron", "File System API"],
      status: "desktop"
    },
    {
      id: 7,
      title: "WHOLESALE BILLING SOFTWARE",
      subtitle: "DESKTOP BILLING SYSTEM",
      description: "A comprehensive desktop application for managing wholesale and retail billing operations with real-time cloud database synchronization and barcode support.",
      image: "/wholesale-billing-preview.png",
      fallbackEmoji: "🧾",
      gradient: "from-cyan-600/20 to-cyan-800/20",
      badge: "DESKTOP",
      badgeColor: "bg-cyan-600",
      link: "https://github.com/Alfayads/wholesale-billing-software",
      technologies: ["Electron.js", "React", "Supabase", "Tailwind CSS"],
      status: "desktop"
    },
    {
      id: 8,
      title: "QASAR AL HAYA VALET",
      subtitle: "VALET PARKING BUSINESS",
      description: "Professional website for valet parking business featuring service booking, real-time availability, and modern UI with seamless user experience.",
      image: "/qh-valet-preview.png",
      fallbackEmoji: "🚗",
      gradient: "from-emerald-600/20 to-emerald-800/20",
      badge: "LIVE",
      badgeColor: "bg-emerald-600",
      link: "https://qhvalet.com/",
      technologies: ["Next.js", "Tailwind CSS", "Redux", "React"],
      status: "live"
    },
    {
      id: 9,
      title: "FD-POSTMAN-CLI",
      subtitle: "NPM PACKAGE - CLI TOOL",
      description: "Command-line interface tool for API testing and development. A terminal-based Postman alternative for developers who prefer working in the command line.",
      image: "/fd-postman-preview.png",
      fallbackEmoji: "📦",
      gradient: "from-yellow-600/20 to-yellow-800/20",
      badge: "NPM",
      badgeColor: "bg-yellow-600",
      link: "https://github.com/Alfayads/fd-postman-cli",
      technologies: ["Node.js", "CLI", "NPM Package", "API Testing"],
      status: "npm"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Solutions",
      content: "Alfayad delivered an exceptional web application that exceeded our expectations. His attention to detail and modern development practices made our project a huge success.",
      rating: 5,
      project: "Custom Web Application"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, TravelCo",
      content: "Working with Alfayad was a pleasure. He understood our vision perfectly and brought it to life with cutting-edge technology. Highly recommended for any development project.",
      rating: 5,
      project: "Luxigoo Travel Platform"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, FloraPlus",
      content: "The e-commerce platform Alfayad built for us is outstanding. The user experience is smooth, and the backend is rock-solid. Our sales increased by 40% since launch.",
      rating: 5,
      project: "Florawy E-commerce"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Product Manager, AudioTech",
      content: "Alfayad's AI integration in our e-commerce platform was game-changing. The personalized recommendations he implemented have significantly improved customer engagement.",
      rating: 5,
      project: "Yadro E-commerce with AI"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Owner, VisionCare",
      content: "The website Alfayad created for our optical store is beautiful and functional. The responsive design works perfectly on all devices, and our online presence has never been better.",
      rating: 5,
      project: "Optical World Website"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "IT Director, CorpSolutions",
      content: "The file organization tool Alfayad developed has streamlined our document management process. It's intuitive, efficient, and has saved us countless hours of manual work.",
      rating: 5,
      project: "File Organizer Desktop App"
    }
  ];

  // Testimonial carousel functions
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="py-20 sm:py-24 bg-gradient-to-br ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wide">
              MY <span className="text-red-500">{t('work')}</span>
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent projects and client testimonials. Each project represents a unique challenge solved with creativity, technical expertise, and attention to detail.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
              {t('featuredProjects')}
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From AI-powered applications to e-commerce platforms, explore the diverse range of projects I&apos;ve delivered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`bg-black/50 border border-red-500/20 rounded-xl p-6 sm:p-8 hover:border-red-500/40 transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative mb-6">
                  <div className={`w-full h-48 sm:h-56 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                    <Image 
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={224}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center absolute inset-0`} style={{display: 'none'}}>
                      <div className="text-6xl sm:text-7xl">{project.fallbackEmoji}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className={`absolute top-3 right-3 ${project.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {project.badge}
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg sm:text-xl mb-1">{project.title}</h3>
                    <p className="text-red-400 text-sm font-semibold">{project.subtitle}</p>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Link */}
                  {project.link !== "#" && (
                    <div className="pt-2">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-400 hover:text-red-300 text-sm font-semibold transition-colors group-hover:translate-x-1 duration-300"
                      >
                        View Project →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
              {t('clientTestimonials')}
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Hear what my clients have to say about working with me and the quality of my deliverables.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Main Carousel */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 bg-black/80 border border-red-500/20 rounded-2xl p-8 sm:p-12"
                  >
                    <div className="max-w-4xl mx-auto text-center">
                      {/* Rating */}
                      <div className="flex items-center justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-2xl mx-1">★</span>
                        ))}
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 italic">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>

                      {/* Client Info */}
                      <div className="flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-full flex items-center justify-center mr-4 border border-red-500/20">
                          <span className="text-red-400 font-bold text-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                          <p className="text-red-400 text-sm font-medium">{testimonial.project}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-red-500/20 rounded-full p-3 text-white hover:text-red-400 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-red-500/20 rounded-full p-3 text-white hover:text-red-400 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-red-500/30 hover:bg-red-500/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 sm:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
            READY TO START YOUR <span className="text-red-500">PROJECT?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Let&apos;s discuss how we can bring your ideas to life with cutting-edge technology and creative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:alfayadshameer056@gmail.com"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-500/20"
            >
              GET IN TOUCH
            </a>
            <Link 
              href="/"
              className="bg-transparent border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
