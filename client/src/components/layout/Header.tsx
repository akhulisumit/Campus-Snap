import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header 
      className={`fixed top-0 left-0 w-full bg-primary bg-opacity-90 backdrop-blur-md z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-montserrat font-bold text-light">
            <span className="text-accent">Cam</span>pus<span className="text-accent">Snap</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-light hover:text-accent transition-colors duration-300">
            Home
          </Link>
          <Link href="/#featured" className="text-light hover:text-accent transition-colors duration-300">
            Featured
          </Link>
          <Link href="/#events" className="text-light hover:text-accent transition-colors duration-300">
            Events
          </Link>
          <Link href="/#about" className="text-light hover:text-accent transition-colors duration-300">
            About
          </Link>
        </nav>
        
        <button 
          className="block md:hidden text-light focus:outline-none"
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
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-light hover:text-accent transition-colors duration-300">
              Home
            </Link>
            <Link href="/#featured" className="text-light hover:text-accent transition-colors duration-300">
              Featured
            </Link>
            <Link href="/#events" className="text-light hover:text-accent transition-colors duration-300">
              Events
            </Link>
            <Link href="/#about" className="text-light hover:text-accent transition-colors duration-300">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
