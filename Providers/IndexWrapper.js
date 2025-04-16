"use client";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "../Redux/store";
import { ToastContainer } from "react-toastify";

const IndexWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        {children}
        <ToastContainer
          position="top-center"
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
      </SessionProvider>
    </Provider>
  );
};

export default IndexWrapper;
