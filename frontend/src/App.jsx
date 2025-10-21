import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import Login from './pages/Login';
import PriceList from './pages/PriceList';
import Terms from './pages/Terms';
import { useAuthStore } from './stores/authStores';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className="main-container">
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/pricelist"
              element={
                <ProtectedRoute>
                  <PriceList />
                </ProtectedRoute>
              }
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
