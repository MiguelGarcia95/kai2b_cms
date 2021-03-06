const Category = require('../../models/Category');

module.exports = {
  getCategories: async (req, res) => {
    const categories = await Category.find();
    const user = req.user || false;
    res.render('admin/category/index', {categories, user});
  },

  createCategories: async (req, res) => {
    try {
      const categoryExists = await Category.exists({name: req.body.name});
      if (categoryExists) {        
        req.flash('error-message', 'Category Already Exists');
        res.status(400).json('');
      } else {
        const category = await new Category(req.body)
        await category.save();
        res.status(200).json(category);
      }
    } catch (error) {
      req.flash('error-message', 'Category could not be added.');
      res.redirect('back');
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      req.flash('success-message', `Category ${category.name} was deleted`);
      res.redirect('/admin/categories');
    } catch (error) {
      req.flash('error-message', 'Category could not be deleted');
    }
  },
}