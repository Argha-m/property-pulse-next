export { default as middleware } from "next-auth/middleware";

export const config = {
  matcher: ["/properties/add", "/profile", "/saved-properties"],
};
