'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export default function ResumePage() {
  const [isVisible, setIsVisible] = useState(false);
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume/resume.pdf';
    link.download = 'Alfayad_S_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="py-16 sm:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wide">
              MY <span className="text-red-500">{t('resume')}</span>
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              A comprehensive overview of my professional journey, skills, and achievements in full-stack development.
            </p>
            
            {/* Download Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-500/20"
              >
                📄 Download PDF Resume
              </button>
              <Link 
                href="/"
                className="bg-transparent border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 text-center"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-black/50 border-2 border-red-500/20 p-6 sm:p-8 md:p-12 rounded-xl shadow-2xl">
              
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16 border-b border-red-500/20 pb-8 sm:pb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                  ALFAYAD S
                </h2>
                <p className="text-red-400 text-lg sm:text-xl font-semibold mb-6">
                  FULL-STACK DEVELOPER
                </p>
                
                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base">
                  <div className="flex items-center justify-center">
                    <span className="w-5 h-5 mr-2 text-red-500">📧</span>
                    <span className="text-gray-300">alfayadshameer056@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-5 h-5 mr-2 text-red-500">📱</span>
                    <span className="text-gray-300">+91 9074575374</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-5 h-5 mr-2 text-red-500">🔗</span>
                    <span className="text-gray-300">Github: Alfayad S</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-5 h-5 mr-2 text-red-500">💼</span>
                    <span className="text-gray-300">LinkedIn: Alfayad S</span>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-wide">
                  {t('professionalSummary')}
                </h3>
                <div className="w-16 h-1 bg-red-500 mb-6"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Passionate full-stack developer with 3+ years of experience in building scalable web and mobile applications. 
                  Expertise in modern technologies including React, Node.js, and MongoDB. Proven track record of delivering 
                  high-quality solutions for diverse clients across various industries. Strong focus on user experience, 
                  performance optimization, and clean code architecture.
                </p>
              </div>

              {/* Experience Section */}
              <div className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-wide">
                  {t('professionalExperience')}
                </h3>
                <div className="w-16 h-1 bg-red-500 mb-8"></div>
                
                <div className="space-y-8 sm:space-y-12">
                  {/* CodeTeak */}
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Company Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
                          <Image 
                            src="/codeteak-logo.png" 
                            alt="CodeTeak Logo" 
                            width={64}
                            height={64}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg"
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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                          <div>
                            <h4 className="font-bold text-white text-lg sm:text-xl">CODETEAK PRIVATE LIMITED</h4>
                            <p className="text-red-400 text-sm sm:text-base font-semibold">Full-Stack Developer</p>
                          </div>
                          <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                            <span className="text-red-500 text-sm sm:text-base font-semibold">Apr 2025 – Present | Remote</span>
                            <span className="text-green-400 text-xs font-medium">{calculateExperienceDuration('2025-04-10')}</span>
                          </div>
                        </div>
                        <ul className="text-gray-300 text-sm sm:text-base space-y-2 leading-relaxed">
                          <li>• Currently working on developing scalable web and mobile applications using React, React Native, and Node.js</li>
                          <li>• Collaborating with cross-functional teams to deliver high-quality software solutions</li>
                          <li>• Implementing modern development practices and ensuring code quality and performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Brototype */}
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 sm:p-8">
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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                          <div>
                            <h4 className="font-bold text-white text-lg sm:text-xl">BROTOTYPE ACADEMY</h4>
                            <p className="text-red-400 text-sm sm:text-base font-semibold">Intern</p>
                          </div>
                          <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                            <span className="text-red-500 text-sm sm:text-base font-semibold">Jan 2024 – Dec 2025 | Offline</span>
                            <span className="text-yellow-400 text-xs font-medium">{calculateExperienceDuration('2024-04-01', '2025-04-09')}</span>
                          </div>
                        </div>
                        <ul className="text-gray-300 text-sm sm:text-base space-y-2 leading-relaxed">
                          <li>• Gained hands-on experience developing and managing full-stack web applications using the MERN stack</li>
                          <li>• Collaborated with cross-functional teams to design and implement solutions for various clients</li>
                          <li>• Ensured code quality and performance while working on real-world projects</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Freelancer */}
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6 sm:p-8">
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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                          <div>
                            <h4 className="font-bold text-white text-lg sm:text-xl">FREELANCER</h4>
                            <p className="text-red-400 text-sm sm:text-base font-semibold">Full-Stack Developer</p>
                          </div>
                          <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                            <span className="text-red-500 text-sm sm:text-base font-semibold">Jan 2024 – Present | Remote</span>
                            <span className="text-purple-400 text-xs font-medium">{calculateExperienceDuration('2024-01-01')}</span>
                          </div>
                        </div>
                        <ul className="text-gray-300 text-sm sm:text-base space-y-2 leading-relaxed">
                          <li>• Delivered end-to-end development solutions for various clients across different industries</li>
                          <li>• Built backend systems with Node.js, frontend designs with React and Tailwind CSS</li>
                          <li>• Integrated third-party APIs, payment gateways, and other external services</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-wide">
                  {t('technicalSkills')}
                </h3>
                <div className="w-16 h-1 bg-red-500 mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <h4 className="font-bold text-white text-lg mb-4">PROGRAMMING LANGUAGES</h4>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML', 'CSS'].map((skill, index) => (
                        <span key={index} className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <h4 className="font-bold text-white text-lg mb-4">FRAMEWORKS & LIBRARIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'React Native', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap'].map((skill, index) => (
                        <span key={index} className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <h4 className="font-bold text-white text-lg mb-4">DATABASES</h4>
                    <div className="flex flex-wrap gap-2">
                      {['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'].map((skill, index) => (
                        <span key={index} className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <h4 className="font-bold text-white text-lg mb-4">TOOLS & TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Netlify'].map((skill, index) => (
                        <span key={index} className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-wide">
                  {t('education')}
                </h3>
                <div className="w-16 h-1 bg-red-500 mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Brototype Academy */}
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <div className="relative mb-4">
                      <div className="w-full h-32 bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
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
                          <div className="text-4xl">🎓</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        CERTIFICATION
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">BROTOTYPE ACADEMY</h4>
                      <p className="text-red-400 text-sm font-semibold">MERN STACK DEVELOPMENT</p>
                      <p className="text-gray-300 text-sm mt-2">Graduated Dec 2024</p>
                    </div>
                  </div>

                  {/* TD Higher Secondary */}
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <div className="relative mb-4">
                      <div className="w-full h-32 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
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
                          <div className="text-4xl">💻</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        COMPUTER SCIENCE
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">TD HIGHER SECONDARY</h4>
                      <p className="text-red-400 text-sm font-semibold">COMPUTER SCIENCE</p>
                      <p className="text-gray-300 text-sm mt-2">Jul 2022 - Mar 2024</p>
                    </div>
                  </div>

                  {/* LEO XIII */}
                  <div className="bg-black/30 border border-red-500/20 rounded-lg p-6">
                    <div className="relative mb-4">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center relative overflow-hidden">
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
                          <div className="text-4xl">📚</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        10th GRADE
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">LEO XIII HIGHER SECONDARY</h4>
                      <p className="text-red-400 text-sm font-semibold">10th STANDARD</p>
                      <p className="text-gray-300 text-sm mt-2">May 2021 - Mar 2022</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Download Section */}
              <div className="text-center pt-8 border-t border-red-500/20">
                <p className="text-gray-300 text-sm mb-6">
                  Download the complete resume in PDF format for your records
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-500/20"
                >
                  📄 Download Complete Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
