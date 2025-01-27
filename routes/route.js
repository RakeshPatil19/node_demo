const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/user.controller');
const blogController = require('../controllers/blog/blog.controller');
const { verifyToken } = require('../helpers/jwt.helper');
const { imageUpload } = require('../helpers/image_upload.helper');



router.post(
  '/user-login',
  userController.userLogin
);  
router.post(
    '/user-register',
    userController.userRegistration
  );
  router.post(
    '/create-blog',imageUpload.single('blog_image'),
    verifyToken,
    blogController.createOrUpdateBlog
  );
  router.delete(
    '/delete-blog',
    verifyToken,
    blogController.deleteBlog
  );
  router.get(
    '/list-blog',
    blogController.listBlog
  );



module.exports = router;
