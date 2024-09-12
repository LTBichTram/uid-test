import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import Stores from "./stores/Stores";

function App() {
  return (
    <Stores>
      <RouterProvider router={routes} />
    </Stores>
  );
}

export default App;
