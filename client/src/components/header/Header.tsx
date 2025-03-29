import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; // Assuming react-bootstrap is used


function MyComponent() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <header>
        <Button 
          variant="default" 
          className="ml-2"
          onClick={() => navigate('/events/new')}
        >
          Add Event
        </Button>
      </header>

      {/* Hero Section */}
      <section id="hero">
        <Button 
          variant="default" 
          className="ml-2"
          onClick={() => navigate('/events/new')}
        >
          Add Event
        </Button>
      </section>


      {/* Footer */}
      <footer>
        <Button 
          variant="default" 
          className="ml-2"
          onClick={() => navigate('/events/new')}
        >
          Add Event
        </Button>
      </footer>
    </div>
  );
}

export default MyComponent;