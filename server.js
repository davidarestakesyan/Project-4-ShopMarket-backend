const express= require('express')
const sqlite = require("sqlite3").verbose()
const app = express()
const port = 3000
app.use(express.json())
const cors = require("cors")
app.use(cors())

const db = new sqlite.Database("database.db", (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("OK")
    }
})
app.get("/", (req,res)=>{
    db.all("select * from clothes", [], (err, data)=>{
        res.send(data)
    })

})

app.get("/clothes/:id", (req, res)=>{
    const id=req.params.id
    db.get("select * from clothes where id=?", [id], (err,data)=>{
        res.send(data)
    })
})



app.post("/new",(req,res)=>{
   const name = req.body.name
   const price = req.body.price
   const image = req.body.image
   db.run("insert into clothes(name,price,image) values(?,?,?)",[name,price,image],() =>
  {
    res.send("Ok") 
  }
   )
}) 

app.put("/update/:id",(req,res)=> {
    const name = req.body.name
    const price = req.body.price
    const image = req.body.image
    const id=req.params.id
    db.run("update clothes set name = ?,price = ?, image = ? where id = ?",[name,price,image,id],(err) => {
        res.send("Ok")
    } )
})

app.delete("/delete/:id",(req,res) => {
   const id = req.params.id
   db.get("delete from clothes where id = ?",[id],(err,data)=>{
res.send("ok")
   })
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})