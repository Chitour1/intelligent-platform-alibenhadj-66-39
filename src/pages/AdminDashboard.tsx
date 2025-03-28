
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Users, 
  BookOpen, 
  FileText, 
  Video, 
  Settings,
  PlusCircle,
  Edit,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Statistics for the dashboard
  const stats = [
    { title: "إجمالي المقالات", value: "124", icon: FileText, color: "bg-blue-100 text-blue-700" },
    { title: "إجمالي الكتب", value: "48", icon: BookOpen, color: "bg-amber-100 text-amber-700" },
    { title: "الوسائط", value: "86", icon: Video, color: "bg-green-100 text-green-700" },
    { title: "المستخدمين", value: "3", icon: Users, color: "bg-purple-100 text-purple-700" },
  ];

  // Sample books data for the table
  const books = [
    { id: 1, title: "تفقيه الشرفاء في كيفية الرّد لزجر السفهاء", year: "2006", status: "منشور" },
    { id: 2, title: "تذكرة العلماء والأغنياء في وجوب الصدقات وفضل الفقراء", year: "2012", status: "منشور" },
    { id: 3, title: "تحذير الدعاة من القصص الواهية", year: "2005", status: "منشور" },
  ];

  // Sample statements data for the table
  const statements = [
    { id: 1, title: "بيان حول الأوضاع الراهنة", date: "2023-05-15", status: "منشور" },
    { id: 2, title: "كلمة الشيخ في المؤتمر الإسلامي", date: "2023-04-20", status: "منشور" },
    { id: 3, title: "توضيح موقف الشيخ من القضية", date: "2023-03-10", status: "منشور" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>لوحة الإدارة | الموقع الرسمي للشيخ علي بن حاج</title>
      </Helmet>
      
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-navy">لوحة الإدارة</h1>
            <Button variant="outline" onClick={() => window.history.back()}>العودة إلى الموقع</Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-card border border-border">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="books">الكتب</TabsTrigger>
              <TabsTrigger value="statements">البيانات</TabsTrigger>
              <TabsTrigger value="media">الوسائط</TabsTrigger>
              <TabsTrigger value="settings">إعدادات الموقع</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>أحدث الإضافات</CardTitle>
                  <CardDescription>آخر العناصر التي تمت إضافتها إلى الموقع</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <BookOpen size={20} className="text-gold" /> 
                        آخر الكتب المضافة
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>العنوان</TableHead>
                            <TableHead>السنة</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead className="text-left">الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {books.slice(0, 3).map((book) => (
                            <TableRow key={book.id}>
                              <TableCell className="font-medium">{book.title}</TableCell>
                              <TableCell>{book.year}</TableCell>
                              <TableCell>{book.status}</TableCell>
                              <TableCell className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit size={16} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <FileText size={20} className="text-navy" /> 
                        آخر البيانات المضافة
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>العنوان</TableHead>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead className="text-left">الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {statements.slice(0, 3).map((statement) => (
                            <TableRow key={statement.id}>
                              <TableCell className="font-medium">{statement.title}</TableCell>
                              <TableCell>{statement.date}</TableCell>
                              <TableCell>{statement.status}</TableCell>
                              <TableCell className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit size={16} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Books Tab */}
            <TabsContent value="books" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>إدارة الكتب</CardTitle>
                    <CardDescription>إضافة، تعديل، وحذف كتب الشيخ</CardDescription>
                  </div>
                  <Button className="flex items-center gap-1">
                    <PlusCircle size={18} />
                    إضافة كتاب جديد
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>العنوان</TableHead>
                        <TableHead>السنة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-left">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>{book.status}</TableCell>
                          <TableCell className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Statements Tab */}
            <TabsContent value="statements" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>إدارة البيانات</CardTitle>
                    <CardDescription>إضافة، تعديل، وحذف بيانات الشيخ</CardDescription>
                  </div>
                  <Button className="flex items-center gap-1">
                    <PlusCircle size={18} />
                    إضافة بيان جديد
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>العنوان</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead className="text-left">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {statements.map((statement) => (
                        <TableRow key={statement.id}>
                          <TableCell>{statement.id}</TableCell>
                          <TableCell className="font-medium">{statement.title}</TableCell>
                          <TableCell>{statement.date}</TableCell>
                          <TableCell>{statement.status}</TableCell>
                          <TableCell className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة الوسائط</CardTitle>
                  <CardDescription>إدارة الفيديوهات والتسجيلات الصوتية وغيرها من وسائط الموقع</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-12 border-2 border-dashed rounded-lg">
                    <Video size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">رفع ملفات الوسائط</h3>
                    <p className="text-muted-foreground mb-4">اسحب وأفلت الملفات هنا أو انقر لتحديد الملفات</p>
                    <Button>تحديد الملفات</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الموقع</CardTitle>
                  <CardDescription>تعديل الإعدادات العامة للموقع</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">إعدادات المستخدم</h3>
                      <Form {...form}>
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>اسم المستخدم</FormLabel>
                              <FormControl>
                                <input 
                                  type="text" 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>كلمة المرور</FormLabel>
                              <FormControl>
                                <input 
                                  type="password" 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button className="mt-4">حفظ التغييرات</Button>
                      </Form>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">إعدادات الموقع</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">عنوان الموقع</label>
                        <input 
                          type="text" 
                          defaultValue="الموقع الرسمي للشيخ علي بن حاج" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">وصف الموقع</label>
                        <textarea 
                          rows={3} 
                          defaultValue="الموقع الرسمي للشيخ علي بن حاج - مقالات، كتب، بيانات ولقاءات" 
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                        />
                      </div>
                      <Button>حفظ التغييرات</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
