import { betterAuth } from "better-auth";
import { organization, twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  secret: "test-secret",
  database: {
    type: "sqlite",
    url: "file:./test.db"
  },
  plugins: [
    organization({
      teams: {
        enabled: true
      }
    }),
    twoFactor({})
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day
  }
});
