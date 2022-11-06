import React, { Component } from 'react';
import Svg, { Rect, Circle, Polygon } from 'react-native-svg';

export const GameForm : any = {
  rightTriangle : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Polygon
        points={`${size/2},0 ${(size/5)*4},${size} ${size/5},${size}`}
        fill={color}
      />
    </Svg>;
  },
  fiveAngle : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Polygon
        points={`${size/2},0 ${size},${size/2} ${(size/4)*3},${size} ${(size/4)},${size} 0,${size/2}`}
        fill={color}
      />
    </Svg>;
  },
  sixAngle : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Polygon
        points={`${size/4},0 ${(size/4)*3},0 ${size},${size/2} ${(size/4)*3},${size} ${(size/4)},${size} 0,${size/2}`}
        fill={color}
      />
    </Svg>;
  },
  centerRect : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Rect
        x={size/4}
        y="0"
        width={size/2}
        height={size}
        fill={color}
      />
    </Svg>;
  },
  rect : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Rect
        x="0"
        y="0"
        width={size}
        height={size}
        fill={color}
      />
    </Svg>;
  },
  star : (size : any, color : any) => {
    const per30 = size/3;

    return <Svg
      width={size}
      height={size}
    >
      <Polygon
        points={`
          0,${per30} ${per30},${per30} ${per30*1.5},0 ${per30*2},${per30} ${size},${per30}
          ${per30*2.25},${per30*1.9}
          ${per30*2.5},${size}
          ${size/2},${per30*2.5}
          ${per30*0.5},${size}
          ${per30*0.75},${per30*1.9}
        `}
        fill={color}
      />
    </Svg>;
  },
  romb : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Polygon
        points={`${size/2},0 ${size},${size/2} ${size/2},${size} 0,${size/2}`}
        fill={color}
      />
    </Svg>;
  },
  leftTriangle : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Polygon
        points={`${0},0 ${size},${size} 0,${size}`}
        fill={color}
      />
    </Svg>;
  },
  triangle : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Polygon
        points={`${size/2},0 ${size},${size} 0,${size}`}
        fill={color}
      />
    </Svg>;
  },
  circle : (size : any, color : any) => {
    return <Svg
      width={size}
      height={size}
    >
      <Circle
        cx={size/2}
        cy={size/2}
        r={size/2}
        fill={color}
      />
    </Svg>;
  }
};

const GameForms : any[] = [];

for(let prop in GameForm) {
  GameForms.push(prop);
}

export {
  GameForms
};
