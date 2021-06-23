const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);


const googleVerify = async( token ) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID, // Especifique el process.env.GOOGLE_ID de la aplicación que accede al backend
        // O, si varios clientes acceden al backend:
        //[process.env.GOOGLE_ID1, process.env.GOOGLE_ID2, process.env.GOOGLE_ID3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    console.log(payload);
    const { name, email, picture } = payload;

    return { name, email, picture };

    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}
// googleVerify().catch(console.error);

module.exports = {
    googleVerify
}