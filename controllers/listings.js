const Listing= require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    
    res.render("listings/index.ejs",{allListings})};

module.exports.renderForm= (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{
       path:"author"
 }}).populate("owner");
    if(!listing){
       req.flash("error","listing you requested is does not exit");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
 
 };

 module.exports.createListing=async(req,res)=>{
  let response= await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 2
      })
        .send()
    
    let url=req.file.path;
    let filename=req.file.filename;
    let listing = req.body;
   const newListing = new Listing(listing);
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
     newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect('/listings');
    
 };

 module.exports.editForm=async(req,res)=>{
    let {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listings/edit.ejs",{listing});
   
};

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    if(!req.body){
       throw new ExpressError(400,"send valid data for listing");
   }
    let newValues=req.body;
   let newListing=await Listing.findByIdAndUpdate(id,newValues);
   if(typeof req.file!=="undefined"){
   let url=req.file.path;
   let filename=req.file.filename;
   newListing.image={url,filename};
   await newListing.save();
   }
   req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);

};

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params; 
   deletedListing =await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success"," listing deleted");
    res.redirect("/listings");
};