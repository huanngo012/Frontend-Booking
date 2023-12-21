import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./pages//login/Login";

import { publicRoutes } from "./routes/Routes";
import { Fragment, Suspense } from "react";
import NotFoundPage from "./pages/notFound/NotFound";
import Register from "./pages/register/Register";

function App() {
  return (
    <Suspense fallback="..loading">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/">
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>

        <Route path="*" element={<NotFoundPage url="/" name="Trang chủ" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
