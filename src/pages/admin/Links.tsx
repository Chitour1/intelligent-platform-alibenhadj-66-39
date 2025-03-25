
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, ExternalLink } from 'lucide-react';
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
import { getLinks, deleteLink, Link as CustomLink } from '@/utils/dataService';

const Links = () => {
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<CustomLink | null>(null);
  const { toast } = useToast();

  // Load links when component mounts
  useEffect(() => {
    const loadedLinks = getLinks();
    setLinks(loadedLinks);
  }, []);

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const openDeleteDialog = (link: CustomLink) => {
    setLinkToDelete(link);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (linkToDelete) {
      deleteLink(linkToDelete.id);
      setLinks(links.filter(link => link.id !== linkToDelete.id));
      setIsDeleteDialogOpen(false);
      setLinkToDelete(null);
      
      toast({
        title: "تم حذف الرابط",
        description: "تم حذف الرابط بنجاح",
      });
    }
  };

  return (
    <div>
      <MetaTags title="لوحة التحكم - الروابط" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الروابط</h1>
        <Button asChild>
          <RouterLink to="/admin/links/new">
            <Plus className="mr-2 h-4 w-4" />
            إضافة رابط جديد
          </RouterLink>
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث في الروابط..."
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
              <TableHead>العنوان</TableHead>
              <TableHead>الرابط</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead>تاريخ الإضافة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.title}</TableCell>
                  <TableCell>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                      dir="ltr"
                    >
                      {link.url.length > 30 ? `${link.url.substring(0, 30)}...` : link.url}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>{link.category}</TableCell>
                  <TableCell>{link.date}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <RouterLink to={`/admin/links/edit/${link.id}`}>
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل
                      </RouterLink>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => openDeleteDialog(link)}
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
                  لا توجد روابط مطابقة للبحث
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
              هل أنت متأكد من حذف الرابط "{linkToDelete?.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
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

export default Links;
