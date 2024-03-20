import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default React.memo(function DraggableList({
  items,
  onDragEnd,
  onRemove,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ 'list-style-type': 'none' }}
          >
            {items.map((item, index) => (
              <DraggableListItem
                item={item}
                index={index}
                key={item + index}
                onRemove={onRemove}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});
