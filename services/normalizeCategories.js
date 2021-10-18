const normalizeCategories = (arr) => arr.map((category) => {
        const obj = { ...category.Category };        
        console.log(obj);
        return obj;
    });

module.exports = normalizeCategories;