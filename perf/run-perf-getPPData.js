import http from 'k6/http'
import { sleep, group, check } from 'k6'
import { randomIntBetween } from '../utils/main_app.js'
import { Counter, Trend } from 'k6/metrics';
import { BASE_URL } from '../conf/url.js'

const bodyLengthTrend = new Trend('response_body_length');
const jsonParseErrors = new Counter('json_parse_errors');

export const options = {
    //  Gradual recovery
    stages: [
        { duration: '2m', target: 400 },  // Step back
        { duration: '2m', target: 100 },  // Further back
        { duration: '2m', target: 0 },    // Clean shutdown
    ]
    // vus: 1,
    // duration: '2m'
}

export default function () {
    group('- Get promptpay data successfully -', function () {
        const resCheckhealth = http.get(BASE_URL.URL_GET_PROMPTPAY);
        bodyLengthTrend.add(resCheckhealth.body.length);

        const isValidJson = check(resCheckhealth, {
            'response body is valid JSON': (r) => {
                try {
                    JSON.parse(r.body);
                    return true;
                } catch (e) {
                    jsonParseErrors.add(1);
                    console.log('JSON parse errors:', e.message);
                    return false;
                }
            }
        });

        if (isValidJson) {
            const data = JSON.parse(resCheckhealth.body);
            console.log('Response data keys:', Object.keys(data));
        }

    })
    sleep(randomIntBetween(1, 3)) // between 1-3 sec
}