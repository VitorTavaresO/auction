import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import AlterPassword from "./pages/alterpassword/AlterPassword";
import DefaultLayout from "./components/DefaultLayout";
import SimpleLayout from "./components/SimpleLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                {" "}
                <Home />{" "}
              </DefaultLayout>
            }
          />
          <Route
            path="/login"
            element={
              <SimpleLayout>
                {" "}
                <Login />{" "}
              </SimpleLayout>
            }
          />
          <Route
            path="/register"
            element={
              <SimpleLayout>
                {" "}
                <Register />{" "}
              </SimpleLayout>
            }
          />
          <Route
            path="/forget-password"
            element={
              <SimpleLayout>
                {" "}
                <ForgetPassword />{" "}
              </SimpleLayout>
            }
          />
          <Route
            path="/alter-password"
            element={
              <SimpleLayout>
                {" "}
                <AlterPassword />{" "}
              </SimpleLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
