import { TButtonProps } from "../../types/button.type";
import LoadingButton from "../Loading/LoadingButton";
import "./style.scss";

const Button = (props: TButtonProps) => {
  const {
    id,
    loading,
    leftIcon,
    rightIcon,
    children,
    className,
    variant = "primary",
    onClick,
    ...rest
  } = props;

  return (
    <button
      id={id}
      onClick={onClick}
      className={`${variant} ${className}`}
      {...rest}
    >
      {leftIcon}
      {loading ? <LoadingButton /> : children}
      {rightIcon}
    </button>
  );
};

export default Button;
