import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/chat/:path*", "/tasks/:path*", "/reports/:path*", "/emails/:path*", "/calendar/:path*"],
};
