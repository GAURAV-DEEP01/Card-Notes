// fetching data from local storage if data doesnt exist fetch and check the in the db
function localDatafetch(){
    let localDataInJson =  localStorage.getItem('noteLocalData');
    if(localDataInJson!=null)
        noteArray = JSON.parse(localDataInJson)
}
//In progress state.... create user needed here
//nothing's here for now


//get global user no individual user created
async function fetchUserNoteCards(){
    try{
    const result = await fetch("/user/carddata")
    const data = await result.json()
    noteArray = data;
    Card.render();
    }catch(err){
        console.error("Unable to get user data from the server",err)
        localDatafetch() 
    }
}