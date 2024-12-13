import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <Router>
      <div className={`min-h-screen flex flex-col bg-brand-bg text-brand-text`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;