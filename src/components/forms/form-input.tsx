"use client";

import { UseControllerProps, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ComponentProps, HtmlHTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Editor } from "./editor";

type IProps<T> = {
  name: keyof T;
  label?: string;
  containerClassName?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  isTextArea?: boolean;
} & UseControllerProps &
  ComponentProps<typeof Input>;

export const FormInput = <T extends Record<string, any>>({ label, name, isTextArea, containerClassName, ...rest }: IProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          <FormLabel className="text-sm leading-[22px] font-normal -tracking-[0.4px] text-[#999999]">{label}</FormLabel>
          <FormControl>{isTextArea ? <Editor name={name} /> : <Input className="text-sm h-[50px] font-normal rounded-[4px]  text-white" {...field} {...rest} />}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
