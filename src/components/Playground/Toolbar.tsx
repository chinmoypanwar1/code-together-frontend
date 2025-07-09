import { Listbox, ListboxItem } from "@heroui/react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setActiveComponent } from "../../context/playgroundSlice";
import RoomModal from "./RoomModal";

function Toolbar() {
  const dispatch = useAppDispatch();
  const activeComponent = useAppSelector(state => state.playground.activeComponent);

  const changeActiveComponent = (componentName: string) => {
    if (activeComponent !== componentName) dispatch(setActiveComponent(componentName));
  }

  return (
    <div className="h-auto max-w-52 flex flex-col align-middle border-zinc-700 border mx-8">
      <Listbox aria-label="pages" variant="bordered" className="h-full">
        <ListboxItem
          key="Editor"
          onClick={() => changeActiveComponent('file-editor')}
        >
          File Editor
        </ListboxItem>
        <ListboxItem
          key="Todos"
          onClick={() => changeActiveComponent('todo')}
        >
          Todo Manager
        </ListboxItem>
        <ListboxItem key="Multiplayer">
          <RoomModal />
        </ListboxItem>
      </Listbox>
    </div>
  )
}

export default Toolbar
