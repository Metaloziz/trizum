export const changedViewScreen = (widthScreen: number, gameViewSize: number) => {
  if (widthScreen >= 1200) {
    gameViewSize = widthScreen - 700;
    return gameViewSize;
  }
  if (widthScreen <= 1000 && widthScreen > 760) {
    gameViewSize = widthScreen - 300;
    return gameViewSize;
  }
  if (widthScreen < 760) {
    gameViewSize = widthScreen - 220;
    return gameViewSize;
  }
  if (widthScreen < 420) {
    gameViewSize = 200;
    return gameViewSize;
  }
  return gameViewSize;
};
