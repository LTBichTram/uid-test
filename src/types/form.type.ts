import { Control, FieldPath, FieldValues } from "react-hook-form";

export type TInputBase<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  error?: string;
  require?: boolean;
  label?: string;
  placeholder?: string;
  classNames?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  type?: "number" | "text" | "ckeditor" | "price" | "select" | "multi-select";
  maxLength?: number;
  options?: TOption[];
};

export type TOption = {
  value: string;
  label: string;
};

export type TForm = TInputBase<TCreateProduct>;

export type TCreateProduct = {
  id?: number;
  title: string;
  description: string;
  price: string;
  productType?: TOption;
  tags?: TOption[];
};
