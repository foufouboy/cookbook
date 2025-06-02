import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/App.sass";
import Header from "./components/Header";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipe from "./pages/Recipe";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
