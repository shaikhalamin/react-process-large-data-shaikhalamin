import styled from "@emotion/styled";
import React, { FC, useRef, useState } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";
import ListItem from "./ListItem";

const ScrollWrapper = styled.div`
  width: 100%;
  height: 500px;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
}

export const List: FC<ListProps> = ({ items, children }) => {
  const viewPortRef = useRef(null);
  const itemHeight = 30;
  const viewportHeight = 800;
  const numVisibleItems = Math.trunc(viewportHeight / itemHeight);
  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: numVisibleItems,
  });
  const containerStyle = { height: items.length * itemHeight };

  const renderRows = () => {
    let result = [];
    for (
      let index = visibleRange.start;
      index < visibleRange.end + 1;
      index++
    ) {
      result.push(
        <ListItem key={index} top={index * itemHeight} itemHeight={itemHeight}>
          {items[index]}
        </ListItem>
      );
    }
    return result;
  };

  const scrollPos = () => {
    let currentIndx = Math.trunc(viewPortRef.current.scrollTop / itemHeight);
    currentIndx =
      currentIndx - numVisibleItems >= items.length
        ? currentIndx - numVisibleItems
        : currentIndx;
    setVisibleRange({
      start: currentIndx,
      end:
        currentIndx + numVisibleItems >= items.length
          ? items.length - 1
          : currentIndx + numVisibleItems,
    });
  };

  return (
    <ScrollWrapper>
      <ListWrapper>
        {/**
         * Note: `SafelyRenderChildren` should NOT be removed while solving
         * this interview. This prevents rendering too many list items and
         * potentially crashing the web page. This also enforces an artificial
         * limit (5,000) to the amount of children that can be rendered at one
         * time during virtualization.
         */}
        <SafelyRenderChildren>
          <div ref={viewPortRef} className="viewPort" onScroll={scrollPos}>
            <div className="itemContainer" style={containerStyle}>
              {renderRows()}
            </div>
          </div>
        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
