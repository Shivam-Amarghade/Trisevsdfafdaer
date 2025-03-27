const Listing = require("../model/listing.js"); // Ensure correct path

module.exports.index=async (req, res) => {
    try {
        let alllist = await Listing.find();
        res.render("listing/index", { data: alllist });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).send("Error fetching listings");;
    }
};

module.exports.newlisting=(req, res) => {
    res.render("listing/new.ejs");
};

module.exports.createlisting =async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const data = new Listing(req.body.listing);
     data.Owner=req.user._id;
     data.image={url,filename};
     if(!data){
     req.flash("error", "Listing not found!"); 
     return  res.redirect("/listing");
    }
    await data.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
};

module.exports.editilisting=async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
      
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("./listing/edit.ejs", { listing,originalImageUrl });
};

module.exports.showlisting=async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id)
  .populate({ path: "reviews", populate: { path: "author" } })
  .populate("Owner");
       
    if(!data){
     req.flash("error", "Listing not found!"); 
     return res.redirect("/listing");
     }
     
    res.render("listing/Show.ejs", { data});
};


module.exports.updatelisting = async (req, res) => {
    try {
        const { id } = req.params;
        const listingData = req.body.listing || {};

        // Find the existing listing
        let listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        // Update listing fields
        Object.assign(listing, listingData);

        // ✅ Check if req.file exists before accessing properties
        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await listing.save();

        req.flash("success", "Listing updated successfully!");
        res.redirect(`/listing/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};






module.exports.deletelisting=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted");
    res.redirect("/listing");
};




module.exports.filters= async (req, res) => {
    console.log("yessss");
    try {
        const categorys = req.params.category;
         let alllist = await Listing.find();
        res.render("listing/filter.ejs", { data: alllist, categorys });
    } catch (error) {
        console.error("Error fetching filtered listings:", error);
        res.status(500).send("Error fetching listings");
    }
};

module.exports.Search= async (req,res) => {
   try{
    let {searchText}=req.query;
    searchText = searchText?.trim(); 

    if (!searchText) {
        return res.redirect("/listing"); 
    }
      let datas =await Listing.find({ location: { $regex:searchText, $options: "i" } });
      console.log(datas);

    res.render("listing/index", { data:datas,searchText});
   }
 catch (error) {
    console.error("Error fetching filtered listings:", error);
    res.status(500).send("Error fetching listings");
}
};