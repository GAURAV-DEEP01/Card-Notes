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

async function authPost(url){ 
    const email = userEmail.value.toLowerCase();
    const password = userPassword.value;
    console.log(email,password)
    try{     
        const response = await postData(url,{email,password})
        //debugging
        // console.log(response)
        if(!response.success){
            userEmail.value = "";
            userPassword.value ="";
            formLable.forEach(lable => lable.style.color="red");
            const invalidUser = document.getElementById('invalidUser')
            invalidUser.innerText=response.msg
            invalidUser.style.display="block"
            throw new Error('request failed')
        }
        localStorage.setItem("user",response.user.email) 
        window.location = "./index.html";
    }catch(err){
       throw err;
    }
}

const userEmail = document?.getElementById('email')
const userPassword = document?.getElementById('password')
const formLable = document?.querySelectorAll('.form-label')

const signinBtn = document?.getElementById('signinsubmit');
signinBtn?.addEventListener('click',async()=>{
    try{
        await authPost("./signup")
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

