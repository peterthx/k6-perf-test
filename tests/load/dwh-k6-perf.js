import http from "k6/http";
import { check, sleep } from "k6";
import { BASE_URL, SERVICE } from "../../config/url.js";

// export const options = {
//   scenarios: {
//     smoke: {
//       executor: "constant-vus",
//       vus: 1,
//       duration: "1m",
//     },
//   },
// };

export default function () {
  const res = http.get(`${BASE_URL.ENDPOINT}${SERVICE.GET_ALL_PRODUCTS}`);

  check(res, {
    status: (res) => res.status === 200,
    "content-type": (res) =>
      res.headers["Content-Type"] === "application/json; charset=utf-8",
    "response-time": (res) => res.timings.duration < 200,
    "body-length": (res) => res.body.length > 0,
  });
  sleep(1);
}
