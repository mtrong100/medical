import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { lazy, Suspense } from "react";

/* MAIN PAGES */
const Service = lazy(() => import("../pages/Service"));
const Profile = lazy(() => import("../modules/profile/Profile"));
const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));
const Blog = lazy(() => import("../pages/Blog"));
const About = lazy(() => import("../pages/About"));

/* Authentication Pages */
const Register = lazy(() => import("../modules/authentication/Register"));
const Login = lazy(() => import("../modules/authentication/Login"));

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
  { path: "/service", element: <Service /> },
  { path: "/profile", element: <Profile /> },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {mainRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    <ProgressSpinner />
                  </div>
                }
              >
                {route.element}
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default AppRouter;
