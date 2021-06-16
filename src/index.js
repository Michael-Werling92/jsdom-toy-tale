let showTheForm = false;

const API_DATABASE_URL = "http://localhost:3000/toys"
  console.log("Toy Datbase:", API_DATABASE_URL)


document.addEventListener("click", (event)=>{ console.log("You Clicked on:", event.target) }  )


document.addEventListener("DOMContentLoaded", () => {

  
  const toyFormContainer = document.querySelector(".container");
  const addBtn = document.querySelector("#new-toy-btn");

    addBtn.addEventListener("click", () => {

      // Hide & Seek With The Form ;)
      showTheForm = !showTheForm;
      if (showTheForm) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }

    });
  })
  const renderToy =(toyObj)=> {
      const cardDiv = document.createElement("div")
      cardDiv.classList.add("card")
        cardDiv.setAttribute("data-id", toyObj.id)
        cardDiv.id = toyObj.id

      // use innerHTML to create the inner elements
      cardDiv.innerHTML = `
          <h2>${toyObj.name}</h2>
          <img src=${toyObj.image} class="toy-avatar" />
          <p>${toyObj.likes} Likes </p>
          <button data-id="${toyObj.id}" class="like-btn">Like <3</button>
          `

      
      const collectionDiv = document.querySelector("#toy-collection")
      collectionDiv.append(cardDiv)
    }

    const renderAllToys =(toyArray)=> {


      toyArray.forEach(toyObj => { renderToy(toyObj)})
    }









  //=====  BASIC GET FETCH PROCESS  ========


  fetch(API_DATABASE_URL).then(response => response.json())
  .then(fetchedArray => { console.log(fetchedArray);
  renderAllToys(fetchedArray)
  })

  const newToyForm = document.querySelector(".add-toy-form")

    newToyForm.addEventListener("submit", event =>{ event.preventDefault(); 
      
        const name = event.target.name.value
        const image = event.target.image.value
        const submit = event.target.submit


        fetch(API_DATABASE_URL, {
      
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({ 
            "name": name,
            "image": image,
            "likes": 0
          })
      
        })
        .then(response => response.json())
        .then(theThingWePostedButFromTheServer => renderToy(theThingWePostedButFromTheServer) )  
    })
      





  
  //========  DELETE + EDIT FETCH (Based on Buttons)  ========


  const cardsCollection = document.querySelector("#toy-collection")

    cardsCollection.addEventListener("click", event =>{ event.preventDefault(); 

    if (event.target.matches(".like-btn")) {

      const pTagWithLikes = event.target.closest(".card").querySelector("p")
        
      const likeCount = parseInt(pTagWithLikes.textContent)
      const newLikes = likeCount + 1
      const id = event.target.dataset.id
      const bodyObj = {likes: newLikes}

      
  
      fetch(`${API_DATABASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      })
      .then(r => r.json())
      .then(updatedToy => {
        pTagWithLikes.textContent = `${updatedToy.likes} Likes`
      })
    }
  })

          