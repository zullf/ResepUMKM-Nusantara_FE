import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 ">

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;