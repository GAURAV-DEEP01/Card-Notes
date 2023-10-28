const searchFriends = document.getElementById("search_friends");
const searchFriendsBtn = document.getElementById("search_friends_btn");
const toast = new bootstrap.Toast(document.getElementById('toastfriend'),{delay:50000});
const searchFriendResult = document.getElementById("searchFriendResult");
const friendNotFound = document.getElementById("card_friend_not_found");
const friendUsername = document.getElementById("add_friend_username");

friendNotFound.style.display = "none";
searchFriendsBtn.addEventListener("click",async()=>{
const searchTxt = searchFriends.value.trim();
friendNotFound.style.display = "none";
    if(searchTxt!=""){
        toast.hide()
        const response = await postData("./getuser",{username:searchTxt});
        console.log("add friend response:",response);
        searchFriendResult.style.display = "block";
        if(response.success){
            createFriendOption(response.username);
        }else{
            friendNotFound.style.display = "block";
        }
    }
})

function createFriendOption(username){ 
    toast.show();
    friendUsername.innerText = username;
}

const myUserName = JSON.parse(localStorage.getItem("user"));
const addFriend = document.getElementById("add_friend");
addFriend.onclick =async()=>{
    const addedFriend = friendUsername.innerText.trim();
    toast.hide();
    const response = await postData("/addfriend",{username:myUserName.username,friend:addedFriend});
    // console.log("friends response",response);   
    loadfriends()
}

async function loadfriends(){
  const friendsList = await postData("./loadfriends",{username:myUserName.username})
//   console.log("friendsList",friendsList)
  if(friendsList.success&&friendsList.friends.length!=0){
    friends = friendsList.friends;
    document?.querySelectorAll(".deletableFriendlist").forEach(e=> e.remove());
    friendsList.friends.forEach(e => {
        const friend = document.createElement("div")
        friend.setAttribute("class", " p-2 color_prim m-2 rounded border deletableFriendlist")
        friend.innerHTML =`<svg class="me-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23" height="23" width="23"><g id="user-single-neutral-male--close-geometric-human-person-single-up-user-male"><path id="Union" fill="#000" fill-rule="evenodd" d="M11.5 13.142857142857142a6.571428571428571 6.571428571428571 0 0 0 6.571428571428571 -6.571428571428571l0 -0.069a7.573571428571428 7.573571428571428 0 0 1 -4.869428571428571 -1.9418571428571427 7.575214285714285 7.575214285714285 0 0 1 -5.076428571428571 1.945142857142857 7.5768571428571425 7.5768571428571425 0 0 1 -3.154285714285714 -0.6834285714285714A6.571428571428571 6.571428571428571 0 0 0 11.5 13.142857142857142Zm2.3164285714285713 -10.289214285714285a5.942214285714286 5.942214285714286 0 0 0 4.025 1.9927857142857144 6.574714285714285 6.574714285714285 0 0 0 -12.469285714285714 -0.6555c0.8230714285714286 0.42878571428571427 1.7578571428571428 0.6719285714285713 2.751785714285714 0.6719285714285713a5.942214285714286 5.942214285714286 0 0 0 4.463642857142857 -2.0092142857142856 0.8214285714285714 0.8214285714285714 0 0 1 1.2288571428571429 0ZM0.8411428571428571 21.96007142857143a11.503285714285713 11.503285714285713 0 0 1 21.317714285714285 0c0.207 0.5092857142857142 -0.18728571428571428 1.0399285714285713 -0.736 1.0399285714285713H1.577142857142857c-0.5487142857142857 0 -0.9429999999999998 -0.5306428571428571 -0.736 -1.0399285714285713Z" clip-rule="evenodd" stroke-width="1.6428571428571428"></path></g></svg>
        <spam>${e}</spam>` ;
        searchFriendResult.appendChild(friend)
    });
  }
}
loadfriends()