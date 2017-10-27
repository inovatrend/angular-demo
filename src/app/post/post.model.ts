import {User} from "../user/user.model";

export class Post {

  constructor(public id: number,
              public author: User,
              public text: string,
              public imagePath) {

  }

  public static fromJson(json): Post {
    let author: User = null;
    if (json.author) {
      author = User.fromJson(json.author);
    }
    return new Post(json.id, author, json.text, json.imagePath);
  }
}
