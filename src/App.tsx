import './App.css';
import Footer from './components/Footer/Footer';
import DefaultRouter from './DefaultRouter';
import HeaderTest from './components/Header/re/Header';

function App() {
  return (
    <div className="App">
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
