import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/global.scss';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import BoothPage from './pages/BoothPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import RegisterPage from './pages/RegisterPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import ETicketPage from './pages/ETicketPage';
import StaffPortal from './pages/StaffPortal';

function AppContent() {
  const location = useLocation();
  const isStaffRoute = location.pathname.startsWith('/staff');

  useEffect(() => {
    // Global scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Re-observe elements whenever route changes
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]); // Re-run when route changes

  return (
    <>
      {!isStaffRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tentang-kami' element={<AboutPage />} />
        <Route path='/booth' element={<BoothPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/registrasi' element={<RegisterPage />} />
        <Route path='/registrasi/sukses' element={<RegistrationSuccessPage />} />
        <Route path='/registrasi/sukses/:ticketToken' element={<RegistrationSuccessPage />} />
        <Route path='/ticket/:ticketToken' element={<ETicketPage />} />
        <Route path='/e-ticket/:ticketToken' element={<ETicketPage />} />
        <Route path='/artikel' element={<ArticlesPage />} />
        <Route path='/artikel/:slug' element={<ArticleDetailPage />} />
        <Route path='/staff/*' element={<StaffPortal />} />
      </Routes>
      {!isStaffRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
