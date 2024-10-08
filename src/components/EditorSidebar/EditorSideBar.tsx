import { FC, useState } from "react"

const EditorSideBar: FC = () => {
	const [width] = useState<number>(300)

	return <aside style={{ width: `${width}px` }}></aside>
}

export default EditorSideBar
