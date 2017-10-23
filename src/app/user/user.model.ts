export class User {

  constructor(public id: number,
              public username: String,
              public firstName: String,
              public lastName: String,
              public age: number) {
  }

  public static fromJson(json): User {
    return new User(
      json.id,
      json.username,
      json.firstName,
      json.lastName,
      json.age
      );
  }
}
