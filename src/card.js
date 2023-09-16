const allCardContainer = document.querySelector(".allCardContainer");
//note array to hold the note data
//heading,note and date
const noteArray = [] ;
let prevEdit = -1

function createCard(heading,note,date,indx){
    let card = document.createElement('div');
    card.setAttribute('class','card mb-3 ');
    card.setAttribute('id',indx);
    card.innerHTML =`<div class="card-body">
                        <h5 class="card-title text-capitalize">${heading}</h5>
                        <p class="text-black-50 fw-normal d-inline">${date}</p>
                        <p class="card-text overflow-hidden">${note}</p>
                        <button href="#" class="custom_btn editCardBtn"data-bs-target="#exampleModal" data-bs-toggle="modal" >Edit</button>
                        <button href="#" class="custom_btn deleteCardBtn">Delete</button>
                    </div>`;
    
    // allCardContainer.appendChild(card);
    allCardContainer.prepend(card)
}

const cardHeading =  document.querySelector("#card_heading");
const cardNote =  document.querySelector("#card_note");
const addNoteBtn =  document.querySelector(".addNoteBtn");
//creates card on click  
addNoteBtn.addEventListener('click',addNoteFunc);
function addNoteFunc(){
    if(prevEdit>=0){
        noteArray.splice(prevEdit,1);
        prevEdit = -1
    }
    try{
        const heading = cardHeading.value;
        const note = cardNote.value;
        if(heading!=""&&note!=""){
            const NoteElementObj = {};
            let date = new Date();
            let month = String(date.getMonth()+1);
            let theDate =  String(date.getDate());
            let year =  String(date.getFullYear());
            NoteElementObj.heading = heading;
            NoteElementObj.note = note;
            NoteElementObj.date =  month+"/"+theDate+"/"+year;
            cardNote.value = "";
            cardHeading.value ="";
            noteArray.push(NoteElementObj);
            renderCards();
        }
        console.log(noteArray); 
    }catch(error){
        console.error('Note Error:',error);
    }
}
// function checkChanges(heading,note,indx){
//     if(cardHeading.value!=heading||cardNote.value!=note){
//         noteArray.splice(indx,1);
//     }
// }

//renders card on each deletion and incertion
function renderCards(){
    try{
        const currentCards = document.querySelectorAll(".card");
        currentCards.forEach(e => e.remove());
        if(noteArray.length!=0){
            noteArray.forEach((val,indx)=>{
            createCard(val.heading,val.note,val.date,indx);
        });
    }
    }catch(error){
        console.error("Render Error",error)
    }
}

//deletes a card on 
allCardContainer.addEventListener('click',(e)=>{
    if( e.target.getAttribute("class").includes("deleteCardBt")){
        e.target.parentNode.parentNode.remove();
        noteArray.splice(e.target.parentNode.parentNode.getAttribute("id"),1);
        renderCards();
    }
    if( e.target.getAttribute("class").includes("editCardBt")){
        cardHeading.value = noteArray[e.target.parentNode.parentNode.getAttribute("id")].heading;
        cardNote.value = noteArray[e.target.parentNode.parentNode.getAttribute("id")].note;
        prevEdit = e.target.parentNode.parentNode.getAttribute("id")
    }  
    if(noteArray.length==0){
        let card = document.createElement('div');
        card.setAttribute('class','card mb-3 ');
        card.innerHTML =`<div class="card-body">
                            <h5 class="card-title">Add Notes</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>`;
        // allCardContainer.appendChild(card);
        allCardContainer.prepend(card)
    }  
});

//clears text in the new note toggle on click
const newNoteCloseBtn = document.querySelectorAll(".new_note_close_btn");
newNoteCloseBtn.forEach((e)=>{
    e.addEventListener('click',()=>{
        prevEdit =-1;
        cardNote.value = "" ;
        cardHeading.value = "" ;
    });
});



