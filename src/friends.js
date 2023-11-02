const searchFriends = document.getElementById("search_friends");
const searchFriendsBtn = document.getElementById("search_friends_btn");
const toast = new bootstrap.Toast(document.getElementById('toastfriend'),{autohide:false});
const searchFriendResult = document.getElementById("searchFriendResult");
const friendNotFound = document.getElementById("card_friend_not_found");

friendNotFound.style.display = "none";
searchFriendsBtn.addEventListener("click",async()=>{
const searchTxt = searchFriends.value.trim();
friendNotFound.style.display = "none";
    if(searchTxt!=""){
        toast.hide()
        try{
        const response = await postData("./getuser",{username:searchTxt});
        console.log("add friend response:",response);
        searchFriendResult.style.display = "block";
        if(response.success){
            createFriendOption(response.username);
        }else{
            friendNotFound.style.display = "block";
        }
    }catch{
        friendNotFound.style.display = "block";
    }
    }
})

const friendUsername = document.getElementById("add_friend_username");

function createFriendOption(username){ 
    toast.show();
    friendUsername.innerText = username;
}

const myUserName = JSON.parse(localStorage.getItem("user"));
const addFriend = document.getElementById("add_friend");

addFriend.onclick =async()=>{
    try{
        const addedFriend = friendUsername.innerText.trim();
        toast.hide();
        const response = await postData("/addfriend",{username:myUserName.username,friend:addedFriend});
        // console.log("friends response",response);   
        loadfriends()
    }catch(err){ 
        console.error("couldn't get friends list",err)
    }
}

async function loadfriends(){
  const friendsList = await postData("./loadfriends",{username:myUserName.username})
console.log("friendsList",friendsList)
  if(friendsList.success&&friendsList.friends.length!=0){
    // friends = friendsList.friends;
    const shareListGroup = document.getElementById('share_btn_friends_list');
    shareListGroup.innerHTML ="";
    document?.querySelectorAll(".deletableFriendlist").forEach(e=> e.remove());
    friendsList.friends.forEach(e => {
        const friend = document.createElement("div")
        friend.setAttribute("class", " p-2 color_prim m-2 rounded border deletableFriendlist")
        friend.innerHTML =`<svg class="me-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23" height="23" width="23"><g id="user-single-neutral-male--close-geometric-human-person-single-up-user-male"><path id="Union" fill="#000" fill-rule="evenodd" d="M11.5 13.142857142857142a6.571428571428571 6.571428571428571 0 0 0 6.571428571428571 -6.571428571428571l0 -0.069a7.573571428571428 7.573571428571428 0 0 1 -4.869428571428571 -1.9418571428571427 7.575214285714285 7.575214285714285 0 0 1 -5.076428571428571 1.945142857142857 7.5768571428571425 7.5768571428571425 0 0 1 -3.154285714285714 -0.6834285714285714A6.571428571428571 6.571428571428571 0 0 0 11.5 13.142857142857142Zm2.3164285714285713 -10.289214285714285a5.942214285714286 5.942214285714286 0 0 0 4.025 1.9927857142857144 6.574714285714285 6.574714285714285 0 0 0 -12.469285714285714 -0.6555c0.8230714285714286 0.42878571428571427 1.7578571428571428 0.6719285714285713 2.751785714285714 0.6719285714285713a5.942214285714286 5.942214285714286 0 0 0 4.463642857142857 -2.0092142857142856 0.8214285714285714 0.8214285714285714 0 0 1 1.2288571428571429 0ZM0.8411428571428571 21.96007142857143a11.503285714285713 11.503285714285713 0 0 1 21.317714285714285 0c0.207 0.5092857142857142 -0.18728571428571428 1.0399285714285713 -0.736 1.0399285714285713H1.577142857142857c-0.5487142857142857 0 -0.9429999999999998 -0.5306428571428571 -0.736 -1.0399285714285713Z" clip-rule="evenodd" stroke-width="1.6428571428571428"></path></g></svg>
        <spam>${e}</spam>` ;
        searchFriendResult.appendChild(friend);
        const shareFriend = document.createElement('div');
        shareFriend.className ="list-group-item color_prim m-1 mx-2 px-3 p-2 d-flex justify-content-between align-items-center "
        shareFriend.innerHTML =`<div class="d-flex justify-content-around align-items-center"><svg class="me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.715 -0.715 20 20" height="20" width="20"><g id="user-circle-single--circle-geometric-human-person-single-user"><path id="Vector" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M9.285 10.611428571428572c1.831413192857143 0 3.316071428571429 -1.4846582357142857 3.316071428571429 -3.316071428571429S11.116413192857145 3.9792857142857145 9.285 3.9792857142857145 5.968928571428572 5.463943950000001 5.968928571428572 7.295357142857143 7.453586807142858 10.611428571428572 9.285 10.611428571428572Z" stroke-width="1.43"></path><path id="Vector_2" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M3.6211234714285716 15.784500000000001c0.5919054857142858 -0.9716089285714287 1.4238016928571429 -1.774628785714286 2.4157049785714286 -2.331728785714286 0.9919032857142858 -0.5572591714285715 2.1104539714285715 -0.8499223714285715 3.2481450214285714 -0.8499223714285715 1.13769105 0 2.2562417357142857 0.2926632 3.2481450214285714 0.8499223714285715 0.9919430785714286 0.5571 1.8237464357142859 1.3601198571428574 2.415731507142857 2.331728785714286" stroke-width="1.43"></path><path id="Vector_3" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M9.285 17.906785714285714c4.761745928571429 0 8.621785714285714 -3.8600397857142856 8.621785714285714 -8.621785714285714C17.906785714285714 4.523320392857143 14.04674592857143 0.6632142857142858 9.285 0.6632142857142858 4.523320392857143 0.6632142857142858 0.6632142857142858 4.523320392857143 0.6632142857142858 9.285c0 4.761745928571429 3.8601061071428573 8.621785714285714 8.621785714285714 8.621785714285714Z" stroke-width="1.43"></path></g></svg>${e}</div>
        <button class="color_sec rounded-pill ms-5 text-dark badge border-0 shareBtn">send<svg class="ms-2 svg_icons" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14"><g id="send-email--mail-send-email-paper-airplane"><path id="Subtract" fill="#000" fill-rule="evenodd" d="M11.821 0.098a1.62 1.62 0 0 1 2.077 2.076l-3.574 10.712a1.62 1.62 0 0 1 -1.168 1.069 1.599 1.599 0 0 1 -1.52 -0.434l-1.918 -1.909 -2.014 1.042a0.5 0.5 0 0 1 -0.73 -0.457l0.083 -3.184 7.045 -5.117a0.625 0.625 0 1 0 -0.735 -1.012L2.203 8.088l-1.73 -1.73a1.6 1.6 0 0 1 -0.437 -1.447 1.62 1.62 0 0 1 1.069 -1.238l0.003 0L11.82 0.097Z" clip-rule="evenodd" stroke-width="1"></path></g></svg></button>`
        shareListGroup.appendChild(shareFriend)
    });
    addShareEvent()
  }
}
loadfriends();
const sendToastEle = document.getElementById('sendToast');
const sendToast = new bootstrap.Toast(sendToastEle,{delay:700});
function addShareEvent(){
    const shareGroup = document.getElementById("share_btn_friends_list");
    shareGroup.onclick = async(e)=>{
        if(e.target.getAttribute("class").includes("shareBtn"))
            await sendCards(e.target.parentNode.firstChild.innerText.trim());
    }
}
const veiwHeading = document.querySelector(".card_view_heading");
const veiwDate = document.querySelector(".card_view_date");
const veiwNote = document.querySelector(".card_view_note");
const sendToastBody = document.getElementById("send_toast_body"); 
async function sendCards(friendName){
    try {
        const data = {
            from:myUserName.username,
            to:friendName,
            heading:veiwHeading.innerText,
            date:veiwDate.innerText,
            note:veiwNote.innerText,
        }
        const response = await postData("/sendcard",data);
        if(response.success)
            sendToast.show() 
        else
            throw new Error()
    } catch  {
        sendToastBody.innerHTML ="Send Failed";
        sendToastEle.style.backgroundColor = "#ff5858"
        sendToast.show()
    }
}
const add_note_btn = document.getElementById("add_note_btn")
const sentCardBtn = document.querySelectorAll(".sent_cards")
sentCardBtn.forEach((thisBtn)=>{
    thisBtn.onclick = ()=>{
        noteArray = sentCards;
        add_note_btn.style.display = "none"
        const msg = "You did not send anything"
        Card.render(msg,"sent")
    }
})
const receiveCardsBtn = document.querySelectorAll(".received_cards")
receiveCardsBtn.forEach((thisBtn)=>{
    thisBtn.onclick = ()=>{
    add_note_btn.style.display = "none"
    noteArray = recievedCards;
    const msg = "You did not receive any card notes"
    Card.render(msg,"recieved")
    }
})
const myCardsBtn = document.querySelectorAll(".my_cards")
myCardsBtn.forEach((thisBtn)=>{
    thisBtn.onclick = ()=>{
    noteArray = personalCards;
    add_note_btn.style.display = "block"
    Card.render()
    }
})