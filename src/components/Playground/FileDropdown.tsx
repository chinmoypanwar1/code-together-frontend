import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import type { FileListItem } from "../../vite-env"
import DeleteModal from "./DeleteModal";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setActiveFile } from "../../context/playgroundSlice";

type FileDropdownType = {
  data: FileListItem,
  depth: number
}

function FileDropdown({ data, depth }: FileDropdownType) {

  const triggerRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleRightClick = (e) => {
    e.preventDefault();
    if (triggerRef.current) {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      triggerRef.current.dispatchEvent(clickEvent);
    }
  }

  const handleLeftClick = () => {
    dispatch(setActiveFile(data.id));
  }

  return (
    <div className={`ml-[${depth * 16}px]`} onContextMenu={handleRightClick}>
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger>
          <div ref={triggerRef}>
            <Button onClick={handleLeftClick}>{data.name}</Button>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="File Actions">
          <DropdownItem key="delete-file" textValue="delete file">
            <DeleteModal fileName={data.name} data={data} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default FileDropdown
