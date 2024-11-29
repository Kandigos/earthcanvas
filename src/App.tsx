import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { EventsPage } from './pages/EventsPage';
import { PageTransition } from './components/PageTransition';
import { ScrollToTop } from './components/ScrollToTop';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        } />
        <Route path="/events" element={
          <PageTransition>
            <EventsPage />
          </PageTransition>
        } />
        <Route path="/events/:category" element={
          <PageTransition>
            <EventsPage />
          </PageTransition>
        } />
        <Route path="/admin" element={
          <PageTransition>
            <AdminPage />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div dir="rtl" className="min-h-screen bg-nature-cream flex flex-col">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#5c4a36',
              color: '#fbf7f1',
              direction: 'rtl',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;