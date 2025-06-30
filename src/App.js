import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './components/Pomodoro/Timer';
import NotFound from './components/Pomodoro/NotFound';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
