import { useDrag } from "react-dnd";

const DraggableElement = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { type },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border rounded bg-white shadow-md ${
        isDragging ? "opacity-50" : "opacity-100"
      } bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100`}
    >
      {label}
    </div>
  );
};

export default DraggableElement;
