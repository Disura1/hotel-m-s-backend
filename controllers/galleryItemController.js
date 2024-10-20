import GalleryItem from "../models/galleryItem.js"

//-------------------------Add new Gallery item------------------------------
export function createGalleryItem(req, res){   
   
    const user = req.user                           //Check the Access
    if(!user){
        res.status(403).json({
            message: "Please login to create Gallery Item"
        })
        return
    }
    if(user.type != "Admin"){
        res.status(403).json({
            message: "You do not have permission to create a Gallery Item"
        })
        return
    }

    const galleryItem = req.body                    //Create new Gallery item
    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        ()=>{
            res.json({
                message: "Gallery item created successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message: "Gallery item creation failed"
            })
        }
    )
}

//-----------------------Show all gallery itmes in front end------------------------
export function getGalleryItems(req,res){           
    GalleryItem.find().then(
        (list)=>{
            res.json({
                list: list
            })
        }
    )
}