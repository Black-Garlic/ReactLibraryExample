import React, { useCallback, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import MainTemplate from "../../../common/MainTemplate";
import { ReactDnDItem } from "../ReactDnDTypes";
import ReactDnDSingleVerticalArea from "./ReactDnDSingleVerticalArea";
import ReactDnDSingleHorizonArea from "./ReactDnDSingleHorizonArea";
import ReactDnDButton from "../ReactDnDButton";

const getItems = (index: number): ReactDnDItem => {
  return {
    id: `item-${index}`,
    content: `item ${index}`,
  };
};

const initializeItemList = () => {
  return Array.from({ length: 10 }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
};

const ReactDnDSinglePage = () => {
  const [itemList, setItemList] = useState(initializeItemList());

  const addItem = useCallback(() => {
    setItemList([...itemList, getItems(itemList.length)]);
  }, [itemList]);

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: ReactDnDItem[] = reorder(
      itemList,
      result.source.index,
      result.destination.index,
    );

    console.log(result);

    setItemList(items);
  };

  // a little function to help us with reordering the result
  const reorder = (
    list: ReactDnDItem[],
    startIndex: number,
    endIndex: number,
  ): ReactDnDItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <MainTemplate>
      <ReactDnDButton
        setItemList={setItemList}
        addItem={addItem}
        initializeItemList={initializeItemList}
        enableAddGroup={false}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        {window.location.pathname.includes("vertical") ? (
          <ReactDnDSingleVerticalArea itemList={itemList} />
        ) : (
          <ReactDnDSingleHorizonArea itemList={itemList} />
        )}
      </DragDropContext>
    </MainTemplate>
  );
};

export default ReactDnDSinglePage;
