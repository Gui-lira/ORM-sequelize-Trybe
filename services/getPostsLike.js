const { Op } = require('sequelize');
const { BlogPost, PostsCategory, Category, User } = require('../models');
const normalizeCategories = require('./normalizeCategories');

const getPostsLike = async (str) => {
    const posts = await BlogPost.findAll({ where: { [Op.or]: [
        { title: { [Op.like]: str } }, { content: { [Op.like]: str } },
    ] }, 
        include: [{ model: User }, { model: PostsCategory,
        include: [{ model: Category, attributes: ['name', 'id'] }] }] });
    const codedPosts = JSON.stringify(posts, null, 2);    
    const decodedPosts = JSON.parse(codedPosts);    
    if (decodedPosts.length === 0) return [];
    const returnArr = [];
    decodedPosts.forEach((element) => {
        const categories = normalizeCategories(element.PostsCategories);
        const user = element.User;
        const obj = { categories, user, ...element };
        delete obj.User;
        delete obj.PostsCategories;
        returnArr.push(obj);
    });
    return returnArr;
};

module.exports = getPostsLike;