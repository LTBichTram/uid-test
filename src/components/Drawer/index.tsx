import { TProduct } from "../../types/product.type";
import ActionProduct from "../ActionProduct";
import "./style.scss";

type TDrawer = {
  open: boolean;
  dfValue?: TProduct;
  title: string;
  onClose: () => void;
};

export default function Drawer(props: TDrawer) {
  const { open, onClose, dfValue, title } = props;
  return (
    <>
      <div
        className={`overlay ${!open && "overlay-hidden"} ${
          open && "overlay-open"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`drawer ${open && "animate"} ${
          !open && "hidden-drawer"
        } scroll-ruler px-4`}
      >
        <div className="py-2 border-b border-gray-100 text-xl font-semibold">
          {title}
        </div>
        <div className="py-4">
          <ActionProduct
            btnText="Edit now"
            dfValue={dfValue}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  );
}
