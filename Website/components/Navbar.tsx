import React, { useState } from 'react';
import { Shield, Lock, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-serif font-bold tracking-wide text-white">
              LEXI<span className="text-blue-500">PRO</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#platform" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Platform</a>
            <a href="#matrix" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Evidence Matrix</a>
            <a href="#technology" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Technology</a>
            <div className="flex items-center space-x-2 text-xs text-slate-500 border px-3 py-1 border-slate-700 rounded-full">
              <Lock className="h-3 w-3" />
              <span>SECURE ENCLAVE ACTIVE</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-slate-800 animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a 
              href="#platform" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              Platform
            </a>
            <a 
              href="#matrix" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              Evidence Matrix
            </a>
            <a 
              href="#technology" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              Technology
            </a>
            <div className="mt-4 px-3 flex items-center space-x-2 text-xs text-slate-500">
              <Lock className="h-3 w-3" />
              <span>SECURE ENCLAVE ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;