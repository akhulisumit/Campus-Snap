import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Assuming MUI Button component


function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <Button variant="link" onClick={() => scrollToSection('about')}>About Us</Button>
      <Button variant="link" onClick={() => scrollToSection('gallery')}>Gallery</Button>
      <Button variant="link" onClick={() => scrollToSection('contact')}>Contact</Button>
      <Button variant="link" onClick={() => scrollToSection('events')}>Events</Button>
    </footer>
  );
}

export default Footer;

// Note:  This is a minimal example.  Header and hero button functionality,  and the necessary routing setup using 'react-router-dom' are missing for a complete application.