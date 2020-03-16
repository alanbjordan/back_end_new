const db = require('./conn')

class commentsModel{
    constructor(id, user_id, picture_id, comment) {
      this.id = id;
      this.user_id = user_id;
      this.picture_id = picture_id;
      this.comment = comment;
    }
static async getCommentsByImageId(picture_id) {
    try {
      const response = await db.any(
        `SELECT * FROM comments WHERE picture_id = ${picture_id};`,
      );
      // const response = await db.one(`SELECT id, name, password FROM users WHERE email = $1;`, [this.email]);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
}
async addComment(user_id, comment) {
    try {
        const response = await db.one(
            `INSERT INTO comments (user_id, picture_id, comment) VALUES ($1, $2, $3) RETURNING id`,
            [this.user_id, this.picture_id, this.comment]
          );
        return response;
    } catch(err) {
        return err.message;
        
    }
}
}

module.exports = commentsModel;