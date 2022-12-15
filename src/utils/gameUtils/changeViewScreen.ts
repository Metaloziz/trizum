export const changedViewScreen = (widthScreen: number, gameViewSize: number) => {
  if (widthScreen >= 1350) {
    gameViewSize = 1080;
    return gameViewSize;
  }
  if (widthScreen >= 1200) {
    gameViewSize = widthScreen - 700;
    return gameViewSize;
  }
  if (widthScreen <= 1000 && widthScreen > 760) {
    gameViewSize = widthScreen - 140;
    return gameViewSize;
  }
  if (widthScreen < 760) {
    gameViewSize = widthScreen - 60;
    return gameViewSize;
  }
  if (widthScreen < 420) {
    gameViewSize = 320;
    return gameViewSize;
  }
  return gameViewSize;
};
