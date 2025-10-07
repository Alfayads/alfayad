'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Function to calculate experience duration
const calculateExperienceDuration = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Format the duration
  let duration = '';
  if (years > 0) {
    duration += `${years} year${years > 1 ? 's' : ''}`;
    if (months > 0) {
      duration += ` ${months} month${months > 1 ? 's' : ''}`;
    }
  } else if (months > 0) {
    duration += `${months} month${months > 1 ? 's' : ''}`;
  }
  
  if (days > 0 && months < 12) {
    if (duration) duration += ` `;
    duration += `${days} day${days > 1 ? 's' : ''}`;
  }
  
  return duration || 'Just started';
};

export default function ResumeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
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

  // Update current date every day to keep experience duration accurate
  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    // Update immediately
    updateDate();

    // Set up interval to update at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      updateDate();
      // Then update every 24 hours
      const interval = setInterval(updateDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Download Button */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-500/20"
          >
            📄 Download Resume PDF
          </button>
        </div>

        {/* Resume Content */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-black border-2 border-red-500/20 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Left Column - Personal Info */}
              <div className="lg:col-span-1">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide">{t('contact')}</h2>
                  <div className="w-8 sm:w-12 h-0.5 bg-red-500 mb-4 sm:mb-6"></div>
                  
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">ALFAYAD S</h3>
                    
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                      <div className="flex items-center">
                        <span className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-red-500">📧</span>
                        <span className="break-all">alfayadshameer056@gmail.com</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-red-500">📱</span>
                        <span>9074575374</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-red-500">🔗</span>
                        <span>Github: Alfayad S</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-red-500">💼</span>
                        <span>LinkedIn: Alfayad S</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">

                {/* Experience Section */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">{t('experience')}</h2>
                  <div className="w-8 sm:w-12 h-0.5 bg-red-500 mb-4 sm:mb-6"></div>
                  
                  <div className="space-y-6 sm:space-y-8">
                    {/* CodeTeak */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {/* Company Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
                            <Image 
                              src="/codeteak-logo.png" 
                              alt="CodeTeak Logo" 
                              width={64}
                              height={64}
                              className="w-12 h-12 sm:w-16 rounded-lg sm:h-16 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl font-bold" style={{display: 'none'}}>
                              CT
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                            <h3 className="font-bold text-white text-base sm:text-lg">CODETEAK PRIVATE LIMITED</h3>
                            <div className="flex flex-col sm:items-end">
                              <span className="text-red-500 text-xs sm:text-sm font-semibold">Apr 2025 – Present | Remote</span>
                              <span className="text-green-400 text-xs font-medium">{calculateExperienceDuration('2025-04-10')}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">• {t('codeTeakDescription')}</p>
                         
                        </div>
                      </div>
                    </div>

                    {/* Brototype */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {/* Company Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
                            <Image 
                              src="/brototype-logo.png" 
                              alt="Brototype Logo" 
                              width={64}
                              height={64}
                              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl font-bold" style={{display: 'none'}}>
                              BT
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                            <h3 className="font-bold text-white text-base sm:text-lg">BROTOTYPE</h3>
                            <div className="flex flex-col sm:items-end">
                              <span className="text-red-500 text-xs sm:text-sm font-semibold">Jan 2024 – Dec 2025 | Offline</span>
                              <span className="text-yellow-400 text-xs font-medium">{calculateExperienceDuration('2024-04-01', '2025-04-09')}</span>
                            </div>
                          </div>
                          <div className="text-gray-300 text-xs sm:text-sm space-y-2 leading-relaxed">
                            <p>• {t('brototypeDescription')}</p>
                            <p>• {t('brototypeDescription2')}</p>
                          </div>
                          
                        </div>
                      </div>
                    </div>

                    {/* Freelancer */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {/* Company Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
                            <Image 
                              src="/freelance-logo.png" 
                              alt="Freelancer Logo" 
                              width={64}
                              height={64}
                              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl font-bold" style={{display: 'none'}}>
                              FL
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                            <h3 className="font-bold text-white text-base sm:text-lg">FREELANCER</h3>
                            <div className="flex flex-col sm:items-end">
                              <span className="text-red-500 text-xs sm:text-sm font-semibold">Jan 2024 – Present | Remote</span>
                              <span className="text-purple-400 text-xs font-medium">{calculateExperienceDuration('2024-01-01')}</span>
                            </div>
                          </div>
                          <div className="text-gray-300 text-xs sm:text-sm space-y-2 leading-relaxed">
                            <p>• {t('freelancerDescription')}</p>
                            <p>• {t('freelancerDescription2')}</p>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Projects Section */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">{t('projects')}</h2>
                  <div className="w-8 sm:w-12 h-0.5 bg-red-500 mb-4 sm:mb-6"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    
                    {/* Fayad AI Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl sm:text-7xl">🤖</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          LIVE
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">{t('fayadAiTitle')}</h3>
                          <p className="text-red-400 text-xs font-semibold">PERSONAL AI ASSISTANT</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('fayadAiDescription')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">React</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Gemini API</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Vercel</span>
                        </div>
                        
                        <div className="pt-2">
                          <a href="https://fayad-ai.vercel.app" target="_blank" rel="noopener noreferrer" 
                             className="inline-flex items-center text-red-400 hover:text-red-300 text-xs font-semibold transition-colors">
                            View Project →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* File Organizer Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl sm:text-7xl">📁</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          DESKTOP
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">{t('fileOrganizerTitle')}</h3>
                          <p className="text-red-400 text-xs font-semibold">AUTOMATED DESKTOP APP</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('fileOrganizerDescription')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Electron.js</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Node.js</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">File System</span>
                        </div>
                        
                        <div className="pt-2">
                          <a href="https://github.com/Alfayads/file-organizer" target="_blank" rel="noopener noreferrer" 
                             className="inline-flex items-center text-red-400 hover:text-red-300 text-xs font-semibold transition-colors">
                            View Code →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Luxigoo Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl sm:text-7xl">✈️</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          LIVE
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">{t('luxigooTitle')}</h3>
                          <p className="text-red-400 text-xs font-semibold">TRAVEL BOOKING PLATFORM</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('luxigooDescription')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">MERN Stack</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">MongoDB</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Express</span>
                        </div>
                        
                        <div className="pt-2">
                          <a href="https://luxigoo.com" target="_blank" rel="noopener noreferrer" 
                             className="inline-flex items-center text-red-400 hover:text-red-300 text-xs font-semibold transition-colors">
                            Visit Site →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Florawy Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-pink-600/20 to-pink-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl sm:text-7xl">🌸</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          E-COMMERCE
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">{t('florawyTitle')}</h3>
                          <p className="text-red-400 text-xs font-semibold">FLOWER E-COMMERCE STORE</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('florawyDescription')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">React</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">E-commerce</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Payment</span>
                        </div>
                        
                        <div className="pt-2">
                          <a href="https://florawy.com" target="_blank" rel="noopener noreferrer" 
                             className="inline-flex items-center text-red-400 hover:text-red-300 text-xs font-semibold transition-colors">
                            Visit Store →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Yadro Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl sm:text-7xl">🎧</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          AI-POWERED
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">{t('yadroTitle')}</h3>
                          <p className="text-red-400 text-xs font-semibold">AI E-COMMERCE PLATFORM</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('yadroDescription')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">AI/ML</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">E-commerce</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Recommendations</span>
                        </div>
                        
                        <div className="pt-2">
                          <span className="inline-flex items-center text-gray-500 text-xs font-semibold">
                            Private Project
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Optical World Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl sm:text-7xl">👓</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-cyan-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          FRONTEND
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">{t('opticalTitle')}</h3>
                          <p className="text-red-400 text-xs font-semibold">EYEWEAR STORE WEBSITE</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('opticalDescription')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">React</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Tailwind CSS</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Responsive</span>
                        </div>
                        
                        <div className="pt-2">
                          <span className="inline-flex items-center text-gray-500 text-xs font-semibold">
                            Portfolio Project
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Education Section */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">{t('education')}</h2>
                  <div className="w-8 sm:w-12 h-0.5 bg-red-500 mb-4 sm:mb-6"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    
                    {/* Brototype Academy Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <Image 
                            src="/brototype-logo.png" 
                            alt="Brototype Academy" 
                            width={320}
                            height={160}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-lg flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                            <div className="text-6xl sm:text-7xl">🎓</div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          CERTIFICATION
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">BROTOTYPE ACADEMY</h3>
                          <p className="text-red-400 text-xs font-semibold">{t('brototypeEdu')}</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('brototypeEduDesc')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">MERN Stack</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Full Stack</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Remote</span>
                        </div>
                        
                        <div className="pt-2">
                          <span className="text-red-500 text-xs font-semibold">
                            Graduated Dec 2024
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TD Higher Secondary School Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <Image 
                            src="/td-school.png" 
                            alt="TD Higher Secondary School" 
                            width={320}
                            height={160}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                            <div className="text-6xl sm:text-7xl">💻</div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          COMPUTER SCIENCE
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">TD HIGHER SECONDARY</h3>
                          <p className="text-red-400 text-xs font-semibold">{t('tdEdu')}</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('tdEduDesc')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Computer Science</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Programming</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Software Dev</span>
                        </div>
                        
                        <div className="pt-2">
                          <span className="text-red-500 text-xs font-semibold">
                            Jul 2022 - Mar 2024
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* LEO XIII Higher Secondary School Card */}
                    <div className="bg-black/50 border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 transition-all duration-300 group">
                      <div className="relative mb-4">
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <Image 
                            src="/leo-school.png" 
                            alt="LEO XIII Higher Secondary School" 
                            width={320}
                            height={160}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                            <div className="text-6xl sm:text-7xl">📚</div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          10th GRADE
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base mb-1">LEO XIII HIGHER SECONDARY</h3>
                          <p className="text-red-400 text-xs font-semibold">{t('leoEdu')}</p>
                        </div>
                        
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {t('leoEduDesc')}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">10th Grade</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Mathematics</span>
                          <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">Science</span>
                        </div>
                        
                        <div className="pt-2">
                          <span className="text-red-500 text-xs font-semibold">
                            May 2021 - Mar 2022
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">{t('skills')}</h2>
                  <div className="w-8 sm:w-12 h-0.5 bg-red-500 mb-4 sm:mb-6"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Programming */}
                    <div>
                      <h3 className="font-bold text-white mb-2 sm:mb-3 text-sm sm:text-base">{t('programming')}</h3>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                        <div>
                          <span className="text-red-500 font-semibold">{t('years3plus')}:</span>
                          <span className="ml-1 sm:ml-2">JavaScript • Node.js • Express.js • React</span>
                        </div>
                        <div>
                          <span className="text-red-500 font-semibold">{t('years2plus')}:</span>
                          <span className="ml-1 sm:ml-2">TypeScript • MongoDB • Python • Java • HTML • CSS</span>
                        </div>
                        <div>
                          <span className="text-red-500 font-semibold">{t('year1plus')}:</span>
                          <span className="ml-1 sm:ml-2">Tailwind CSS • Bootstrap • MySQL • PostgreSQL</span>
                        </div>
                        <div>
                          <span className="text-red-500 font-semibold">{t('familiarWith')}:</span>
                          <span className="ml-1 sm:ml-2">React Native • Electron.js • Angular • jQuery • SASS • LESS • Firebase</span>
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="font-bold text-white mb-2 sm:mb-3 text-sm sm:text-base">{t('technologies')}</h3>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                        <p>Git • GitHub • GitLab • Docker • Kubernetes</p>
                        <p>CI/CD (GitLab CI) • AWS • Firebase</p>
                      </div>
                    </div>

                    {/* Additional Skills */}
                    <div>
                      <h3 className="font-bold text-white mb-2 sm:mb-3 text-sm sm:text-base">{t('additionalSkills')}</h3>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                        <p>{t('uiUx')}</p>
                        <p>{t('performance')}</p>
                      </div>
                    </div>

                    {/* Coursework */}
                    <div>
                      <h3 className="font-bold text-white mb-2 sm:mb-3 text-sm sm:text-base">{t('coursework')}</h3>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                        <div>
                          <span className="text-red-500 font-semibold">{t('webDev')}:</span>
                          <span className="ml-1 sm:ml-2">{t('backendDev')} • {t('frontendDesign')} • {t('dbManagement')} • {t('responsiveDesign')} • {t('crossBrowser')}</span>
                        </div>
                        <div>
                          <span className="text-red-500 font-semibold">{t('softwareEng')}:</span>
                          <span className="ml-1 sm:ml-2">{t('oop')} • {t('agile')} • {t('versionControl')} • {t('cicd')}</span>
                        </div>
                        <div>
                          <span className="text-red-500 font-semibold">{t('databases')}:</span>
                          <span className="ml-1 sm:ml-2">{t('relationalDb')} • {t('nosqlDb')} • {t('dbDesign')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
