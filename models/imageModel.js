const db = require("./conn");


class PictureReviewModel{
  constructor(id, picture, user_id) {
    this.id = id;
    this.picture = picture;
    this.user_id = user_id;
  }
 static async pushImg() {
    try {
        const response = await db.one('INSERT INTO images (picture) VALUES ($1) RETURNING id;', [this.picture]);
return response
    } catch (error) {
        console.error('ERROR', error);
        return error
    }
}

static async pushImg2() {
  try {
      const response = await db.one('INSERT INTO images2 (picture) VALUES ($1) RETURNING id;', [this.picture]);
return response
  } catch (error) {
      console.error('ERROR', error);
      return error
  }
}

  static async getAllPictures() {
    try {
      const response = await db.any(`SELECT * FROM images ORDER BY random();`);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getPicturesById(picture_id) {
    try {
      const response = await db.any(
        `SELECT * FROM images WHERE id = ${picture_id};`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  async userPicture() {
    try {
        const response = await db.one('INSERT INTO profile_pictures (picture, user_id) VALUES ($1, $2) RETURNING id;', 
        [this.picture, this.user_id]);
        console.log(response);
        return response
    } catch (error) {
        console.error('ERROR', error);
        return error;
    }
  }

  static async getProfilePicture(user_id) {
    try {
      // const user_id = this.user_id;
      const response = await db.any(`SELECT picture FROM profile_pictures WHERE user_id = ${user_id};`);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getSavedPicture() {
    try {
      // const user_id = this.user_id;
      const response = await db.any(`SELECT * FROM images;`);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

static async hello1() {
    const response = await console.log('yooo');
    return response;
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
async addComment(user_id, picture_id, comment) {
    try {
        const response = await db.one(
            `INSERT INTO comments (user_id, picture_id, comment) VALUES ($1, $2, $3) RETURNING id`,
            [user_id, picture_id, comment]
          );
        return response;
    } catch(err) {
        return err.message;
        
    }
}

}

module.exports = PictureReviewModel;