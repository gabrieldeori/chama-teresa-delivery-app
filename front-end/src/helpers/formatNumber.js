export default (number) => {
  const numberRounded = Math.round(number * 100) / 100;
  const formatNumberRounded = numberRounded.toFixed(2).replace('.', ',');
  return formatNumberRounded;
};
