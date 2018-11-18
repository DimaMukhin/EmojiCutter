const serverErrorHelper = {};

serverErrorHelper.getErrorMessage = errorCode => {
  let errorMessage = '';

  switch (errorCode) {
    case 1:
      errorMessage =
        'Invalid emoji name (emoji name must contain only letters numbers and dashes)';
      break;
    case 2:
      errorMessage = 'Could not read file';
      break;
    case 4:
      errorMessage =
        'file format not supported (supported formats PNG/JPEG/BMP)';
      break;
    case 10:
      errorMessage = 'maximum file size exceeded (maximum size: 500 kb)';
      break;
    default:
      errorMessage = 'Internal server error, please try again later';
  }

  return errorMessage;
};

module.exports = serverErrorHelper;
