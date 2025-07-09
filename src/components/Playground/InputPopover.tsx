import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react"
import { useState } from "react"
import type { FileListItem } from "../../vite-env";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createYjsItem } from "../../context/yjsSlice";

type InputPopoverType = {
  text: string,
  label: string,
  data: FileListItem,
  popoverType: string,
  fileType: string,
}

function InputPopover({ text, label, data, fileType, popoverType }: InputPopoverType) {

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const trimmed = value.trim();
      const isInvalid =
        trimmed === '' ||
        trimmed.startsWith('..') ||
        trimmed.includes('..');

      if (isInvalid) {
        alert('Invalid name: must not be empty or contain ".."');
        return;
      }

      if (popoverType === 'create') {
        // check if name already exists in siblings
        const siblings = data.children || [];
        const nameExists = siblings.some((item: FileListItem) => item.name === value && item.type === fileType);

        if (nameExists) {
          alert(`${fileType} with the same name already exists`);
          return;
        }

        dispatch(createYjsItem({
          parentId: data.id,
          name: value,
          type: fileType
        }));
      }

      setIsOpen(false);
      setValue(""); // optional: clear input
    }
  };

  return (
    <>
      <Popover placement="bottom" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <Button>{text}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Input
            label={label}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={handleKeyDown}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

export default InputPopover
