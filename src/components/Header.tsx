import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-background border-b-2 border-primary sticky top-0 z-40 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img
            src="https://page1.genspark.site/v1/base64_upload/86a43e68b79a9abfc04159ee52699655"
            alt="Tau Nu Chapter Logo"
            className="h-16 w-16 mr-4"
          />
          <div>
            <h1 className="text-xl font-bold text-primary">The Tau Nu Chapter</h1>
            <p className="text-sm text-foreground">Alpha Phi Alpha Fraternity, Inc.</p>
          </div>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('retreat')} 
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                Chapter Retreat
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('alumni')} 
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                Alumni Association
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('donate')} 
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                Donate
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-background border-t border-primary">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('retreat')} 
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                Chapter Retreat
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('alumni')} 
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                Alumni Association
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('donate')} 
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                Donate
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;