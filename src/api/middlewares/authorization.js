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

const verificationImageSuccessSecret = process.env.VERIFICATION_SUCCESSFUL_SECRET;

module.exports = {
  validateAuthorization,
  validateValidationSuccessToken,
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

function validateValidationSuccessToken(req, res, next) {
  const { validation_success_token, clerk_user_id } = req.body;
  jsonwebtoken.verify(
    validation_success_token,
    verificationImageSuccessSecret,
    (error, decodedToken) => {
      if (error) {
        console.log('Validation of ValidationSuccessToken failed. Access denied!', error);
        res
          .status(401)
          .json({ warning: 'Validation of ValidationSuccessToken failed. Access denied!' });
      }
      if (decodedToken && decodedToken.clerkuserid === clerk_user_id) {
        next();
      } else {
        res
          .status(400)
          .json({ warning: 'Validation of ValidationSuccessToken failed. Access denied!', error });
      }
    }
  );
}
