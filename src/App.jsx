import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./page/Login";
import Register from "./page/Register";
import GameLayout from "./ui/GameLayout";
import Console from "./page/Console";
import SecurityProvider from "./hooks/SecurityProvider";
import AccessControlledRoute from "./page/AccessControlledRoute";
import GameProvider from "./hooks/GameProvider";
import Setting from "./page/Setting";

function App() {
  return (
    <div>
      <SecurityProvider>
        <GameProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <AccessControlledRoute>
                    <GameLayout />
                  </AccessControlledRoute>
                }
              >
                <Route index element={<Navigate replace to={"/console"} />} />
                <Route path="/console" element={<Console />} />
                <Route path="/setting" element={<Setting /> } />
              </Route>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </SecurityProvider>
    </div>
  );
}

export default App;
