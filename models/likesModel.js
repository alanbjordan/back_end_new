const db = require("./conn");


class LikedImageModel{
  constructor(id, name, user_id) {
    this.id = id;
    this.name = name;
    this.user_id = user_id;
  }

  static async getPicturesById(user_id) {
    try {
      const response = await db.any(
        `SELECT name FROM liked_images WHERE user_id = ${user_id};`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  async save() {
    try {
        const response = await db.one(`
            insert into liked_images 
                (name, user_id) 
            values 
                ($1, $2) 
            returning id
            `, [this.name, this.user_id]
            );
        console.log("response is: ", response);
        return response;
    } catch(err) {
        return err.message;
    }
}}

module.exports = LikedImageModel;
