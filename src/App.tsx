import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { EventsPage } from './pages/EventsPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { PageTransition } from './components/PageTransition';
import { ScrollToTop } from './components/ScrollToTop';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
        <Route path="/registration/:eventId" element={<PageTransition><RegistrationPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
        {/* Catch invalid registration URLs */}
        <Route path="/registration" element={<Navigate to="/events" replace />} />
        {/* Catch all invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-nature-cream">
        <Header />
        <main className="flex-grow relative">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            className: 'rtl:text-right ltr:text-left',
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 16px',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;