import { ColorPicker } from "./ColorPicker.jsx"
const { useState} = React



export function EditorPanel({ noteId, onRemoveNote,onSetBgColor }) {
    
    const [isColorPicker, setIsColorPicker] = useState(false)
    

    function toggleClrPicker(){
        setIsColorPicker(prevState => !prevState)
    }

    return (
        <section className="editor-panel">
            {isColorPicker &&  <ColorPicker noteId={noteId} toggleClrPicker={toggleClrPicker} onSetBgColor={onSetBgColor}/>}
            <button onClick={() => toggleClrPicker()}>color</button>
            <button>duplicate</button>
            <button>to image</button>
            <button>to txt</button>
            <button>to list</button>
            <button onClick={() => onRemoveNote(noteId)}>Remove Note</button>
        </section>

    )
}