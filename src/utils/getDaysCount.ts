export const getDaysCount = (since?: string, until?: string) => {
  if (since && until) {
    const start: number = new Date(since).getTime();
    const end: number = new Date(until).getTime();

    return (end - start) / (1000 * 3600 * 24);
  }

  return 30;
};
