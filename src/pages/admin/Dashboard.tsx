
import { useEffect, useState } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MetaTags from '@/components/MetaTags';
import { articlesData } from '@/pages/Articles';

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    videos: 0,
    images: 0,
    links: 0
  });

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For demo purposes, we're using static data
    setStats({
      articles: articlesData.length,
      videos: 12,
      images: 24,
      links: 8
    });
  }, []);

  return (
    <div>
      <MetaTags title="لوحة التحكم - الرئيسية" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold">مرحباً بك في لوحة التحكم</h1>
        <p className="text-gray-600 mt-2">
          يمكنك إدارة محتوى موقعك من هنا
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-500" />
              المقالات
            </CardTitle>
            <CardDescription>إجمالي عدد المقالات</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.articles}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Video className="mr-2 h-5 w-5 text-red-500" />
              الفيديوهات
            </CardTitle>
            <CardDescription>إجمالي عدد الفيديوهات</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.videos}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <ImageIcon className="mr-2 h-5 w-5 text-green-500" />
              الصور
            </CardTitle>
            <CardDescription>إجمالي عدد الصور</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.images}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <LinkIcon className="mr-2 h-5 w-5 text-purple-500" />
              الروابط
            </CardTitle>
            <CardDescription>إجمالي عدد الروابط</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.links}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">آخر النشاطات</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center p-4">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">تمت إضافة مقال جديد</p>
                  <p className="text-sm text-gray-500">منذ 3 ساعات</p>
                </div>
              </div>
              <div className="flex items-center p-4">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <Video className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">تمت إضافة فيديو جديد</p>
                  <p className="text-sm text-gray-500">منذ يوم واحد</p>
                </div>
              </div>
              <div className="flex items-center p-4">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">تمت إضافة 5 صور جديدة</p>
                  <p className="text-sm text-gray-500">منذ 3 أيام</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
