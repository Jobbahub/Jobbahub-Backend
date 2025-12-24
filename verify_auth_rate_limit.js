
const fetch = globalThis.fetch || require('node-fetch');

async function verifyAuthRateLimit() {
    console.log("Starting Authenticated Rate Limit Verification...");
    const baseUrl = 'http://localhost:3000/api';

    // 1. Create a unique user for this test
    const uniqueId = Date.now();
    const userEmail = `testuser${uniqueId}@example.com`;
    const userPassword = 'password123';

    console.log(`1. Registering/Logging in user: ${userEmail}`);

    // Try register
    let token = '';

    try {
        const regRes = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                naam: 'Test User',
                email: userEmail,
                wachtwoord: userPassword
            })
        });

        // If register works or fails (maybe exists), try login
        const loginRes = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        });

        const loginData = await loginRes.json();
        if (!loginData.token) {
            console.error('Login failed, no token:', loginData);
            return;
        }
        token = loginData.token;
        console.log('--> Got JWT Token');

    } catch (err) {
        console.error('Auth setup failed:', err.message);
        return;
    }

    // 2. Send requests with token
    console.log('2. Sending 25 requests to AI endpoint...');
    const aiUrl = `${baseUrl}/ai/recommend`;

    for (let i = 1; i <= 25; i++) {
        try {
            const response = await fetch(aiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ test: true })
            });

            if (i > 20 && response.status === 429) {
                console.log(`Request ${i}: Status ${response.status} (SUCCESS: Blocked)`);
            } else if (i <= 20 && response.status === 200) { // Assuming 200 or whatever success code
                // It might be 500 if AI service fails, but NOT 429
                // Actually the AI Controller calls a service. If service fails it returns 500.
                // Rate limit happens BEFORE controller.
                // So we just check != 429 for the first 20.
                console.log(`Request ${i}: Status ${response.status} (Allowed)`);
            } else if (i <= 20 && response.status === 429) {
                console.log(`Request ${i}: Status ${response.status} (FAILURE: Early Block)`);
            } else if (i > 20 && response.status !== 429) {
                console.log(`Request ${i}: Status ${response.status} (FAILURE: Should Block)`);
            } else {
                console.log(`Request ${i}: Status ${response.status}`);
            }

        } catch (err) {
            console.error(`Request ${i} error:`, err.message);
        }
    }
}

verifyAuthRateLimit();
