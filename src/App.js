import './App.css';
import { Routes, Route } from 'react-router';
import Home from './home/home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  );
}

export default App;
