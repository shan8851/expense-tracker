import 'next-auth';
declare module 'next-auth' {
  interface User {
    id: string;
    stripeCustomerId: string;
    isActive: boolean;
  }

  /**
   * Extends the built-in session type
   * to ensure it includes the extended user type.
   */
  interface Session {
    user?: User;
  }
}
