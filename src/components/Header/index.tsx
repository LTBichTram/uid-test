import { Link, NavLink } from "react-router-dom";
import { listBar } from "./ListBar";
import logoImg from "../../assets/logo.svg";
import { path } from "../../routes/path";

export default function Header() {
  return (
    <div className="sticky top-0 z-40 w-full transition-all bg-white">
      <div className="max-w-[1440px] m-auto h-14 md:h-16 sm:px-8 px-4 flex items-center justify-between">
        <Link to={path.home}>
          <img alt="logo" src={logoImg} />
        </Link>
        <ul className="flex space-x-8 text-sm leading-6 font-semibold text-slate-700">
          {listBar.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-primary" : ""
                  } hover:text-primary transition-all`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
