import FileNavigator from "./FileNavigator"
import MonacoEditor from "./MonacoEditor";

function FileEditor() {

  return (
    <div className="w-full h-full flex flex-row">
      <FileNavigator />
      <MonacoEditor/>
    </div>
  )
}

export default FileEditor
