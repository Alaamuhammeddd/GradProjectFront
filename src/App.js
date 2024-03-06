import "./App.css";
import Header from "./Shared/Header";
import Footer from "./Shared/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
