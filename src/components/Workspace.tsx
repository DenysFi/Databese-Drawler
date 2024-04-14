import Canvas from "./EditorCanvas/Canvas";
import ControllPanel from "./EditorHeader/ControllPanel";
import EditorSideBar from "./EditorSidebar/EditorSideBar";

const Workspace = () => {
    return (
        <div className='app-wrapper h-[100vh] overflow-hidden theme'>
            <ControllPanel />
            <div className='flex h-full overflow-hidden'>
                <EditorSideBar />
                <div className='relative flex grow '>
                    <Canvas />
                </div>
            </div>
        </div>
    );
};

export default Workspace;