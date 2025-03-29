import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      "bg-primary bg-opacity-90 backdrop-blur-md",
      isScrolled ? "py-2" : "py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl md:text-3xl font-montserrat font-bold text-foreground">
              <span className="text-primary">Cam</span>pus<span className="text-primary">Snap</span>
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className="text-foreground hover:text-primary transition-colors duration-300">Home</a>
          </Link>
          <a href="#featured" className="text-foreground hover:text-primary transition-colors duration-300">Featured</a>
          <a href="#events" className="text-foreground hover:text-primary transition-colors duration-300">Events</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors duration-300">About</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-foreground focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-secondary py-4 px-6"
          >
            <nav className="flex flex-col space-y-4">
              <Link href="/">
                <a className="text-foreground hover:text-primary transition-colors duration-300" onClick={toggleMenu}>Home</a>
              </Link>
              <a href="#featured" className="text-foreground hover:text-primary transition-colors duration-300" onClick={toggleMenu}>Featured</a>
              <a href="#events" className="text-foreground hover:text-primary transition-colors duration-300" onClick={toggleMenu}>Events</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors duration-300" onClick={toggleMenu}>About</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
