import React from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import { Route, Routes } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { lazy, Suspense } from "react";

/* Patient Pages */
const ManagePatient = lazy(() =>
  import("../modules/manage-patient/ManagePatient")
);
const CreatePatient = lazy(() =>
  import("../modules/manage-patient/CreatePatient")
);
const UpdatePatient = lazy(() =>
  import("../modules/manage-patient/UpdatePatient")
);

/* Employee Pages */
const ManageEmployee = lazy(() =>
  import("../modules/manage-employee/ManageEmployee")
);
const CreateEmployee = lazy(() =>
  import("../modules/manage-employee/CreateEmployee")
);
const UpdateEmployee = lazy(() =>
  import("../modules/manage-employee/UpdateEmployee")
);

/* Medicine Pages */
const ManageMedicine = lazy(() =>
  import("../modules/manage-medicine/ManageMedicine")
);
const CreateMedicine = lazy(() =>
  import("../modules/manage-medicine/CreateMedicine")
);
const UpdateMedicine = lazy(() =>
  import("../modules/manage-medicine/UpdateMedicine")
);

/* Medicine Category Pages */
const ManageMedicineCategory = lazy(() =>
  import("../modules/manage-medicine-category/ManageMedicineCategory")
);

/* Medical Record Pages */
const ManageMedicalRecord = lazy(() =>
  import("../modules/manage-medical-record/ManageMedicalRecord")
);
const CreateMedicalRecord = lazy(() =>
  import("../modules/manage-medical-record/CreateMedicalRecord")
);
const UpdateMedicalRecord = lazy(() =>
  import("../modules/manage-medical-record/UpdateMedicalRecord")
);

/* Medical Service Pages */
const ManageMedicalService = lazy(() =>
  import("../modules/manage-medical-service/ManageMedicalService")
);

/* Prescription Pages */
const ManagePrescription = lazy(() =>
  import("../modules/manage-prescription/ManagePrescription")
);
const CreatePrescription = lazy(() =>
  import("../modules/manage-prescription/CreatePrescription")
);
const UpdatePrescription = lazy(() =>
  import("../modules/manage-prescription/UpdatePrescription")
);
const PrescriptionDetail = lazy(() =>
  import("../modules/manage-prescription/PrescriptionDetail")
);

/* Medical Service Invoice Pages */
const ManageMedicalServiceInvoice = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/ManageMedicalServiceInvoice"
  )
);
const CreateMedicalServiceInvoice = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/CreateMedicalServiceInvoice"
  )
);
const UpdateMedicalServiceInvoice = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/UpdateMedicalServiceInvoice"
  )
);
const MedicalServiceInvoiceDetail = lazy(() =>
  import(
    "../modules/manage-medical-service-invoice/MedicalServiceInvoiceDetail"
  )
);

/* Apppointment Pages */
const ManageAppointment = lazy(() =>
  import("../modules/manage-appointment/ManageAppointment")
);
const CreateAppointment = lazy(() =>
  import("../modules/manage-appointment/CreateAppointment")
);
const UpdateAppointment = lazy(() =>
  import("../modules/manage-appointment/UpdateAppointment")
);

/* Invoice pages */
const ManageInvoice = lazy(() =>
  import("../modules/manage-invoice/ManageInvoice")
);
const CreateInvoice = lazy(() =>
  import("../modules/manage-invoice/CreateInvoice")
);
const UpdateInvoice = lazy(() =>
  import("../modules/manage-invoice/UpdateInvoice")
);

/* Device Pages */
const ManageDevice = lazy(() =>
  import("../modules/manage-device/ManageDevice")
);
const CreateDevice = lazy(() =>
  import("../modules/manage-device/CreateDevice")
);
const UpdateDevice = lazy(() =>
  import("../modules/manage-device/UpdateDevice")
);

/* Supplier Pages */
const ManageSupplier = lazy(() =>
  import("../modules/manage-supplier/ManageSupplier")
);
const CreateSupplier = lazy(() =>
  import("../modules/manage-supplier/CreateSupplier")
);
const UpdateSupplier = lazy(() =>
  import("../modules/manage-supplier/UpdateSupplier")
);

/* Inventory Page */
const ManageInventory = lazy(() =>
  import("../modules/manage-inventory/ManageInventory")
);
const CreateInventoryDevice = lazy(() =>
  import("../modules/manage-inventory/CreateInventoryDevice")
);
const CreateInventoryMedicine = lazy(() =>
  import("../modules/manage-inventory/CreateInventoryMedicine")
);

/* Authentication Pages */
const Login = lazy(() => import("../modules/authentication/Login"));

/* Chat Page */
const Chat = lazy(() => import("../modules/chat/Chat"));

/* Main Page */
const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));

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
  { path: "/device/create", element: <CreateDevice /> },
  { path: "/device/update/:id", element: <UpdateDevice /> },

  { path: "/supplier", element: <ManageSupplier /> },
  { path: "/supplier/create", element: <CreateSupplier /> },
  { path: "/supplier/update/:id", element: <UpdateSupplier /> },

  { path: "/inventory", element: <ManageInventory /> },
  { path: "/inventory-device/create", element: <CreateInventoryDevice /> },
  { path: "/inventory-medicine/create", element: <CreateInventoryMedicine /> },

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
