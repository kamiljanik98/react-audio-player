export const truncateText = (text) => {
  return text.length > 15 ? `${text.substring(0, 15)}...` : text;
};