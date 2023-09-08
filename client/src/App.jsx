// import { useState } from 'react'
import Footer from "./components/layout/Footer/footer.jsx";
import Header from "./components/layout/Header/header.jsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
