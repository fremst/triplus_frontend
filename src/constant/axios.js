export const defaultOptions = {
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

export const putOptions = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
};

export const multipartOptions = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    enctype: "multipart/form-data"
  }
};
