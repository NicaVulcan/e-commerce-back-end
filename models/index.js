// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//model associations
    //every product belongs to a single category
Product.belongsTo(Category, {
    foreignKey: "category_id"
});
    //categories can have many products
Category.hasMany(Product, {
    foreignKey: "category_id"
});
    //products can fall within many tags
Product.belongsToMany(Tag, {
    through: ProductTag,
    as: "tags",
    foreignKey: "product_id"
});
    //tags can have many products
Tag.belongsToMany(Product, {
    through: ProductTag,
    as: "products",
    foreignKey: "tag_id"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};