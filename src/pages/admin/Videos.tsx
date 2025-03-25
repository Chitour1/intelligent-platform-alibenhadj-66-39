
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import MetaTags from '@/components/MetaTags';
import { getVideos, deleteVideo, Video } from '@/utils/dataService';

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);
  const { toast } = useToast();

  // Load videos when component mounts
  useEffect(() => {
    const loadedVideos = getVideos();
    setVideos(loadedVideos);
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const openDeleteDialog = (video: Video) => {
    setVideoToDelete(video);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (videoToDelete) {
      deleteVideo(videoToDelete.id);
      setVideos(videos.filter(video => video.id !== videoToDelete.id));
      setIsDeleteDialogOpen(false);
      setVideoToDelete(null);
      
      toast({
        title: "تم حذف الفيديو",
        description: "تم حذف الفيديو بنجاح",
      });
    }
  };

  return (
    <div>
      <MetaTags title="لوحة التحكم - الفيديوهات" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الفيديوهات</h1>
        <Button asChild>
          <Link to="/admin/videos/new">
            <Plus className="mr-2 h-4 w-4" />
            إضافة فيديو جديد
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث في الفيديوهات..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pr-4 pl-10"
            />
          </div>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الفيديو</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <Youtube className="text-red-600" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.date}</TableCell>
                  <TableCell>{video.category}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/videos/edit/${video.id}`}>
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل
                      </Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => openDeleteDialog(video)}
                    >
                      <Trash2 className="h-4 w-4 ml-2" />
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  لا توجد فيديوهات مطابقة للبحث
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف الفيديو "{videoToDelete?.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Videos;
