import { BarChart3, ClipboardList, Menu, X } from 'lucide-react';
import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Logo } from './components/Logo';
import { ManagementPage } from './pages/ManagementPage';
import { StatsPage } from './pages/StatsPage';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-1">
            <Logo />
            <p className="text-sm text-purple-500 italic mt-1 hidden sm:block">Parce que vos fesses méritent le meilleur rapport qualité/prix</p>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-purple-50"
          >
            {isMenuOpen ?
                (
                  <X className="h-6 w-6 text-purple-600" />
                ) :
                (
                  <Menu className="h-6 w-6 text-purple-600" />
                )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/stats"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/stats' ?
                  'bg-purple-100 text-purple-700' :
                  'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Stats</span>
            </Link>
            <Link
              to="/manage"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/manage' ?
                  'bg-purple-100 text-purple-700' :
                  'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <ClipboardList className="h-5 w-5" />
              <span>Gestion</span>
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="pb-4 space-y-2">
            <Link
              to="/stats"
              className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors w-full ${
                location.pathname === '/stats' ?
                  'bg-purple-100 text-purple-700' :
                  'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Stats</span>
            </Link>
            <Link
              to="/manage"
              className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors w-full ${
                location.pathname === '/manage' ?
                  'bg-purple-100 text-purple-700' :
                  'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ClipboardList className="h-5 w-5" />
              <span>Gestion</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="text-gray-500">
            &copy; 2025 Benio
          </div>
          <div className="text-gray-500">
            v0.1.2
          </div>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <a
                href="https://github.com/Benio-B/toilette-royale"
                className="text-gray-500 transition-colors hover:text-purple-500 focus:text-purple-500"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

    </footer>
  );
}

function App() {
  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    >
      <div className="min-h-screen bg-purple-50">
        <Navigation />
        <div className="container mx-auto px-4 pb-8">
          <Routes>
            <Route path="/" element={<Navigate to="/stats" replace />} />
            <Route path="/manage" element={<ManagementPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
