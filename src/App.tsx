import './App.css'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import QNABoard from "./pages/Q&ABoard/Q&ABoard";

function App(){

  return (
      <div className="App">
          <Header/>
          <main className={'w-full bg-[#F5F5F5] h-fit'}>
              <QNABoard/>
          </main>
          <Footer/>
      </div>
  );
}
export default App;
