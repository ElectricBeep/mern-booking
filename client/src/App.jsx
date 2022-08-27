import { useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotels" element={<List />} />
                <Route path="/hotels/:id" element={<Hotel />} />
                <Route path="/login" element={user ? <Home /> : <Login />} />
                <Route path="/register" element={user ? <Home /> : <Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
