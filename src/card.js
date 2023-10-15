const allCardContainer = document?.querySelector(".allCardContainer");
//note array to hold the card note data -> heading, note and date
//temp data just for testing...
let noteArray = [
    {
        heading: "🎯 Weekly Goals",
        note: "Hit the gym 3 times this week, and work on the coding project 🏋️‍♂️💻",
        date: "2023-12-04",
    },
    {
        heading: "🍔 Dinner Menu",
        note: "Try out the new burger place for dinner tonight 🍔🌟",
        date: "2023-12-06",
    },
    {
        heading: "📅 Meeting Reminder",
        note: "Don't forget the client meeting at 2 PM sharp! 🕑🤝",
        date: "2023-12-08",
    }, {
        heading: "🏖️ Vacation Plans",
        note: "Book flights to the beach destination 🌴🌞",
        date: "2023-11-15",
    },
    {
        heading: "🍰 Birthday Party",
        note: "Buy a cake and balloons for Sarah's birthday 🎂🎈",
        date: "2023-11-20",
    },
    {
        heading: "💼 Work Tasks",
        note: "Finish the report and send it to the boss by Friday 📊📅",
        date: "2023-11-24",
    }, {
        heading: "🚀 Project Launch",
        note: "Prepare for the big project launch on Monday! 🎉",
        date: "2023-10-03",
    },
    {
        heading: "🍕 Dinner Plans",
        note: "Order pizza for Friday night 🍕🎉",
        date: "2023-10-07",
    },
    {
        heading: "📚 Study Session",
        note: "Study for the upcoming exam 📖✍️",
        date: "2023-10-10",
    }, {
        heading: "Meeting Agenda",
        note: "Discuss project milestones and assign tasks for the week.",
        date: "2023-09-29",
    },
    {
        heading: "Grocery List",
        note: "Milk, eggs, bread, and vegetables.",
        date: "2023-09-30",
    },
    {
        heading: "Book Recommendations",
        note: "Check out 'The Great Gatsby' and 'To Kill a Mockingbird.'",
        date: "2023-10-01",
    }, {
        heading: "🎉 Celebration Plans",
        note: "Prepare for the New Year's Eve party with friends! 🥳🎆",
        date: "2023-12-31",
    },
    {
        heading: "🏞️ Weekend Getaway",
        note: "Pack for the hiking trip this weekend in the mountains! ⛰️🎒",
        date: "2024-01-15",
    },
    {
        heading: "📝 Study Group",
        note: "Join the study group at the library tomorrow. 📚🤓",
        date: "2024-01-02",
    }];
class Card {
    // methods -> create, render, checkEmpty, viewFull
    static create(heading, note, date, indx) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card g-col-12 g-col-sm-6 g-col-lg-4 custom_shadow border-0');
        card.setAttribute('id', indx);
        card.innerHTML = `<div class="card-body">
                            <h5 class="card-title truncate text-capitalize cardHeading">${heading}</h5>
                            <p class="text-black-50 fw-normal d-inline cardnote">${date}</p>
                            <p class="card-text overflow-hidden truncate noteHight">${note}</p>
                            <button class="custom_btn color_prim custom_shadow editCardBtn border border-0"data-bs-target="#exampleModal" data-bs-toggle="modal" >Edit</button>
                            <button class="custom_btn color_prim custom_shadow deleteCardBtn border border-0">Delete</button>
                            <button class="custom_btn custom_shadow viewFullbtn border border-0">View full</button>
                        </div>`;
        allCardContainer.prepend(card)
    }
    //renders card on each deletion and incertion
    static render() {
        localStorage.setItem("noteLocalData", JSON.stringify(noteArray) || null);
        try {
            const currentCards = document.querySelectorAll(".card");
            currentCards.forEach(e => e.remove());
            if (noteArray.length != 0) {
                noteArray.forEach((val, indx) => {
                    Card.create(val.heading, val.note, val.date, indx);
                });
            }
        } catch (error) {
            console.error("Render Error:", error);
        }
    }

    static checkEmpty() {
        if (noteArray.length == 0) {
            let card = document.createElement('div');
            card.setAttribute('class', 'card m-1 g-col-12');
            card.innerHTML = `<div class="card-body">
                                <h5 class="card-title">Add Notes</h5>
                                <p class="card-text">Click the 'Add Note+' button to create your first note.</p>
                            </div>`;
            allCardContainer.append(card);
        }
    }
    static viewFull(heading, note, date) {
        allCardContainer.style.display = "none";
        mainAddBtn.style.display = "none";
        cardView.style.display = "block";
        cardViewHeading.innerText = heading;
        cardViewDate.innerText = date;
        cardViewNote.innerText = note;
        return;
    }
}

// first function calls
// fetchUserNoteCards();
Card.render();
Card.checkEmpty();

let prevEdit = null;

const cardHeading = document?.querySelector(".card_heading");
const cardNote = document?.querySelector(".card_note");
const addNoteBtn = document?.querySelector(".addNoteBtn");

//creates card on click  
addNoteBtn.addEventListener('click', () => {
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
            NoteElementObj.date = month + "-" + theDate + "-" + year;
            cardNote.value = "";
            cardHeading.value = "";
            noteArray.push(NoteElementObj);
            Card.render();
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
        noteArray.splice(elementIndex, 1);
        Card.render();
        Card.checkEmpty()
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
    mainAddBtn.style.display = "block";
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



