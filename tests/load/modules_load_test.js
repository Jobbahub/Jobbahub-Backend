import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Load test for Jobbahub Keuzemodules fetching endpoint.
 * 
 * To run this test:
 * 1. Ensure the backend is running at http://localhost:3000
 * 2. Run: k6 run tests/load/modules_load_test.js
 */

export const options = {
    stages: [
        { duration: '30s', target: 20 }, // Ramp-up to 20 users
        { duration: '1m', target: 20 },  // Stay at 20 users
        { duration: '30s', target: 0 },  // Ramp-down
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // Fail if more than 1% of requests fail
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    },
};

const BASE_URL = 'http://localhost:3000/api';

export default function () {
    const res = http.get(`${BASE_URL}/modules`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has modules': (r) => r.json().length >= 2000,
    });

    sleep(1);
}
