import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from './firebase';
import Header from './components/Header';
import Home from './pages/Home';
import MyTree from './pages/MyTree';
import OtherTree from './pages/OtherTree';
import DecorationSelection from './pages/DecorationSelection';
import MessageForm from './pages/MessageForm';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/my-tree" /> : <Home />} />
          <Route
            path="/my-tree"
            element={user ? <MyTree /> : <Navigate to="/" />}
          />
          <Route path="/tree/:userId" element={<OtherTree />} />
          <Route path="/tree/:userId/decorate" element={<DecorationSelection />} />
          <Route path="/tree/:userId/message" element={<MessageForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
