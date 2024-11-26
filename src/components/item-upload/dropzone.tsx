"use client";

import Image from "next/image";
import Dropzone from "react-dropzone";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import { FormType } from "@/app/(protected)/(layoutWithPadding)/upload/page";

interface IProps {
  onDrop: (acceptedFile: File[]) => void;
}

export const DropZoneComponent = ({ onDrop }: IProps) => {
  const {
    clearErrors,
    formState: { errors },
  } = useFormContext<FormType>();
  return (
    <Dropzone
      onDrop={async (acceptedFile) => {
        clearErrors("itemImages");
        onDrop(acceptedFile);
      }}
      multiple={true}
      maxFiles={6}
      maxSize={5 * 1024 ** 2} // So, 5 * 1024 ** 2 equals 5,242,880 bytes, which is equivalent to 5 MB.
      accept={{ "image/png": [".png"], "image/jpeg": [".jpeg"] }}
    >
      {({ getRootProps, getInputProps, fileRejections }) => {
        return (
          <div {...getRootProps()} className="border w-full h-64 text-black  border-dashed border-gray-300 rounded-lg">
            <div className="flex flex-col gap-2 p-4 items-center text-center rounded-lg cursor-pointer h-full bg-[#EEEEEE] hover:bg-gray-100 justify-center ">
              <Image src="/svgs/gallery.svg" alt="Gallery Icon" width={33.33} height={30} />
              <div>
                <p>Drag and drop your product image here. Add up to 6 high quality images.</p>
                <p>Image size should not be more than 5MB and should not be more than 240x240. File format (.png & .jpeg)</p>
              </div>
              <Button className="text-base pointer-events-none" size="sm">
                Add Image
              </Button>
            </div>
            {fileRejections.length > 0 && (
              <div className="bg-red-500 text-white text-center">
                <p>{fileRejections[0].errors[0].message}</p>
              </div>
            )}
            {errors.itemImages && errors.itemImages.message && (
              <div className="bg-red-500 text-white text-center">
                <p>Please Upload at least one image to continue</p>
              </div>
            )}

            <input {...getInputProps()} type="file" aria-hidden="true" id="dropzone-file" className="hidden" />
          </div>
        );
      }}
    </Dropzone>
  );
};
