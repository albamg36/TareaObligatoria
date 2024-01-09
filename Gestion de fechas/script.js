const birthday= new Date ("2024-06-17");

function updateCountdown(){
    const now= new Date();
    const timeLeft = birthday - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent=days;
    document.getElementById("hours").textContent= hours;
    document.getElementById("minutes").textContent= minutes;
    document.getElementById("seconds").textContent= seconds;

    if(timeLeft <= 0){
        document.getElementById("countdowm-timer").style.display= "none"; 
        document.querySelector(".images-background").innerHTML= '<img src="imagenes/tarta.png"><h2>¡Felicidades!</h2>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();