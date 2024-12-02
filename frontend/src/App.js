import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import AlterPassword from "./pages/alterpassword/AlterPassword";
import Profile from "./pages/profile/Profile";
import Category from "./pages/category/Category";
import Auction from "./pages/auction/Auction";
import EditUserData from "./pages/edituserdata/EditUserData";
import RegisterConfirmation from "./pages/registerConfirmation/RegisterConfirmation";
import DefaultLayout from "./components/DefaultLayout";
import SimpleLayout from "./components/SimpleLayout";
import PrivateRouter from "./components/PrivateRouter";
import NotFound from "./components/notFound/NotFound";
import Unauthorized from "./components/unauthorized/Unauthorized";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/401" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
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
            path="/email-validation/:email/:code"
            element={
              <SimpleLayout>
                {" "}
                <RegisterConfirmation />{" "}
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
          <Route element={<PrivateRouter />}>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  {" "}
                  <Home />{" "}
                </DefaultLayout>
              }
            />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route
              path="/profile"
              element={
                <DefaultLayout>
                  {" "}
                  <Profile />{" "}
                </DefaultLayout>
              }
            />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route
              path="/category"
              element={
                <DefaultLayout>
                  {" "}
                  <Category />{" "}
                </DefaultLayout>
              }
            />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route
              path="/auction"
              element={
                <DefaultLayout>
                  {" "}
                  <Auction />{" "}
                </DefaultLayout>
              }
            />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route
              path="/edit-user-data"
              element={
                <DefaultLayout>
                  {" "}
                  <EditUserData />{" "}
                </DefaultLayout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
