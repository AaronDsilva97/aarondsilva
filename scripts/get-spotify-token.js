// Quick script to get Spotify refresh token
// Run this once to get your refresh token, then add it to .env

const CLIENT_ID = '93ce4f674ddd44ac8034189d19155ed1';
const CLIENT_SECRET = 'fb80ce7567fb411189f4885222fc4ba8';
const REDIRECT_URI = 'http://localhost:3000'; // We'll use this for the callback

console.log('🎵 Spotify Token Setup');
console.log('===================');
console.log();

console.log('Step 1: Visit this URL in your browser to authorize:');
console.log();

const scopes = 'user-read-currently-playing user-read-recently-played';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;

console.log(authUrl);
console.log();

console.log('Step 2: After authorization, you\'ll be redirected to localhost:3000?code=XXXXX');
console.log('Copy the "code" parameter from the URL');
console.log();

console.log('Step 3: Run this command with your code:');
console.log('node scripts/exchange-token.js YOUR_CODE_HERE');
console.log();

console.log('Step 4: Add the refresh token to your .env file');
console.log();