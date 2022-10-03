export const changedViewScreen = (widthScreen: number, gameViewSize: number) => {
  if (widthScreen <= 1000 && widthScreen > 760) {
    return (gameViewSize = widthScreen - 300);
  }
  if (widthScreen < 760) {
    return (gameViewSize = widthScreen - 200);
  }
  if (widthScreen < 420) {
    return (gameViewSize = 200);
  }
  return gameViewSize;
};
