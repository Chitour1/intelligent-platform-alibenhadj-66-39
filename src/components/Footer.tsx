import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Rss } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/0b5b4808-4d98-4f13-b56d-488ec6e0da87.png" 
                alt="موقع الشيخ علي بن حاج" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-4">
              موقع الشيخ علي بن حاج، نائب رئيس الجبهة الإسلامية للإنقاذ
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                <Rss size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 border-b border-gold pb-2">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition-colors duration-300">الصفحة الرئيسة</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-gold transition-colors duration-300">الأخـبـــار</Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-300 hover:text-gold transition-colors duration-300">مقالات الشيخ</Link>
              </li>
              <li>
                <Link to="/lectures-sermons" className="text-gray-300 hover:text-gold transition-colors duration-300">دروس و خـطب</Link>
              </li>
              <li>
                <Link to="/interviews" className="text-gray-300 hover:text-gold transition-colors duration-300">حــوارات الشـيخ</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 border-b border-gold pb-2">المكتبة الإعلامية</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/media/friday-meetings-video" className="text-gray-300 hover:text-gold transition-colors duration-300">لقاء الجمعة مرئي</Link>
              </li>
              <li>
                <Link to="/media/media-channel" className="text-gray-300 hover:text-gold transition-colors duration-300">قناة الهيئة الاعلامية</Link>
              </li>
              <li>
                <Link to="/media/banquet-speech" className="text-gray-300 hover:text-gold transition-colors duration-300">كلمة في وليمة</Link>
              </li>
              <li>
                <Link to="/media/funeral-sermon" className="text-gray-300 hover:text-gold transition-colors duration-300">موعظة في جنازة</Link>
              </li>
              <li>
                <Link to="/media/friday-meetings-audio" className="text-gray-300 hover:text-gold transition-colors duration-300">لقاء الجمعة صوتي</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 border-b border-gold pb-2">اتصل بنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="ml-2 mt-1 text-gold" />
                <span className="text-gray-300">الجزائر العاصمة، الجزائر</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="ml-2 text-gold" />
                <span className="text-gray-300">+213 XXX XXX XXX</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="ml-2 text-gold" />
                <span className="text-gray-300">contact@alibenhadj.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} موقع الشيخ علي بن حاج. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
