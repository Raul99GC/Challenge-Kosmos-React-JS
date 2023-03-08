import React, { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";
import { Component } from "./Component";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [number, setNumber] = useState(0)
  const [selected, setSelected] = useState(null);

  const addMoveable = async () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];
    let gbImages = []
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/photos')
      const data = await resp.json()
      gbImages = data
    } catch (error) {
      console.log(error)
    }
    const imageRandom = gbImages[Math.floor(Math.random() * gbImages.length)].url
    const path = `url(${imageRandom})`

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        backgroundImage: path,
        updateEnd: true
      },
    ]);
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  const deleteMoveable = () => {
    const newArray = [...moveableComponents]
    newArray.pop()
    setMoveableComponents(newArray)
  }

  return (
    <main style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="">
        <button onClick={addMoveable}>Add Moveable1</button>
        <button onClick={deleteMoveable}>Delete Moveable</button>
      </div>
      <div className="">

        <div
          id="parent"
          style={{
            position: "relative",
            background: "black",
            height: "80vh",
            width: "80vw",
            overflow: "hidden"
          }}
        >
          {moveableComponents.map((item, index) => (
            <Component
              {...item}
              key={index}
              updateMoveable={updateMoveable}
              handleResizeStart={handleResizeStart}
              setSelected={setSelected}
              isSelected={selected === item.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
