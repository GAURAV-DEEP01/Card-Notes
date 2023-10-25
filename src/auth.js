async function postData(url='', data = {}){
    const response = await fetch(url, {
        method:'POST', 
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });    
    return response.json();
}
const invalidUser = document.getElementById('invalidUser')
function emailPassError(errorMsg){
    userEmail.value = "";
    userPassword.value ="";
    formLable.forEach(lable => lable.style.color="red");
    invalidUser.style.display="block";
    invalidUser.innerText= errorMsg;
}
async function authPost(url,username=null){ 
    const email = userEmail.value.toLowerCase();
    const password = userPassword.value;
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!validEmail.test(email)){
        emailPassError("Invalid Email");
        return;
    }
    try{
        const response = !username ? await postData(url,{email,password}):await postData(url,{email,password,username});
        // debugging console.log(response)
        if(!response.success){
            emailPassError(response.msg);
            throw new Error('request failed');
        }
        const userDetails = {
            userId:response.userId,
            username:response.username
        } 
        console.log(response)
        localStorage.setItem("user",JSON.stringify(userDetails));
        window.location = "./index.html";
    }catch(err){ throw err; }
}

const userEmail = document?.getElementById('email');
const userPassword = document?.getElementById('password');
const formLable = document?.querySelectorAll('.form-label');

const signinBtn = document?.getElementById('signinsubmit');
signinBtn?.addEventListener('click',async()=>{
    try{
        const username = document?.getElementById('username');
        const validUsername =/^[a-zA-Z0-9_]+$/;
        if(!validUsername.test(username.value)){
            emailPassError("Invalid username, no special character allowed except '_'");
            return
        }
        await authPost("./signup",username.value)
    }catch(err){
        console.error("Error, Sign In POST request failed Couldn't connect to the server :", err);
    }
})

const loginBtn = document?.getElementById('loginsubmit');
loginBtn?.addEventListener('click',async()=>{
    try{
        
        await authPost("./login")
    }catch(err){
        console.error("Error, Login POST request failed Couldn't connect to the server :", err);
    }
})

