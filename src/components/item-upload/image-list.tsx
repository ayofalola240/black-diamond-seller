import { InfoImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface IProps {
  uploadedFiles: File[];
  handleImageRemove: (index: number) => void;
}

export const ImageList = ({ uploadedFiles, handleImageRemove }: IProps) => {
  return (
    <>
      {uploadedFiles.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-weight ">Uploaded Images</h3>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {uploadedFiles.map((file, index) => (
                  <Draggable key={file.name} draggableId={file.name} index={index}>
                    {(provided) => (
                      <li
                        className="flex flex-row border-b w-full border-[#eee] items-center justify-between"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="flex flex-row w-full items-center gap-4">
                          <div className="cursor-grab">
                            <Menu color="#999999" />
                          </div>

                          <div className="relative pointer-events-none w-[50px] h-[35px] aspect-square">
                            <Image fill className="object-contain" src={URL.createObjectURL(file)} alt={file.name} />
                          </div>
                          <p className="pointer-events-none max-w-40 sm:max-w-full truncate">{file.name}</p>
                        </div>
                        <Button onClick={() => handleImageRemove(index)} variant="link">
                          <InfoImage isIcon url="/svgs/delete-bin-3-fill.svg" />
                        </Button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      )}
    </>
  );
};
