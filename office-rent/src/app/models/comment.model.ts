export class CommentModel {
  constructor(public content: string,
              public postId: string,
              public author: string) {
  }
}
