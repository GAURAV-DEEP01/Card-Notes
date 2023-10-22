// testing....
// fetching user from local storage if data doesnt exist redirect to the login page 
function getUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        window.location = "./login.html"
    }else
    // console.log(user)
    return user;
}

async function postData(url ='', data = {}){
   try{
        const response = await fetch(url, {
            method:'POST', 
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify(data)
        });    
        return response.json();
    }catch(err){
        throw err;
    }
}

//get user cards from the db with matching email
async function getCards(userId){
    try{
        const result = await postData("/getcards",{userId})
        noteArray = result.card
        Card.render();
    }catch(err){
        console.error("Unable to get user cards from the server",err)
    }
}

async function createCards(heading,date,note,userId){
    try{
        const result = await postData("/createcard",{heading,date,note,userId})
        // console.log(result)
    }catch(err){
        console.error("Unable to create user cards from the server",err)
    }
}
async function deleteCard(heading,date,note,userId){
    try{
        const result = await postData("/deletecard",{heading,date,note,userId})
        // console.log(result)
    }catch(err){
        console.error("Unable to delete user cards from the server",err)
    }
}
