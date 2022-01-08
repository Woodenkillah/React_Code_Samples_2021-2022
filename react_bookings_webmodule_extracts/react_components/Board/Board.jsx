import React from "react";
import BoardItem from "./BoardItem/BoardItem";
import { BOARD_SIZES } from "configs/PlannerConfig";

const { boardWidth, boardHeight } = BOARD_SIZES;


const Board = ({ 
  boardData=[],
  selectedItem=null,
  sizeRate=1,
  onClickItem=null
}) => {
  
  const boardItems = boardData?.map((item, index) => ({
    ...item,
    x_coordinate: item.x_coordinate * sizeRate,
    y_coordinate: item.y_coordinate * sizeRate,
    keyId: index
  }));
  
  return (
    <div className="Board"
      style={{width: (boardWidth * sizeRate)}}
    >
      <div
        className="Board-Content"
        style={{
          width: (boardWidth * sizeRate),
          height: (boardHeight * sizeRate)
        }}
      >
        {
          boardItems.length
          ? boardItems.map((item) => (
            item.isDeleted
            ? null
            : <BoardItem
                key={item.keyId}
                item={item}
                selectedItem={selectedItem}
                onClickItem={onClickItem}
                sizeRate={sizeRate}
              />
          ))
          : null
        }
      </div>
    </div>
  );
}

export default Board;
