/** Global Timer variable */
var timer = null;
/** Global time variable - holds system time in milliseconds */
var time = null;
/** Global length selection variable */
var length = null;
/** Global salt selection variable */
var salt = null;
/** Global character case selection variable */
var ccase = null;
/** Constant value for time limit for password display */
var TIME_LIMIT = 30; // 30 seconds
/** Global output variable */
var output_hash = null;

// Automatically clear output (if browser was closed before output expires, it'll show up on next launch and will not clear by itself) 
window.onload = function() {
    var output = document.getElementById("output");
    if(output != null && "value" in output) output.value = "";
};

/** Fires when page is fully loaded */
document.addEventListener("DOMContentLoaded", function(event){

	// Reveal the application if JavaScript is working
	document.getElementById("application").removeAttribute("hidden");

    // Automatically clear output (if browser was closed before output expires, it'll show up on next launch and will not clear by itself) 
    var output = document.getElementById("output");
    if(output != null && "value" in output) output.value = "";

    // Automatically clear input too
    var input = document.getElementById("input");
    if(input != null && "value" in input) input.value = "";

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
    if(!salt) hash = hex_sha256(input); // Normal hash
    else{
        hash = hex_sha256(input); // hash = sha256(length + sha256(input) + length + input);
        hash = hex_sha256(input.length + hash + input.length + input);
    }

    // Put in global variable
    output_hash = hash;

	// Apply the length and show it
	display_hash(output_hash);
}

/** Function that fires when any one of the Lowercase radio buttons are clicked. */
function redisplay_hash(){

    // Get output
    var hash = document.getElementById("output")

    // Do nothing if something broke
    if(hash == null || !("value" in hash)) return;
    hash = output_hash;

	// Do nothing if the output field is empty
    if(hash == null || hash == "") return;

    // Redisplay it
    display_hash(hash);
}

/** Function to keep track of timer */
function timer_function(){

	// Clear timer if any
	if(timer != null) window.clearTimeout(timer);

	// Check timer
	var time_left = Math.floor(((new Date().getTime()) - time)/1000);

	// Update the counter
	var counter = document.getElementById("counter");
	if(counter != null && "innerHTML" in counter) counter.innerHTML = TIME_LIMIT - time_left;

	// Begin the timer
	if(time_left <= TIME_LIMIT) timer = window.setTimeout(timer_function, 1000);

	// If the time is up, clear the counter
	else{
		counter.innerHTML = "-";
        output_hash = null;
		var output = document.getElementById("output");
		if(output != null && "value" in output) output.value = "";
	}
}

/** Function to display the hash digest on the application
 *  @param hash input text
 */
function display_hash(hash){

    // Trim
    hash = hash.substring(0, length);

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

/** Function to select the length of password digest 
 *	@param number Desired length in integer - only 8, 16, 32, and 64 is accepted, if otherwise, 64 is selected as default
 */
function select_length(number){

	// Remove previous selection if any
	if(length != null){
		var prev = document.getElementById("length" + length);
		if(prev != null && "classList" in prev) prev.classList.remove("active");
	}

	// Select
	if(number != null && (number == 8 || number == 16 || number == 32 || number == 64)){
		length = number;
	}else length = 64; // 64 is a default length

	// Apply the selection class
	var selected = document.getElementById("length" + length);
	if(selected != null && "classList" in selected) selected.classList.add("active");

	// Redisplay hash
	redisplay_hash();
}

/** Function to select the option of salting 
 *	@param enabled False to disable salting, otherwise True (True is the default option) 
 */
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

/** Function to select the option of character case 
 *	@param option in character - 'A' to choose "Alternating case" where first alphabet letter is uppercased first then case is alternated for every alphabet number
 *		'L' to choose lowercase 
 *		'U' to choose uppercase
 *		Alternating is the default option
 */
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
