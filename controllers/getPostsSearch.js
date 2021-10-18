const { getPostsLike, getAllPosts } = require('../services');

const getPostSearch = async (req, res) => {
    const { q } = req.query;    
    if (!q) {
        const allPosts = await getAllPosts();
        console.log(allPosts);
        return res.status(200).json(allPosts);
    }
    const responseArr = await getPostsLike(q);
    return res.status(200).json(responseArr);
};

module.exports = getPostSearch;