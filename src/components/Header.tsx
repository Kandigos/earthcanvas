import { Menu, ChevronDown, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownOption {
  label: string;
  href: string;
}

const eventsDropdown: DropdownOption[] = [
  { label: 'כל האירועים', href: '/events' },
  { label: 'סדנאות', href: '/events/workshops' },
  { label: 'מפגשי קהילה', href: '/events/community' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-warm-gradient shadow-md relative z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold text-nature-cream hover:text-nature-beige transition-colors"
            >
              מרחב אבא אדמה
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link 
              to="/" 
              className="text-nature-cream hover:text-nature-beige transition-colors px-3 py-2"
            >
              בית
            </Link>
            
            {/* Desktop Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-nature-cream hover:text-nature-beige transition-colors px-3 py-2 gap-1"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                אירועים
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 w-48 py-2 bg-white rounded-lg shadow-lg"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {eventsDropdown.map((option) => (
                      <Link
                        key={option.href}
                        to={option.href}
                        className="block px-4 py-2 text-nature-forest hover:bg-nature-cream/50 transition-colors"
                      >
                        {option.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/admin" 
              className="text-nature-cream hover:text-nature-beige transition-colors px-3 py-2"
            >
              ניהול
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center p-2 rounded-lg hover:bg-nature-cream/10 transition-colors"
            aria-label="תפריט"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-nature-cream" />
            ) : (
              <Menu className="w-6 h-6 text-nature-cream" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-nature-brown/95 backdrop-blur-sm md:hidden z-50"
            >
              <div className="p-4 space-y-4">
                <Link
                  to="/"
                  className="block px-4 py-3 text-lg text-nature-cream hover:bg-nature-cream/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  בית
                </Link>
                {eventsDropdown.map((option) => (
                  <Link
                    key={option.href}
                    to={option.href}
                    className="block px-4 py-3 text-lg text-nature-cream hover:bg-nature-cream/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option.label}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  className="block px-4 py-3 text-lg text-nature-cream hover:bg-nature-cream/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ניהול
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}