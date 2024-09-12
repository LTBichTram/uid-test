import { Controller } from "react-hook-form";
import { TForm } from "../../types/form.type";
import "./style.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

type TInputElement = {
  onChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >;
  value: string;
  onBlur: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

const Input = (props: TForm) => {
  const {
    control,
    name,
    error,
    require,
    label,
    autoFocus,
    disabled,
    type = "text",
    maxLength,
    options,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const InputElement = ({ onChange, value, onBlur }: TInputElement) => {
    switch (type) {
      case "ckeditor":
        return (
          <CKEditor
            editor={ClassicEditor}
            data={value as never}
            onChange={(_event, editor) => {
              const data = editor.getData();
              onChange(data as never);
            }}
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={onChange}
            defaultValue={options && options[0].value}
            className="cursor-pointer"
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "price":
        return (
          <div
            className={`text-base border bg-white border-[#B2B2B2] flex items-center rounded-[3px] w-full ${
              isFocused ? "border-primary border-2" : ""
            }`}
          >
            <input
              {...rest}
              id={name}
              value={value}
              onChange={onChange}
              autoFocus={autoFocus}
              disabled={disabled}
              maxLength={maxLength}
              onBlur={(e) => {
                setIsFocused(false);
                if (onBlur) onBlur(e);
              }}
              onFocus={() => setIsFocused(true)}
              className="border-0 focus:outline-none"
            />
            <label htmlFor={name} className="text-slate-600 mr-[6px]">
              USD
            </label>
          </div>
        );
      default:
        return (
          <input
            {...rest}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={maxLength}
            className={`text-base py-1 px-[6px] border bg-white focus:outline-primary ${
              disabled ? "!bg-gray-100 opacity-50" : ""
            }`}
          />
        );
    }
  };

  return (
    <div className="w-full relative pb-4">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <div
            className={`flex gap-5 items-center group-[.vertical]:flex-col group-[.vertical]:gap-1 group-[.vertical]:items-start`}
          >
            <div
              className={`${
                require
                  ? 'before:content-["*"] before:ml-0.5 before:text-red-500'
                  : ""
              } min-w-[110px] text-sm ${disabled ? "opacity-50" : ""}`}
            >
              <span>{label}</span>
            </div>
            {InputElement({ onChange, value: value || "", onBlur })}
          </div>
        )}
      />
      {error && (
        <p className="absolute bottom-0 text-xs text-red-600 transition-all">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
