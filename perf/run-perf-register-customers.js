import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
import { BASE_URL } from "../conf/url.js";

export const options = {
    stages: [
        // Morning ramp-up (simulating business hours)
        // { duration: '3m', target: 10 },   // Early morning
        // { duration: '5m', target: 30 },   // Peak morning
        // { duration: '10m', target: 50 },  // Mid-morning peak

        // Lunch dip
        // { duration: '2m', target: 30 },   // Lunch reduction
        // { duration: '3m', target: 30 },   // Sustain lunch level

        // Afternoon peak
        // { duration: '5m', target: 60 },   // Afternoon ramp
        // { duration: '10m', target: 60 },  // Afternoon sustain

        // Evening wind-down
        { duration: '3m', target: 30 },   // Evening reduction
        { duration: '2m', target: 10 },   // Late evening
        { duration: '2m', target: 0 },    // Night shutdown

        // Progressive load increase
        // { duration: '5m', target: 50 },   // Start conservative
        // { duration: '5m', target: 100 },  // Double the load
        // { duration: '5m', target: 200 },  // Keep doubling
        // { duration: '5m', target: 400 },  // Push further
        // { duration: '5m', target: 800 },  // Find breaking point
        // { duration: '5m', target: 1600 }, // Push to failure

        // Gradual recovery
        // { duration: '2m', target: 400 },  // Step back
        // { duration: '2m', target: 100 },  // Further back
        // { duration: '2m', target: 0 },    // Clean shutdown
    ]
    // vus: 1,
    // duration: "2m",
};

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
    let res = http.get(BASE_URL.REGISTER_CUSTOMER);
    check(res, {
        "status is 200": (r) => r.status === 200,
    });
    sleep(Math.random() * 2 + 0.5);
}
