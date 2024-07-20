import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "./components/SocketContext.jsx";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebase.js";
import { BrowserRouter } from "react-router-dom";
import "primeicons/primeicons.css";
import "./index.css";

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider value={{ ripple: true }}>
          <SocketContextProvider>
            <App />
            <Toaster
              position="top-center"
              reverseOrder={false}
              containerStyle={{
                zIndex: "999999",
              }}
            />
          </SocketContextProvider>
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
