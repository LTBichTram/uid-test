import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import Stores from "./stores/Stores";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Stores>
      <RouterProvider router={routes} />
      <ToastContainer autoClose={2000} />
    </Stores>
  );
}

export default App;
