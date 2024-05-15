const express= require('express');
const fs=require('fs');
const users=require('./MOCK_DATA.json');

const app=express();
const PORT=8000;

//plugin
app.use(express.urlencoded({extended: false}));

app.get("/users", (req,res)=>{
    const html=`
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>`;
    res.send(html);
});

//ROUTES

//this one
app.get("/api/users", (req,res)=>{
    return res.json(users);
});

app.get("/api/users/:id", (req,res)=>{
    const id=Number(req.params.id);
    const user= users.find((user) => user.id==id);
    return res.json(user);
});

app.patch("/api/users/:id", (req,res)=>{
    //edit the user
    return res.json({status : 'Pending'});
});

app.delete("/api/users/:id", (req,res)=>{
    //delete the user
    return res.json({status : 'Pending'});
});

//efficient code
app.route("/api/users/:id").get((req,res)=>{
    const id=Number(req.params.id);
    const user= users.find((user) => user.id==id);
    return res.json(user);
}).patch((req,res)=>{
    //edit the user
    return res.json({status : 'Pending'});
}).delete((req,res)=>{
    //delete the user
    return res.json({status : 'Pending'});
});

app.post("/api/users", (req,res)=>{
    //create new user
    const body=req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data)=>
    {
        return res.json({status : "Success", id: users.length});
    });
  /*   console.log("Body",body); */

});
app.listen(PORT, ()=> console.log(`server started at port ${PORT}`));