
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
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
import { Article, articlesData } from '@/pages/Articles';

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>(articlesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const { toast } = useToast();

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const openDeleteDialog = (article: Article) => {
    setArticleToDelete(article);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (articleToDelete) {
      const updatedArticles = articles.filter(article => article.id !== articleToDelete.id);
      setArticles(updatedArticles);
      setIsDeleteDialogOpen(false);
      setArticleToDelete(null);
      
      toast({
        title: "تم حذف المقال",
        description: "تم حذف المقال بنجاح",
      });
    }
  };

  return (
    <div>
      <MetaTags title="لوحة التحكم - المقالات" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المقالات</h1>
        <Button asChild>
          <Link to="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" />
            إضافة مقال جديد
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث في المقالات..."
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
              <TableHead>التاريخ</TableHead>
              <TableHead>الكاتب</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.category || "غير مصنف"}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/articles/edit/${article.id}`}>
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(article)}>
                      <Trash2 className="h-4 w-4 ml-2" />
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  لا توجد مقالات مطابقة للبحث
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
              هل أنت متأكد من حذف المقال "{articleToDelete?.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
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

export default Articles;
