export function formattedResponse(statusCode, data, message) {
  return {
    status: statusCode,
    data: data,
    message: message,
  };
}

export function sendResponse(res, statusCode, data, message) {
  if (!res.headersSent) {
    return res.status(statusCode).json({
      status: statusCode,
      data: data,
      message: message,
    });
  } else {
    console.error("Headers already sent");
  }
}
