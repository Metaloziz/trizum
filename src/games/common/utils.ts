export function isWeb() : boolean {
  return typeof window !== 'undefined';
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
