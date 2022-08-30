import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate
} from "react-router-dom";
import { userInputs } from "./fromSource";
import "../src/style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Notification from "./pages/notification/Notification";

function App() {

  const { darkMode } = useContext(DarkModeContext);

  const ProtecteRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
              <ProtecteRoute>
                <Home />
              </ProtecteRoute>
            } />
            <Route path="users">
              <Route index element={
                <ProtecteRoute>
                  <List columns={userColumns} />
                </ProtecteRoute>
              } />
              <Route path="new" element={
                <ProtecteRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtecteRoute>
              } />
              <Route path=":userId" element={
                <ProtecteRoute>
                  <Single />
                </ProtecteRoute>
              } />
            </Route>
            <Route path="hotels">
              <Route index element={
                <ProtecteRoute>
                  <List columns={hotelColumns} />
                </ProtecteRoute>} />
              <Route path="new" element={
                <ProtecteRoute>
                  <NewHotel />
                </ProtecteRoute>
              } />
              <Route path=":productId" element={
                <ProtecteRoute>
                  <Single />
                </ProtecteRoute>
              } />
            </Route>
            <Route path="rooms">
              <Route index element={
                <ProtecteRoute>
                  <List columns={roomColumns} />
                </ProtecteRoute>} />
              <Route path="new" element={
                <ProtecteRoute>
                  <NewRoom />
                </ProtecteRoute>
              } />
              <Route path=":productId" element={
                <ProtecteRoute>
                  <Single />
                </ProtecteRoute>
              } />
            </Route>
            <Route path="notifications">
              <Route index element={
                <ProtecteRoute>
                  <Notification />
                </ProtecteRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
