import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: any;
      name: string;
      username: any;
      email: string;
      image: string;
    };
  }
}
