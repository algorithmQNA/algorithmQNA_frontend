import './App.css'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Pagination from "./components/Pagination/Pagination";
import DashBoardPage from "./pages/DashBoard";

function App(){
  return (
      <div className="App">
          <header className={'sticky bg-[#77A4E8] top-0 shadow-lg z-50'}>
              <Header/>
          </header>
          <main className={'bg-[#F5F5F5]'}>
              <Router>
                  <Routes>
                      <Route path={'/'} element={<DashBoardPage/>}/>
                  </Routes>
              </Router>
          </main>
          <footer className={'flex justify-between items-center p-2 w-full border-t border-t-[#D9D9D9]'}>
              <Footer/>
          </footer>
      </div>
  );
}
export default App;
