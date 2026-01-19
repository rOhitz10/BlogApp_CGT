require('dotenv').config()
const express = require('express')
const router = require('./routes/userRoutes')
const BlogRouter = require('./routes/blogRoutes')
const pool = require('./config/db')
const cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api',router)
app.use('/api/blog',BlogRouter);

app.get('/',(req,res)=>{
res.send("hello")
})

app.get("/users", async (req, res) => {
 
 const result = await pool.query("SELECT * FROM users");
 console.log(pool,"res",result);
  res.json(result.rows);
});

app.listen(port,()=>{
 console.log(`server is listen on ${port}`);
 
});