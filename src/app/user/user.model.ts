export class User {

  constructor(public username: String,
              public firstName: String,
              public lastName: String) {}

  public static fromJson(json): User {
    return new User(
      json.username,
      json.firstName,
      json.lastName
      );
  }
}
