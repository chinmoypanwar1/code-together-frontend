import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react"
import type { FileListItem } from "../../vite-env"
import InputPopover from "./InputPopover"
import DeleteModal from "./DeleteModal"
import { useRef } from "react"
import { useAppDispatch } from "../../hooks/reduxHooks"
import { toggleDirectory } from "../../context/playgroundSlice"

type DirectoryDropdownType = {
  data: FileListItem,
  depth: number
}

function DirectoryDropdown({data, depth}: DirectoryDropdownType) {

  const triggerRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleRightClick = (e) => {
    e.preventDefault();
    if(triggerRef.current) {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
      triggerRef.current.dispatchEvent(clickEvent);
    }
  }

  const handleLeftClick = () => {
    dispatch(toggleDirectory(data.id));
  }

  return (
    <div className={`ml-[${depth}*16]`} onContextMenu={handleRightClick}>
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger>
          <div ref={triggerRef}>
            <Button onClick={handleLeftClick}>{data.name}</Button>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Directory Actions">
          <DropdownItem key="create-directory" textValue="create directory">
            <InputPopover 
              text="Create directory" 
              label="Enter the directory name: " 
              data={data} 
              popoverType="create" 
              fileType="directory" 
            />
          </DropdownItem>
          <DropdownItem key="create-file" textValue="create file">
            <InputPopover 
              text="Create file" 
              label="Enter the file name: " 
              data={data} 
              popoverType="create" 
              fileType="file" 
            />
          </DropdownItem>
          <DropdownItem key="delete-directory">
            <DeleteModal fileName={data.name} data={data} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DirectoryDropdown
