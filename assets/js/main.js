const sendMessageInput = document.getElementById("sendMessageInput")
const sendMessageBtn = document.getElementById("sendMessageBtn")

sendMessageBtn.addEventListener("click", () => {
    getData()
})

function getData(){
     const message = sendMessageInput.value
    // const message = "can me your name"
    
    const whQues = ["what", "who", "how"]
    const getFirstWord = message.split(" ")[0].toLocaleLowerCase()
 
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getFirstWord}`)
        .then(response => response.json())
        .then(data => {
            var large = {}
            var largeLength = 0
            largeLength = data[0].meanings[0].definitions.length
            large = data[0].meanings[0]

            console.log(data);
            data.forEach(element => {
                // for(let i = 1; i < element.meanings.length; i ++){
                //     console.log("new under",element.meanings[i]);
                // }
                element.meanings.forEach(underData => {
                    console.log("under",underData);
                    if(underData.definitions.length > large.definitions.length){
                        large = underData
                    }
                })
            });
            
            // console.log("Data",data);
            // console.log("Large",large);
            if(large.partOfSpeech === "verb"){
                console.log("This is a question. it started with verb");
                questionHandler(message)
            }else if(whQues.includes(getFirstWord)){
                console.log("This is a question. it started with WH question");
                questionHandler(message)
            }else{
                console.log("This is not a question");
            }
        })
        .catch(error => console.error('Unable to get items.', error));
     
}

function questionHandler(question){
    if(question.includes("your name")){
        console.log("my name is web-assistant");
    } 
}

