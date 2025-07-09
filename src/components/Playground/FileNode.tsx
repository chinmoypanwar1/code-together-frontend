import type { FileListItem } from "../../vite-env"
import FileDropdown from "./FileDropdown"
import DirectoryDropdown from "./DirectoryDropdown"
import { useAppSelector } from "../../hooks/reduxHooks"

type FileNodeType = {
  data: FileListItem[] | null,
  depth: number,
}

function FileNode({ data, depth = 0 }: FileNodeType) {

  const expanded = useAppSelector(state => state.playground.expandedDirectory);

  if (!data) {
    return (
      <></>
    )
  }

  return (
    <div>
      {
        data.map((fileItem) => {
          if (fileItem.type === 'file') return <FileDropdown key={fileItem.id} data={fileItem} depth={depth} />
          if (fileItem.type === 'directory') {
            const isExpanded = expanded.includes(fileItem.id)
            return (
              <div key={fileItem.id}>
                {depth > 0 && <DirectoryDropdown data={fileItem} depth={depth} />}
                {
                  !isExpanded && (
                    <FileNode
                      data={fileItem.children}
                      depth={depth + 1}
                    />
                  )
                }
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default FileNode
