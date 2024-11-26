import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import { Select } from "../ui/react-select";

type Option = { label: string; value: string };

type IProps<T> = {
  name: keyof T;
  label?: string;
  placeholder?: string;
  handleOnChange?: (value: Option) => void;
  options: Option[];
} & UseControllerProps;

export const FormReactSelect = <T extends Record<string, any>>({ label, name, placeholder = "Select...", handleOnChange, options, ...rest }: IProps<T>) => {
  const form = useFormContext();

  return (
    <div className="form-item">
      {label && <label className="text-sm leading-[22px] font-normal -tracking-[0.4px] text-[#999999]">{label}</label>}
      <Controller
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            className="text-sm text-white bg-transparent h-[50px] font-normal rounded-[4px]"
            onChange={(option: any) => {
              handleOnChange && handleOnChange(option);
              field.onChange(option?.label);
            }}
            value={options.find((option) => option.value === field.value)}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                borderColor: "#ccc",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#999",
              }),
            }}
            {...rest}
          />
        )}
      />
      <p className="text-sm text-red-500">{form.formState.errors[name]?.message as string}</p>
    </div>
  );
};
