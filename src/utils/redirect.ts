let redirectFunction = null;

export const setRedirectFunction = (func) => {
  redirectFunction = func;
};

export const redirectToLogin = () => {
  if (redirectFunction) redirectFunction("/login");
};

