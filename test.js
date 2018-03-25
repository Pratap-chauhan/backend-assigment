const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '894829491932-c10ip6fk723v40vfb8ispg21j7dige0t.apps.googleusercontent.com;'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTIxOTY0NTU1fQ.SxvulJGE9_kekLeXrZOoV43EHlODpv1byJk9WdOawQg'
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
verify().catch(console.error);