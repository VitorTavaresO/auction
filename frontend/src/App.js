import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
   <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </BrowserRouter>   
    <Footer /> 
   </>
  );
}

export default App;
