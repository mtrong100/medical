import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { ProgressSpinner } from "primereact/progressspinner";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const ManageAppointment = lazy(() => import("../pages/ManageAppointment"));
const ManageInvoice = lazy(() => import("../pages/ManageInvoice"));
const ManageMedicalRecord = lazy(() => import("../pages/ManageMedicalRecord"));
const ManageMedicalService = lazy(() =>
  import("../pages/ManageMedicalService")
);
const ManageMedicine = lazy(() => import("../pages/ManageMedicine"));
const ManagePatient = lazy(() => import("../pages/ManagePatient"));
const ManageDoctor = lazy(() => import("../pages/ManageDoctor"));
const ManagePrescription = lazy(() => import("../pages/ManagePrescription"));
const ManageRoom = lazy(() => import("../pages/ManageRoom"));
const ManageDevice = lazy(() => import("../pages/ManageDevice"));
const ManageEmployee = lazy(() => import("../pages/ManageDevice"));
const UpdateDoctor = lazy(() => import("../pages/UpdateDoctor"));
const DoctorDetail = lazy(() => import("../pages/DoctorDetail"));

const MAIN_ROUTES = [
  { path: "/", element: <Dashboard /> },
  { path: "/appointment", element: <ManageAppointment /> },
  { path: "/invoice", element: <ManageInvoice /> },
  { path: "/medical-record", element: <ManageMedicalRecord /> },
  { path: "/medical-service", element: <ManageMedicalService /> },
  { path: "/medicine", element: <ManageMedicine /> },
  { path: "/patient", element: <ManagePatient /> },
  { path: "/doctor", element: <ManageDoctor /> },
  { path: "/employee", element: <ManageEmployee /> },
  { path: "/prescription", element: <ManagePrescription /> },
  { path: "/room", element: <ManageRoom /> },
  { path: "/device", element: <ManageDevice /> },
  { path: "/doctor/update/:id", element: <UpdateDoctor /> },
  { path: "/doctor/:id", element: <DoctorDetail /> },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <ProgressSpinner />
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />
      </Route>

      <Route element={<DashboardLayout />}>
        {MAIN_ROUTES.map((route) => (
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
    </Routes>
  );
};

export default AppRouter;
