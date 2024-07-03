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
const ManagePrescription = lazy(() => import("../pages/ManagePrescription"));
const ManageRoom = lazy(() => import("../pages/ManageRoom"));
const ManageDevice = lazy(() => import("../pages/ManageDevice"));
const ManageEmployee = lazy(() => import("../pages/ManageEmployee"));
const UpdateEmployee = lazy(() => import("../pages/UpdateEmployee"));
const EmployeeDetail = lazy(() => import("../pages/EmployeeDetail"));
const AddNewEmployee = lazy(() => import("../pages/AddNewEmployee"));
const UpdatePrescription = lazy(() => import("../pages/UpdatePrescription"));
const PrescriptionDetail = lazy(() => import("../pages/PrescriptionDetail"));
const UpdatePatient = lazy(() => import("../pages/UpdatePatient"));
const ManageMedicalServiceInvoice = lazy(() =>
  import("../pages/ManageMedicalServiceInvoice")
);
const CreateNewPrescription = lazy(() =>
  import("../pages/CreateNewPrescription")
);
const ManageMedicineCategory = lazy(() =>
  import("../pages/ManageMedicineCategory")
);
const CreateNewMedicalServiceInvoice = lazy(() =>
  import("../pages/CreateNewMedicalServiceInvoice")
);
const MedicalServiceInvoiceDetail = lazy(() =>
  import("../pages/MedicalServiceInvoiceDetail")
);
const UpdateMedicalServiceInvoice = lazy(() =>
  import("../pages/UpdateMedicalServiceInvoice")
);

const MAIN_ROUTES = [
  { path: "/", element: <Dashboard /> },
  { path: "/appointment", element: <ManageAppointment /> },
  { path: "/invoice", element: <ManageInvoice /> },
  { path: "/medical-record", element: <ManageMedicalRecord /> },
  { path: "/medical-service", element: <ManageMedicalService /> },
  { path: "/medicine", element: <ManageMedicine /> },
  { path: "/patient", element: <ManagePatient /> },
  { path: "/employee", element: <ManageEmployee /> },
  { path: "/prescription", element: <ManagePrescription /> },
  { path: "/room", element: <ManageRoom /> },
  { path: "/device", element: <ManageDevice /> },
  { path: "/employee/update/:id", element: <UpdateEmployee /> },
  { path: "/employee/:id", element: <EmployeeDetail /> },
  { path: "/employee/create", element: <AddNewEmployee /> },
  { path: "/medicine-category", element: <ManageMedicineCategory /> },
  { path: "/prescription/create", element: <CreateNewPrescription /> },
  { path: "/prescription/update/:id", element: <UpdatePrescription /> },
  { path: "/prescription/:id", element: <PrescriptionDetail /> },
  {
    path: "/medical-service-invoice",
    element: <ManageMedicalServiceInvoice />,
  },
  {
    path: "/medical-service-invoice/create",
    element: <CreateNewMedicalServiceInvoice />,
  },
  {
    path: "/medical-service-invoice/:id",
    element: <MedicalServiceInvoiceDetail />,
  },
  {
    path: "/medical-service-invoice/update/:id",
    element: <UpdateMedicalServiceInvoice />,
  },
  {
    path: "/patient/update/:id",
    element: <UpdatePatient />,
  },
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
