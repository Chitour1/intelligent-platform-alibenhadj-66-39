import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { name: 'الصفحة الرئيسة', path: '/' },
    { name: 'الأخـبـــار', path: '/news' },
    { name: 'مقالات الشيخ', path: '/articles' },
    { name: 'حــوارات الشـيخ', path: '/interviews' },
    {
      name: 'المكتبة الإعلامية',
      path: '/media',
      submenu: [
        { name: 'لقاء الجمعة مرئي', path: '/media/friday-meetings-video' },
        { name: 'قناة الهيئة الاعلامية', path: '/media/media-channel' },
        { name: 'كلمة في وليمة', path: '/media/banquet-speech' },
        { name: 'موعظة في جنازة', path: '/media/funeral-sermon' },
        { name: 'لقاء الجمعة صوتي', path: '/media/friday-meetings-audio' },
      ]
    },
    {
      name: 'الإصدارات',
      path: '#',
      submenu: [
        { name: 'بيـــانات الشـيخ', path: '/publications/statements' },
        { name: 'المداخلات التلفزيونية', path: '/publications/tv-appearances' },
        { name: 'ملخص لقاءات الجمعة', path: '/publications/friday-summaries' },
        { name: 'مقتطفات مع الشيخ', path: '/publications/excerpts' },
        { name: 'أرشيف الجبهة', path: '/publications/front-archive' },
        { name: 'مؤلفات الشـيخ', path: '/publications/books' },
        { name: 'أقوال الصحف عن الشيخ', path: '/publications/press-mentions' },
      ]
    }
  ];

  const NavItem = ({ item }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);
    
    useEffect(() => {
      if (!dropdownOpen) return;
      
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownOpen]);

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setDropdownOpen(false);
      }, 300);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    if (item.submenu) {
      return (
        <div 
          className="relative group" 
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            className="nav-link flex items-center gap-1"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            {item.name}
            <ChevronDown size={16} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {dropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
              style={{ minWidth: '220px' }}
            >
              <div className="py-1">
                {item.submenu.map((subitem, index) => (
                  <Link
                    key={index}
                    to={subitem.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold hover:text-white transition-colors duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {subitem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        to={item.path}
        className={`nav-link ${location.pathname === item.path ? 'active text-gold' : ''}`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-auto animate-float"
                src="/lovable-uploads/0b5b4808-4d98-4f13-b56d-488ec6e0da87.png"
                alt="الموقع الرسمي للشيخ علي بن حاج"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4 md:mr-10">
            {menuItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {menuItems.map((item, index) => (
            <div key={index} className="py-1">
              {item.submenu ? (
                <>
                  <div className="px-3 py-2 font-medium text-navy">{item.name}</div>
                  <div className="pr-4">
                    {item.submenu.map((subitem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subitem.path}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gold hover:bg-gray-50 rounded-md"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'text-gold bg-gray-50'
                      : 'text-gray-700 hover:text-gold hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
