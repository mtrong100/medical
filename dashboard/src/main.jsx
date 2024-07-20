import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import "primeicons/primeicons.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebase.js";
import { SocketContextProvider } from "./components/SocketContext.jsx";
import { Toaster } from "react-hot-toast";

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
