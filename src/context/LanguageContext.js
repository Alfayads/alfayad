'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Available languages
  const languages = useMemo(() => ({
    en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
    hi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' }
  }), []);

  // Translations
  const translations = {
    en: {
      // Navigation
      home: 'Home',
      about: 'About',
      work: 'Work',
      resume: 'Resume',
      services: 'Services',
      contact: 'Contact',
      
      // Hero Section
      HELLO: 'HELLO',
      heroTitle: 'ALFAYAD',
      heroSubtitle: 'FULL STACK DEVELOPER',
      heroDescription: 'A DEVELOPER BASED IN INDIA',      
      heroCta: "LET'S WORK TOGETHER",
      
      // About Section
      aboutTitle: 'ABOUT',
      aboutSubtitle: 'CREATIVE DEVELOPER',
      aboutDescription: 'I am a passionate full-stack developer with expertise in modern web technologies. I create innovative solutions that bridge the gap between design and functionality.',
      aboutCta: 'VIEW MY WORK',
      
      // Skills
      skillsTitle: 'SKILLS VISUALIZATION',
      skillsSubtitle: 'Technical Proficiency',
      skillsRadar: 'Skills Radar',
      skillsSummary: 'Expertise Summary',
      skillsDescription: 'With over 3+ years of experience in full-stack development, I specialize in modern JavaScript frameworks, cloud technologies, and scalable web applications.',
      
      // Services
      servicesTitle: 'SERVICES',
      servicesSubtitle: 'What I Offer',
      getStarted: 'Get Started',
      mostPopular: 'MOST POPULAR',
      
      // Services page content
      servicesDescription: 'Professional full-stack development services tailored to your needs. From simple landing pages to complex web applications with database integration.',
      backToHome: 'Back to Home',
      viewPortfolio: 'View Portfolio',
      
      // Service packages
      basicPlan: 'Basic Plan',
      basicSubtitle: 'Starter / Landing Page',
      standardPlan: 'Standard Plan',
      standardSubtitle: 'Multi-page Business Website',
      premiumPlan: 'Premium Plan',
      premiumSubtitle: 'Full-Stack Web Application',
      
      // Package features
      functionalWebsite: 'Functional website',
      onePage: '1 page',
      fivePages: '5 pages',
      tenPages: '10 pages',
      contentUpload: 'Content upload',
      onePlugin: '1 plugin/extension',
      twoPlugins: '2 plugins/extensions',
      threePlugins: '3 plugins/extensions',
      speedOptimization: 'Speed optimization',
      hostingSetup: 'Hosting setup',
      socialMediaIcons: 'Social media icons',
      optInForm: 'Opt-in form',
      ecommerceFunctionality: 'E-commerce functionality',
      twentyProducts: '20 products',
      paymentIntegration: 'Payment Integration',
      autoresponderIntegration: 'Autoresponder integration',
      
      // Package descriptions
      basicDescription: 'Responsive 1-page website using React/Next.js with clean UI and mobile design.',
      standardDescription: 'Multi-page business website with responsive design and basic backend setup.',
      premiumDescription: 'Full-stack web app with database, authentication, and payment integration.',
      
      // Delivery and revisions
      tenDayDelivery: '10-day delivery',
      sixtyDayDelivery: '60-day delivery',
      ninetyDayDelivery: '90-day delivery',
      twoRevisions: '2 Revisions',
      threeRevisions: '3 Revisions',
      fiveRevisions: '5 Revisions',
      
      // Technology stack
      technologyStack: 'TECHNOLOGY STACK',
      technologyDescription: 'Built with modern, industry-standard technologies for optimal performance and scalability.',
      
      // Development process
      developmentProcess: 'DEVELOPMENT PROCESS',
      developmentDescription: 'A streamlined approach to delivering high-quality web solutions on time and within budget.',
      step1: 'Discovery & Planning',
      step1Desc: 'Understanding your requirements, goals, and target audience to create a detailed project roadmap.',
      step2: 'Design & Prototyping',
      step2Desc: 'Creating wireframes, mockups, and interactive prototypes to visualize the final product.',
      step3: 'Development & Testing',
      step3Desc: 'Building your application with clean, maintainable code and thorough testing at each stage.',
      step4: 'Deployment & Launch',
      step4Desc: 'Setting up hosting, configuring domains, and ensuring everything works perfectly before launch.',
      step5: 'Maintenance & Support',
      step5Desc: 'Ongoing support, updates, and maintenance to keep your application running smoothly.',
      
      // Call to action
      readyToStart: 'READY TO START YOUR PROJECT?',
      ctaDescription: 'Let\'s discuss your requirements and create something amazing together. Get in touch for a free consultation.',
      getFreeConsultation: 'Get Free Consultation',
      viewAllServices: 'View All Services',
      
      // Additional services content
      whatsIncluded: 'What\'s Included',
      choosePerfectPackage: 'Choose the perfect package for your project needs. All packages include responsive design and modern development practices.',
      
      // Contact
      contactTitle: 'GET IN TOUCH',
      contactSubtitle: 'PROJECT INQUIRY',
      contactDescription: 'Ready to bring your project to life? Let\'s discuss your requirements and create something amazing together.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      plan: 'Service Plan',
      projectType: 'Project Type',
      budget: 'Budget Range',
      timeline: 'Timeline',
      description: 'Project Description',
      sendMessage: 'SEND MESSAGE',
      preparingEmail: 'Preparing Email...',
      
      // Footer
      copyright: '©2024',
      basedIn: 'A DEVELOPER BASED IN INDIA',
      
      // Additional keys
      designer: 'DESIGNER',
      featuredProjects: 'FEATURED PROJECTS',
      clientTestimonials: 'CLIENT TESTIMONIALS',
      professionalSummary: 'PROFESSIONAL SUMMARY',
      professionalExperience: 'PROFESSIONAL EXPERIENCE',
      technicalSkills: 'TECHNICAL SKILLS',
      experience: 'EXPERIENCE',
      projects: 'PROJECTS',
      skills: 'SKILLS',
      
      // Resume content
      resumeDescription: 'A comprehensive overview of my professional journey, skills, and achievements in full-stack development.',
      summaryText: 'Passionate full-stack developer with 3+ years of experience in modern web technologies. Specialized in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and mobile solutions.',
      
      // Experience
      codeTeakTitle: 'FULL-STACK DEVELOPER',
      codeTeakDescription: 'Currently working on developing scalable web and mobile applications using React, React Native, and Node.js.',
      brototypeTitle: 'INTERN',
      brototypeDescription: 'Gained hands-on experience developing and managing full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js).',
      brototypeDescription2: 'Collaborated with cross-functional teams to design and implement solutions for various clients, ensuring code quality and performance.',
      freelancerTitle: 'FULL-STACK DEVELOPER',
      freelancerDescription: 'Delivered end-to-end development solutions, including backend systems with Node.js, frontend design with React and Tailwind CSS, and database management with MongoDB and MySQL.',
      freelancerDescription2: 'Successfully integrated third-party APIs, payment gateways, and other external services to enhance application functionality.',
      
      // Projects
      luxigooTitle: 'LUXIGOO TRAVEL WEBSITE',
      luxigooDescription: 'Developed a live travel-based web application enabling users to explore and book travel packages.',
      luxigooTech: 'Implemented dynamic search, user authentication, and real-time booking management using MERN stack.',
      florawyTitle: 'FLORAWY E-COMMERCE PLATFORM',
      florawyDescription: 'Created an online flower store allowing users to browse and purchase a variety of floral products.',
      yadroTitle: 'YADRO E-COMMERCE APPLICATION',
      yadroDescription: 'Developed a premium e-commerce platform for wireless headsets with AI-driven product recommendations.',
      yadroTech: 'Integrated machine learning for personalized shopping experiences and inventory management.',
      opticalTitle: 'OPTICAL WORLD',
      opticalDescription: 'Built a modern optical store website showcasing eyewear collections using React and Tailwind CSS.',
      fayadAiTitle: 'FAYAD AI',
      fayadAiDescription: 'An intelligent AI assistant for web development tasks and code optimization.',
      fileOrganizerTitle: 'AUTOMATED FILE ORGANIZER',
      fileOrganizerDescription: 'A smart file management system that automatically organizes files based on type and content.',
      
      // Education
      brototypeEdu: 'MERN STACK DEVELOPMENT CERTIFICATION',
      brototypeEduDesc: 'Comprehensive training in modern web development technologies and best practices.',
      tdEdu: 'Computer Science',
      tdEduDesc: 'Higher secondary education with focus on computer science fundamentals.',
      leoEdu: '10th Grade',
      leoEduDesc: 'Completed secondary education with excellent academic performance.',
      
      // Skills categories
      programming: 'PROGRAMMING',
      technologies: 'TECHNOLOGIES',
      coursework: 'COURSEWORK',
      additionalSkills: 'ADDITIONAL SKILLS',
      
      // Skills details
      years3plus: '3+ years',
      years2plus: '2+ years',
      year1plus: '1+ year',
      familiarWith: 'Familiar with',
      
      // Coursework details
      webDev: 'Web Development',
      backendDev: 'Backend Development',
      frontendDesign: 'Frontend Design',
      dbManagement: 'Database Management',
      responsiveDesign: 'Responsive Web Design',
      crossBrowser: 'Cross-Browser Compatibility',
      softwareEng: 'Software Engineering',
      oop: 'Object-Oriented Programming',
      agile: 'Agile Methodologies',
      versionControl: 'Version Control with Git',
      cicd: 'CI/CD Pipelines',
      databases: 'Databases',
      relationalDb: 'Relational Databases (MySQL, PostgreSQL)',
      nosqlDb: 'NoSQL Databases (MongoDB)',
      dbDesign: 'Database Design and Optimization',
      
      // Additional skills
      uiUx: 'UI/UX • Blender • Responsive Design',
      performance: 'Web Performance Optimization • AI Integration'
    },
    
    hi: {
      // Navigation
      home: 'होम',
      about: 'के बारे में',
      work: 'काम',
      resume: 'रिज्यूम',
      services: 'सेवाएं',
      contact: 'संपर्क',
      
      // Hero Section
      HELLO: 'नमस्ते',
      heroTitle: 'अलफायद',
      heroSubtitle: 'फुल स्टैक डेवलपर',
      heroDescription: 'भारत में स्थित एक डेवलपर',
      heroCta: 'आइए मिलकर काम करें',
      
      // About Section
      aboutTitle: 'के बारे में',
      aboutSubtitle: 'रचनात्मक डेवलपर',
      aboutDescription: 'मैं आधुनिक वेब तकनीकों में विशेषज्ञता के साथ एक भावुक फुल स्टैक डेवलपर हूं। मैं ऐसे नवाचार समाधान बनाता हूं जो डिजाइन और कार्यक्षमता के बीच की खाई को पाटते हैं।',
      aboutCta: 'मेरा काम देखें',
      
      // Skills
      skillsTitle: 'कौशल विज़ुअलाइज़ेशन',
      skillsSubtitle: 'तकनीकी दक्षता',
      skillsRadar: 'कौशल रडार',
      skillsSummary: 'विशेषज्ञता सारांश',
      skillsDescription: 'फुल स्टैक डेवलपमेंट में 3+ वर्षों के अनुभव के साथ, मैं आधुनिक JavaScript फ्रेमवर्क, क्लाउड तकनीकों और स्केलेबल वेब एप्लिकेशन में विशेषज्ञता रखता हूं।',
      
      // Services
      servicesTitle: 'सेवाएं',
      servicesSubtitle: 'मैं क्या प्रदान करता हूं',
      getStarted: 'शुरू करें',
      mostPopular: 'सबसे लोकप्रिय',
      
      // Services page content
      servicesDescription: 'आपकी जरूरतों के अनुसार अनुकूलित पेशेवर फुल स्टैक डेवलपमेंट सेवाएं। सरल लैंडिंग पेजों से लेकर डेटाबेस एकीकरण के साथ जटिल वेब एप्लिकेशन तक।',
      backToHome: 'होम पर वापस',
      viewPortfolio: 'पोर्टफोलियो देखें',
      
      // Service packages
      basicPlan: 'बेसिक प्लान',
      basicSubtitle: 'स्टार्टर / लैंडिंग पेज',
      standardPlan: 'स्टैंडर्ड प्लान',
      standardSubtitle: 'मल्टी-पेज बिजनेस वेबसाइट',
      premiumPlan: 'प्रीमियम प्लान',
      premiumSubtitle: 'फुल-स्टैक वेब एप्लिकेशन',
      
      // Package features
      functionalWebsite: 'कार्यात्मक वेबसाइट',
      onePage: '1 पेज',
      fivePages: '5 पेज',
      tenPages: '10 पेज',
      contentUpload: 'सामग्री अपलोड',
      onePlugin: '1 प्लगइन/एक्सटेंशन',
      twoPlugins: '2 प्लगइन/एक्सटेंशन',
      threePlugins: '3 प्लगइन/एक्सटेंशन',
      speedOptimization: 'गति अनुकूलन',
      hostingSetup: 'होस्टिंग सेटअप',
      socialMediaIcons: 'सोशल मीडिया आइकन',
      optInForm: 'ऑप्ट-इन फॉर्म',
      ecommerceFunctionality: 'ई-कॉमर्स कार्यक्षमता',
      twentyProducts: '20 उत्पाद',
      paymentIntegration: 'भुगतान एकीकरण',
      autoresponderIntegration: 'ऑटोरिस्पॉन्डर एकीकरण',
      
      // Package descriptions
      basicDescription: 'साफ UI और मोबाइल डिजाइन के साथ React/Next.js का उपयोग करके उत्तरदायी 1-पेज वेबसाइट।',
      standardDescription: 'उत्तरदायी डिजाइन और बुनियादी बैकएंड सेटअप के साथ मल्टी-पेज बिजनेस वेबसाइट।',
      premiumDescription: 'डेटाबेस, प्रमाणीकरण और भुगतान एकीकरण के साथ फुल-स्टैक वेब ऐप।',
      
      // Delivery and revisions
      tenDayDelivery: '10-दिन की डिलीवरी',
      sixtyDayDelivery: '60-दिन की डिलीवरी',
      ninetyDayDelivery: '90-दिन की डिलीवरी',
      twoRevisions: '2 संशोधन',
      threeRevisions: '3 संशोधन',
      fiveRevisions: '5 संशोधन',
      
      // Technology stack
      technologyStack: 'तकनीक स्टैक',
      technologyDescription: 'इष्टतम प्रदर्शन और स्केलेबिलिटी के लिए आधुनिक, उद्योग-मानक तकनीकों के साथ निर्मित।',
      
      // Development process
      developmentProcess: 'डेवलपमेंट प्रक्रिया',
      developmentDescription: 'समय पर और बजट के भीतर उच्च गुणवत्ता वाले वेब समाधान देने के लिए एक सुव्यवस्थित दृष्टिकोण।',
      step1: 'खोज और योजना',
      step1Desc: 'विस्तृत परियोजना रोडमैप बनाने के लिए आपकी आवश्यकताओं, लक्ष्यों और लक्षित दर्शकों को समझना।',
      step2: 'डिजाइन और प्रोटोटाइपिंग',
      step2Desc: 'अंतिम उत्पाद को देखने के लिए वायरफ्रेम, मॉकअप और इंटरैक्टिव प्रोटोटाइप बनाना।',
      step3: 'डेवलपमेंट और परीक्षण',
      step3Desc: 'साफ, बनाए रखने योग्य कोड और प्रत्येक चरण में पूरी तरह से परीक्षण के साथ आपका एप्लिकेशन बनाना।',
      step4: 'तैनाती और लॉन्च',
      step4Desc: 'लॉन्च से पहले होस्टिंग सेटअप, डोमेन कॉन्फ़िगरेशन और सब कुछ पूरी तरह से काम करने की सुनिश्चितता।',
      step5: 'रखरखाव और सहायता',
      step5Desc: 'आपके एप्लिकेशन को सुचारू रूप से चलाने के लिए निरंतर सहायता, अपडेट और रखरखाव।',
      
      // Call to action
      readyToStart: 'अपनी परियोजना शुरू करने के लिए तैयार हैं?',
      ctaDescription: 'आइए आपकी आवश्यकताओं पर चर्चा करें और एक साथ कुछ अद्भुत बनाएं। मुफ्त परामर्श के लिए संपर्क करें।',
      getFreeConsultation: 'मुफ्त परामर्श प्राप्त करें',
      viewAllServices: 'सभी सेवाएं देखें',
      
      // Additional services content
      whatsIncluded: 'क्या शामिल है',
      choosePerfectPackage: 'अपनी परियोजना की जरूरतों के लिए सही पैकेज चुनें। सभी पैकेजों में उत्तरदायी डिजाइन और आधुनिक डेवलपमेंट प्रथाएं शामिल हैं।',
      
      // Contact
      contactTitle: 'संपर्क में रहें',
      contactSubtitle: 'परियोजना पूछताछ',
      contactDescription: 'अपनी परियोजना को जीवंत बनाने के लिए तैयार हैं? आइए अपनी आवश्यकताओं पर चर्चा करें और एक साथ कुछ अद्भुत बनाएं।',
      name: 'पूरा नाम',
      email: 'ईमेल पता',
      phone: 'फोन नंबर',
      plan: 'सेवा योजना',
      projectType: 'परियोजना प्रकार',
      budget: 'बजट सीमा',
      timeline: 'समयसीमा',
      description: 'परियोजना विवरण',
      sendMessage: 'संदेश भेजें',
      preparingEmail: 'ईमेल तैयार कर रहे हैं...',
      
      // Footer
      copyright: '©2024',
      basedIn: 'भारत में स्थित एक डेवलपर',
      
      // Additional keys
      designer: 'डिज़ाइनर',
      featuredProjects: 'फीचर्ड प्रोजेक्ट्स',
      clientTestimonials: 'क्लाइंट टेस्टिमोनियल्स',
      professionalSummary: 'प्रोफेशनल सारांश',
      professionalExperience: 'प्रोफेशनल अनुभव',
      technicalSkills: 'तकनीकी कौशल',
      experience: 'अनुभव',
      projects: 'प्रोजेक्ट्स',
      skills: 'कौशल',
      
      // Resume content
      resumeDescription: 'फुल स्टैक डेवलपमेंट में मेरी प्रोफेशनल यात्रा, कौशल और उपलब्धियों का एक व्यापक अवलोकन।',
      summaryText: 'आधुनिक वेब तकनीकों में 3+ वर्षों के अनुभव के साथ भावुक फुल स्टैक डेवलपर। React, Node.js और क्लाउड तकनीकों में विशेषज्ञता। स्केलेबल वेब एप्लिकेशन और मोबाइल समाधान देने का सिद्ध ट्रैक रिकॉर्ड।',
      
      // Experience
      codeTeakTitle: 'फुल स्टैक डेवलपर',
      codeTeakDescription: 'वर्तमान में React, React Native, और Node.js का उपयोग करके स्केलेबल वेब और मोबाइल एप्लिकेशन विकसित करने पर काम कर रहे हैं।',
      brototypeTitle: 'इंटर्न',
      brototypeDescription: 'MERN स्टैक (MongoDB, Express, React, Node.js) का उपयोग करके फुल स्टैक वेब एप्लिकेशन विकसित करने और प्रबंधित करने का व्यावहारिक अनुभव प्राप्त किया।',
      brototypeDescription2: 'विभिन्न क्लाइंटों के लिए समाधान डिजाइन करने और लागू करने के लिए क्रॉस-फंक्शनल टीमों के साथ सहयोग किया, कोड गुणवत्ता और प्रदर्शन सुनिश्चित किया।',
      freelancerTitle: 'फुल स्टैक डेवलपर',
      freelancerDescription: 'एंड-टू-एंड डेवलपमेंट समाधान प्रदान किए, जिसमें Node.js के साथ बैकएंड सिस्टम, React और Tailwind CSS के साथ फ्रंटएंड डिजाइन, और MongoDB और MySQL के साथ डेटाबेस प्रबंधन शामिल है।',
      freelancerDescription2: 'एप्लिकेशन कार्यक्षमता को बढ़ाने के लिए तृतीय-पक्ष APIs, पेमेंट गेटवे और अन्य बाहरी सेवाओं को सफलतापूर्वक एकीकृत किया।',
      
      // Projects
      luxigooTitle: 'लक्सिगू ट्रैवल वेबसाइट',
      luxigooDescription: 'उपयोगकर्ताओं को यात्रा पैकेजों का पता लगाने और बुक करने में सक्षम बनाने वाला लाइव यात्रा-आधारित वेब एप्लिकेशन विकसित किया।',
      luxigooTech: 'MERN स्टैक का उपयोग करके डायनामिक खोज, उपयोगकर्ता प्रमाणीकरण, और रियल-टाइम बुकिंग प्रबंधन लागू किया।',
      florawyTitle: 'फ्लोरावी ई-कॉमर्स प्लेटफॉर्म',
      florawyDescription: 'उपयोगकर्ताओं को विभिन्न प्रकार के फूलों के उत्पादों को ब्राउज़ करने और खरीदने की अनुमति देने वाला ऑनलाइन फूल स्टोर बनाया।',
      yadroTitle: 'याद्रो ई-कॉमर्स एप्लिकेशन',
      yadroDescription: 'AI-चालित उत्पाद सुझावों के साथ वायरलेस हेडसेट के लिए प्रीमियम ई-कॉमर्स प्लेटफॉर्म विकसित किया।',
      yadroTech: 'व्यक्तिगत खरीदारी अनुभव और इन्वेंटरी प्रबंधन के लिए मशीन लर्निंग को एकीकृत किया।',
      opticalTitle: 'ऑप्टिकल वर्ल्ड',
      opticalDescription: 'React और Tailwind CSS का उपयोग करके आईवेयर संग्रह को प्रदर्शित करने वाली आधुनिक ऑप्टिकल स्टोर वेबसाइट बनाई।',
      fayadAiTitle: 'फायद एआई',
      fayadAiDescription: 'वेब डेवलपमेंट कार्यों और कोड अनुकूलन के लिए एक बुद्धिमान AI सहायक।',
      fileOrganizerTitle: 'स्वचालित फ़ाइल आयोजक',
      fileOrganizerDescription: 'एक स्मार्ट फ़ाइल प्रबंधन सिस्टम जो प्रकार और सामग्री के आधार पर फ़ाइलों को स्वचालित रूप से व्यवस्थित करता है।',
      
      // Education
      brototypeEdu: 'MERN स्टैक डेवलपमेंट प्रमाणपत्र',
      brototypeEduDesc: 'आधुनिक वेब डेवलपमेंट तकनीकों और सर्वोत्तम प्रथाओं में व्यापक प्रशिक्षण।',
      tdEdu: 'कंप्यूटर विज्ञान',
      tdEduDesc: 'कंप्यूटर विज्ञान की मूल बातों पर ध्यान केंद्रित करके उच्च माध्यमिक शिक्षा।',
      leoEdu: '10वीं कक्षा',
      leoEduDesc: 'उत्कृष्ट शैक्षणिक प्रदर्शन के साथ माध्यमिक शिक्षा पूरी की।',
      
      // Skills categories
      programming: 'प्रोग्रामिंग',
      technologies: 'तकनीकें',
      coursework: 'पाठ्यक्रम',
      additionalSkills: 'अतिरिक्त कौशल',
      
      // Skills details
      years3plus: '3+ वर्ष',
      years2plus: '2+ वर्ष',
      year1plus: '1+ वर्ष',
      familiarWith: 'परिचित',
      
      // Coursework details
      webDev: 'वेब डेवलपमेंट',
      backendDev: 'बैकएंड डेवलपमेंट',
      frontendDesign: 'फ्रंटएंड डिजाइन',
      dbManagement: 'डेटाबेस प्रबंधन',
      responsiveDesign: 'उत्तरदायी वेब डिजाइन',
      crossBrowser: 'क्रॉस-ब्राउज़र अनुकूलता',
      softwareEng: 'सॉफ्टवेयर इंजीनियरिंग',
      oop: 'ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग',
      agile: 'एजाइल मेथोडोलॉजीज',
      versionControl: 'Git के साथ संस्करण नियंत्रण',
      cicd: 'CI/CD पाइपलाइन्स',
      databases: 'डेटाबेस',
      relationalDb: 'रिलेशनल डेटाबेस (MySQL, PostgreSQL)',
      nosqlDb: 'NoSQL डेटाबेस (MongoDB)',
      dbDesign: 'डेटाबेस डिजाइन और अनुकूलन',
      
      // Additional skills
      uiUx: 'UI/UX • ब्लेंडर • उत्तरदायी डिजाइन',
      performance: 'वेब प्रदर्शन अनुकूलन • AI एकीकरण'
    },
    
    ar: {
      // Navigation
      home: 'الرئيسية',
      about: 'نبذة عني',
      work: 'الأعمال',
      resume: 'السيرة الذاتية',
      services: 'الخدمات',
      contact: 'اتصل بي',
      
      // Hero Section
      HELLO: 'مرحبا',
      heroTitle: 'الفياض',
      heroSubtitle: 'مطور ويب شامل',
      heroDescription: 'مطور مقيم في الهند',
      heroCta: 'دعنا نعمل معاً',
      
      // About Section
      aboutTitle: 'نبذة عني',
      aboutSubtitle: 'مطور مبدع',
      aboutDescription: 'أنا مطور ويب شامل متحمس مع خبرة في التقنيات الحديثة. أبتكر حلولاً مبتكرة تربط بين التصميم والوظائف.',
      aboutCta: 'شاهد أعمالي',
      
      // Skills
      skillsTitle: 'تصور المهارات',
      skillsSubtitle: 'الكفاءة التقنية',
      skillsRadar: 'رادار المهارات',
      skillsSummary: 'ملخص الخبرة',
      skillsDescription: 'مع أكثر من 3 سنوات من الخبرة في تطوير الويب الشامل، أتخصص في أطر JavaScript الحديثة وتقنيات السحابة وتطبيقات الويب القابلة للتوسع.',
      
      // Services
      servicesTitle: 'الخدمات',
      servicesSubtitle: 'ما أقدمه',
      getStarted: 'ابدأ الآن',
      mostPopular: 'الأكثر شعبية',
      
      // Services page content
      servicesDescription: 'خدمات تطوير ويب شاملة احترافية مصممة خصيصاً لاحتياجاتك. من صفحات الهبوط البسيطة إلى تطبيقات الويب المعقدة مع تكامل قاعدة البيانات.',
      backToHome: 'العودة للرئيسية',
      viewPortfolio: 'عرض المحفظة',
      
      // Service packages
      basicPlan: 'الخطة الأساسية',
      basicSubtitle: 'صفحة البداية / الهبوط',
      standardPlan: 'الخطة القياسية',
      standardSubtitle: 'موقع أعمال متعدد الصفحات',
      premiumPlan: 'الخطة المميزة',
      premiumSubtitle: 'تطبيق ويب كامل المكدس',
      
      // Package features
      functionalWebsite: 'موقع ويب وظيفي',
      onePage: 'صفحة واحدة',
      fivePages: '5 صفحات',
      tenPages: '10 صفحات',
      contentUpload: 'رفع المحتوى',
      onePlugin: 'ملحق/إضافة واحدة',
      twoPlugins: 'ملحقتان/إضافتان',
      threePlugins: '3 ملحقات/إضافات',
      speedOptimization: 'تحسين السرعة',
      hostingSetup: 'إعداد الاستضافة',
      socialMediaIcons: 'أيقونات وسائل التواصل',
      optInForm: 'نموذج الاشتراك',
      ecommerceFunctionality: 'وظائف التجارة الإلكترونية',
      twentyProducts: '20 منتج',
      paymentIntegration: 'تكامل الدفع',
      autoresponderIntegration: 'تكامل الرد التلقائي',
      
      // Package descriptions
      basicDescription: 'موقع ويب من صفحة واحدة متجاوب باستخدام React/Next.js مع واجهة مستخدم نظيفة وتصميم محمول.',
      standardDescription: 'موقع أعمال متعدد الصفحات مع تصميم متجاوب وإعداد خادم أساسي.',
      premiumDescription: 'تطبيق ويب كامل المكدس مع قاعدة بيانات ومصادقة وتكامل دفع.',
      
      // Delivery and revisions
      tenDayDelivery: 'تسليم خلال 10 أيام',
      sixtyDayDelivery: 'تسليم خلال 60 يوم',
      ninetyDayDelivery: 'تسليم خلال 90 يوم',
      twoRevisions: 'مراجعتان',
      threeRevisions: '3 مراجعات',
      fiveRevisions: '5 مراجعات',
      
      // Technology stack
      technologyStack: 'مكدس التقنيات',
      technologyDescription: 'مبني بتقنيات حديثة ومعيارية للصناعة للحصول على أداء وتوسع مثاليين.',
      
      // Development process
      developmentProcess: 'عملية التطوير',
      developmentDescription: 'نهج مبسط لتقديم حلول ويب عالية الجودة في الوقت المحدد وداخل الميزانية.',
      step1: 'الاكتشاف والتخطيط',
      step1Desc: 'فهم متطلباتك وأهدافك والجمهور المستهدف لإنشاء خريطة طريق مشروع مفصلة.',
      step2: 'التصميم والنماذج الأولية',
      step2Desc: 'إنشاء مخططات سلكية ونماذج وتصاميم تفاعلية لتصور المنتج النهائي.',
      step3: 'التطوير والاختبار',
      step3Desc: 'بناء تطبيقك بكود نظيف وقابل للصيانة واختبار شامل في كل مرحلة.',
      step4: 'النشر والإطلاق',
      step4Desc: 'إعداد الاستضافة وتكوين النطاقات والتأكد من عمل كل شيء بشكل مثالي قبل الإطلاق.',
      step5: 'الصيانة والدعم',
      step5Desc: 'دعم مستمر وتحديثات وصيانة للحفاظ على تشغيل تطبيقك بسلاسة.',
      
      // Call to action
      readyToStart: 'مستعد لبدء مشروعك؟',
      ctaDescription: 'دعنا نناقش متطلباتك وننشئ شيئاً رائعاً معاً. تواصل معنا للحصول على استشارة مجانية.',
      getFreeConsultation: 'احصل على استشارة مجانية',
      viewAllServices: 'عرض جميع الخدمات',
      
      // Additional services content
      whatsIncluded: 'ما هو مشمول',
      choosePerfectPackage: 'اختر الحزمة المثالية لاحتياجات مشروعك. جميع الحزم تشمل تصميم متجاوب وممارسات تطوير حديثة.',
      
      // Contact
      contactTitle: 'تواصل معي',
      contactSubtitle: 'استفسار المشروع',
      contactDescription: 'مستعد لإحياء مشروعك؟ دعنا نناقش متطلباتك ونبتكر شيئاً رائعاً معاً.',
      name: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      plan: 'خطة الخدمة',
      projectType: 'نوع المشروع',
      budget: 'نطاق الميزانية',
      timeline: 'الجدول الزمني',
      description: 'وصف المشروع',
      sendMessage: 'إرسال الرسالة',
      preparingEmail: 'جاري تحضير البريد الإلكتروني...',
      
      // Footer
      copyright: '©2024',
      basedIn: 'مطور مقيم في الهند',
      
      // Additional keys
      designer: 'مصمم',
      featuredProjects: 'المشاريع المميزة',
      clientTestimonials: 'شهادات العملاء',
      professionalSummary: 'الملخص المهني',
      professionalExperience: 'الخبرة المهنية',
      technicalSkills: 'المهارات التقنية',
      experience: 'الخبرة',
      projects: 'المشاريع',
      skills: 'المهارات',
      
      // Resume content
      resumeDescription: 'نظرة شاملة على رحلتي المهنية ومهاراتي وإنجازاتي في تطوير الويب الشامل.',
      summaryText: 'مطور ويب شامل متحمس مع أكثر من 3 سنوات من الخبرة في تقنيات الويب الحديثة. متخصص في React وNode.js وتقنيات السحابة. سجل حافل في تقديم تطبيقات الويب القابلة للتوسع والحلول المحمولة.',
      
      // Experience
      codeTeakTitle: 'مطور ويب شامل',
      codeTeakDescription: 'أعمل حالياً على تطوير تطبيقات ويب ومحمولة قابلة للتوسع باستخدام React وReact Native وNode.js.',
      brototypeTitle: 'متدرب',
      brototypeDescription: 'اكتسبت خبرة عملية في تطوير وإدارة تطبيقات الويب الشاملة باستخدام MERN stack (MongoDB, Express, React, Node.js).',
      brototypeDescription2: 'تعاونت مع فرق متعددة الوظائف لتصميم وتنفيذ حلول لعملاء مختلفين، مع ضمان جودة الكود والأداء.',
      freelancerTitle: 'مطور ويب شامل',
      freelancerDescription: 'قدمت حلول تطوير شاملة، بما في ذلك أنظمة الخادم مع Node.js، وتصميم الواجهة الأمامية مع React وTailwind CSS، وإدارة قاعدة البيانات مع MongoDB وMySQL.',
      freelancerDescription2: 'دمجت بنجاح APIs الطرف الثالث وبوابات الدفع والخدمات الخارجية الأخرى لتعزيز وظائف التطبيق.',
      
      // Projects
      luxigooTitle: 'موقع لوكسيجو للسفر',
      luxigooDescription: 'طورت تطبيق ويب مباشر قائم على السفر يمكن المستخدمين من استكشاف وحجز حزم السفر.',
      luxigooTech: 'نفذت البحث الديناميكي والمصادقة المستخدمين وإدارة الحجز في الوقت الفعلي باستخدام MERN stack.',
      florawyTitle: 'منصة فلوراوي للتجارة الإلكترونية',
      florawyDescription: 'أنشأت متجر زهور عبر الإنترنت يسمح للمستخدمين بتصفح وشراء مجموعة متنوعة من المنتجات النباتية.',
      yadroTitle: 'تطبيق يادرو للتجارة الإلكترونية',
      yadroDescription: 'طورت منصة تجارة إلكترونية متميزة لسماعات الرأس اللاسلكية مع توصيات منتجات مدفوعة بالذكاء الاصطناعي.',
      yadroTech: 'دمجت التعلم الآلي لتجارب التسوق الشخصية وإدارة المخزون.',
      opticalTitle: 'العالم البصري',
      opticalDescription: 'بنيت موقع متجر بصري حديث يعرض مجموعات النظارات باستخدام React وTailwind CSS.',
      fayadAiTitle: 'فياض الذكي',
      fayadAiDescription: 'مساعد ذكي للذكاء الاصطناعي لمهام تطوير الويب وتحسين الكود.',
      fileOrganizerTitle: 'منظم الملفات التلقائي',
      fileOrganizerDescription: 'نظام إدارة ملفات ذكي ينظم الملفات تلقائياً بناءً على النوع والمحتوى.',
      
      // Education
      brototypeEdu: 'شهادة تطوير MERN Stack',
      brototypeEduDesc: 'تدريب شامل في تقنيات تطوير الويب الحديثة وأفضل الممارسات.',
      tdEdu: 'علوم الحاسوب',
      tdEduDesc: 'التعليم الثانوي العالي مع التركيز على أساسيات علوم الحاسوب.',
      leoEdu: 'الصف العاشر',
      leoEduDesc: 'أكملت التعليم الثانوي بأداء أكاديمي ممتاز.',
      
      // Skills categories
      programming: 'البرمجة',
      technologies: 'التقنيات',
      coursework: 'المنهج الدراسي',
      additionalSkills: 'المهارات الإضافية',
      
      // Skills details
      years3plus: '3+ سنوات',
      years2plus: '2+ سنوات',
      year1plus: '1+ سنة',
      familiarWith: 'مألوف مع',
      
      // Coursework details
      webDev: 'تطوير الويب',
      backendDev: 'تطوير الخادم',
      frontendDesign: 'تصميم الواجهة الأمامية',
      dbManagement: 'إدارة قاعدة البيانات',
      responsiveDesign: 'التصميم المتجاوب للويب',
      crossBrowser: 'التوافق بين المتصفحات',
      softwareEng: 'هندسة البرمجيات',
      oop: 'البرمجة الكائنية التوجه',
      agile: 'منهجيات أجايل',
      versionControl: 'التحكم في الإصدارات مع Git',
      cicd: 'خطوط CI/CD',
      databases: 'قواعد البيانات',
      relationalDb: 'قواعد البيانات العلائقية (MySQL, PostgreSQL)',
      nosqlDb: 'قواعد البيانات غير العلائقية (MongoDB)',
      dbDesign: 'تصميم وتحسين قاعدة البيانات',
      
      // Additional skills
      uiUx: 'UI/UX • بلندر • التصميم المتجاوب',
      performance: 'تحسين أداء الويب • تكامل الذكاء الاصطناعي'
    }
  };

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (languages[browserLang]) {
        setLanguage(browserLang);
      }
    }
    setIsLoading(false);
  }, [languages]);

  // Save language preference
  const changeLanguage = (newLanguage) => {
    if (languages[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('portfolio-language', newLanguage);
      
      // Update document direction for RTL languages
      document.documentElement.dir = languages[newLanguage].dir;
      document.documentElement.lang = newLanguage;
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    languages,
    changeLanguage,
    t,
    isLoading,
    currentLanguage: languages[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
