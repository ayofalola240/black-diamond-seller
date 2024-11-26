import { UseControllerProps, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type IProps<T> = {
  name: keyof T;
  label?: string;
  placeholder?: string;
  options: string[];
} & UseControllerProps;

export const FormSelect = <T extends Record<string, any>>({ label, name, placeholder = "Select", options }: IProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm leading-[22px] font-normal -tracking-[0.4px] text-[#999999]">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn("text-sm text-white bg-transparent h-[50px] font-normal rounded-[4px]", !options.find((option) => option === field.value) && "text-muted-foreground")}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => {
                return (
                  <SelectItem className="capitalize" key={option} value={option}>
                    {option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
