import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/crm",
    signIn: "/handler/sign-in",
    signUp: "/handler/sign-up",
    afterSignIn: "/crm",
    afterSignUp: "/crm",
    afterSignOut: "/",
  },
});
