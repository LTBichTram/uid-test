import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TForm, TOption } from "../../types/form.type";
import "./style.scss";

type TInputElement = {
  onChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >;
  value: string | string[] | TOption[] | TOption;
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
      case "ckeditor": {
        const valueText = value as string;
        return (
          <CKEditor
            editor={ClassicEditor}
            data={valueText}
            onChange={(_event, editor) => {
              const data = editor.getData();
              onChange(data as never);
            }}
          />
        );
      }
      case "select": {
        const valueSelect = value as TOption;
        return (
          <Select
            classNamePrefix="select"
            value={valueSelect}
            options={options}
            onChange={(selectedOptions) => {
              console.log(selectedOptions);
              onChange(selectedOptions);
            }}
            getOptionLabel={(option: TOption) => option.label}
            getOptionValue={(option: TOption) => option.value}
            className="w-full"
          />
        );
      }
      case "multi-select": {
        const animatedComponents = makeAnimated();
        const valueSelect = value as TOption[];
        return (
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            className="w-full"
            options={options}
            value={valueSelect}
            onChange={(selectedOptions) => {
              onChange(selectedOptions);
            }}
            getOptionLabel={(option: TOption) => option.label}
            getOptionValue={(option: TOption) => option.value}
          />
        );
      }
      case "price": {
        const valueText = value as string;
        return (
          <div
            className={`text-base border bg-white border-[#B2B2B2] flex items-center rounded-[3px] w-full ${
              isFocused ? "border-primary border-2" : ""
            }`}
          >
            <input
              {...rest}
              id={name}
              value={valueText}
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
      }
      default: {
        const valueText = value as string;
        return (
          <input
            {...rest}
            value={valueText}
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
