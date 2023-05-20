const express = require('express')
const app = express()
const port = 5000
const fs = require('fs');
const bcrypt = require('bcrypt')
app.use(express.json())

const songList = JSON.parse(fs.readFileSync('data/songs.json', 'utf8'))
const users = JSON.parse(fs.readFileSync('data/Users.json', 'utf8'))



app.get('/songList',(req,res)=>{ 

    res.json(songList)
})

app.post('/users', async (req,res)=>{
    //error hendling
    if(!req.body.username){return res.status(500).send("username cant be empty")}
    if(!req.body.password){return res.status(500).send("password cant be empty")}
    try{ 
        users.map((user=>{
            if(user.username===req.body.username){return res.status(500).send("user allredy exsits")}
        }))
        // hash and encrypt password
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        // create new user and push to users array 
        const user = {username:req.body.username,password:hashedPassword,likedSongs:[],recentlyPlayed:[]}
        users.push(user)
       // write user to users file
       fs.writeFile('data/Users.json',JSON.stringify(users),'utf8',(err)=>{
            if(err){throw err}
       })
       // read users agin to get the new user data to load on main page 
       
       return res.send(user.username)
    }
    catch{
       return res.status(500).send()
    }
})

app.post('/users/login', async (req,res)=>{ 
    //error hendling
    if(!req.body.username){return res.status(500).send("username cant be empty")}
    if(!req.body.password){return res.status(500).send("password cant be empty")}
    const user = users.find(user=> user.username === req.body.username)
    if(user==null){return res.status(400).send("user not found")}

    try{
         if ( await bcrypt.compare(req.body.password,user.password)){return res.send(user.username)}
         else{return res.status(500).send("invalid password")}
         
    }    
    catch{ return res.status(500).send()}
})

app.get('/likedSongs/:username',(req,res)=>{
    const user = users.find(user=> user.username === req.params.username)
    if(user==null){res.status(400).send("user not found")}

    return res.send(user.likedSongs)
})

app.get('/recentlyPlayed/:username',(req,res)=>{
    const user = users.find(user=> user.username === req.params.username)
    if(user==null){return res.status(400).send("user not found")}

   return  res.send(user.recentlyPlayed)
})

app.post('/likedSongs/:username',(req,res)=>{
    const user = users.find(user=> user.username === req.params.username)
    if(user==null){return res.status(400).send("user not found")}
   
   
    if(req.body.song==null){return res.status(500).send("song cannot be null")}
    else{
         user.likedSongs.push(req.body.song)
          
         fs.writeFile('data/Users.json',JSON.stringify(users),(err)=>{
            if(err){res.send(err)}

           return  res.send(user.likedSongs)
       })}

    
    
})

app.post('/recentlyPlayed/:username',(req,res)=>{
    const user = users.find(user=> user.username === req.params.username)
    if(user==null){return res.status(400).send("user not found")}
    
    if(req.body.song==null){return res.status(500).send("song cannot be null")}
    else{
         // if the song allredy in the array put it first
         if(user.recentlyPlayed.includes(req.body.song)){
            user.recentlyPlayed = user.recentlyPlayed.filter(song => song !== req.body.song);
            user.recentlyPlayed.unshift(req.body.song);
         }
         // display only 5 latest songs 
         else if(user.recentlyPlayed.length>=5){
            user.recentlyPlayed.pop()
            user.recentlyPlayed.unshift(req.body.song)
            
         }
         else{
            user.recentlyPlayed.unshift(req.body.song)
            
         }

           
         fs.writeFile('data/Users.json',JSON.stringify(users),(err)=>{
            if(err){return res.send(err)}
           
           return res.send(user.recentlyPlayed)
       })}
})


app.delete('/likedSongs/:username',(req,res)=>{
    let user = users.find(user=> user.username === req.params.username)
    if(user==null){return res.status(400).send("user not found")}

    user.likedSongs  = user.likedSongs.filter(song=>song!==req.body.song)
   
    fs.writeFile('data/Users.json',JSON.stringify(users),(err)=>{
        if(err){res.send(err)}
   })
    return res.send(user.likedSongs)
   
})

app.listen(port, () => {
    console.log(` app is listening on port ${port}`)
  })
 