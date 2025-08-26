// import http from 'k6/http'
// import { sleep, check, group } from 'k6'
// import { randomIntBetween } from '../utils/main_app.js'
// import { Counter, Trend } from 'k6/metrics';
// import { BASE_URL } from '../conf/url.js'


// export const options = {
//     stages: [
//         // Morning ramp-up (simulating business hours)
//         // { duration: '3m', target: 10 },   // Early morning
//         // { duration: '5m', target: 30 },   // Peak morning
//         // { duration: '10m', target: 50 },  // Mid-morning peak

//         // Lunch dip
//         // { duration: '2m', target: 30 },   // Lunch reduction
//         // { duration: '3m', target: 30 },   // Sustain lunch level

//         // Afternoon peak
//         // { duration: '5m', target: 60 },   // Afternoon ramp
//         // { duration: '10m', target: 60 },  // Afternoon sustain

//         // Evening wind-down
//         // { duration: '3m', target: 30 },   // Evening reduction
//         // { duration: '2m', target: 10 },   // Late evening
//         // { duration: '2m', target: 0 },    // Night shutdown


//         // Progressive load increase
//         // { duration: '5m', target: 50 },   // Start conservative
//         // { duration: '5m', target: 100 },  // Double the load
//         // { duration: '5m', target: 200 },  // Keep doubling
//         // { duration: '5m', target: 400 },  // Push further
//         // { duration: '5m', target: 800 },  // Find breaking point
//         // { duration: '5m', target: 1600 }, // Push to failure

//         // Gradual recovery
//         // { duration: '2m', target: 400 },  // Step back
//         // { duration: '2m', target: 100 },  // Further back
//         // { duration: '2m', target: 0 },    // Clean shutdown
//     ]
//     // vus: 1,
//     // duration: '2m'
// }

// let bodyLengthTrend = new Trend('response_body_length');
// let jsonParseErrors = new Counter('json_parse_errors');

// export default function () {

//     group('- Check health to connect system success -', function () {
//         const resCheckhealth = http.get(BASE_URL.HEALTH_CHECK);
//         bodyLengthTrend.add(resCheckhealth.body.length);

//         const isValidJson = check(resCheckhealth, {
//             'response body is valid JSON': (r) => {
//                 try {
//                     JSON.parse(r.body);
//                     return true;
//                 } catch (e) {
//                     jsonParseErrors.add(1);
//                     console.log('JSON parse errors:', e.message);
//                     return false;
//                 }
//             }
//         });

//         if (isValidJson) {
//             const data = JSON.parse(resCheckhealth.body);
//             console.log('Response data keys:', Object.keys(data));
//         }

//     })
//     sleep(randomIntBetween(1, 3)) // between 1-3 sec

//     group('- Retrived a data employees successfully -', function () {
//         const resGetAllUser = http.get(BASE_URL.GET_ALL_EMPLOYEES);
//         bodyLengthTrend.add(resGetAllUser.body.length);

//         const isValidJson = check(resGetAllUser, {
//             'response body is valid JSON': (r) => {
//                 try {
//                     JSON.parse(r.body);
//                     return true;
//                 } catch (e) {
//                     jsonParseErrors.add(1);
//                     console.log('JSON parse errors:', e.message);
//                     return false;
//                 }
//             }
//         });

//         if (isValidJson) {
//             const data = JSON.parse(resGetAllUser.body);
//             console.log('Response data keys:', Object.keys(data));
//         }
//     })
//     sleep(randomIntBetween(1, 3)) // between 1-3 sec
// }