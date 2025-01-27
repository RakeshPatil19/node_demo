const {successResponse,errorResponse} = require('../../helpers/response.helper');
const models = require('../../models/index');
const { deleteImage, getImageResouceUrl } = require('../../helpers/image_upload.helper');

class BlogController {

   async createOrUpdateBlog(req, res) {
    try {
      req.body.blog_image = req.file.filename;
      const {blog_post_id,blog_category,blog_title,blog_description,blog_image } =req.body;
      
      const blogData = {
        blog_title,
        blog_category,
        blog_description,
        blog_image
      };
    if(!blog_title){
        throw new Error(
            'please enter blog title'
          );
    }  
    if(!blog_category){
        throw new Error(
            'please enter blog category'
          );
    }  
    let response;
    if(blog_post_id){
      let checkBlog = await  models.BlogPost.findOne({
        where:{
            blog_post_id:blog_post_id,
        }
      });
      if(checkBlog){
        if(blog_image){
          await deleteImage(checkBlog?.blog_image);
        }
        response = await models.BlogPost.update(blogData,
          {where:{
            blog_post_id:blog_post_id,
          }});
      }else{
        throw new Error(
          'data not found'
        );
      }
    }
    else{
      response = await models.BlogPost.create(blogData);
     
    }
      if (!response) {
        throw new Error(
          'error_while_creating_blog'
        );
      }
      return successResponse(
        req,
        res,
        'blog_created_success',
        200
      );
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }  
  async deleteBlog(req, res) {
    try {
      const {blog_post_id} =req.body;
    if(!blog_post_id){
        throw new Error(
            'please enter blog post id'
          );
    }  
    let response;
    if(blog_post_id){
      let checkBlog = await  models.BlogPost.findOne({
        where:{
            blog_post_id:blog_post_id,
        }
      });
      if(checkBlog){
        await deleteImage(checkBlog?.blog_image);
        response = await models.BlogPost.destroy(
          {where:{
            blog_post_id:blog_post_id,
          }});
      }else{
        throw new Error(
          'data not found'
        );
      }
    }
      if (!response) {
        throw new Error(
          'error_while_creating_blog'
        );
      }
      return successResponse(
        req,
        res,
        'blog_deleted_success',
        200
      );
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  } 
  async listBlog(req, res) {
    try {
    let response = [];
    let blogData = await  models.BlogPost.findAll();
    blogData.map((blog)=>{
        let obj = {};
        let filePath = blog?.blog_image?getImageResouceUrl(blog?.blog_image):"";
        obj.title = blog?.blog_title;
        obj.category = blog?.blog_category;
        obj.description = blog?.blog_description;
        obj.image = filePath;
        obj.created_at = blog?.createdAt;

        response.push(obj);
    })
    return successResponse(
        req,
        res,
        'blog_list_success',
        response
      );
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }  
}
module.exports = new BlogController();
