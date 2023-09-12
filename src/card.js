const allCardContainer = document.querySelector(".allCardContainer")

//creates card on click   
const addNoteBtn =  document.querySelector(".addNoteBtn")
addNoteBtn.addEventListener('click',()=>{
    const cardHeading =  document.querySelector("#card_heading")
    const cardNote =  document.querySelector("#card_note")  
    let heading = cardHeading.value
    let note = cardNote.value
    if(heading!=""&&note!=""){
        createCard(heading,note)
        cardNote.value = ""
        cardHeading.value =""
    }
})
// const noteObj = []
function createCard(heading,note){
    let card = document.createElement('div')
        card.setAttribute('class','card mb-3')
        card.innerHTML =`<div class="card-body">
                            <h5 class="card-title">${heading}</h5>
                            <p class="card-text">${note}</p>
                            <a href="#" class="btn btn-success">View Full</a>
                            <a href="#" class="btn btn-success deleteCardBtn">Delete</a>
                        </div>`
        
        allCardContainer.appendChild(card) 
}
//deletes a card on 
const deleteCardBtn =  document.querySelectorAll(".deleteCardBtn")
allCardContainer.addEventListener('click',(e)=>{
       if( e.target.getAttribute("class").includes("deleteCardBt")){
        e.target.parentNode.parentNode.remove()
       }
    
})

// deleteCardBtn.addEventListener('click',(e)=>{
//     console.log(e.target.parentNode.parentNode)   
// })

