const sendMessageInput = document.getElementById("sendMessageInput")
const sendMessageBtn = document.getElementById("sendMessageBtn")

sendMessageBtn.addEventListener("click", () => {
    const message = sendMessageInput.value
    console.log("Its working!");

})