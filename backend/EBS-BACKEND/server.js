const express=require("express");
const cors=require("cors");
const userRoutes=require("./src/routes/userRoute")
const ITEMRoutes=require("./src/routes/ItemRoute")
const messageRoutes=require("./src/routes/messageRoutes")
const vendorRoutes=require("./src/routes/vendorRoutes")
const dbConnect=require("./src/database/db")

//configuring express
const app=express();

//connecting to the database
dbConnect()

//middlewares
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/api/user",userRoutes)
app.use("/api/item",ITEMRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/vendor",vendorRoutes)



const port=process.env.PORT || 6000
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
