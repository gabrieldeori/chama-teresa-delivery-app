// https://stackoverflow.com/questions/35250714/how-to-show-number-4-digit-0000-0001-number-using-javascript
export default (n) => {
  const MAX_STR_LENGTH = 4;
  const s = `000${n}`;
  return s.substring(s.length - MAX_STR_LENGTH);
};
