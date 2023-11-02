const allCardContainer = document?.querySelector(".allCardContainer");
let user = getUser();
let sortOrder = getSortOrder();
//main note array to hold the card note data -> heading, note and date
let noteArray = [];
//It is what it sounds like :)
let personalCards = [];
//shared cards array to hold the card note data -> from , to , heading, note and date
let sentCards = [];
let recievedCards = [];

class Card {
    // methods -> create, render, checkEmpty, viewFull
    static create(heading, note, date, indx ,type, from="" , to="" ) {
        const card = document.createElement('div');
        let badge = ""
        let padding = ""
        let cardBtns = `<button class="custom_btn mb-1 color_prim custom_shadow editCardBtn border border-0"data-bs-target="#cardFormModal" data-bs-toggle="modal" >Edit    <svg class ="svg_icons mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14"><g id="hand-held-tablet-writing--tablet-kindle-device-electronics-ipad-writing-digital-paper-notepad"><path id="Union" fill="#000" fill-rule="evenodd" d="M1.718 1.594a0.197 0.197 0 0 0 -0.198 0.197v8.521h8.919V7.947a0.75 0.75 0 1 1 1.5 0v4.262c0 0.937 -0.76 1.697 -1.697 1.697H1.716c-0.937 0 -1.697 -0.76 -1.697 -1.697V1.791A1.699 1.699 0 0 1 1.718 0.094h6.156a0.75 0.75 0 0 1 0 1.5H1.718Zm1.894 1.413a0.625 0.625 0 1 0 0 1.25h1.894a0.625 0.625 0 1 0 0 -1.25H3.612ZM2.987 6.5c0 -0.345 0.28 -0.625 0.625 -0.625h0.947a0.625 0.625 0 1 1 0 1.25h-0.947a0.625 0.625 0 0 1 -0.625 -0.625Zm6.332 1.034a0.5 0.5 0 0 0 0.266 -0.14l4.099 -4.118a1 1 0 0 0 0 -1.42l-1.06 -1.06a1 1 0 0 0 -1.42 0L7.088 4.892a0.5 0.5 0 0 0 -0.14 0.273l-0.36 2.182a0.5 0.5 0 0 0 0.583 0.573l2.148 -0.386Z" clip-rule="evenodd" stroke-width="1"></path></g></svg></button>
        <button class="custom_btn mb-1 color_prim custom_shadow deleteCardBtn border border-0">Delete    <svg class ="svg_icons mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14"><g id="recycle-bin-2--remove-delete-empty-bin-trash-garbage"><path id="Subtract" fill="#000" fill-rule="evenodd" d="M5.763 2.013a1.75 1.75 0 0 1 2.914 0.737H5.323a1.75 1.75 0 0 1 0.44 -0.737Zm-1.974 0.737a3.25 3.25 0 0 1 6.422 0H13a0.75 0.75 0 0 1 0 1.5h-1v8.25a1.5 1.5 0 0 1 -1.5 1.5h-7A1.5 1.5 0 0 1 2 12.5V4.25H1a0.75 0.75 0 1 1 0 -1.5h2.789ZM5 5.876c0.345 0 0.625 0.28 0.625 0.625v4.002a0.625 0.625 0 0 1 -1.25 0V6.501c0 -0.345 0.28 -0.625 0.625 -0.625Zm4.625 0.625a0.625 0.625 0 0 0 -1.25 0v4.002a0.625 0.625 0 0 0 1.25 0V6.501Z" clip-rule="evenodd" stroke-width="1"></path></g></svg></button>`
        if(type=="recieved"){
            cardBtns = "" ;
            padding ="pt-5";
            badge = `<span class=" rounded-pill color_prim text-dark px-3 p-1 fw-medium mb-3 position-absolute rounded-start-circle start-0">Sent by: <svg class="me-2 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14"><g id="user-single-neutral-male--close-geometric-human-person-single-up-user-male"><path id="Union" fill="#000" fill-rule="evenodd" d="M7 8a4 4 0 0 0 4 -4l0 -0.042a4.61 4.61 0 0 1 -2.964 -1.182 4.611 4.611 0 0 1 -3.09 1.184 4.612 4.612 0 0 1 -1.92 -0.416A4 4 0 0 0 7 8Zm1.41 -6.263a3.617 3.617 0 0 0 2.45 1.213 4.002 4.002 0 0 0 -7.59 -0.399c0.501 0.261 1.07 0.409 1.675 0.409a3.617 3.617 0 0 0 2.717 -1.223 0.5 0.5 0 0 1 0.748 0ZM0.512 13.367a7.002 7.002 0 0 1 12.976 0c0.126 0.31 -0.114 0.633 -0.448 0.633H0.96c-0.334 0 -0.574 -0.323 -0.448 -0.633Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>${from}</span>`}
        if(type=="sent") {
            cardBtns = "" ;
            padding ="pt-5";
            badge = `<span class=" rounded-pill color_prim text-dark px-3 p-1 fw-medium mb-3 position-absolute rounded-start-circle start-0">Sent to: <svg class="me-2 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14"><g id="user-single-neutral-male--close-geometric-human-person-single-up-user-male"><path id="Union" fill="#000" fill-rule="evenodd" d="M7 8a4 4 0 0 0 4 -4l0 -0.042a4.61 4.61 0 0 1 -2.964 -1.182 4.611 4.611 0 0 1 -3.09 1.184 4.612 4.612 0 0 1 -1.92 -0.416A4 4 0 0 0 7 8Zm1.41 -6.263a3.617 3.617 0 0 0 2.45 1.213 4.002 4.002 0 0 0 -7.59 -0.399c0.501 0.261 1.07 0.409 1.675 0.409a3.617 3.617 0 0 0 2.717 -1.223 0.5 0.5 0 0 1 0.748 0ZM0.512 13.367a7.002 7.002 0 0 1 12.976 0c0.126 0.31 -0.114 0.633 -0.448 0.633H0.96c-0.334 0 -0.574 -0.323 -0.448 -0.633Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>${to}</span>`} 
        card.setAttribute('class', 'card g-col-12 g-col-sm-6 g-col-lg-4 custom_shadow border-0');
        card.setAttribute('id', indx);
        card.innerHTML = `<div class="card-body card_hover">${badge}
                            <h5 class="card-title ${padding} truncate_heading text-capitalize cardHeading">${heading}</h5>
                            <p class="text-black-50 fw-normal d-inline cardnote">${date}</p>
                            <p class="card-text overflow-hidden truncate noteHight">${note}</p>${cardBtns}
                            <button class="custom_btn mb-1 custom_shadow viewFullbtn border border-0">View full <svg  class ="svg_icons mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14"><g id="arrow-expand--expand-small-bigger-retract-smaller-big"><path id="Union" fill="#000" fill-rule="evenodd" d="M0 1v3.5a0.5 0.5 0 0 0 0.854 0.354L2.146 3.56l2.147 2.146a1 1 0 0 0 1.414 -1.414L3.561 2.146 4.854 0.854A0.5 0.5 0 0 0 4.5 0h-4a0.5 0.5 0 0 0 -0.5 0.5V1Zm5.707 8.707a1 1 0 0 0 -1.414 -1.414l-2.147 2.146L0.854 9.146A0.5 0.5 0 0 0 0 9.5v4a0.5 0.5 0 0 0 0.5 0.5h4a0.5 0.5 0 0 0 0.354 -0.854L3.56 11.854l2.146 -2.147Zm2.586 -1.414a1 1 0 0 1 1.414 0l2.147 2.146 1.292 -1.293A0.5 0.5 0 0 1 14 9.5v4a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.354 -0.854l1.293 -1.292 -2.146 -2.147a1 1 0 0 1 0 -1.414ZM9.5 0a0.5 0.5 0 0 0 -0.354 0.854l1.293 1.292 -2.146 2.147a1 1 0 0 0 1.414 1.414l2.147 -2.146 1.292 1.293A0.5 0.5 0 0 0 14 4.5v-4a0.5 0.5 0 0 0 -0.5 -0.5h-4Z" clip-rule="evenodd" stroke-width="1"></path></g></svg></button>
                        </div>`;
        if(sortOrder=="newest first")
            allCardContainer.prepend(card);
        if(sortOrder=="oldest first")
            allCardContainer.append(card);
    }
    //renders card on each deletion and incertion
    static render(msg = "Click the 'Add Note+' button to create your first note.",type="") {
        try {
            const currentCards = document.querySelectorAll(".card");
            currentCards.forEach(e => e.remove());
            if (noteArray.length != 0) {
                noteArray.forEach((val, indx) => {
                    if(val.from&&val.to)
                    Card.create(val.heading, val.note, val.date, indx,type, val.from, val.to);
                    else
                    Card.create(val.heading, val.note, val.date, indx,type);

                });
            }
            Card.checkEmpty(msg)
        } catch (error) {
            console.error("Render Error:", error);
        }
    }

    static checkEmpty(msg) {
        if (noteArray.length == 0) {
            let card = document.createElement('div');
            card.setAttribute('class', 'card m-1 g-col-12');
            card.innerHTML = `<div class="card-body">
                                <h5 class="card-title">Notes</h5>
                                <p class="card-text">${msg}</p>
                            </div>`;
            allCardContainer.append(card);
        }
    }
    static viewFull(heading, note, date) {
        allCardContainer.style.display = "none";
        cardView.style.display = "block";
        cardViewHeading.innerText = heading;
        cardViewDate.innerText = date;
        cardViewNote.innerText = note;
        return;
    }
}
//Gets all cards for the user from the db
getCards(user);

let prevEdit = null;

const cardHeading = document?.querySelector(".card_heading");
const cardNote = document?.querySelector(".card_note");
const addNoteBtn = document?.querySelector(".addNoteBtn");

//creates card on click  
addNoteBtn.addEventListener('click', () => {
    if (prevEdit != null) {
        deleteCard(noteArray[prevEdit].heading,noteArray[prevEdit].date,noteArray[prevEdit].note,user.userId)
        noteArray.splice(prevEdit, 1);
        prevEdit = null;
    }
    try {
        const heading = cardHeading.value;
        const note = cardNote.value;
        if (heading != "" && note != "") {
            const NoteElementObj = {};
            let date = new Date();
            let month = String(date.getMonth() + 1);
            let theDate = String(date.getDate());
            let year = String(date.getFullYear());
            NoteElementObj.heading = heading;
            NoteElementObj.note = note;
            NoteElementObj.date = month + "-" + theDate + "-" + year;
            cardNote.value = "";
            cardHeading.value = "";
            noteArray.push(NoteElementObj);
            Card.render();
            createCards(heading,NoteElementObj.date,note,user.userId)
        }
    } catch (error) {
        console.error('Note Error:', error);
    }
});

//deletes a card on click
allCardContainer.addEventListener('click', (e) => {
    let elementIndex = Number(e.target.parentNode.parentNode.getAttribute("id"));
    if (e.target.getAttribute("class").includes("deleteCardBt")) {
        e.target.parentNode.parentNode.remove();
        deleteCard(noteArray[elementIndex].heading,noteArray[elementIndex].date,noteArray[elementIndex].note,user.userId)
        noteArray.splice(elementIndex, 1);
        Card.render();
        const toastForDeleted = new bootstrap.Toast(document.getElementById("toast_for_deleted"),{delay:1000})
        toastForDeleted.show()
        return;
    }
    let elementClass = e.target.getAttribute("class");
    if (elementClass.includes("editCardBt")) {
        cardHeading.value = noteArray[elementIndex].heading;
        cardNote.value = noteArray[elementIndex].note;
        prevEdit = elementIndex
        return;
    }
    if (elementClass.includes("viewFullbtn")) {
        let viewFullHeadingVal = noteArray[elementIndex].heading;
        let viewFullNoteVal = noteArray[elementIndex].note;
        let viewFullDateVal = noteArray[elementIndex].date;
        Card.viewFull(viewFullHeadingVal, viewFullNoteVal, viewFullDateVal)
        return;
    }
});

const cardView = document.querySelector(".card_view");
const cardViewHeading = document.querySelector(".card_view_heading");
const cardViewDate = document.querySelector(".card_view_date");
const cardViewNote = document.querySelector(".card_view_note");
const mainAddBtn = document.querySelector(".main_add_btn");

const cardViewCloseBtn = document.querySelector(".card_view_close");
cardViewCloseBtn.addEventListener("click", () => {
    allCardContainer.style.display = "grid";
    cardView.style.display = "none";
})

//clears text in the new note toggle on click
const newNoteCloseBtn = document.querySelectorAll(".new_note_close_btn");
newNoteCloseBtn.forEach((e) => {
    e.addEventListener('click', () => {
        prevEdit = null;
        cardNote.value = "";
        cardHeading.value = "";
    });
});
sortBtn.addEventListener("click",()=>{
    sortOrder = sortOrder === "newest first"? "oldest first": "newest first";
    localStorage.setItem("sortOrder",sortOrder);
    Card.render();
    sortBtn.innerText=sortOrder
})

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("user");
    window.location = "./login"
})