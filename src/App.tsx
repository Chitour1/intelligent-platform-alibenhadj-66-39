
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LatestStatements from "./pages/LatestStatements";
import Articles from "./pages/Articles";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import LecturesSermons from "./pages/LecturesSermons";
import MediaLibrary from "./pages/MediaLibrary";
import StatementDetails from "./pages/StatementDetails";
import Interviews from "./pages/Interviews";
import News from "./pages/News";
import FridayMeetingsVideo from "./pages/FridayMeetingsVideo";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/toaster";
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import AudioPlayer from './components/AudioPlayer';

import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <AudioPlayerProvider>
        <Router>
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/statements" element={<LatestStatements />} />
              <Route path="/statements/:statementId" element={<StatementDetails />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:bookId" element={<BookDetails />} />
              <Route path="/lectures-sermons" element={<LecturesSermons />} />
              <Route path="/media-library" element={<MediaLibrary />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/news" element={<News />} />
              <Route path="/friday-meetings-video" element={<FridayMeetingsVideo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <AudioPlayer />
          <Footer />
          <Toaster />
        </Router>
      </AudioPlayerProvider>
    </HelmetProvider>
  );
}

export default App;
