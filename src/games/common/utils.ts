import { Platform } from 'react-native';

export function isWeb() : boolean {
  return Platform.OS === 'web';
}

export function arrayShuffle(array : any) {
  let currentIndex = array.length;
  let randomIndex;

  while(currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function rand(min : any, max : any) : number {
  let value = min - 0.5 + Math.random() * (max - min + 1);

  value = Math.round(value);

  return value;
}

export function polarToCartesian(centerX : number, centerY : number, radius : number, angleInDegrees : number) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export function describeArc(x : number, y : number, radius : number, startAngle : number, endAngle : number){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
