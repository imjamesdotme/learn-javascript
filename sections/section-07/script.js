// Lights
var lights = document.getElementsByClassName('light');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');

// Buttons
var reset = document.getElementById('reset');
var start = document.getElementById('start');
var cancel = document.getElementById('cancel');

function toggleLight(event) {
  this.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
  for (var i = 0; i < lights.length; i++) {
    lights[i].addEventListener('click', toggleLight);
  }
});

function resetLights() {
  for (var i = 0; i < lights.length; i++) {
    lights[i].classList.remove('active');
  }
}

reset.addEventListener('click', resetLights);

// Automate lights.
var index = 0;
var timer;

function automateLights() {
  // Turn on the light for the current index.
  lights[index].classList.add('active');

  // Turn off the previous light - we don't want to cause any accidents!
  if (index > 0) {
    lights[index - 1].classList.remove('active');
  }

  // Increment index by 1, ready for the next light.
  index += 1;

  // If we're on the last light, reset - so we can start again.
  if (index === lights.length) {
    index = 0;
  }
}

start.addEventListener('click', function() {
  timer = setInterval(automateLights, 2000);
});
