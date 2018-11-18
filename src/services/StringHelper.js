const stringHelper = {};

stringHelper.truncate = (string, maxLength) => {
  if (string.length > maxLength) return string.substring(0, maxLength) + '...';
  else return string;
};

module.exports = stringHelper;
