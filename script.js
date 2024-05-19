// document.getElementById('days').innerHTML;
// document.getElementById('hours').innerHTML;
// document.getElementById('minutes').innerHTML;
// document.getElementById('seconds').innerHTML;

const countDownDate = new Date('june 10, 2024  17:30:25').getTime();

let x = setInterval(() => {
const today = new Date().getTime();

// difference between countdown and today
let distance = countDownDate - today;

const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the results in the elements with respective IDs
document.getElementById("days").textContent = days.toString().padStart(2, '0');
document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.querySelector(".countdown").innerHTML += "<div>EXPIRED</div>";
}

}, 1000);