const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {successResponse,errorResponse} = require('../../helpers/response.helper');
const models = require('../../models/index');

class UserController {

   
   async userRegistration(req, res) {
    try {
      const {user_id,user_name,user_email,user_password, } =req.body;
      const userData = {
        user_name,
        user_email,
      };
      let response;
      const encrypt_password = crypto
      .createHash('md5')
      .update(user_password || '')
      .digest('hex');
      userData.user_password = encrypt_password;
    if(user_id){
      let checkUser = await  models.User.findOne({
        where:{
          user_id:user_id,
        }
      });
      if(checkUser){
        response = await models.User.update(userData,
          {where:{
            user_id:user_id,
          }});
      }else{
        throw new Error(
          'data not found'
        );
      }
    }
    else{
      let checkUser = await  models.User.findOne({
        where:{
          user_email:user_email,
        }
      });
      if(checkUser){
        throw new Error(
          'user already exist with this email'
        );
      }
      response = await models.User.create(userData);
     
    }
      if (!response) {
        throw new Error(
          'registration_error'
        );
      }
      return successResponse(
        req,
        res,
        'user_registration_success',
        200
      );
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

   async userLogin(req, res) {
    try {
      const { user_email,user_password } = req.body;
      const userInfo = await models.User.findOne({
        where: { user_email },
      });
      if (userInfo) {
        const reqPass = crypto
          .createHash('md5')
          .update(user_password || '')
          .digest('hex');
        if (reqPass !== userInfo.user_password) {
          throw new Error('password_incorrect');
        }
        const token = jwt.sign({ user_id: userInfo.user_id, username: userInfo.user_name },  process.env.SECRET_KEY, {
          expiresIn: '1h',
        });
        return successResponse(
          req,
          res,
          'login_succss',
          {token},
          200
        );
      }
      throw new Error('login_details_not_found');
    } catch (error) {
      return errorResponse(req, res, error.message, {}, 500);
    }
  }
}
module.exports = new UserController();
