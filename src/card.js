const allCardContainer = document.querySelector(".allCardContainer");
//note array to hold the note data -> heading,note and date
const noteArray = [];
checkEmpty();

let prevEdit = null
function createCard(heading, note, date, indx) {
    let card = document.createElement('div');
    card.setAttribute('class', 'card g-col-12 g-col-sm-6 g-col-lg-4');
    card.setAttribute('id', indx);
    card.innerHTML = `<div class="card-body">
                        <h5 class="card-title truncate text-capitalize">${heading}</h5>
                        <p class="text-black-50 fw-normal d-inline">${date}</p>
                        <p class="card-text overflow-hidden truncate noteHight">${note}</p>
                        <button class="custom_btn editCardBtn border border-0"data-bs-target="#exampleModal" data-bs-toggle="modal" >Edit</button>
                        <button class="custom_btn deleteCardBtn border border-0">Delete</button>
                    </div>`;
    allCardContainer.prepend(card)
}
//to be continued
 // <button class="custom_btn viewFullbtn border border-0">View full</button>


const cardHeading = document.querySelector("#card_heading");
const cardNote = document.querySelector("#card_note");
const addNoteBtn = document.querySelector(".addNoteBtn");
//creates card on click  
addNoteBtn.addEventListener('click', addNoteFunc);
function addNoteFunc() {
    if (prevEdit != null) {
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
            NoteElementObj.date = month + "/" + theDate + "/" + year;
            cardNote.value = "";
            cardHeading.value = "";
            noteArray.push(NoteElementObj);
            renderCards();
        }
        console.log(noteArray);
    } catch (error) {
        console.error('Note Error:', error);
    }
}

//renders card on each deletion and incertion
function renderCards() {
    try {
        const currentCards = document.querySelectorAll(".card");
        currentCards.forEach(e => e.remove());
        if (noteArray.length != 0) {
            noteArray.forEach((val, indx) => {
                createCard(val.heading, val.note, val.date, indx);
            });
        }
    } catch (error) {
        console.error("Render Error", error)
    }
}

//deletes a card on 
allCardContainer.addEventListener('click', (e) => {
    if (e.target.getAttribute("class").includes("deleteCardBt")) {
        e.target.parentNode.parentNode.remove();
        noteArray.splice(e.target.parentNode.parentNode.getAttribute("id"), 1);
        renderCards();
        return;
    }
    let elementIndex =Number(e.target.parentNode.parentNode.getAttribute("id"));
    let elementClass = e.target.getAttribute("class");
    if (elementClass.includes("editCardBt")) {
        cardHeading.value = noteArray[elementIndex].heading;
        cardNote.value =    noteArray[elementIndex].note;
        prevEdit = elementIndex
        return;
    }
    if (elementClass.includes("viewFullbtn")) {
        let viewFullHeadingVal = noteArray[elementIndex].heading;
        let viewFullNoteVal = noteArray[elementIndex].note;
        let viewFullDateVal = noteArray[elementIndex].date;
        viewFullCard(viewFullHeadingVal,viewFullNoteVal,viewFullDateVal)
        return;
    }
});

function checkEmpty(){
    if (noteArray.length == 0) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card m-1 g-col-12');
        card.innerHTML = `<div class="card-body">
                            <h5 class="card-title">Add Notes</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>`;
        allCardContainer.prepend(card);
    }
}

function viewFullCard(heading,note,date){
    return
}

//clears text in the new note toggle on click
const newNoteCloseBtn = document.querySelectorAll(".new_note_close_btn");
newNoteCloseBtn.forEach((e) => {
    e.addEventListener('click', () => {
        prevEdit = null;
        cardNote.value = "";
        cardHeading.value = "";
    });
});



