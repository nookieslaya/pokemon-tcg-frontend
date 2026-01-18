import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <Dashboard />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "toast",
          duration: 3200,
          success: { className: "toast toast-success" },
          error: { className: "toast toast-error" },
        }}
      />
    </>
  );
};

export default App;
