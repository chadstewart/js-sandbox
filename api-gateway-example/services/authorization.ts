// Deprecated: No longer using this for authorization

import authorizedUsers from "../util/user";

export default function checkAuthorization (userInput: string) {
  const auth = userInput.slice(6).toLowerCase();
  //@ts-ignore
  const isAuthorized = authorizedUsers[auth];

  if(isAuthorized) return true;
  return false;
};