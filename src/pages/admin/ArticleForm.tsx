
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import MetaTags from '@/components/MetaTags';
import { Article, articlesData } from '@/pages/Articles';

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = id !== 'new';

  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    date: new Date().toLocaleDateString('en-GB').split('/').join('/'),
    hijriDate: '',
    readTime: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    category: '',
    author: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const articleToEdit = articlesData.find(a => a.id === Number(id));
      if (articleToEdit) {
        setArticle(articleToEdit);
      } else {
        navigate('/admin/articles');
        toast({
          title: "خطأ",
          description: "المقال غير موجود",
          variant: "destructive",
        });
      }
    }
  }, [id, isEditMode, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to an API
    // For demo purposes, we're just showing a success message
    if (isEditMode) {
      toast({
        title: "تم تحديث المقال",
        description: "تم تحديث المقال بنجاح",
      });
    } else {
      toast({
        title: "تم إضافة المقال",
        description: "تم إضافة المقال بنجاح",
      });
    }
    
    navigate('/admin/articles');
  };

  return (
    <div>
      <MetaTags title={isEditMode ? "تعديل المقال" : "إضافة مقال جديد"} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "تعديل المقال" : "إضافة مقال جديد"}
        </h1>
        <Button variant="outline" onClick={() => navigate('/admin/articles')}>
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للمقالات
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان المقال</Label>
            <Input
              id="title"
              name="title"
              value={article.title}
              onChange={handleChange}
              placeholder="أدخل عنوان المقال"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">الكاتب</Label>
            <Input
              id="author"
              name="author"
              value={article.author}
              onChange={handleChange}
              placeholder="اسم الكاتب"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">التاريخ</Label>
            <Input
              id="date"
              name="date"
              value={article.date}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hijriDate">التاريخ الهجري</Label>
            <Input
              id="hijriDate"
              name="hijriDate"
              value={article.hijriDate || ''}
              onChange={handleChange}
              placeholder="التاريخ الهجري (اختياري)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readTime">وقت القراءة</Label>
            <Input
              id="readTime"
              name="readTime"
              value={article.readTime}
              onChange={handleChange}
              placeholder="مثال: 5 دقائق"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">التصنيف</Label>
            <Input
              id="category"
              name="category"
              value={article.category || ''}
              onChange={handleChange}
              placeholder="تصنيف المقال"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="imageUrl">رابط الصورة</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={article.imageUrl || ''}
              onChange={handleChange}
              placeholder="رابط صورة المقال"
              dir="ltr"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="excerpt">ملخص المقال</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={article.excerpt}
              onChange={handleChange}
              placeholder="اكتب ملخص المقال هنا"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="content">محتوى المقال</Label>
            <Textarea
              id="content"
              name="content"
              value={article.content || ''}
              onChange={handleChange}
              placeholder="اكتب محتوى المقال بالكامل هنا"
              rows={10}
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? "تحديث المقال" : "حفظ المقال"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
