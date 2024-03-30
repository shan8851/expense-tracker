// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user type
   * with additional properties.
   */
  interface User {
    id: string;
  }

  /**
   * Extends the built-in session type
   * to ensure it includes the extended user type.
   */
  interface Session {
    user?: User;
  }
}
