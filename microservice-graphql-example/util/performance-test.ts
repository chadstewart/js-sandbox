export const testPerformance = (prevTimestamp?: Date) => {
  const currentTime = new Date();

  const isPrevTimestampDefined = !!prevTimestamp;
  if(isPrevTimestampDefined) {
    const diffTime = Math.abs(prevTimestamp.getTime() - currentTime.getTime());
    return diffTime;
  }

  return currentTime;
};