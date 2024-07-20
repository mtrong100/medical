import React from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import { Route, Routes } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { lazy, Suspense } from "react";
/* ================================================================ */

/* Patient Pages */
const ManagePatient = lazy(() =>
  import("../modules/manage-patient/pages/ManagePatient")
);
const CreatePatient = lazy(() =>
  import("../modules/manage-patient/pages/CreatePatient")
);
const UpdatePatient = lazy(() =>
  import("../modules/manage-patient/pages/UpdatePatient")
);

/* Employee Pages */
const ManageEmployee = lazy(() =>
  import("../modules/manage-employee/pages/ManageEmployee")
);
const CreateEmployee = lazy(() =>
  import("../modules/manage-employee/pages/CreateEmployee")
);
const UpdateEmployee = lazy(() =>
  import("../modules/manage-employee/pages/UpdateEmployee")
);

/* Medicine Pages */
const ManageMedicine = lazy(() =>
  import("../modules/manage-medicine/pages/ManageMedicine")
);
const CreateMedicine = lazy(() =>
  import("../modules/manage-medicine/pages/CreateMedicine")
);
const UpdateMedicine = lazy(() =>
  import("../modules/manage-medicine/pages/UpdateMedicine")
);

/* Medicine Category Pages */
const ManageMedicineCategory = lazy(() =>
  import("../modules/manage-medicine-category/pages/ManageMedicineCategory")
);

/* Medical Record Pages */
const ManageMedicalRecord = lazy(() =>
  import("../modules/manage-medical-record/pages/ManageMedicalRecord")
);
const CreateMedicalRecord = lazy(() =>
  import("../modules/manage-medical-record/pages/CreateMedicalRecord")
);
const UpdateMedicalRecord = lazy(() =>
  import("../modules/manage-medical-record/pages/UpdateMedicalRecord")
);

/* Medical Service Pages */
const ManageMedicalService = lazy(() =>
  import("../modules/manage-medical-service/pages/ManageMedicalService")
);

/* Prescription Pages */
const ManagePrescription = lazy(() =>
  import("../modules/manage-prescription/pages/ManagePrescription")
);
const CreatePrescription = lazy(() =>
  import("../modules/manage-prescription/pages/CreatePrescription")
);
const UpdatePrescription = lazy(() =>
  import("../modules/manage-prescription/pages/UpdatePrescription")
);
const PrescriptionDetail = lazy(() =>
  import("../modules/manage-prescription/pages/PrescriptionDetail")
);

/* Medical Service Invoice Pages */
const ManageMedicalServiceInvoice = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/pages/ManageMedicalServiceInvoice"
  )
);
const CreateMedicalServiceInvoice = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/pages/CreateMedicalServiceInvoice"
  )
);
const UpdateMedicalServiceInvoice = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/pages/UpdateMedicalServiceInvoice"
  )
);
const MedicalServiceInvoiceDetail = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/pages/MedicalServiceInvoiceDetail"
  )
);

/* Apppointment Pages */
const ManageAppointment = lazy(() =>
  import("../modules/manage-appointment/pages/ManageAppointment")
);
const CreateAppointment = lazy(() =>
  import("../modules/manage-appointment/pages/CreateAppointment")
);
const UpdateAppointment = lazy(() =>
  import("../modules/manage-appointment/pages/UpdateAppointment")
);

/* Invoice pages */
const ManageInvoice = lazy(() =>
  import("../modules/manage-invoice/pages/ManageInvoice")
);
const CreateInvoice = lazy(() =>
  import("../modules/manage-invoice/pages/CreateInvoice")
);
const UpdateInvoice = lazy(() =>
  import("../modules/manage-invoice/pages/UpdateInvoice")
);

/* ======================================== */
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Chat = lazy(() => import("../pages/Chat"));
const ManageDevice = lazy(() => import("../pages/ManageDevice"));

const MAIN_ROUTES = [
  { path: "/", element: <Dashboard /> },

  { path: "/patient", element: <ManagePatient /> },
  { path: "/patient/create", element: <CreatePatient /> },
  { path: "/patient/update/:id", element: <UpdatePatient /> },

  { path: "/employee", element: <ManageEmployee /> },
  { path: "/employee/create", element: <CreateEmployee /> },
  { path: "/employee/update/:id", element: <UpdateEmployee /> },

  { path: "/medicine", element: <ManageMedicine /> },
  { path: "/medicine/create", element: <CreateMedicine /> },
  { path: "/medicine/update/:id", element: <UpdateMedicine /> },

  { path: "/medicine-category", element: <ManageMedicineCategory /> },

  { path: "/medical-record", element: <ManageMedicalRecord /> },
  { path: "/medical-record/create", element: <CreateMedicalRecord /> },
  { path: "/medical-record/update/:id", element: <UpdateMedicalRecord /> },

  { path: "/medical-service", element: <ManageMedicalService /> },

  { path: "/prescription", element: <ManagePrescription /> },
  { path: "/prescription/create", element: <CreatePrescription /> },
  { path: "/prescription/update/:id", element: <UpdatePrescription /> },
  { path: "/prescription/:id", element: <PrescriptionDetail /> },

  {
    path: "/medical-service-invoice",
    element: <ManageMedicalServiceInvoice />,
  },
  {
    path: "/medical-service-invoice/create",
    element: <CreateMedicalServiceInvoice />,
  },
  {
    path: "/medical-service-invoice/update/:id",
    element: <UpdateMedicalServiceInvoice />,
  },
  {
    path: "/medical-service-invoice/:id",
    element: <MedicalServiceInvoiceDetail />,
  },

  { path: "/appointment", element: <ManageAppointment /> },
  { path: "/appointment/create", element: <CreateAppointment /> },
  { path: "/appointment/update/:id", element: <UpdateAppointment /> },

  { path: "/invoice", element: <ManageInvoice /> },
  { path: "/invoice/create", element: <CreateInvoice /> },
  { path: "/invoice/update/:id", element: <UpdateInvoice /> },

  { path: "/device", element: <ManageDevice /> },
  {
    path: "/chat",
    element: <Chat />,
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
