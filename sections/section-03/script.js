// Lights
var lights = document.getElementsByClassName('light');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');

function toggleLight(event) {
  this.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
  for (var i = 0; i < lights.length; i++) {
    lights[i].addEventListener('click', toggleLight);
  }
});
