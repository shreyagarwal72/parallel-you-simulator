import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Parallel You. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <span className="text-muted-foreground">•</span>
            <a 
              href="https://nextup-studio.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Created by Nextup Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
