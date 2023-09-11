let allCardContainer = document.querySelector(".allCardContainer")
let addNoteBtn =  document.querySelector(".addNoteBtn")

addNoteBtn.addEventListener('click',()=>{
    let card = document.createElement('div')
    card.setAttribute('class','card mb-3')
    card.innerHTML =`<div class="card-body">
                        <h5 class="card-title">Card Note Heading</h5>
                        <p class="card-text">ipsum dolor sit amet consectetur adipisicing elit. Sit nesciunt et facere neque pariatur blanditiis accusamus perspiciatis placeat rem ipsam nostrum deserunt dignissimos consequatur nobis, eos veritatis unde. Aperiam, nobis!</p>
                        <a href="#" class="btn btn-success">View Full</a>
                        <a href="#" class="btn btn-success">Delete</a>
                    </div>`
    
    allCardContainer.appendChild(card) 
})

