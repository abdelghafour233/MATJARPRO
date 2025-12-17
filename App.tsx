import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import { StoreLayout } from './components/StoreLayout';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';

const App = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          {/* Admin Routes (Standalone Layout) */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Public Store Routes (Store Layout) */}
          <Route path="/" element={
            <StoreLayout>
              <Home />
            </StoreLayout>
          } />
          
          <Route path="/cart" element={
            <StoreLayout>
              <Cart />
            </StoreLayout>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;