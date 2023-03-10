const sendMessageInput = document.getElementById("sendMessageInput")
const sendMessageBtn = document.getElementById("sendMessageBtn")

// var url; = 'https://api.dictionaryapi.dev/api/v2/entries/en/tell';


function getItems(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Unable to get items.', error));
  }

sendMessageBtn.addEventListener("click", () => {
    // const message = sendMessageInput.value
    const message = "tell me your name"
    
    const whQues = ["what", "who", "how"]
    const getFirstWord = message.split(" ")[0].toLocaleLowerCase()
    console.log(getFirstWord);

    if(whQues.includes(getFirstWord)){
        console.log("This is wh question");
    }else{
        // console.log(getItems(`https://api.dictionaryapi.dev/api/v2/entries/en/${getFirstWord}`));
            
        getItems(`https://api.dictionaryapi.dev/api/v2/entries/en/${getFirstWord}`)
    }

})

// function getData(data){
//     console.log(data);
// }



