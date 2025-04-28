import "./App.css";
import CountriesList from "./components/countriesList/countriesList";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

function App() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header></Header>
      <div className="flex-grow-1">
        <CountriesList></CountriesList>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
