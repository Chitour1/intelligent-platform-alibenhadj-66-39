
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
import Interviews from "./pages/Interviews";
import FridayMeetingsVideo from "./pages/FridayMeetingsVideo";
import MediaLibrary from "./pages/MediaLibrary"; 
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import LatestStatements from "./pages/LatestStatements";
import StatementDetails from "./pages/StatementDetails";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/news" element={<News />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:articleId" element={<ArticleDetails />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/media" element={<MediaLibrary />} />
                <Route path="/media/friday-meetings-video" element={<FridayMeetingsVideo />} />
                <Route path="/publications/books" element={<Books />} />
                <Route path="/publications/books/:bookId" element={<BookDetails />} />
                <Route path="/statements" element={<LatestStatements />} />
                <Route path="/statements/:statementId" element={<StatementDetails />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
