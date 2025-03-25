
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import MetaTags from '@/components/MetaTags';

// Sample link for edit mode
const sampleLink = {
  id: 1,
  title: "موقع الشيخ الرسمي",
  url: "https://example.com",
  category: "المواقع الرسمية",
  description: "الموقع الرسمي للشيخ وفيه جميع المقالات والخطب",
  date: "10/03/2023"
};

const LinkForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = id !== 'new';

  const [link, setLink] = useState({
    title: '',
    url: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch the link data from an API
      setLink({
        title: sampleLink.title,
        url: sampleLink.url,
        category: sampleLink.category,
        description: sampleLink.description
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLink(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!link.url.startsWith('http://') && !link.url.startsWith('https://')) {
      toast({
        title: "خطأ في الرابط",
        description: "يجب أن يبدأ الرابط بـ http:// أو https://",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would send this data to an API
    // For demo purposes, we're just showing a success message
    if (isEditMode) {
      toast({
        title: "تم تحديث الرابط",
        description: "تم تحديث الرابط بنجاح",
      });
    } else {
      toast({
        title: "تم إضافة الرابط",
        description: "تم إضافة الرابط بنجاح",
      });
    }
    
    navigate('/admin/links');
  };

  return (
    <div>
      <MetaTags title={isEditMode ? "تعديل الرابط" : "إضافة رابط جديد"} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "تعديل الرابط" : "إضافة رابط جديد"}
        </h1>
        <Button variant="outline" onClick={() => navigate('/admin/links')}>
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للروابط
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان الرابط</Label>
            <Input
              id="title"
              name="title"
              value={link.title}
              onChange={handleChange}
              placeholder="أدخل عنوان الرابط"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">التصنيف</Label>
            <Input
              id="category"
              name="category"
              value={link.category}
              onChange={handleChange}
              placeholder="تصنيف الرابط"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="url">الرابط</Label>
            <Input
              id="url"
              name="url"
              value={link.url}
              onChange={handleChange}
              placeholder="https://example.com"
              dir="ltr"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">وصف الرابط</Label>
            <Input
              id="description"
              name="description"
              value={link.description}
              onChange={handleChange}
              placeholder="اكتب وصفاً مختصراً للرابط"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? "تحديث الرابط" : "حفظ الرابط"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;
