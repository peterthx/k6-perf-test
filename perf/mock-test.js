import http from 'k6/http';
import { check,group } from 'k6';

export default function () {

    group('Health Check Server', function () {
        const res = http.get('http://localhost:3000/health');
        check(res, {
            'response code was 200': (res) => res.status == 200,
        });
    })

}