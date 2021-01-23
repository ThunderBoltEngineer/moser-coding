import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MOVE_TASK, REMOVE_TASK } from '../store/actions';
import imgTrash from '../assets/images/delete.svg';

function Task({ id, note, onRemove }) {
  return (
    <Draggable
      draggableId={`task-${id}`}
      index={id}
    >
    {
      providedDraggable => (
        <div
          className='task-list--item'
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
        >
          <p>{note}</p>
          <img src={imgTrash} alt='trash' onClick={onRemove} /> 
        </div>
      )
    }
    </Draggable>
  );
}

function TaskList({ tasks, removeTask, moveTask }) {

  const onRemove = index => {
    removeTask(index);
  }

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    moveTask(source.index, destination.index);
  }

  return (
    <div className='task-list'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="1">
        {
          provided =>
            <div
              {...provided.droppableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
            {
              tasks.map((note, index) => (
                <Task
                  key={index}
                  id={index}
                  note={note}
                  onRemove={() => onRemove(index)}
                />
              ))
            }
            { provided.placeholder }
            </div>
        }
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const mapStateToProps = ({ tasks }) => {
  return {
    tasks,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    removeTask: index => dispatch({ type: REMOVE_TASK, payload: index }),
    moveTask: (src, dest) => dispatch({ type: MOVE_TASK, payload: { src, dest } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
