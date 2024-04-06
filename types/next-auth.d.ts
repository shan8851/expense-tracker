import { Plan } from '@/lib/constants';
import 'next-auth';
declare module 'next-auth' {
  interface User {
    id: string;
    stripeCustomerId: string;
    plan: Plan;
  }

  /**
   * Extends the built-in session type
   * to ensure it includes the extended user type.
   */
  interface Session {
    user?: User;
  }
}
