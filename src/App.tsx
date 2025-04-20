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
            {isMenuOpen
              ? (
                  <X className="h-6 w-6 text-purple-600" />
                )
              : (
                  <Menu className="h-6 w-6 text-purple-600" />
                )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/stats"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/stats'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Stats</span>
            </Link>
            <Link
              to="/manage"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/manage'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
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
                location.pathname === '/stats'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Stats</span>
            </Link>
            <Link
              to="/manage"
              className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors w-full ${
                location.pathname === '/manage'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-purple-50">
        <Navigation />
        <div className="container mx-auto px-4 pb-8">
          <Routes>
            <Route path="/" element={<Navigate to="/stats" replace />} />
            <Route path="/manage" element={<ManagementPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
