
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Books from './pages/Books';
import Articles from './pages/Articles';
import News from './pages/News';
import Interviews from './pages/Interviews';
import LecturesSermons from './pages/LecturesSermons';
import MediaLibrary from './pages/MediaLibrary';
import LatestStatements from './pages/LatestStatements';
import BookDetails from './pages/BookDetails';
import StatementDetails from './pages/StatementDetails';
import FridayMeetingsVideo from './pages/FridayMeetingsVideo';
import NotFound from './pages/NotFound';

import { HelmetProvider } from 'react-helmet-async';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <AudioPlayerProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:bookId" element={<BookDetails />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/news" element={<News />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/lectures-sermons" element={<LecturesSermons />} />
                <Route path="/media" element={<MediaLibrary />} />
                <Route path="/media/friday-meetings-video" element={<FridayMeetingsVideo />} />
                <Route path="/statements" element={<LatestStatements />} />
                <Route path="/statements/:statementId" element={<StatementDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Router>
      </AudioPlayerProvider>
    </HelmetProvider>
  );
}

export default App;
