import React from "react";
import { ITEM_TYPES } from "configs/PlannerConfig";

const { place, other } = ITEM_TYPES;


const BoardItem = ({
  item=null,
  selectedItem=null,
  onClickItem=null,
  sizeRate=1
}) => {

  const getClassName = (id, selectedId, type, isAvailable) => {
    const classNames = ['BoardItem-'];

    if (type === other) {
      classNames.push('OtherItem')
    }

    if (type === place) {
      classNames.push('PlaceItem')

      if (id === selectedId) {
        classNames.push(' BoardItem-PlaceItem_selected')
      }

      if (isAvailable) {
        classNames.push(' BoardItem-PlaceItem_available')
      }

      if (!isAvailable) {
        classNames.push(' BoardItem-PlaceItem_unavailable')
      }
    }

    return classNames.join('');
  };

  return (
    item && (
      <div
        className="BoardItem"
        style={{ 
          left: item.x_coordinate,
          top: item.y_coordinate
        }}>
          <img
            alt={item.name}
            src={item.image}
            className={getClassName(item.id, selectedItem?.id, item.type, item.available)}
            style={{
              width: item.width * sizeRate,
              height: item.height * sizeRate,
              transform: `translate(-50%, -50%) rotate(${item.direction}deg)`
            }}
            onClick={() => onClickItem(item)}
          />
      </div>
    )
  );
};

export default BoardItem;
