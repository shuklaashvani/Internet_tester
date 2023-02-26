const popup = document.querySelector(".popup")
let isOnline = true,IntervalId,timer=10
let body_content = document.querySelector(".body_content")
let popupTitle = document.querySelector(".title")
let popupDesc = document.querySelector(".desc")
let wifiIcon = document.querySelector(".icon")  
let Reconnect = document.querySelector(".reconnect")

const checkConnection = async() =>{
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status>=200 && response.status<300;
        
    } catch(err){
        isOnline = false;
    }
    timer = 10;
    clearInterval(IntervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) =>{
    
    if(status){
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored connection"
        popupDesc.innerHTML = "Your device is now successfully connected to the internet."
        return setTimeout(()=>{
            popup.classList.remove("show")
            body_content.classList.add("show");
        },2000);
    }
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost connection"
    popupDesc.innerHTML = "Your network is unavailable. we will attemp to reconnect you in <b>10</b> seconds."
    popup.classList.add("show");
    body_content.classList.remove("show");
    
    IntervalId = setInterval(()=>{
        timer--;
        if(timer<=0){
            checkConnection();
        }else{
            popup.querySelector(".desc b").innerText = timer
        }
    },1000)
}

setInterval(()=>isOnline && checkConnection(),3000)

Reconnect.addEventListener('click',checkConnection)