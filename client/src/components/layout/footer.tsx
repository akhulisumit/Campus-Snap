import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-montserrat font-bold text-foreground mb-4">
              <span className="text-primary">Cam</span>pus<span className="text-primary">Snap</span>
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Capturing the memorable moments of college life through our lens. Your one-stop destination for event photos.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="text-muted-foreground hover:text-primary transition-colors duration-300">Home</a>
                  </Link>
                </li>
                <li>
                  <a href="#featured" className="text-muted-foreground hover:text-primary transition-colors duration-300">Featured</a>
                </li>
                <li>
                  <a href="#events" className="text-muted-foreground hover:text-primary transition-colors duration-300">Events</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">About</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Instagram</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Facebook</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Twitter</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 text-center">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} CampusSnap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
