
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import MetaTags from '@/components/MetaTags';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication - in a real app, you'd use a proper auth system
    // For demo purposes, we're using a hardcoded credential
    if (email === 'admin@example.com' && password === 'admin123') {
      // Set auth token in localStorage
      localStorage.setItem('adminAuth', 'true');
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "فشل تسجيل الدخول",
        description: "بيانات الاعتماد غير صحيحة",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <MetaTags title="تسجيل الدخول - لوحة التحكم" />
      <div className="mx-auto w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">تسجيل الدخول للوحة التحكم</h1>
          <p className="text-gray-600 mt-2">أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل البريد الإلكتروني"
              required
              dir="ltr"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
              dir="ltr"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>للوصول للتجربة، استخدم:</p>
          <p className="mt-1 font-medium text-gray-700 dir="ltr">admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
