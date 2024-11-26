/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput, FormReactSelect, FormSelect } from "@/components/forms";
import { Button } from "../ui/button";
import { InfoComponent } from "./info-component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { updateUser } from "@/lib/user";
import { cacheTags, formatError } from "@/lib/utils";
import { TUser } from "@/types";
import { useGetBanks } from "@/hooks/shared";
import { axiosClient } from "@/lib/api";
import { FaSpinner } from "react-icons/fa";

const formSchema = z.object({
  accountNumber: z.string().min(1),
  bankName: z.string().min(1),
  bankCode: z.string().min(1),
  accountName: z.string().min(1),
});

type FormType = z.infer<typeof formSchema>;

export const SettlementAccount = ({ paymentDetails }: TUser) => {
  const { data: bankResponse } = useGetBanks();
  const [showingSettleFields, setshowingSettleFields] = useState(false);
  const isPaymentDetailsAvailable = Boolean(paymentDetails?.settlementAccount?.accountName);
  const banks = useMemo(() => {
    if (!bankResponse) return [];
    return bankResponse.map((item) => ({ label: item.InstitutionName, value: item.InstitutionCode }));
  }, [bankResponse]);

  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: { ...paymentDetails?.settlementAccount },
  });

  const accountNumber = form.watch("accountNumber");
  const bankCode = form.watch("bankCode");

  const { mutate: validateAccount, isPending: validatingAccount } = useMutation({
    mutationFn: (arg: any) => {
      return axiosClient.post("/payments/validate-account-number", arg).then((res) => res.data);
    },
    onError(error) {
      toast.error(formatError(error));
    },
    onSuccess: (data) => {
      form.setValue("accountName", data.data.AccountName);
      console.log(data);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (args: FormType) => {
      return updateUser({ settlementAccount: args });
    },
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred. Please try again");
    },
    onSuccess: () => {
      toast.error("Updated!");
      queryClient.invalidateQueries({ queryKey: [cacheTags.user] });
    },
  });

  useEffect(() => {
    if (accountNumber?.length == 10 && bankCode) {
      validateAccount({ accountNumber, bankCode });
    }
  }, [accountNumber, bankCode]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <section className="flex flex-col gap-4">
      <h2>Settlement Account</h2>
      {isPaymentDetailsAvailable || showingSettleFields ? (
        <Form {...form}>
          <form id="settlementForm" onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4 grid">
            <FormInput<FormType> placeholder="0101010101" label="Settlement Account Number" name="accountNumber" />
            <div>
              <FormReactSelect<FormType>
                handleOnChange={(value) => {
                  form.setValue("bankCode", value.value);
                  form.setValue("accountName", "");
                }}
                defaultValue={form.getValues("bankName") ? { label: form.getValues("bankName"), value: form.getValues("bankCode") } : null}
                placeholder="Select..."
                label="Settlement Bank"
                name="bankName"
                options={banks}
              />
              {validatingAccount && <FaSpinner className="animate-spin mt-1" />}
            </div>
            <FormInput<FormType> readOnly placeholder="Black Diamond Foundation" label="Settlement Account Name" name="accountName" />

            <Button disabled={isPending} className="w-full mt-2 sm:w-[250px]">
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div>
          <InfoComponent
            title="Add your preferred settlement account"
            content="Secure your payments by linking a settlement account where funds
              will be transferred after escrow release."
          />
          <Button
            onClick={() => setshowingSettleFields(true)}
            disabled={isPending}
            itemID="settlementForm"
            type={showingSettleFields ? "submit" : "button"}
            className="w-full mt-2 sm:w-[250px]"
          >
            Add a settlement Account
          </Button>
        </div>
      )}
    </section>
  );
};
