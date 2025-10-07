'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function SkillsVisualization() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState({});
  const [radarVisible, setRadarVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  const skills = useMemo(() => [
    { name: 'JavaScript', percentage: 95, color: '#F7DF1E' },
    { name: 'React', percentage: 90, color: '#61DAFB' },
    { name: 'Node.js', percentage: 88, color: '#339933' },
    { name: 'TypeScript', percentage: 85, color: '#3178C6' },
    { name: 'MongoDB', percentage: 82, color: '#47A248' },
    { name: 'Python', percentage: 78, color: '#3776AB' },
    { name: 'Express.js', percentage: 85, color: '#000000' },
    { name: 'Tailwind CSS', percentage: 92, color: '#06B6D4' },
    { name: 'Git/GitHub', percentage: 88, color: '#F05032' },
    { name: 'Docker', percentage: 75, color: '#2496ED' },
    { name: 'AWS', percentage: 70, color: '#FF9900' },
    { name: 'Firebase', percentage: 80, color: '#FFCA28' }
  ], []);

  const radarSkills = useMemo(() => [
    { name: 'Frontend', level: 9, color: '#61DAFB' },
    { name: 'Backend', level: 8, color: '#339933' },
    { name: 'Database', level: 7, color: '#47A248' },
    { name: 'DevOps', level: 6, color: '#2496ED' },
    { name: 'UI/UX', level: 8, color: '#06B6D4' },
    { name: 'Mobile', level: 6, color: '#3776AB' },
    { name: 'Testing', level: 7, color: '#F7DF1E' },
    { name: 'Project Mgmt', level: 8, color: '#FF9900' }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start animation for progress bars
          setTimeout(() => {
            animateProgressBars();
          }, 300);
          // Start radar animation
          setTimeout(() => {
            setRadarVisible(true);
          }, 800);
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
  }, [animateProgressBars]);

  const animateProgressBars = useCallback(() => {
    skills.forEach((skill, index) => {
      setTimeout(() => {
        setAnimatedPercentages(prev => ({
          ...prev,
          [skill.name]: skill.percentage
        }));
      }, index * 100);
    });
  }, [skills]);

  const ProgressBar = ({ skill }) => {
    const percentage = animatedPercentages[skill.name] || 0;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
          <span className="text-red-400 font-bold text-sm sm:text-base">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
              backgroundColor: skill.color,
              background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}CC 100%)`
            }}
          />
        </div>
      </div>
    );
  };

  const RadarChart = () => {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    const numLevels = 5;
    const angleStep = (2 * Math.PI) / radarSkills.length;

    const createPolygon = (level) => {
      const points = radarSkills.map((_, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * level / numLevels);
        const y = centerY + Math.sin(angle) * (radius * level / numLevels);
        return `${x},${y}`;
      });
      return points.join(' ');
    };

    const createDataPolygon = () => {
      const points = radarSkills.map((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const level = radarVisible ? skill.level : 0;
        const x = centerX + Math.cos(angle) * (radius * level / numLevels);
        const y = centerY + Math.sin(angle) * (radius * level / numLevels);
        return `${x},${y}`;
      });
      return points.join(' ');
    };

    return (
      <div className="flex justify-center">
        <div className="relative">
          <svg width="300" height="300" className="transform rotate-0">
            {/* Grid circles */}
            {Array.from({ length: numLevels }, (_, i) => (
              <circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={(radius * (i + 1)) / numLevels}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            ))}
            
            {/* Grid lines */}
            {radarSkills.map((_, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius;
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Data polygon */}
            <polygon
              points={createDataPolygon()}
              fill="rgba(239, 68, 68, 0.2)"
              stroke="#EF4444"
              strokeWidth="2"
              className="transition-all duration-2000 ease-out"
            />
            
            {/* Data points */}
            {radarSkills.map((skill, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const level = radarVisible ? skill.level : 0;
              const x = centerX + Math.cos(angle) * (radius * level / numLevels);
              const y = centerY + Math.sin(angle) * (radius * level / numLevels);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#EF4444"
                  className="transition-all duration-2000 ease-out"
                />
              );
            })}
            
            {/* Skill labels */}
            {radarSkills.map((skill, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const labelRadius = radius + 20;
              const x = centerX + Math.cos(angle) * labelRadius;
              const y = centerY + Math.sin(angle) * labelRadius;
              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-white font-medium"
                  transform={`rotate(${(angle * 180 / Math.PI)}, ${x}, ${y})`}
                >
                  {skill.name}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="py-16 sm:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
              {t('skillsTitle')}
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Progress Bars Section */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center lg:text-left">
                {t('skillsSubtitle')}
              </h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={skill.name} style={{ transitionDelay: `${index * 100}ms` }}>
                    <ProgressBar skill={skill} />
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Chart Section */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center lg:text-left">
                {t('skillsRadar')}
              </h3>
              <div className="flex justify-center lg:justify-start">
                <RadarChart />
              </div>
              
              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {radarSkills.map((skill, index) => (
                  <div key={skill.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-gray-300 text-xs">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Summary */}
          <div className="mt-16 text-center">
            <div className="bg-black/50 border-2 border-red-500/20 rounded-xl p-6 sm:p-8">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {t('skillsSummary')}
              </h4>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
                {t('skillsDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
