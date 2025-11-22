import http from "k6/http";
import { check, sleep } from "k6";
import { BASE_URL, SERVICE } from "../config/url.js";

export let options = {
  vus: __ENV.VUS ? Number(__ENV.VUS) : 10,
  duration: __ENV.DURATION || "30s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    checks: ["rate>0.95"],
  },
};

export default function () {
  const url = `${BASE_URL.ENDPOINT}${SERVICE.GET_ALL_PRODUCTS}`;
  const params = { tags: { name: "get-all-products" } };

  const res = http.get(url, params);

  const contentType = res.headers["content-type"] || res.headers["Content-Type"] || "";

  check(res, {
    "status is 200": (r) => r.status === 200,
    "content-type is json": (r) => /application\/json/.test(contentType),
    "response-time < 500ms": (r) => r.timings.duration < 500,
    "body not empty": (r) => !!r.body && r.body.length > 0,
  });

  sleep(1);
}
