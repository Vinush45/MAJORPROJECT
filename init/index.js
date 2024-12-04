const mongoose = require('mongoose');
const datajs = require("./data.js")
const Listing= require("../models/listing.js")
main().then(()=>{
    console.log("connection established");
}).catch((e)=>{
    console.log("error");
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};

const initDb =async ()=>{
    await Listing.deleteMany({});
    datajs.data=datajs.data.map((obj)=> (
         {...obj,owner:"674168e00437a6073b77b7bf"}
));
    await Listing.insertMany(datajs.data);
    console.log("init");
};
 initDb();