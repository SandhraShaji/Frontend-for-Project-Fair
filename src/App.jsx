import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import PageNotFound from './Pages/PageNotFound';
import Home from './Pages/Home';
function App() {
  return (
    <div className="App">
      <section>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Auth/>} />
          <Route path='/register' element={<Auth register/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/projects' element={<Project/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </section>
      <Footer/>
    </div>
  );
}

export default App;