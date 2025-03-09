"use client";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { ToastContainer } from "react-toastify";

const IndexWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
    </Provider>
  );
};

export default IndexWrapper;
