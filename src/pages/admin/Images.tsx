
import { useState } from 'react';
import { Plus, Search, Trash2, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import MetaTags from '@/components/MetaTags';

// Sample images for demo
const sampleImages = [
  { id: 1, name: 'صورة الشيخ 1', url: '/lovable-uploads/ed3b9971-137a-4513-be63-ae438af99d75.png', date: '12/04/2023' },
  { id: 2, name: 'صورة المسجد', url: '/lovable-uploads/36396a59-1f0a-4d68-a2ce-0f735612c2cc.png', date: '18/05/2023' },
  { id: 3, name: 'صورة الكتاب', url: '/lovable-uploads/0b5b4808-4d98-4f13-b56d-488ec6e0da87.png', date: '05/06/2023' },
  { id: 4, name: 'صورة الحدث', url: '/lovable-uploads/8347189a-231d-4ccb-88ce-5b1e21808013.png', date: '22/07/2023' },
];

const Images = () => {
  const [images, setImages] = useState(sampleImages);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id: number) => {
    setImages(images.filter(image => image.id !== id));
    toast({
      title: "تم حذف الصورة",
      description: "تم حذف الصورة بنجاح",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleUpload = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "لم يتم اختيار صور",
        description: "الرجاء اختيار صور للرفع",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would upload these files to a server
    toast({
      title: "تم رفع الصور",
      description: `تم رفع ${uploadedFiles.length} صور بنجاح`,
    });

    // Clear the uploaded files
    setUploadedFiles([]);
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <MetaTags title="لوحة التحكم - الصور" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الصور</h1>
      </div>

      <Tabs defaultValue="library">
        <TabsList className="mb-6">
          <TabsTrigger value="library">مكتبة الصور</TabsTrigger>
          <TabsTrigger value="upload">رفع صور جديدة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="library">
          <Card className="mb-6">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="البحث في الصور..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pr-4 pl-10"
                />
              </div>
            </div>
          </Card>

          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon"
                      className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <p className="font-medium truncate">{image.name}</p>
                    <p className="text-sm text-gray-500">{image.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">لا توجد صور مطابقة للبحث</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload">
          <Card className="p-6">
            <div className="mb-6">
              <Label htmlFor="file-upload" className="block mb-2">اختر الصور للرفع</Label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">انقر لاختيار الصور أو قم بسحب وإفلات الصور هنا</p>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">الصور المختارة ({uploadedFiles.length})</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden mr-3">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeUploadedFile(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleUpload} disabled={uploadedFiles.length === 0}>
                <Upload className="mr-2 h-4 w-4" />
                رفع الصور
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Images;
