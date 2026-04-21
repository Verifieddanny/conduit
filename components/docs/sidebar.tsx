"use client";
import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, Key, Code2, Share2, Shield, Activity, Box, Terminal } from 'lucide-react';

const DocsSidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [activeId, setActiveId] = useState('getting-started');
  // This ref prevents the scroll listener from firing when we click a link
  const isScrollingManually = useRef(false);

  const sections = [
    {
      label: 'Overview',
      links: [
        { name: 'Getting Started', icon: <BookOpen size={16} />, href: "#getting-started", id: "getting-started" },
        { name: 'Authentication', icon: <Key size={16} />, href: "#auth", id: "auth" },
        { name: 'API Reference', icon: <Code2 size={16} />, href: "#api", id: "api" },
        { name: 'Webhook Sources', icon: <Share2 size={16} />, href: "#sources", id: "sources" },
        { name: 'Delivery & Reliability', icon: <Activity size={16} />, href: "#delivery", id: "delivery" },
        { name: 'Security', icon: <Shield size={16} />, href: "#security", id: "security" },
        { name: 'Architecture', icon: <Box size={16} />, href: "#architecture", id: "architecture" },
      ]
    },
    {
      label: 'Representative Endpoints',
      links: [
        { name: 'POST /api/auth/register', icon: <Terminal size={14} />, href: "#register", id: "register" },
        { name: 'PUT /api/auth/api-key', icon: <Terminal size={14} />, href: "#update-key", id: "update-key" },
        { name: 'POST /api/endpoints', icon: <Terminal size={14} />, href: "#create-endpoint", id: "create-endpoint" },
        { name: 'POST /api/inbound/:id', icon: <Terminal size={14} />, href: "#inbound", id: "inbound" },
      ]
    }
  ];

  // Function to handle clicking a sidebar link
  const handleLinkClick = (id: string) => {
    isScrollingManually.current = true;
    setActiveId(id);

    // After the smooth scroll duration (approx 800ms), re-enable the scroll observer
    setTimeout(() => {
      isScrollingManually.current = false;
    }, 800);
  };

  useEffect(() => {
    const sectionIds = sections.flatMap(section => section.links.map(link => link.id));
    
    const handleScroll = () => {
      // If we are currently scrolling because of a click, don't update activeId
      if (isScrollingManually.current) return;

      const currentSection = sectionIds.find(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust 120px to match your navbar height + some breathing room
          return rect.top >= 0 && rect.top <= 120; 
        }
        return false;
      });

      if (currentSection) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerClasses = isMobile 
        ? "flex flex-col w-full p-6 h-full overflow-y-auto" 
        : "hidden lg:flex flex-col w-72 border-r border-white/5 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto";

  return (
    <aside className={containerClasses}>
      {sections.map((section, idx) => (
        <div key={section.label} className={idx > 0 ? "mt-10" : ""}>
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 px-3 font-mono">
            {section.label}
          </h5>
          <div className="space-y-1">
            {section.links.map((link) => {
              const isActive = activeId === link.id;
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                    isActive 
                    ? 'bg-[#00f2ad]/10 text-[#00f2ad] font-medium' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? "text-[#00f2ad]" : "text-gray-500"}>
                    {link.icon}
                  </span>
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default DocsSidebar;