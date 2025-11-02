import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

export default function () {
  // Get context info
  const vu = exec.vu.idInTest; // Virtual User ID
  const iter = exec.vu.iterationInScenario; // Iteration number for this VU
  const scenario = exec.scenario.name; // Scenario name
  const time = exec.instance.currentTestRunDuration; // Time since test started

  console.log(
    `VU: ${vu}, Iter: ${iter}, Scenario: ${scenario}, Time: ${time}ms`
  );

  // Example request
  let res = http.get("http://srv946485.hstgr.cloud:8080/api/v1/customers");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(Math.random() * 2 + 0.5);
}
