import Axios from "axios";

export const apiCall = (query, token = "") => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: token,
  };
  const url = "";
  const data = JSON.stringify({ query });
  return new Promise(async (resolve, reject) => {
    await Axios.post(url, data, { headers })
      .then((res) => {
        return res;
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
};
