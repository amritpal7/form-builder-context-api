import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableElement from "./components/DraggableElement/Sidebar";
import PreviewSection from "./components/PreviewSection/PreviewSection";
import ElementDialog from "./components/ElementDialog/ElementDialog";

const App = () => {
  const [elements, setElements] = useState([]); // Store dropped elements
  const [dialogData, setDialogData] = useState(null); // Store dialog element data
  const [editingElementId, setEditingElementId] = useState(null); // Track editing state

  const formElements = [
    { id: "1", type: "text", label: "Text Input" },
    { id: "2", type: "radio", label: "Radio Button" },
    { id: "3", type: "select", label: "Select Dropdown" },
    { id: "4", type: "checkbox", label: "Checkbox" },
  ];

  // Handle drop event
  const handleDrop = item => {
    console.log("Dropped item:", item); // Debugging log
    const newFormElements = {
      ...item,
      id: Date.now().toString(),
      required: false,
      options: [],
    };
    setDialogData(newFormElements);
    setEditingElementId(null); // New element, not editing
  };

  const handleElementSave = updatedElement => {
    // if (!updatedElement.name.trim()) {  // This code has bug of saving dialog box without providing name
    //   alert("Please enter field name!");
    //   return;
    // } ------ // end of buggy code

    console.log("Saving element:", updatedElement.name);
    setElements(prevElements => [...prevElements, updatedElement]);
    setDialogData(null);
    setEditingElementId(null);
  };

  // Handle cancel from dialog
  const handleCancel = () => {
    setDialogData(null);
    setEditingElementId(null);
  };

  // code for Re-configuration of the elements
  const handleReconfigureElement = updatedElement => {
    setElements(prevElements =>
      prevElements.map(el => {
        if (el.id === updatedElement.id) {
          // Merge existing element with updated data, retaining options
          return {
            ...el,
            ...updatedElement,
            options: updatedElement.options || el.options, // Retain options if not explicitly updated
          };
        }
        return el;
      })
    );
  };

  const handleDeleteElement = id => {
    setElements(prevElements => prevElements.filter(el => el.id !== id));
    console.log("element deleted!");
  };

  const handleReconfigureCancel = () => {};

  console.log("Current elements:", elements); // Debugging log

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="w-full bg-blue-600 text-white p-4 text-center text-lg font-bold">
          Form Builder
        </header>

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-1/4 bg-gray-200 p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Form Elements</h2>
            <div className="space-y-4 overflow-y-auto h-[calc(100vh-8rem)]">
              {formElements.map((element, index) => (
                <DraggableElement
                  key={index}
                  type={element.type}
                  label={element.label}
                />
              ))}
            </div>
          </aside>

          {/* Preview Section */}
          <main className="w-3/4">
            <PreviewSection
              elements={elements}
              onDrop={handleDrop}
              onElementSave={handleReconfigureElement}
              onElementCancel={handleReconfigureCancel}
              onElementReconfigure={handleReconfigureElement}
              onDeleteFormElement={handleDeleteElement}
            />
          </main>
        </div>

        {/* Dialog */}

        {dialogData && (
          <ElementDialog
            element={dialogData}
            onSave={handleElementSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default App;
