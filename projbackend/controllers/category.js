const Category = require("../models/category");


exports.getCategoryById = (req , res , next , id)=>{
    Category.findById(id).exec((err , category)=>{
        if(err){
            return res.status(400).json({
                error : "No category found"
            });
        }

        req.category = category ; 
        next();
    });

   
}

exports.createCategory = (req,res)=>{

    const category = new Category(req.body);
    category.save((err , category)=>{
        if(err){
            return res.status(400).json({
                error : "Unable to save category"
            });
        }

        res.json({category});
    })
}


exports.getCategory = (req , res)=>{
    return res.json(req.category);
}


exports.getCategories = (req , res)=>{
    Category.find().exec((err , items)=>{
        if(err){
            return res.status(400).json({
                error : "No categories found"
            });
        }

        return res.json(items);
            
    })
}

exports.updateCategory = (req , res)=>{
    const category = req.category;
    category.name = req.body.name;


    category.save((err , updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error : "Could not update the category"
            });
        }

        res.json(updatedCategory);
    })
}


exports.deleteCategory = (req,res)=>{
    const category = req.category ; 
    category.remove((err , category)=>{
        if(err){
            return res.status(400).json({
                error : "Could not delete the category"
            });
        }

        res.json({
            message  : `${category.name} successfully deleted`
        });
    })
}