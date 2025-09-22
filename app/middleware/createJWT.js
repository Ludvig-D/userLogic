const jose = require('jose');
const dotenv = require('dotenv');

dotenv.config({ override: true });

module.exports = async function tokenSign(payload, exp) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);

  return jwt;
};
