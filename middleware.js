import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      return !!token;
    },
  },
  pages: {
    signIn: "/auth"
  },
});

export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|favicon.ico|api/auth).*)"],
};
