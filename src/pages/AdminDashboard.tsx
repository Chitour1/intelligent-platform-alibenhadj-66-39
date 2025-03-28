
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookOpen, FileText, Users, MessageSquare, Video } from 'lucide-react';
import { booksData } from './Books';
import { statementsData } from '../utils/statementsData';
import { recentMediaItems } from '../utils/youtubeUtils';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample admin statistics
  const statistics = [
    { title: 'إجمالي الكتب', value: booksData.length, icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
    { title: 'إجمالي البيانات', value: statementsData.length, icon: FileText, color: 'bg-green-100 text-green-700' },
    { title: 'إجمالي الفيديوهات', value: recentMediaItems.length, icon: Video, color: 'bg-red-100 text-red-700' },
    { title: 'زوار الموقع', value: '23,506', icon: Users, color: 'bg-purple-100 text-purple-700' },
  ];

  // Filter books based on search term
  const filteredBooks = booksData.filter(book => 
    book.title.includes(searchTerm) || 
    (book.description && book.description.includes(searchTerm))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>لوحة التحكم | موقع الشيخ علي بن حاج</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
        <p className="text-gray-600">مرحبًا بك في لوحة التحكم الخاصة بموقع الشيخ علي بن حاج</p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="books" dir="rtl" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="books">الكتب</TabsTrigger>
          <TabsTrigger value="statements">البيانات</TabsTrigger>
          <TabsTrigger value="media">المكتبة الإعلامية</TabsTrigger>
          <TabsTrigger value="settings">إعدادات الموقع</TabsTrigger>
        </TabsList>
        
        {/* Books Tab */}
        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الكتب</CardTitle>
              <CardDescription>عرض وإدارة كتب الشيخ علي بن حاج</CardDescription>
              
              <div className="flex mt-4">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="بحث عن كتاب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="mr-2 bg-gold hover:bg-gold-dark">
                  إضافة كتاب جديد
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>عدد الصفحات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.publicationDate || book.year || 'غير محدد'}</TableCell>
                      <TableCell>{book.pages || 'غير محدد'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button variant="outline" size="sm">تعديل</Button>
                          <Button variant="outline" size="sm" className="text-red-500">حذف</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Statements Tab */}
        <TabsContent value="statements">
          <Card>
            <CardHeader>
              <CardTitle>إدارة البيانات</CardTitle>
              <CardDescription>عرض وإدارة بيانات الشيخ علي بن حاج</CardDescription>
            </CardHeader>
            <CardContent>
              <p>محتوى إدارة البيانات سيظهر هنا</p>
              {/* Add your statements management UI here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Media Tab */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>إدارة المكتبة الإعلامية</CardTitle>
              <CardDescription>عرض وإدارة محتوى المكتبة الإعلامية</CardDescription>
            </CardHeader>
            <CardContent>
              <p>محتوى إدارة المكتبة الإعلامية سيظهر هنا</p>
              {/* Add your media management UI here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الموقع</CardTitle>
              <CardDescription>تعديل إعدادات الموقع الرئيسية</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-title">عنوان الموقع</Label>
                  <Input id="site-title" defaultValue="موقع الشيخ علي بن حاج الرسمي" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">وصف الموقع</Label>
                  <Input id="site-description" defaultValue="الموقع الرسمي للشيخ علي بن حاج" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">البريد الإلكتروني للتواصل</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@alibenhadj.com" />
                </div>
                
                <Button className="bg-gold hover:bg-gold-dark">حفظ الإعدادات</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
