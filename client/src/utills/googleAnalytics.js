import ReactGA from "react-ga";

export const GoogleTracking = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
