// Get all the container elements
const containers = document.querySelectorAll('.flip-card-container');

// Get the individual time element containers
const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

// Set the initial time in seconds (9 days)
const initialTime = 777600;

// Check if the 'time' key exists in local storage, if not, set the initial time
if (!localStorage.getItem('time')) {
    localStorage.setItem('time', initialTime);
}

function countDown() {
  // Initialize an array to store time values for each container
    const times = [{}, {}, {}, {}];

  // Get the current time value from local storage
    let total = parseInt(localStorage.getItem('time'));

  // If the 'time' key doesn't exist in local storage, set the initial time
    if (!total) {
    localStorage.setItem('time', initialTime);
    total = initialTime;
}

  // If the time has run out, reset to the initial time
    if (total <= 0) {
    localStorage.setItem('time', initialTime);
    total = initialTime;
}

  // Decrement the time by 1 second
    localStorage.setItem('time', total - 1);

  // Calculate the remaining seconds and update the times array
    let s1 = Math.floor(total % 60);
    times[3].front = s1;
    times[3].back = s1 === 0 ? 59 : s1 - 1;
  console.log(s1); // Log the remaining seconds for debugging

  // Calculate the remaining minutes and update the times array
    total /= 60;
    let m1 = Math.floor(total % 60);
    times[2].front = m1;
    times[2].back = m1 === 0 ? 59 : m1 - 1;

  // Calculate the remaining hours and update the times array
  total /= 60;
  let h1 = Math.floor(total % 24);
  times[1].front = h1;
  times[1].back = h1 === 0 ? 23 : h1 - 1;

  // Calculate the remaining days and update the times array
  let d1 = Math.floor(total / 24);
  times[0].front = d1;
  times[0].back = d1 === 0 ? 0 : d1 - 1;

  // Loop through each container and update the time display
  let i = 0;
  containers.forEach((container) => {
    // Get the clock, front, and back elements for the current container
    const clock = container.querySelector('.flip-inner-content');
    const front = container.querySelector('.flip-card-top');
    const back = container.querySelector('.flip-card-bottom');

    // Format the time values for display
    const frontTime =
      times[i].front < 10 ? '0' + times[i].front : times[i].front;
    const backTime = times[i].back < 10 ? '0' + times[i].back : times[i].back;

    // Update the data attributes and text content for the current container
    clock.dataset.before = frontTime;
    clock.dataset.after = backTime;
    front.textContent = frontTime;
    back.textContent = backTime;

    // Add an event listener to handle the animation end
    container.addEventListener(
      'animationend',
      () => {
        // Remove the 'flip' class and update the time display
        container.classList.remove('flip');
        front.textContent = back.textContent;
        clock.dataset.before = clock.dataset.after;
      },
      { once: true }
    );

    i++;
  });

  // Add the 'flip' class to the seconds container to trigger the animation
  seconds.parentElement.classList.add('flip');

  // If seconds is 00, add the 'flip' class to the minutes container
  if (seconds.dataset.before == '00') {
    minutes.parentElement.classList.add('flip');
  }

  // If seconds and minutes are 00, add the 'flip' class to the hours container
  if (seconds.dataset.before == '00' && minutes.dataset.before == '00') {
    hours.parentElement.classList.add('flip');
  }

  // If seconds, minutes, and hours are 00, add the 'flip' class to the days container
  if (
    seconds.dataset.before == '00' &&
    minutes.dataset.before == '00' &&
    hours.dataset.before == '00'
  ) {
    days.parentElement.classList.add('flip');
  }

  // If all time values are 00, reset the timer to the initial time
  if (
    seconds.dataset.before == '01' &&
    minutes.dataset.before == '00' &&
    hours.dataset.before == '00' &&
    days.dataset.before == '00'
  ) {
    localStorage.setItem('time', initialTime);
  }
}

// Call the countDown function initially
countDown();

// Call the countDown function every second
setInterval(countDown, 1000);


