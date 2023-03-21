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
            const newData = []

            data.forEach(element => {
                
                element.meanings.forEach(underData => {
                    const newObj = {partOfSpeech: underData.partOfSpeech, definitions: underData.definitions.length}
                    newData.push(newObj)
                    
                })
            });

            const counts = newData.reduce((acc, cur) => {
                acc[cur.partOfSpeech] = (acc[cur.partOfSpeech] || 0) + cur.definitions;
                return acc;
              }, {});
              
            const newPartOfSpeechFreshArray = Object.entries(counts).map(([partOfSpeech, definitions]) => ({ partOfSpeech, definitions }));
            
            let largeObj = newPartOfSpeechFreshArray[0]

            newPartOfSpeechFreshArray.forEach(newData => {
                if(newData.definitions > largeObj.definitions){
                    largeObj = newData
                }
            })
            
            if(whQues.includes(getFirstWord)){
                console.log("This is a question. it started with WH question");
                questionHandler(message)
            }else if(largeObj.partOfSpeech === "verb"){
                console.log("This is a question. it started with verb");
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

function sumDefinitionsByPartOfSpeech(arr) {
    const sumObj = {};
    for (const obj of arr) {
      const { partOfSpeech, definitions } = obj;
      if (!sumObj[partOfSpeech]) {
        sumObj[partOfSpeech] = definitions;
      } else {
        sumObj[partOfSpeech] = sumObj[partOfSpeech].concat(definitions);
      }
    }
    const result = [];
    const seen = new Set();
    for (const obj of arr) {
      const { partOfSpeech } = obj;
      if (!seen.has(partOfSpeech)) {
        seen.add(partOfSpeech);
        result.push({
          partOfSpeech,
          definitions: sumObj[partOfSpeech],
          synonyms: [],
          antonyms: []
        });
      }
    }
    return result;
  }
  
