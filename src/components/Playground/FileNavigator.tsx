import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks"
import FileNode from "./FileNode"
import InputPopover from "./InputPopover";

function FileNavigator() {

  const fileSystem = useAppSelector(state => state.playground.FileSystem);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (fileSystem && fileSystem.length > 0) setLoading(false);
  }, [fileSystem]);

  if (loading) return <h1>File Navigator loading...</h1>

  return (
    <div className="flex flex-col">
      <InputPopover
        text="+File"
        label="Enter file name: "
        data={fileSystem[0]}
        popoverType="create"
        fileType="file"
      />
      <InputPopover
        text="+Directory"
        label="Enter dir name: "
        data={fileSystem[0]}
        popoverType="create"
        fileType="directory"
      />
      <FileNode data={fileSystem} depth={0} />
    </div>
  )
}

export default FileNavigator
