const sendMessageInput = document.getElementById("sendMessageInput")
const sendMessageBtn = document.getElementById("sendMessageBtn")

// var url; = 'https://api.dictionaryapi.dev/api/v2/entries/en/tell';

function getItems(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => console.log("uporar",data))
      .catch(error => console.error('Unable to get items.', error));
  }

sendMessageBtn.addEventListener("click", () => {
    getData()
})

async function getData(){
     const message = sendMessageInput.value
    // const message = "talk me your name"
    
    const whQues = ["what", "who", "how"]
    const getFirstWord = message.split(" ")[0].toLocaleLowerCase()
 
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getFirstWord}`)
        .then(response => response.json())
        .then(data => {
            var large = {}
            large = data[0].meanings[0]
            data.forEach(element => {
                element.meanings.forEach(underData => {
                    if(underData.definitions.length > large.definitions.length){
                        large = underData
                    }
                })
            });
            if(large.partOfSpeech === "verb"){
                console.log("This is a question. it started with verb");
            }else if(whQues.includes(getFirstWord)){
                console.log("This is a question. it started with WH question");
            }else{
                console.log("This is not a question");
            }
        })
        .catch(error => console.error('Unable to get items.', error));
     
}



