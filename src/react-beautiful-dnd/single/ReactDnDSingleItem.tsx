import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { ReactBeautifulDnDItem } from "../ReactBeautifulDnDTypes";

interface ReactDnDSingleItemProps {
  item: ReactBeautifulDnDItem;
  index: number;
  getItemStyle: any;
}

const ReactDnDSingleItem = ({
  item,
  index,
  getItemStyle,
}: ReactDnDSingleItemProps) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot): JSX.Element => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
          )}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

export default ReactDnDSingleItem;
