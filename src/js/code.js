var timer = null;
var time = null;
var length = null;
var salt = null;
var ccase = null;
var TIME_LIMIT = 30; // 30 seconds

/** Fires when page is fully loaded */
document.addEventListener("DOMContentLoaded", function(event){
	// Reveal the application if JavaScript is working
	document.getElementById("application").removeAttribute("hidden");

	// Enter in the input fires the hash! button
	document.getElementById("input").addEventListener("keyup", function(event){
		event.preventDefault();
		if(event.keyCode == 13) hash();
	});

	// Automatically select default option
	select_length(null);
	select_salt(null);
	select_case(null);

});

/** The main function that fires after "Hash!" button is clicked */
function hash(){
    // Retrieve information
    var input = document.getElementById("input").value;

    // The input must contain something, alert the user if it is empty
    if(input == null || input == ""){
        alert("The input field is empty! Please enter something!");
        return;
    }

    // Blank out the input field
    document.getElementById("input").value = "";

    // Compute the hash
	var hash = "";
    if(!salt) hash = hex_sha256(input);
    else{
        hash = hex_sha256(input);
        hash = hex_sha256(input.length + hash + input.length + input);
    }

	// Apply the length and show it
	display_hash(hash.substring(0, length));
}

/** Function that fires when any one of the Lowercase radio buttons are clicked. */
function redisplay_hash(){
    // Get output
    var hash = document.getElementById("output")

    // Do nothing if something broke
    if(hash == null || !("value" in hash)) return;
    hash = hash.value;

	// Do nothing if the output field is empty
    if(hash == null || hash == "") return;

    // Redisplay it
    display_hash(hash);
}

function timer_function(){
	// Clear timer if any
	if(timer != null) window.clearTimeout(timer);

	// Check timer
	var time_left = Math.floor(((new Date().getTime()) - time)/1000);
	console.log(time_left);

	// Update the counter
	var counter = document.getElementById("counter");
	if(counter != null && "innerHTML" in counter) counter.innerHTML = TIME_LIMIT - time_left;

	// Begin the timer
	if(time_left <= TIME_LIMIT) timer = window.setTimeout(timer_function, 1000);
	else{
		counter.innerHTML = "-";
		var output = document.getElementById("output");
		if(output != null && "value" in output) output.value = "";
	}
}

/** Function to display the hash digest on the application
 *  @param hash input text
 */
function display_hash(hash){
    // Output
    if(ccase == "L") document.getElementById("output").value = hash.toLowerCase();
    else if(ccase == "U") document.getElementById("output").value = hash.toUpperCase();
    else document.getElementById("output").value = alternate(hash);

	// Begin the timer
	time = new Date().getTime();
	timer_function();
}

/** Function to modify the string by alternate the case of each non-numeric character
 *  @param string input text
 *  @return modified string
 */
function alternate(string){
    // Initial variables
    var upper = true;
    var str = "";

    // Iterate through the string
    for(var i = 0; i < string.length; i++){
        // Extract a character from string
        var character = String.fromCharCode(string.charCodeAt(i));

        // Check if character is a number
        if(/^\d+$/.test(character)) str = str.concat(character);
        else{
            // Modify the character
            if(upper) str = str.concat(character.toUpperCase());
            else str = str.concat(character.toLowerCase());

            // Flip the boolean variable
            upper = !upper;
        }
    }
    return str;
}

function select_length(number){
	// Remove previous selection if any
	if(length != null){
		var prev = document.getElementById("length" + length);
		if(prev != null && "classList" in prev) prev.classList.remove("active");
	}

	// Select
	if(number != null && (number == 8 || number == 16 || number == 32 || number == 64)){
		length = number;
	}else length = 32; // 32 is a default length

	// Apply the selection class
	var selected = document.getElementById("length" + length);
	if(selected != null && "classList" in selected) selected.classList.add("active");
}

function select_salt(enabled){
	// Remove previous selection if any
	if(salt != null){
		var prev = document.getElementById("salt" + (salt ? "Y" : "N"));
		if(prev != null && "classList" in prev) prev.classList.remove("active");
	}

	// Select
	if(enabled == null) salt = true; // True is a default value
	else salt = enabled;

	// Apply the selection class
	var selected = document.getElementById("salt" + (salt ? "Y" : "N"));
	if(selected != null && "classList" in selected) selected.classList.add("active");
}

function select_case(option){
	// Remove previous selection if any
	if(ccase != null){
		var prev = document.getElementById("case" + ccase);
		if(prev != null && "classList" in prev) prev.classList.remove("active");
	}

	// Select
	if(ccase == null || (ccase != "A" && ccase !== "L" && ccase != "U")) ccase = "A"; // Alternating is a default value
	else ccase = option;

	// Apply the selection class
	var selected = document.getElementById("case" + ccase);
	if(selected != null && "classList" in selected) selected.classList.add("active");

	// Redisplay hash
	redisplay_hash();
}
