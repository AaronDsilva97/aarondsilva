// Exchange authorization code for refresh token
// Usage: node scripts/exchange-token.js YOUR_AUTH_CODE

const CLIENT_ID = '93ce4f674ddd44ac8034189d19155ed1';
const CLIENT_SECRET = 'fb80ce7567fb411189f4885222fc4ba8';
const REDIRECT_URI = 'http://localhost:3000';

const authCode = process.argv[2];

if (!authCode) {
  console.error('❌ Please provide the authorization code as an argument');
  console.log('Usage: node scripts/exchange-token.js YOUR_AUTH_CODE');
  process.exit(1);
}

async function exchangeCodeForTokens() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    console.error('❌ Failed to exchange code for tokens');
    console.error('Response:', response.status, response.statusText);
    const errorText = await response.text();
    console.error('Error details:', errorText);
    process.exit(1);
  }

  const data = await response.json();

  console.log('✅ Success! Here are your tokens:');
  console.log();
  console.log('Access Token:', data.access_token);
  console.log('Refresh Token:', data.refresh_token);
  console.log('Expires In:', data.expires_in, 'seconds');
  console.log();
  console.log('🔧 Add this to your .env file:');
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
  console.log();
  console.log('Your .env file should now look like:');
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
}

exchangeCodeForTokens().catch(console.error);