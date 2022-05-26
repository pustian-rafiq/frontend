import React, { useState } from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";

const containerStyles = {
  width: "70vw",
  height: "50vw",
};

const renderNodeWithCustomEvents = ({
  nodeDatum,
  toggleNode,
  handleNodeClick,
}) => (
  <g>
    <circle cx="0" cy="-5" r="40" stroke="salmon" strokeWidth="4" />
    <img
      href="/images/download.png"
      width="40"
      height="40"
      x="-20"
      y="-25"
      onClick={() => {
        // toggleNode();
        handleNodeClick(nodeDatum);
      }}
    ></img>
    {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);

const ShowConsumerTree = ({ data }) => {
  // data
  const treeData = JSON.parse(data);

  // zoom
  const [zoomLevel, setZoomLevel] = useState(0.5);

  const handleNodeClick = (nodeDatum) => {
    window.alert(
      nodeDatum.children ? "Clicked a branch node" : "Clicked a leaf node."
    );
  };
  const [translate, containerRef] = useCenteredTree();

  return (
    <>
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={treeData}
          translate={translate}
          zoom={zoomLevel}
          zoomable={true}
          renderCustomNodeElement={(rd3tProps) =>
            renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
          }
          orientation="vertical"
        />
      </div>
    </>
  );
};

export default ShowConsumerTree;
