import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dynamic color classes based on theme
  const bgClass = theme === 'light' 
    ? 'bg-white bg-opacity-90' 
    : 'bg-primary bg-opacity-90';
  
  const textClass = theme === 'light' 
    ? 'text-gray-800' 
    : 'text-white';
  
  const hoverClass = 'hover:text-accent';

  return (
    <header 
      className={`fixed top-0 left-0 w-full ${bgClass} backdrop-blur-md z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      } shadow-md`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className={`text-2xl md:text-3xl font-bold ${textClass}`}>
            <span className="text-accent">Cam</span>pus<span className="text-accent">Snap</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a 
              className={`${textClass} ${hoverClass} transition-colors duration-300`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </a>
          </Link>
          <a 
            href="#featured"
            className={`${textClass} ${hoverClass} transition-colors duration-300`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Featured
          </a>
          <a 
            href="#events"
            className={`${textClass} ${hoverClass} transition-colors duration-300`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Events
          </a>
          <a 
            href="#about"
            className={`${textClass} ${hoverClass} transition-colors duration-300`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </a>
          <ThemeToggle />
        </nav>
        
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button 
            className={`${textClass} focus:outline-none`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-secondary'} py-4 px-6 animate-fade-in`}>
          <nav className="flex flex-col space-y-4">
            <Link href="/" className={`${textClass} ${hoverClass} transition-colors duration-300`}>
              Home
            </Link>
            <Link href="/#featured" className={`${textClass} ${hoverClass} transition-colors duration-300`}>
              Featured
            </Link>
            <Link href="/#events" className={`${textClass} ${hoverClass} transition-colors duration-300`}>
              Events
            </Link>
            <Link href="/#about" className={`${textClass} ${hoverClass} transition-colors duration-300`}>
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
