import Category from "../models/category.js";

//----------------------------Add new Category-------------------------
export function createCategory(req, res){
    if(req.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    if(req.user.type != "Admin"){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }
    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json({
                message: "Category created succesfully",
                result: result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message: "Category creation failed",
                error: err
            })
        }
    )
}