import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <div className="main-container">
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
