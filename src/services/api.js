const axios = require("axios");

export const apiCall = (query, token = "") => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: token,
  };
  const url = `${process.env.REACT_APP_API_URL}/graphql`;
  console.log("url: >>>>", url);
  const data = JSON.stringify({ query });
  return new Promise(async (resolve, reject) => {
    await axios
      .post(url, data, { headers })
      .then((res1) => {
        return res1;
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
};


export const imgurUploadApiCall = (img) => {
  const headers = {
    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
  }
  const formData = new FormData();
  formData.append("image", img);
  const url  = 'https://api.imgur.com/3/image';
  const config = {
    method: 'POST',
    url,
    headers,
    data : formData
  };
  return new Promise(async (resolve, reject) => {
    await axios(config)
      .then((res1) => {
        return res1;
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}