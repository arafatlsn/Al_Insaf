"use client";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { ToastContainer } from "react-toastify";

const IndexWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
};

export default IndexWrapper;
