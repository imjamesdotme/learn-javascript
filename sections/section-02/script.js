// Lights
var lights = document.getElementsByClassName('light');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');

red.addEventListener('click', function() {
  red.classList.toggle('active');
});
