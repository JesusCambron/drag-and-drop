import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import "./index.css";
const initialTasks = [
  {
    id: "1",
    text: "React",
  },
  {
    id: "2",
    text: "Express",
  },
  {
    id: "3",
    text: "MongoDB",
  },
  {
    id: "4",
    text: "JavaScript",
  },
  {
    id: "5",
    text: "HTML/CSS",
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
function App() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        )
          return;
        setTasks((prevTasks) =>
          reorder(prevTasks, source.index, destination.index)
        );
      }}
    >
      <div className="app">
        <div className="title-container">
          <h1>Estudiar</h1>
        </div>
        <main>
          <section className="droppable-section">
            <Droppable droppableId="tasks">
              {(droppableProvided) => (
                <ul
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  className="task-list"
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <li
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                          className="task-item"
                        >
                          <div className="task-text-container">
                            <span>{task.text}</span>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </section>
        </main>
      </div>
    </DragDropContext>
  );
}

export default App;
