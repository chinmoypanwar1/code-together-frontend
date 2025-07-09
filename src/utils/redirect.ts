let redirectFunction = null;

export const setRedirectFunction = (func) => {
  redirectFunction = func;
};

export const redirectToDashboard = () => {
  if (redirectFunction) redirectFunction("/dashboard");
};

