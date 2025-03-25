
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import News from "./pages/News";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import LecturesSermons from "./pages/LecturesSermons";
import Interviews from "./pages/Interviews";
import FridayMeetingsVideo from "./pages/FridayMeetingsVideo";
import MediaLibrary from "./pages/MediaLibrary"; 
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import LatestStatements from "./pages/LatestStatements";
import StatementDetails from "./pages/StatementDetails";
import NotFound from "./pages/NotFound";

// Admin Routes
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminArticles from "./pages/admin/Articles";
import ArticleForm from "./pages/admin/ArticleForm";
import Videos from "./pages/admin/Videos";
import VideoForm from "./pages/admin/VideoForm";
import Images from "./pages/admin/Images";
import Links from "./pages/admin/Links";
import LinkForm from "./pages/admin/LinkForm";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="articles/new" element={<ArticleForm />} />
              <Route path="articles/edit/:id" element={<ArticleForm />} />
              <Route path="videos" element={<Videos />} />
              <Route path="videos/new" element={<VideoForm />} />
              <Route path="videos/edit/:id" element={<VideoForm />} />
              <Route path="images" element={<Images />} />
              <Route path="links" element={<Links />} />
              <Route path="links/new" element={<LinkForm />} />
              <Route path="links/edit/:id" element={<LinkForm />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Public Routes */}
            <Route
              path="*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/news" element={<News />} />
                      <Route path="/articles" element={<Articles />} />
                      <Route path="/articles/:articleId" element={<ArticleDetails />} />
                      <Route path="/lectures-sermons" element={<LecturesSermons />} />
                      <Route path="/interviews" element={<Interviews />} />
                      <Route path="/media" element={<MediaLibrary />} />
                      <Route path="/media/friday-meetings-video" element={<FridayMeetingsVideo />} />
                      <Route path="/publications/books" element={<Books />} />
                      <Route path="/publications/books/:bookId" element={<BookDetails />} />
                      <Route path="/statements" element={<LatestStatements />} />
                      <Route path="/statements/:statementId" element={<StatementDetails />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
