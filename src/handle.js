// testing....
// fetching user from local storage if data doesnt exist redirect to the login page 
function getUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user",user)
    if(!user) window.location = "./login.html";
    const username = document.getElementById("username")
    username.innerText = user.username
    return user;
}
const sortBtn = document.getElementById("sortcard");
function getSortOrder(){
    let order = localStorage.getItem("sortOrder");
    order = !order ? "newest first": order
    sortBtn.innerText= order
    return order;
}

async function postData(url ='', data = {}){
   try{
        const response = await fetch(url, {
            method:'POST', 
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify(data)
        });    
        return response.json();
    }catch(err){ throw err; }
}
async function doesUserExist (){
    try{
        const userExists = await postData("/getuser",{username:user.username})
        if (!userExists.success)
        window.location = "./login.html";
    }catch{
        console.log("hi")
    }
}
//get user cards from the db with matching email
async function getCards(user){
    try{
        await doesUserExist()
        const myCards = postData("/getcards",{userId:user.userId});
        const sharedCards = postData("/getsharedcards",{username:user.username})
        const bothCards = await Promise.all([myCards, sharedCards])
        noteArray = personalCards = bothCards[0].card;
        recievedCards = bothCards[1].cards[0];
        sentCards = bothCards[1].cards[1];
        Card.render();
    }catch(err){
        console.error("Unable to get user cards from the server",err);
    }
}

async function createCards(heading,date,note,userId){
    try{
        const result = await postData("/createcard",{heading,date,note,userId});
        // console.log(result)
    }catch(err){
        console.error("Unable to create user cards from the server",err);
    }
}
async function deleteCard(heading,date,note,userId){
    try{
        const result = await postData("/deletecard",{heading,date,note,userId});
        // console.log(result)
    }catch(err){
        console.error("Unable to delete user cards from the server",err);
    }
}
