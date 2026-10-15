import { getAuth } from "@clerk/express";

/**
 * Route guard: lets a request through only if it carries a valid Clerk session.
 *
 * clerkMiddleware() (in server.js) already verified the token on every request.
 * It does NOT block anyone, it only fills in the auth info. This guard reads
 * that info and rejects requests with no signed-in user.
 *
 * After this runs, controllers can trust `req.userId`.
 */
export const protect = (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: please sign in" });
  }

  req.userId = userId;
  next();
};
