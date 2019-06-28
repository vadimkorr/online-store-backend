function getImageUrl(imageName) {
  return `/products/${imageName}`;
}

module.exports = {
  getImageUrl: getImageUrl
};
