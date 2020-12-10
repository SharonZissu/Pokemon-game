export const checkValueAndBgBeforeStart = (value, index, color) => {
  let img;
  let bgColor;
  if (value === "flag" && color === "red" && index < 14) {
    img = "flag";
    bgColor = "red";
  } else if (value === "flag" && color === "red" && index > 14) {
    img = "blue";
    bgColor = "blue";
  } else if (value === "flag" && color === "blue" && index < 14) {
    img = "red";
    bgColor = "red";
  } else if (value === "flag" && color === "blue" && index > 14) {
    img = "flag";
    bgColor = "blue";
  } else if (value === "trap" && color === "red" && index < 14) {
    img = "trap";
    bgColor = "red";
  } else if (value === "trap" && color === "red" && index > 14) {
    img = "blue";
    bgColor = "blue";
  } else if (value === "trap" && color === "blue" && index < 14) {
    img = "red";
    bgColor = "red";
  } else if (value === "trap" && color === "blue" && index > 14) {
    img = "trap";
    bgColor = "blue";
  } else if (value === "red") {
    img = "red";
    bgColor = "red";
  } else if (value === "blue") {
    img = "blue";
    bgColor = "blue";
  } else if (value === "e") {
    img = "";
    bgColor = "grey";
  }
  return [img, bgColor];
};

export const checkValueAndBgAfterStart = (value, index, color) => {};
