import React from 'react';
import Header from '../src/components/header/header';
import Footer from  '../src/components/footer/footer';
import Routes from './routes';
import './App.css';
 
function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}
 
export default App;