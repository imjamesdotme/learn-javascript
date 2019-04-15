# Learning JavaScript

## Introduction

We're going to develop a traffic light using HTML, CSS & JavaScript. We'll start with a refresher on HTML & CSS then we'll learn where Javascript comes into play.

Our first goal is going to be ensuring our traffic light can be manaully controlled, then well be automating our traffic light once we're a little more comfortable with JavaScript.

## Getting set-up

Locate the folder `learn-javascript` which is likely on your computer's desktop. Take a moment to have a look at the structure and nose around. You'll see there are then section folders, each of these contain the complete code for that section - just in case you need a helping hand or want to review the code later on.

Next we need to open a Text Editor, this could be Visual Code Studio, Atom or whatever your preference maybe. If you haven't got an editor installed, Visual Code Studio is developed by Microsoft and completely free.

Once your editor is open, we'll need to open up the project;

- In the top right, click 'File' and then 'Open'.
- Locate the folder `learn-javascript` and select 'Open'.
- The project will now be open on the left hand side of your text editor and you'll see two folders.
- In the `sections` folder, you'll be able to view the complete code for each section.
- The `start` folder is the directory we'll be working from, it includes all the files we'll need along with some handy boilerplate code meaning we can get stuck in straight away.
- View the `index.html` file in your browser before we get started.

## Section One

Let's kick off with a little refresh on HTML & CSS. As you've seen from the `index.html`, we've got a traffic light but no lights! Let's go a head and add some HTML for our lights, then we'll style them afterwards.

In your code editor open the `index.html` file and locate the block of code with the class `traffic-light`, it'll look like this;

```html
<div class="traffic-light"></div>
```

Inside of this block, let's add our lights. Add three `div` elements and give each of them an `id` with the colour of the light and also the `class` of `light`.

**Reminder** - `id`'s are unique elements, only one can exist in the document, whereas `class` is reusable and can be used as many times as you like. `class` is really useful if you want the same styling repeatedly and don't want to keep typing out the same code.

```html
<div class="traffic-light">
  <div id="red" class="light"></div>
  <div id="yellow" class="light"></div>
  <div id="green" class="light"></div>
</div>
```

If you refresh the `index.html` file in your browser, you'll notice nothing has changed, let's add the CSS to make these show up.

At the bottom of the `styles.css` file, let's first define what our light looks like. Other than their colour, we know the lights all need to share the same properties - they need to be round as well having the same height and width. Let's use a CSS `class` so we don't have to write this for each individual light, we can apply this standard styling across all our lights.

```css
.light {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #ffffff;
  margin: 10px auto;
  opacity: 0.4;
}
```

Below our light, we'll add some CSS for another selector. This'll take care of which light is active and make sure it's visible. We won't be using this right now but we'll set it up ready for use with our JavaScript later on.

```css
.light.active {
  opacity: 1;
}
```

**Note** When you see two selectors without a space between them, this means both the classes must be present & together on an element in order for the style to be applied, for the CSS above, our HTML would need to look like this`<div class="light active">`.

Refreshing your `index.html` you'll now see three blank lights. Let's go a head and add our traffic light colours now.

In our HTML we defined three `id`'s named `red`, `yellow` & `green`. We need to add our colours to those. Add the following CSS rules to the bottom of your `styles.css` file.

```css
#red {
  background-color: red;
}

#yellow {
  background-color: yellow;
}

#green {
  background-color: green;
}
```

Take another look in the browser and you'll now see you've got coloured lights. Because our `.light` class set the `opacity` property with a value of `0.4` they're all looking a bit dull, this will change once we add the `active` class to the light we want to switch on.

## Section Two

Now we've got some lights, let's work on being able to turn each light on or off by clicking on it.

We're ready to write some JavaScript. Open the `script.js` and you'll be greeted with an empty file. At the top of this file, we're first going to define some variables.

Let's start by adding some variables for our lights. These variables will get the reference to our lights from the HTML and store them, ready for us to use.

Add the following to your JavaScript file;

```javascript
// Lights
var lights = document.getElementsByClassName('light');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');
```

What does all this mean? Let's look at the `var` keyword & two types of syntax we've written;

We've used the `var` keyword several times. `var` is short for _variable_. A _variable_ is used to store information, this is very useful when you need to reuse a piece of information. For example, if you want to greet your users, you may not want to type out the greeting copy each time, so you could store this in a variable `var greeting = 'Good morning,'`. Now anytime you need to use this message, you can access the variable. For example `console.log(greeting + ' person')` would print out `Good morning, person`.

First of all `var lights = document.getElementsByClassName('light');`. What we're doing here is getting _all_ the elements in our document that have a `class` name of `light` and storing them in a variable called `lights`. We'll make good use of this a little later.

Next, for each colour of light we're getting those and storing them into variables using `var red = document.getElementById('red');`. Unlike `document.getElementsByClassName` which returns a collection of all elements with the same class name, `document.getElementById` will only get a single item (**remember** id's are unique, there should only be one).

_Why_ are we doing this? We're storing these references into variables, so every time for we want to access the red light for example we can just write `red`, rather than having to keep typing `document.getElementById('red')` every time we need access to it.

We're now ready to hook up our buttons to control our lights! Underneath our variable, let's add an event listener. Our event listener should wait until the red button is clicked, then when its clicked, run the function to _toggle_ our `active` class on the red light - so if the active class hasn't been added, add it and vice verse - if it has been added, remove it.

```javascript
red.addEventListener('click', function() {
  red.classList.toggle('active');
});
```

We could have also written this using an `if` statement like so;

```javascript
if (red.classList.contains('active')) {
  red.classList.remove('active');
} else {
  red.classList.add('active');
}
```

`toggle`'s doing exactly the same job as this `if` statement and in a single line of code!

If you now go back to your browser, refresh and click the red light, you should now be able to toggle the light on & off.

That's great - now we need to be able to control all the other lights. We could simply, copy the code we've written for the red light and just change it so it works with the other lights but we'd be repeating ourselves a lot. Let's use the DRY principle - _'Don't Repeat Yourself'_ in the next section and figure this out.

## Section Three

First of all, let's remove the `EventListener` function we added in the last section;

```javascript
// Lights
var lights = document.getElementsByClassName('light');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');

// Delete this code from script.js - don't worry, we'll write something better!
red.addEventListener('click', function() {
  red.classList.toggle('active');
});
```

Now let's set about writing our first `function` that handles _toggling_ our lights on or off. Our ultimate goal here is to have a single piece of reusable code that we can use to control all our lights. Add the following code to your file.

```javascript
function toggleLight(event) {
  this.classList.toggle('active');
}
```

Is that all? Yes, you'll notice the code in our new function looks _almost_ identical to the code we had in our `EventListener` function previously, there is just one _important_ key difference, `this`. `this` is a keyword in JavaScript that gives us access to the current context - depending on where and how we use the word, largely depends on what it provides us. The usage of this `this` is a little more of an advanced subject that we won't go into detail with here. The important thing to know is in our function `this` references the element which has been clicked. We want to change the colour of the light that was clicked, `this` provides us everything we need and stops us doing something far more verbose such as the example code below.

```javascript
// More verbose example. Don't copy this code :)
function toggleLight(event) {
  // Get the clicked lights ID value.
  var colour = event.target.id;

  // Using the clicked lights ID value - find the light element.
  var light = document.getElementById(colour);

  // Toggle the active class on the light.
  light.classList.toggle('active');
}
```

Lastly, we need to add back in an event listener like we used previously, only now we need to make it work for all the lights. We could write something like this;

```javascript
red.addEventListener('click', toggleLight);
yellow.addEventListener('click', toggleLight);
green.addEventListener('click', toggleLight);
```

By all means, go head and add the code above to your `script.js` file and see it working for yourself (just remember to remove it again afterwards). But the above code would be going against the _'Don't Repeat Yourself'_ philosophy, so how else could we go about it?

Earlier on we defined a variable named `lights`, which held a collection of all of our lights, let's make use of that. Using a `for` loop, we can iterate over each of our `lights` and add the event listener.

Add the following to the bottom of your script;

```javascript
for (var i = 0; i < lights.length; i++) {
  lights[i].addEventListener('click', toggleLight);
}
```

What this doing? A `for` loop allows us to iterate or go over a collection of data such as an `array` and for each item do something. In this case, the loop will run three times, once for each of our lights. Each time it runs, it adds the event listener with the arguments of `click` and the function `toggleLight`.

A `for` loops structure might look a little busy until you get used to seeing it - let's take a look at what's going on;

`for(var i = 0; i < lights.length; i++)` First of all we set a variable equal to `0`, we usually name this `i` which is short for _iterator_. Next is our statement, if the value of `i` is less than the length of our array, then we want to run the loop and code in the curly braces. Finally `i++` increments the variable `i` by one, this would be the same as writing `i = i + 1` - it's just shorter and in this context, easier to read.

Switch back to the browser, refresh and take it for a spin.

**Something up?** You may have flicked over to the browser and the buttons may not have quite worked as expected. What's happening? When we first load our page, lots is happening in the browser, such as our HTML document being rendered, our CSS painted on to the page and our JavaScript firing up. In some cases, our JavaScript may run before the HTML is ready which then causes our JavaScript to throw errors or not work as expected - this is because our JavaScript is dependant on the HTML (**remember** we need to get all the lights from the HTML). There is something we can do, add the following event listener to your code;

```javascript
document.addEventListener('DOMContentLoaded', function() {
  for (var i = 0; i < lights.length; i++) {
    lights[i].addEventListener('click', toggleLight);
  }
});
```

What we've done is add an event listener with the argument `DOMContentLoaded`, this means we want to wait until our page is fully loaded, then run our `for` loop. If you ever noticed any odd behaviour with your script, this is always a good place to start - it might be that your code needs to run when everything is fully loaded, this is especially the case on much larger websites.

## Section Four

We've now got full control over our lights, we can turn each of them on & off again. Let's extend this a little further and add a 'reset' button, so we can reset all the lights to the off position (this'll also come in handy a little later).

First off, let's jump back to our `index.html` file. Let's a reset button into the `traffic-control` block;

```html
<button id="reset">Reset</button>
```

The code in our HTML file should now look like this;

```html
<div class="traffic-control">
  <button id="reset">Reset</button>
  <div class="automated-controls"></div>
</div>
```

Moving back to our `script.js` file, we need to do three things - add a variable, a new function & event listener. First off, let's add a variable for this button. Underneath our light variables, add the following;

```javascript
var reset = document.getElementById('reset');
```

The top section of our `script.js` file should now look like this;

```javascript
// Lights
var lights = document.getElementsByClassName('light');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');

// Buttons
var reset = document.getElementById('reset');
```

And now back at the bottom of the script file, let's add a function named `resetLights`. We'll make use of that handy `for` loop again, iterate over each light and remove the class `active`.

Add the following code;

```javascript
function resetLights() {
  for (var i = 0; i < lights.length; i++) {
    lights[i].classList.remove('active');
  }
}
```

As you can see, the behaviour in this function is very similar to the one we used to for toggling the lights on & off but this time we're making use of `remove()` from `classList`. If the light has the class `active`, it'll be removed, otherwise theres nothing to remove!

Finally let's hook this up to our button, below our new function add the following line of code;

```javascript
reset.addEventListener('click', resetLights);
```

Just like we've done before, we've attached this event listener to listen for `clicks` on our reset button and when that happens, run the function `resetLights`. Go ahead and test it out in your browser!

## Section Five

We've come a long way so far, going from having lights that don't work to lights that can now be controlled to be on or off and reset them all back off!

Up until now, our traffic light has been dependent on us doing all the work - we're responsible for ensuring the lights go and off. Let's dive deeper into what JavaScript can do and automate our lights. Our new feature is going to enable the lights on our traffic light to automatically change every two seconds.

We'll get started by adding two new buttons to our HTML file - one for starting off the sequence and we'll need another button to cancel it, just incase we want manual control again. Finally we'll want to add these buttons as variables in our JavaScript file.

Back in your `index.html` file, locate the `traffic-control` block of code & add the following HTML;

```html
<div class="automated-controls">
  <h2>Automated Controls</h2>
  <button id="start">Start</button>
  <button id="cancel">Cancel</button>
</div>
```

The `traffic-control` block of HTML should now look like this;

```html
<div class="traffic-control">
  <button id="reset">Reset</button>
  <div class="automated-controls">
    <h2>Automated Controls</h2>
    <button id="start">Start</button>
    <button id="cancel">Cancel</button>
  </div>
</div>
```

Switching back over to our `scripts.js` file, right below were we added the reset button we'll add our `start` and `cancel` buttons as variables. Before looking at the code below, can you figure out from the code we've already written how to do this? Give it a shot & if you get stuck, look at the code below.

```javascript
var start = document.getElementById('start');
var cancel = document.getElementById('cancel');
```

The section of our script with code related to buttons, should now look like this;

```javascript
// Buttons
var reset = document.getElementById('reset');
var start = document.getElementById('start');
var cancel = document.getElementById('cancel');
```

## Section Six

We've made good progress in getting our HTML & JavaScript prepared for our new feature. Let's continue by adding some more variables that'll help us and a `function` to control the lights. This next section is going to get a little busy - we'll look at each piece of code we add and then review it in full at the end too.

At the bottom of the script file, let's add two variables like so;

```javascript
var index = 0;
var timer;
```

Here we've added a variable named `index`, it's sole job is going to keep track of our lights. Why start at zero & not one? JavaScript uses _zero based indexing_, this means that all arrays and collections of data start at zero. For example, if you recall that earlier our `lights` variable held a collection our lights - if we wanted to access them by number in the list then it would be like this;

```
0 - Red Light
1 - Yellow Light
2 - Green Light
```

This can take a while to get your head around, so don't worry too much at the moment. If you want check this out, open your browsers developer tools, locate the console and try typing `lights` or `lights[0]` to see this in action.

Next we added `timer`, it's job it going to be looking after whether our timer is running or not. As you may be able to tell, it's starting out empty which is because we don't want it running as soon as our page loads - we'll worry about giving it something to do a bit later.

Below our newly defined variables, let's begin building up a new function to handle the lights. Add the following code;

```javascript
function automateLights() {}
```

Before we add any code to our `automateLights` function, let's think about what we actually need to happen inside of it! Our function is going to run once every two seconds. We know that we want each light to turn on automatically, we don't want to cause any accidents so we'd better turn off the previous light as well. We mentioned using the `index` variable to keep track of our lights, so it would be a good idea to update `index` each time a light changes. Let's break this logic down into a list for each time the function will run;

1. Add the `active` class to the light that's currently being reflected by the `index` value.
2. Remove the `active` class from the previous light.
3. Increment the value of `index`, so we know which light is next.
4. If we're on the last light, then we'll need to reset index back to `0` so we can start again.

Starting with the first item on our list, using the current `index` value we'll make the light active. Inside of the function add the following code;

```javascript
// Turn on the light for the current index.
lights[index].classList.add('active');
```

Awesome! So let's just be clear on what we're doing here. `lights[index]` - here we're using _bracket notation_, this allows us to access a collection or array at a given point. We've initially given our `index` variable the value of `0`, so currently this is the same as saying `lights[0]` which would give us access to our red light. Next up we've got `classList` again & we're using it to `add` the class `active` to turn the light on.

Our next item in the list is to remove the `active` class from the previous light. We're going to need an `if` statement here, as we can't turn off the previous light if we're starting from `0` (**remember** collections & arrays start from `0`). So we'll use an `if` statement to make sure our `index` value is _more than_ `0`. So for example, when the value of `index` is `1` the `if` statement would be `true` meaning it'll execute. When the statement executes we'll run `lights[index - 1].classList.remove('active')`. As you can see, this is _very_ similar to the previous line, although this time we're doing a little math within the _bracket notation_. `lights[index - 1]` inside of the _bracket notation_ we're taking the value of `index` and minus `1` from it, this is how we work out the previous light's number. Using that number we can then access it and remove the class `active`.

Let's go a head and add this line to our function;

```javascript
// Turn off the previous light - we don't want to cause any accidents!
if (index > 0) {
  lights[index - 1].classList.remove('active');
}
```

If we didn't add this `if` statement, our code would simply error as it would never find `-1` in the `lights` variable & the light would stay red.

Our third item on the list requires us to _increment_ the value of `index` so we know which light is going to be next. Remember we can update values of variables that have already been defined, we don't need to use the `var` keyword again. So we could write it like this;

```javascript
// Increment index by 1, ready for the next light.
index += 1;
```

Here we're saying the variable `index`'s value is now the `index` value plus `1`. So if the `index` was `1` and we add `1` to it, the value of `index` would now be `2`. So the next time our function runs, it knows it's working with the light of `index` value `2` - which in our case would be the green light (**remember** we start counting from 0). For verbosity, can also write this as `index++` (like we did with our `for` loops) or as `index = index + 1`. As you have and will see in the future, there are lots of ways in which we can write code that functions the same. How you go about writing is up to you but rest assured you will get familiar with the syntax and shorthand versions over time.

The fourth and final item on our list covers the need to reset the `index` value back to `0` when we get to the last light. Using an `if` statement again here would be perfect. We'll need to tell the `if` statement how many lights we've got, we could simply give it the value of `3` but then if we added more lights in the future we'd need to remember to update this value. JavaScript includes a very handy property that will tell us the `length` of a string, array or collection. Let's make use of this, so if for some reason we add another light later on then we don't have to worry about updating this value.

At the bottom of our function, let's add the following;

```javascript
// If we're on the last light, reset - so we can start again.
if (index === lights.length) {
  index = 0;
}
```

`lights.length` will be equal to 3, so when our last light is turn off the `index` value would then become `3` causing the above `if` statement to be `true` and run the line `index = 0`, resetting our `index` variable so we can cycle through the lights again.

The complete function code should now look like this;

```javascript
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
```

## Section Seven

Let's wire up our start button so we can test our new function out. At the bottom of the script file, let's add an event listener that listens for clicks on our `start` button variable. Remember earlier we defined a variable named `timer` but didn't give it a value? Now we're going to give it a value, how do we do that? When a variable is first initialised we use the keyword `var`, so we wrote `var timer`. Now as you'll remember, up until now, every time we'd created a variable we've written it's name followed by `=` and then a value (such as `document.getElementById('red')`). As we've already defined `timer`, we can now just set a value to it - we don't need to define it as variable again.

At the bottom of the script, let's add the following;

```javascript
start.addEventListener('click', function() {
  timer = setInterval(automateLights, 2000);
});
```

Now once our `start` button is clicked, we assign the value `setInterval(automateLights, 2500)` to the `timer` variable.

Wait, what is `setInterval`? `setInterval` is JavaScript function we can use to run a piece of code over and over based on a given time value. In our case, we're saying run the function `automateLights` every `2000` milliseconds which is two seconds.

Refresh your browser, click the 'Start' button and see what happens!

_Ah_, the green light is always on! Can you think why this maybe? Do you remember our block of code for turning off the previous light? In it we said `if` the value of `index` was _more than_ `0` then we'd turn off the previous light. We know this code is working, as the red light gets turned off when the yellow light is on. Our green light isn't being turned off when the red light comes back on because we never told it how to turn it off - we only instructed our script to turn off previous lights after 0. Let's fix this issue in the next section.

## Section Eight

We need to apply a fix to our `automateLights` function. Although it's core functionality it working as we'd like, the green light doesn't get turned off which is going to cause some serious traffic issues.

We could fix this by adding another `if` statement to check if the `index` value is `0` to make sure the last light in `lights` has the `active` class removed but we also wrote a really handy function earlier on.

Do you recall earlier in this tutorial, we wrote a function named `resetLights`? Why don't we re-use that? We can refactor our code to use this and then we don't have to ever check the `index` or worry about the last light being left on. We can simply call this function every time our `automateLights` function runs.

First of all, let's remove the `if` statement we previously added to turn off the previous light. Delete the following from inside the function;

```javascript
// Delete this code
//Turn off the previous light - we don't want to cause any accidents!
if (index > 0) {
  lights[index - 1].classList.remove('active');
}
```

Finally at the very top of the function, let's call our `resetLights` function. From now on, every time our `automatedLights` function runs, we'll call `resetLights()` and clear any active lights. Add the following to the top of the function;

```javascript
resetLights();
```

Our function's code should now look like this;

```javascript
function automateLights() {
  // Reset all lights.
  resetLights();

  // Turn on the light for the current index.
  lights[index].classList.add('active');

  // Increment index by 1, ready for the next light.
  index += 1;

  // If we're on the last light, reset - so we can start again.
  if (index === lights.length) {
    index = 0;
  }
}
```

Save, refresh and click the 'Start' button again. Boom! Our code is now running perfectly but there is no way to stop the lights from running unless we refresh the browser. Let's wire up our 'Cancel' button in the next section.

## Section Nine

Earlier on we added some HTML & set a JavaScript variable for a 'Cancel' button but we haven't done anything with it yet. We need to make the button stop the `automateLights` function from running, if you recall we used the variable `timer` with a value of `setInterval(automateLights, 2000)` to keep that function running continuously.

We'll start off as we've previously done by adding an event listener to the cancel button. At the bottom of the script, let's add the following code;

```javascript
cancel.addEventListener('click', function() {});
```

Just like we've done before, let's think about what we'd like to achieve when we use the cancel button.

1. Stop the `automateLights` function from running.
2. We should also reset the lights, so they're all turned off again.
3. Set the `index` value back to `0`, so if we click the 'Start' button again then our lights will start with red.

First of all, we need to stop the `setInterval` function from running on our `timer` variable. We can do this quite simply by declaring `clearInterval(timer)`, let's add that to our cancel function.

```javascript
cancel.addEventListener('click', function() {
  // Remove setInterval from timer.
  clearInterval(timer);
});
```

Great! If refresh, click 'Start' then 'Cancel' after a light or two have been on you'll now see we've managed to stop our traffic light from running. If you click 'Start' again, our code will pick up right from where it left off. Our code knows where to start again as the `index` variable is storing the value of the light we stopped on.

The last two items on our list are easy ones - why not try figuring it out yourself first?

The second item on our list mentioned resetting all the lights. Luckily we're experts at this now, we can simply call our `resetLights()` function & that'll take care of our needs. Go a head and add that to our code.

```javascript
cancel.addEventListener('click', function() {
  // Remove setInterval from timer.
  clearInterval(timer);
  // Reset all lights.
  resetLights();
});
```

Finally, the last item needs us to reset the value of the `index` variable to `0`. All we need to add in now is `index = 0`.

Our function should now look like this;

```javascript
cancel.addEventListener('click', function() {
  // Remove setInterval from timer.
  clearInterval(timer);
  // Reset all lights.
  resetLights();
  // Reset index.
  index = 0;
});
```

Jump back to the browser, refresh and try out the 'Start' and 'Cancel' buttons again. Now when you 'Cancel' everything should reset as if it was never used before!

## Section Ten

We now have lights that cycle through, and can be cancelled at any time. Fantastic! But what happens when we hit the 'Start' button loads of times? The lights start going haywire. So let's look at fixing that.

We need to find a way to check if the lights are already on. Let's use another `if` statement. Go back to your code, and find the `eventlistener` for your 'Start' button. Just above it, let's make a new variable that will tell us if the lights are on, or if they're off:

```javascript
var lightsOn = false;
```

We're using a _boolean_ value of `false` to tell us the current status of the lights. Now let's implement that `if` statement mentioned earlier to only allow the 'Start' button to start the sequence if the lights are off. Refactor your code to add the following `if` statement;

```javascript
var lightsOn = false;

start.addEventListener('click', function() {
  if (lightsOn === false) {
    timer = setInterval(automateLights, 2000);
    lightsOn = true;
  }
});
```

Save, refresh your browser, and spam the 'Start' button as much as you want. The cycle won't break. `lightsOn = true;` switches the boolean value of our `lightsOn` variable so that when we click the start button again, it won't change the timer and we won't get any bad behaviour.

There we have it! Although, during this change, we have broken the ability to start the sequence after cancelling it. What has happened? Because we set `lightsOn = true;` when we click on Start, our code still thinks the lights are on and won't set the sequence off again.

Luckily, this is a simple fix. All we need to do is add `lightsOn = false;` in our cancel `eventListener` function and everything will work again.

```javascript
cancel.addEventListener('click', function() {
  // Remove setInterval from timer.
  clearInterval(timer);
  // Reset all lights.
  resetLights();
  // Reset index.
  index = 0;
  // Update back to false.
  lightsOn = false;
});
```

And that's a wrap, we're all done. Feel free to have a play around with everything you've learned. A good starting point could be changing the timing of the lights.
