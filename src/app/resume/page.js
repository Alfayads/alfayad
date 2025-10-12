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
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  let duration = '';
  if (years > 0) {
    duration += `${years} year${years > 1 ? 's' : ''}`;
    if (months > 0) {
      duration += ` ${months} month${months > 1 ? 's' : ''}`;
    }
  } else if (months > 0) {
    duration += `${months} month${months > 1 ? 's' : ''}`;
  }
  
  return duration || 'Less than a month';
};

// Calculate total years of experience
const calculateTotalExperience = () => {
  const start = new Date('2024-01-01'); // Starting from freelancing
  const end = new Date();
  const years = (end - start) / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(years * 10) / 10; // Round to 1 decimal
};

export default function ResumePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
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

  // Skills data with proficiency levels
  const skillsData = {
    'Frontend': [
      { name: 'React.js', level: 95, icon: '⚛️' },
      { name: 'Next.js', level: 90, icon: '▲' },
      { name: 'JavaScript', level: 95, icon: '📜' },
      { name: 'TypeScript', level: 85, icon: '📘' },
      { name: 'HTML/CSS', level: 98, icon: '🎨' },
      { name: 'Tailwind CSS', level: 95, icon: '🌊' },
      { name: 'React Native', level: 85, icon: '📱' },
    ],
    'Backend': [
      { name: 'Node.js', level: 90, icon: '🟢' },
      { name: 'Express.js', level: 90, icon: '🚂' },
      { name: 'MongoDB', level: 88, icon: '🍃' },
      { name: 'MySQL', level: 80, icon: '🐬' },
      { name: 'PostgreSQL', level: 75, icon: '🐘' },
      { name: 'Firebase', level: 85, icon: '🔥' },
      { name: 'REST API', level: 92, icon: '🔌' },
    ],
    'Tools': [
      { name: 'Git/GitHub', level: 95, icon: '📚' },
      { name: 'Docker', level: 75, icon: '🐳' },
      { name: 'AWS', level: 70, icon: '☁️' },
      { name: 'Vercel', level: 95, icon: '▲' },
      { name: 'VS Code', level: 98, icon: '💻' },
      { name: 'Postman', level: 90, icon: '📮' },
    ],
  };

  // Statistics data
  const stats = [
    { value: calculateTotalExperience() + '+', label: 'Years Experience', icon: '⏱️' },
    { value: '15+', label: 'Projects Completed', icon: '✅' },
    { value: '10+', label: 'Happy Clients', icon: '😊' },
    { value: '5+', label: 'Technologies', icon: '🛠️' },
  ];

  // Certifications data
  const certifications = [
    {
      title: 'MERN Stack Development',
      issuer: 'Brototype Academy',
      date: 'Dec 2024',
      icon: '🎓',
      color: 'from-orange-600/20 to-orange-800/20'
    },
    {
      title: 'Full-Stack Web Development',
      issuer: 'Self-Learning & Practice',
      date: '2024',
      icon: '💻',
      color: 'from-blue-600/20 to-blue-800/20'
    },
    {
      title: 'React & Next.js Specialist',
      issuer: 'Real-world Projects',
      date: '2024',
      icon: '⚛️',
      color: 'from-cyan-600/20 to-cyan-800/20'
    },
  ];

  // Get all skills or filtered by category
  const getDisplayedSkills = () => {
    if (activeSkillCategory === 'all') {
      return Object.values(skillsData).flat();
    }
    return skillsData[activeSkillCategory] || [];
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-black">
      {/* Hero Section with Stats */}
      <div className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-purple-600/5 to-blue-600/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wide">
              MY <span className="text-red-500">RESUME</span>
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
              A comprehensive overview of my professional journey, technical expertise, and achievements in full-stack development.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-black/50 border border-red-500/20 rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:border-red-500/40 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-500/20 flex items-center justify-center gap-2"
              >
                <span>📄</span> Download PDF Resume
              </button>
              <Link 
                href="/contact"
                className="bg-transparent border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 text-center"
              >
                💼 Hire Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Professional Summary */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-red-600/10 to-purple-600/10 border border-red-500/20 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-wide">
              Professional Summary
            </h2>
            <div className="w-20 h-1 bg-red-500 mb-6"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Passionate and results-driven Full-Stack Developer with {calculateTotalExperience()}+ years of hands-on experience in designing, developing, and deploying scalable web and mobile applications. Specializing in the MERN stack with expertise in React, Node.js, and MongoDB. Proven track record of delivering high-quality solutions for diverse clients across various industries. Strong focus on clean code architecture, user experience optimization, and modern development practices. Committed to continuous learning and staying current with emerging technologies.
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide text-center">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-12"></div>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-purple-500 to-blue-500 transform sm:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {/* CodeTeak */}
              <div className="relative flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                {/* Timeline Dot */}
                <div className="absolute left-8 sm:left-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-black transform sm:-translate-x-1/2 z-10"></div>
                
                {/* Content */}
                <div className="ml-20 sm:ml-0 sm:w-1/2 sm:pr-12 sm:text-right">
                  <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 sm:p-8 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between sm:justify-end gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
                        <Image 
                          src="/codeteak-logo.png" 
                          alt="CodeTeak Logo" 
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-xl font-bold" style={{display: 'none'}}>
                          CT
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-xl mb-2">CODETEAK PRIVATE LIMITED</h3>
                    <p className="text-red-400 font-semibold mb-2">Full-Stack Developer</p>
                    <p className="text-sm text-gray-400 mb-2">Apr 2025 – Present | Remote</p>
                    <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      {calculateExperienceDuration('2025-04-10')}
                    </span>
                    <ul className="text-gray-300 text-sm space-y-2 text-left">
                      <li>• Developing scalable web and mobile applications using React, React Native, and Node.js</li>
                      <li>• Collaborating with cross-functional teams to deliver high-quality software solutions</li>
                      <li>• Implementing modern development practices and ensuring code quality</li>
                    </ul>
                  </div>
                </div>
                
                <div className="hidden sm:block sm:w-1/2"></div>
              </div>

              {/* Brototype */}
              <div className="relative flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                {/* Timeline Dot */}
                <div className="absolute left-8 sm:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-black transform sm:-translate-x-1/2 z-10"></div>
                
                <div className="hidden sm:block sm:w-1/2"></div>
                
                {/* Content */}
                <div className="ml-20 sm:ml-0 sm:w-1/2 sm:pl-12">
                  <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 sm:p-8 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
                        <Image 
                          src="/brototype-logo.png" 
                          alt="Brototype Logo" 
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg flex items-center justify-center text-white text-xl font-bold" style={{display: 'none'}}>
                          BT
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-xl mb-2">BROTOTYPE ACADEMY</h3>
                    <p className="text-red-400 font-semibold mb-2">Intern</p>
                    <p className="text-sm text-gray-400 mb-2">Jan 2024 – Dec 2024 | Offline</p>
                    <span className="inline-block bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      {calculateExperienceDuration('2024-01-01', '2024-12-31')}
                    </span>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Gained hands-on experience with full-stack development using the MERN stack</li>
                      <li>• Collaborated with teams to design and implement client solutions</li>
                      <li>• Ensured code quality and performance in real-world projects</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Freelancer */}
              <div className="relative flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                {/* Timeline Dot */}
                <div className="absolute left-8 sm:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-black transform sm:-translate-x-1/2 z-10"></div>
                
                {/* Content */}
                <div className="ml-20 sm:ml-0 sm:w-1/2 sm:pr-12 sm:text-right">
                  <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 sm:p-8 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between sm:justify-end gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
                        <Image 
                          src="/freelance-logo.png" 
                          alt="Freelancer Logo" 
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white text-xl font-bold" style={{display: 'none'}}>
                          FL
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-xl mb-2">FREELANCER</h3>
                    <p className="text-red-400 font-semibold mb-2">Full-Stack Developer</p>
                    <p className="text-sm text-gray-400 mb-2">Jan 2024 – Present | Remote</p>
                    <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      {calculateExperienceDuration('2024-01-01')}
                    </span>
                    <ul className="text-gray-300 text-sm space-y-2 text-left">
                      <li>• Delivered end-to-end development solutions for various clients</li>
                      <li>• Built backend systems with Node.js and frontend designs with React</li>
                      <li>• Integrated third-party APIs, payment gateways, and external services</li>
                    </ul>
                  </div>
                </div>
                
                <div className="hidden sm:block sm:w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section with Progress Bars */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide text-center">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['all', 'Frontend', 'Backend', 'Tools'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeSkillCategory === category
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-black/50 border border-red-500/20 text-gray-400 hover:text-white hover:border-red-500/40'
                }`}
              >
                {category === 'all' ? 'All Skills' : category}
              </button>
            ))}
          </div>

          {/* Skills Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getDisplayedSkills().map((skill, index) => (
              <div 
                key={index}
                className={`bg-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-white">{skill.name}</span>
                  </div>
                  <span className="text-red-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 50}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide text-center">
            Certifications & Achievements
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className={`bg-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-full h-32 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-6xl">{cert.icon}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{cert.title}</h3>
                <p className="text-red-400 text-sm mb-2">{cert.issuer}</p>
                <p className="text-gray-400 text-xs">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide text-center">
            Education
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brototype Academy */}
            <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
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
                </div>
                <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  CERTIFICATION
                </div>
              </div>
              <h4 className="font-bold text-white text-base mb-1">BROTOTYPE ACADEMY</h4>
              <p className="text-red-400 text-sm font-semibold">MERN STACK DEVELOPMENT</p>
              <p className="text-gray-300 text-sm mt-2">Graduated Dec 2024</p>
            </div>

            {/* TD Higher Secondary */}
            <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
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
                </div>
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  COMPUTER SCIENCE
                </div>
              </div>
              <h4 className="font-bold text-white text-base mb-1">TD HIGHER SECONDARY</h4>
              <p className="text-red-400 text-sm font-semibold">COMPUTER SCIENCE</p>
              <p className="text-gray-300 text-sm mt-2">Jul 2022 - Mar 2024</p>
            </div>

            {/* LEO XIII */}
            <div className="bg-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
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
                </div>
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  10th GRADE
                </div>
              </div>
              <h4 className="font-bold text-white text-base mb-1">LEO XIII HIGHER SECONDARY</h4>
              <p className="text-red-400 text-sm font-semibold">10th STANDARD</p>
              <p className="text-gray-300 text-sm mt-2">May 2021 - Mar 2022</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center bg-gradient-to-br from-red-600/10 to-purple-600/10 border border-red-500/20 rounded-2xl p-8 sm:p-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Download my complete resume or get in touch to discuss your next project. I&apos;m always excited to work on innovative solutions!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-500/20"
            >
              📄 Download Complete Resume
            </button>
            <Link 
              href="/contact"
              className="bg-transparent border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 text-center"
            >
              💬 Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
