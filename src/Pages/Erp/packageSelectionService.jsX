export const checkPackageRoute = () => {
  return (
    localStorage.getItem("selected_plan_id") &&
    localStorage.getItem("selected_country_id") &&
    localStorage.getItem("package_id")
  );
};

export const checkAccountRoute = () => {
  return checkPackageRoute() && localStorage.getItem("email");
};

export const checkEmailRoute = () => {
  return checkAccountRoute() && localStorage.getItem("email_verified");
};

export const checkPaymentRoute = () => {
  return checkEmailRoute() && localStorage.getItem("receipt");
};
