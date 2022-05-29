module.exports = {
  clerkUserOwnsThisResource,
};

function clerkUserOwnsThisResource(req, res, next) {
  const decodedToken = req.decodedToken;
  const clerkIDFromParam = req.params?.clerk_user_id;
  const clerkIDFromBody = req?.body?.clerk_user_id;

  clerkIDFromParam === decodedToken.sub || clerkIDFromBody === decodedToken.sub
    ? next()
    : res.status(401).json({ warning: 'User validation failed. Access denied!' });
}
