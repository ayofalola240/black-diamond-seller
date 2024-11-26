"use client";

import { FormInput, FormSelect } from "@/components/forms";
import { DropZoneComponent, ImageList } from "@/components/item-upload";
import { InfoImage, Modal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { MdFileCopy } from "react-icons/md";
import { createAuction, updateAuction } from "@/lib/auction";
import { useRouter } from "nextjs-toploader/app";
import { cacheTags, formatError, Routes } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAuction, useTitle } from "@/hooks";
import { useGetCategories } from "@/hooks/shared";

const formSchema = z.object({
  title: z.string().min(1),
  price: z.string().min(1),
  startingBidAmount: z.string().min(1),
  category: z.string().min(1),
  escrowType: z.enum(["private", "public"]),
  description: z.string().min(1),
  itemImages: z.array(z.any()).optional(),
});

export type FormType = z.infer<typeof formSchema>;

export default function UploadItem({ searchParams }: { searchParams: any }) {
  const auctionId = searchParams?.auctionId;
  useTitle(auctionId ? "Edit Auction" : "Create Auction");

  const { data: auction } = useGetAuction({ slug: auctionId });
  const { data: categories } = useGetCategories();
  const [uploadedFiles, setUploadedFiles] = useState([] as File[]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isShowingModal, setIsShowingModal] = useState(false);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      description: auction?.description,
    },
  });
  const [auctionSlug, setAuctionSlug] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (args: FormData | any) => {
      return auctionId ? updateAuction(auction!._id, args) : createAuction(args);
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
    onSuccess: async (data, variable) => {
      await queryClient.invalidateQueries({ queryKey: [cacheTags.auctionItems] });

      if (auctionId) {
        toast.success("Auction updated successfully");
        return router.back();
      }

      const escrowType = variable.get("escrowType");

      if (escrowType == "public") {
        toast.success("Auction created successfully");
        router.push(Routes.Home);
      } else {
        setAuctionSlug(data.auction.slug);
        setIsShowingModal(true);
      }
    },
  });

  useEffect(() => {
    if (!auction) return;
    //prefill the form with the existing data if we are editing
    form.reset({
      title: auction?.title,
      price: auction?.price.toString(),
      category: auction.category,
      startingBidAmount: auction?.startingBidAmount.toString(),
      escrowType: auction?.escrowType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction]);

  async function onSubmit(values: FormType) {
    const formData = new FormData();

    for (const key in values) {
      if (key == "itemImages") return;
      formData.append(key, (values as any)[key]);
    }

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("itemImages", uploadedFiles[i]);
    }

    //if auctionId is available, that means we are editing
    if (auctionId) {
      return mutate(formData);
    }

    if (uploadedFiles.length == 0 && !auctionId) return form.setError("itemImages", { message: "Please upload an image" });

    mutate(formData);
  }

  function onDropFiles(acceptedFile: File[]) {
    if (uploadedFiles.length + acceptedFile.length > 6) return toast.error("You can only upload up to 6 images");

    setUploadedFiles((prev) => {
      return [...prev, ...acceptedFile];
    });
  }

  const handleImageRemove = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    const files = [...uploadedFiles];
    const [removed] = files.splice(source.index, 1);
    files.splice(destination.index, 0, removed);
    setUploadedFiles(files);
  };

  const escrowType = form.watch("escrowType");

  return (
    <>
      <Modal
        link={escrowType == "public" ? "" : "https://"}
        footer={
          [
            escrowType === "private" && {
              text: "Share Link",
              action: async () => {
                const text = `https://black-diamond.ng/${auctionSlug}`;
                await navigator.clipboard.writeText(text);
                toast.success("Link copied to clipboard");
                setIsShowingModal(false);
                router.push(Routes.Home);
              },
              icon: <MdFileCopy size={16} />,
            },
            {
              text: "Continue",
              action: () => {
                setIsShowingModal(false);
                router.push(Routes.Home);
              },
              icon: <InfoImage width={16} height={16} url="/svgs/arrow-svg.svg" />,
            },
          ].filter(Boolean) as any
        }
        isOpen={isShowingModal}
        setIsOpen={setIsShowingModal}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className=" flex flex-col text-white py-[60px] gap-10  max-w-container mx-auto">
          <header className="pb-[20px] border-b border-[#EEEEEE]">
            <h2>{auctionId ? "Edit Item" : "Upload an item to sell"}</h2>
          </header>
          <Form {...form}>
            <div className="max-w-[832px] flex flex-col gap-[40px] mx-auto">
              <DropZoneComponent onDrop={onDropFiles} />
              <ImageList uploadedFiles={uploadedFiles} handleImageRemove={handleImageRemove} />
            </div>
            <section className="max-w-[752px] w-full flex flex-col gap-[40px] mx-auto">
              <h3 className="text-2xl  font-medium">Item details</h3>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <FormInput<FormType> placeholder="Input item name" label="Product Name" name="title" />
                <FormInput<FormType> placeholder="5000" type="number" label="Input amount" name="price" />
                <FormInput<FormType> placeholder="5500" type="number" label="Input Starting Bid" name="startingBidAmount" />

                <FormSelect<FormType> placeholder="Select" label="Select Category" name="category" options={categories?.categories?.map((category) => category?.category) || []} />
                <FormSelect<FormType> options={["private", "public"]} label="Escrow Type" placeholder="Select Either Private or Public" name="escrowType" />
                <FormInput<FormType> key={auction?.description} isTextArea label="Description" name="description" />
                <Button disabled={isPending} type="submit" className="w-[250px]">
                  Upload Item
                </Button>
              </form>
            </section>
          </Form>
        </section>
      </DragDropContext>
    </>
  );
}
