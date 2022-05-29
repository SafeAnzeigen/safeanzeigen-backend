require('dotenv').config();

const jsonwebtoken = require('jsonwebtoken');

const clerkJWTSignatureKey = [
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_1,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_2,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_3,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_4,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_5,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_6,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_7,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_8,
  process.env.CLERK_JWT_SIGNATURE_PUBLIC_KEY_LINE_9,
].join('\n');

module.exports = {
  validateAuthorization,
};

function validateAuthorization(req, res, next) {
  const token = req.headers.authorization;

  jsonwebtoken.verify(
    token,
    clerkJWTSignatureKey,
    { algorithms: ['RS256'] },
    (error, decodedToken) => {
      error
        ? res.status(401).json({ warning: 'Authorization failed. Access denied!', error })
        : ((req.decodedToken = decodedToken), next());
    }
  );
}
