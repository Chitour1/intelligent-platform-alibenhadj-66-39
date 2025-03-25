
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-navy sm:pb-16 md:pb-20 lg:w-full lg:pb-24 xl:pb-28">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-gold to-gold-light opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            ></div>
          </div>

          <div className="pt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
            <div className={`text-center lg:text-right max-w-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl font-extrabold tracking-tight text-white leading-relaxed sm:text-5xl md:text-6xl font-arabic">
                <span className="block">الموقـع الرسمي</span>
                <span className="block text-gold">للشيخ علي بن حاج</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                نائب رئيس الجبهة الإسلامية للإنقاذ
              </p>
              <div className="mt-8 flex justify-center lg:justify-end gap-4">
                <button className="btn-primary">أحدث المقالات</button>
                <button className="btn-secondary">أرشيف الجبهة</button>
              </div>
            </div>
            
            <div className={`mt-10 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'}`}>
              <img
                className="h-auto w-full max-w-md mx-auto"
                src="/lovable-uploads/d1a44ab9-1ce3-4bc1-a6b4-4555f7a29b09.png"
                alt="شعار الموقع الرسمي للشيخ علي بن حاج"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
