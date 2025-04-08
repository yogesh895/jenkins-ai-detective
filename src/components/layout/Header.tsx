
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon, BarChart2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Header = ({ toggleTheme, isDarkTheme }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-jenkins-teal flex items-center justify-center text-white font-bold text-lg">J</div>
            </div>
            <span className="hidden font-bold sm:inline-block">Jenkins AI Detective</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/chat" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/chat') ? 'text-primary' : ''
              }`}
            >
              AI Chat
            </Link>
            <Link 
              to="/analytics" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/analytics') ? 'text-primary' : ''
              }`}
            >
              <span className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-1" />
                Analytics
              </span>
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : ''
              }`}
            >
              About
            </Link>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/chat" 
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive('/chat') ? 'text-primary' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Chat
            </Link>
            <Link 
              to="/analytics" 
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive('/analytics') ? 'text-primary' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-1" />
                Analytics
              </span>
            </Link>
            <Link 
              to="/about" 
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
