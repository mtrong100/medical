import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { lazy, Suspense } from "react";

/* MAIN PAGES */
const Profile = lazy(() => import("../modules/profile/Profile"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Post = lazy(() => import("../pages/Post"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const BookAppointment = lazy(() =>
  import("../modules/book-appointment/BookAppointment")
);

/* Authentication Pages */
import Login from "../modules/authentication/Login";
import Register from "../modules/authentication/Register";
import ResetPassword from "../modules/authentication/ResetPassword";

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/post", element: <Post /> },
  { path: "/profile", element: <Profile /> },
  { path: "/book-appointment", element: <BookAppointment /> },
  { path: "/post/:id", element: <PostDetail /> },
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
      <Route path="/reset-password" element={<ResetPassword />}></Route>
    </Routes>
  );
};

export default AppRouter;
