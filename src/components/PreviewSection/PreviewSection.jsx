import React, { useState } from "react";
import FormElement from "../FormElement/FormElement";
import ElementDialog from "../ElementDialog/ElementDialog";
import { useDrop } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";

const PreviewSection = ({
  onDrop,
  elements,
  onElementSave,
  onElementCancel,
  onElementReconfigure,
  onDeleteFormElement,
}) => {
  const [selectedElement, setSelectedElement] = useState(null);

  const handleElementClick = element => {
    setSelectedElement({ ...element });
    // onElementReconfigure(element);
  };
  const handleDialogSave = updatedElement => {
    onElementSave(updatedElement);
    setSelectedElement(null);
  };
  const handleDialogClose = () => {
    setSelectedElement(null);
  };

  const [, drop] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: item => {
      onDrop(item);
    },
  }));

  return (
    <div
      ref={drop}
      className="w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 h-[calc(100vh-4rem)] overflow-y-auto p-4 shadow-inner"
    >
      {elements.length > 0 ? (
        <form className="space-y-4">
          {elements.map((element, index) => {
            return (
              <div
                key={element.id}
                className="relative group flex items-center justify-between p-4 border rounded bg-gray-200 dark:bg-gray-800 shadow hover:shadow-md"
              >
                {/* Form element content */}
                <div>
                  <FormElement key={element.id} {...element} />
                </div>

                {/* Edit icon - Visible only on hover */}
                <div className="flex space-x-2 absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={e => {
                      e.preventDefault();
                      handleElementClick(element);
                    }}
                  >
                    <FaEdit className="text-blue-500 text-lg" />
                  </button>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      onDeleteFormElement(element.id);
                    }}
                  >
                    <FaTrash className="text-red-500 text-lg" />
                  </button>
                </div>
              </div>
            );
          })}
        </form>
      ) : (
        <p className="text-gray-300 text-center">Drop form elements here.</p>
      )}

      {selectedElement && (
        <ElementDialog
          element={selectedElement}
          onSave={handleDialogSave}
          onCancel={handleDialogClose}
        />
      )}
    </div>
  );
};

export default PreviewSection;
