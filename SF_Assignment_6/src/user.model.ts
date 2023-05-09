export enum UserRole {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    Subscriber = 'Subscriber',
  }
  
  export class User {
    constructor(
      public firstName: string,
      public middleName: string,
      public lastName: string,
      public email: string,
      public phoneNumber: string,
      public role: UserRole,
      public address: string
    ) {}
  }
  