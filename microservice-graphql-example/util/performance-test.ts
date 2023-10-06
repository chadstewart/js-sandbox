import logger from "../services/logger";
import { ResolverContext } from "./types/context-resolver-types";

export const testPerformance = (prevTimestamp?: Date) => {
  const currentTime = new Date();

  const isPrevTimestampDefined = !!prevTimestamp;
  if(isPrevTimestampDefined) {
    const diffTime = Math.abs(prevTimestamp.getTime() - currentTime.getTime());
    return diffTime;
  }

  return currentTime;
};

export const checkResolverPerformance = (context: ResolverContext, resolverCallback: Function) => {
  const result = resolverCallback();
  const logObject = {
    ...context.requestBody,
    queryTime: `${testPerformance(context.currentTime)} ms`
  };
  logger.info(JSON.stringify(logObject));
  return result;
};