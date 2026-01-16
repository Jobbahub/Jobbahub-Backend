import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Load test for Jobbahub AI Recommendation endpoint.
 * 
 * To run this test:
 * 1. Install k6 (https://k6.io/docs/getting-started/installation/)
 * 2. Ensure the backend is running at http://localhost:3000
 * 3. Run: k6 run tests/load/ai_load_test.js
 * 
 * Note: If you have a rate limiter active, you might see 429 errors.
 * You can adjust the stages below to change the load.
 */

export const options = {
    stages: [
        { duration: '30s', target: 5 }, // Ramp-up: 5 concurrent users over 30s
        { duration: '1m', target: 5 },  // Main: 5 users for 1 minute
        { duration: '30s', target: 0 }, // Ramp-down: back to 0 users
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'], // Allow up to 5% failure (e.g. rate limiting)
        http_req_duration: ['p(95)<3000'], // 95% of requests should be below 3s
    },
};

// Use environment variables or defaults
const BASE_URL = __ENV.BASE_URL;
const TEST_EMAIL = __ENV.TEST_EMAIL;
const TEST_PASSWORD = __ENV.TEST_PASSWORD;

export default function () {
    // 1. Authentication
    const loginPayload = JSON.stringify({
        email: TEST_EMAIL,
        wachtwoord: TEST_PASSWORD,
    });

    const loginParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(`${BASE_URL}/auth/login`, loginPayload, loginParams);

    if (loginRes.status !== 200) {
        console.log(`LOGIN FAILED: ${loginRes.status} ${loginRes.body}`);
    }

    const loginSuccess = check(loginRes, {
        'login successful': (r) => r.status === 200,
        'has token': (r) => r.json().token !== undefined,
    });

    if (!loginSuccess) {
        // Log error only once per VU if it fails
        if (__ITER === 0) {
            console.error(`Login failed for ${TEST_EMAIL}: ${loginRes.status} ${loginRes.body}`);
        }
        sleep(1);
        return;
    }

    const token = loginRes.json().token;

    // 2. AI Recommendation Request
    const aiPayload = JSON.stringify({
        antwoorden: {
            keuze_taal: "Nederlands",
            keuze_locatie: "Eindhoven",
            knoppen_input: {
                q_interesse: { score: 1 }
            }
        }
    });

    const aiParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const aiRes = http.post(`${BASE_URL}/ai/recommend`, aiPayload, aiParams);

    if (aiRes.status !== 200) {
        console.log(`Request failed: ${aiRes.status} ${aiRes.body}`);
    }

    check(aiRes, {
        'status is 200': (r) => r.status === 200,
        'not rate limited': (r) => r.status !== 429,
    });

    // Wait 1 second between iterations per virtual user
    sleep(1);
}
