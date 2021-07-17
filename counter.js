var day = document.querySelector("#day");
var month = document.querySelector("#month");
var year = document.querySelector("#year");
var submitButton = document.querySelector("#submit");
var app = document.querySelector("#app");
var outputDiv = document.querySelector("#output");

function inputLength() {
	return year.value.length + month.value.length + day.value.length;
}

function calcAge() {
    const now = new Date();
    let age = now.getFullYear() - Number(year.value);
    const mdif = now.getMonth() - Number(month.value) + 1; // jan is 0 in getMonth
    if (mdif < 0) {
        // not birthday yet
        --age;
    }
    else if (mdif === 0) {
        // maybe birthday?
        var ddif = now.getDate() - Number(day.value);
        if (ddif < 0) --age; // not birthday yet
    }
    return age;
}

function clearInput() {
    day.value = "";
    month.value = "";
    year.value = "";
}

function clearOutput() {
    var p = document.querySelector("#output p")
    if (p === null) {
        return;
    }
    else {
        outputDiv.removeChild(p);
    }
}

function createOutput() {
    var dayValue = Number(day.value);
    var monthValue = Number(month.value);
    var yearValue = Number(year.value);
    var fullYear =  new Date().getFullYear()
    // Clear the output if there is one
    clearOutput();
    // check if the inputs are correct
    if (Number(inputLength()) < 1) {
        alert("The program can't be run unless you fill out all of the fields.");
        clearInput();
        return false;
    }
    else if (dayValue < 1) {
        alert("Incorrect day. Try again.");
        clearInput();
        return false;
    }
    else if (dayValue > 31) {
        alert("A month can't have more than 31 days.");
        clearInput();
        return false;
    }
    else if (monthValue < 1) {
        alert("Incorrect month. Try again.");
        clearInput();
        return false;
    }
    else if (monthValue > 12) {
        alert("A year only has 12 months.");
        clearInput();
        return false;
    }
    else if (yearValue.length < 4) {
        alert("Incorrect year. Try again.");
        clearInput();
        return false;
    }
    else if (yearValue > fullYear) {
        alert("It's the year: " + fullYear +"." + " You couldn't have been born in the future. :)");
        clearInput();
        return false;
    }
    else {
        outputDiv.appendChild(document.createElement("p"));
        document.querySelector("#output p").appendChild(document.createTextNode("Your age is " + calcAge() + " years."));
        outputDiv.setAttribute("style", "background-color:white");
        clearInput();
        return true;
    }
}

function createOutputAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createOutput();
        return true;
	}
}

submitButton.addEventListener("click", createOutput);
day.addEventListener("keypress", createOutputAfterKeypress);
month.addEventListener("keypress", createOutputAfterKeypress);
year.addEventListener("keypress", createOutputAfterKeypress);