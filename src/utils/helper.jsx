import icons from "./icons";
const { AiOutlineStar, AiFillStar } = icons;
export const getBase64 = (file) => {
  if (!file) return "";
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const formatMoney = (number) =>
  Number(Number(number)?.toFixed(1)).toLocaleString();

export const renderStartFromNumber = (number, size) => {
  const stars = [];
  for (let i = 0; i < +number; i++) {
    stars.push(<AiFillStar color="orange" size={size} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<AiOutlineStar color="orange" size={size} />);
  }
  return stars;
};
