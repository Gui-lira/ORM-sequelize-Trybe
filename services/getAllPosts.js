const { User, PostsCategory, BlogPost, Category } = require('../models');
const normalizeCategories = require('./normalizeCategories');

const getAllPosts = async () => {
    const posts = await BlogPost
    .findAll({ include: [{ model: User }, { model: PostsCategory,
         include: [{ model: Category, attributes: ['name', 'id'] }] }] });  
    const codedPosts = JSON.stringify(posts, null, 2);    
    const decodedPosts = JSON.parse(codedPosts);
    const newArr = [];
    decodedPosts.forEach((element) => {
        const user = element.User;
        const categories = normalizeCategories(element.PostsCategories);
       const obj = { ...element, categories, user };              
      delete obj.PostsCategories;
      delete obj.User;
        newArr.push(obj);
    });
    return newArr;
};

module.exports = getAllPosts;