import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import DefaultRouter from './DefaultRouter';
import HeaderTest from './components/Header/re/Header';

function App() {
  return (
    <div className="App">
      <HeaderTest />
      <main className={'bg-white'}>
        <DefaultRouter />
      </main>
      <footer
        className={
          'flex justify-between items-center p-2 w-full border-t border-t-[#D9D9D9]'
        }
      >
        <Footer />
      </footer>
    </div>
  );
}
export default App;
