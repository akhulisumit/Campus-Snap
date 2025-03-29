import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Assuming MUI Button component


function Footer() {
  const navigate = useNavigate();
  return (
    <footer>
      <Button variant="link" onClick={() => navigate('/about')}>About Us</Button>
      <Button variant="link" onClick={() => navigate('/contact')}>Contact</Button>
      <Button variant="link" onClick={() => navigate('/terms')}>Terms</Button>
      <Button variant="link" onClick={() => navigate('/privacy')}>Privacy</Button>
    </footer>
  );
}

export default Footer;

// Note:  This is a minimal example.  Header and hero button functionality,  and the necessary routing setup using 'react-router-dom' are missing for a complete application.