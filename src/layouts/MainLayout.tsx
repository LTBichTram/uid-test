import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="max-w-[1440px] m-auto sm:px-8 px-4 my-4">
        <Outlet />
      </div>
    </>
  );
}
