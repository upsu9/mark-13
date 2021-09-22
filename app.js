function reversedstr(str) {
    var splitChar = str.split("");
    var reversed = splitChar.reverse();
    var joinChars = reversed.join("");
    return joinChars;
    /* return str.split("").reverse().join("")  */

}

function isPalindrome(str) {
    var check = reversedstr(str)
    return str === check
    /* if (str === check) {
        return true
    } else {
        return false
    } */
}

function convertDateIntoString(date) {

    var dateCon = {
        day: "",
        month: "",
        year: ""

    }

    if (date.day < 10) {
        dateCon.day = "0" + date.day
    } else {
        dateCon.day = date.day.toString()
    }
    if (date.month < 10) {
        dateCon.month = "0" + date.month
    } else {
        dateCon.month = date.month.toString()
    }
    dateCon.year = date.year.toString()

    return dateCon


}

function allFormatsOfDate(date) {

    var formatDate = convertDateIntoString(date)

    var ddmmyyyy = formatDate.day + formatDate.month + formatDate.year
    var mmddyyyy = formatDate.month + formatDate.day + formatDate.year
    var yyyymmdd = formatDate.year + formatDate.month + formatDate.day
    var ddmmyy = formatDate.day + formatDate.month + formatDate.year.slice(-2)
    var mmddyy = formatDate.month + formatDate.day + formatDate.year.slice(-2)
    var yymmdd = formatDate.year.slice(-2) + formatDate.month + formatDate.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]


}

function checkPal(date) {
    var listOfAllPal = allFormatsOfDate(date);

    var flag = false;

    for (i = 0; i < listOfAllPal.length; i++) {
        /* if (isPalindrome(listOfAllPal[i]=== true))
        { console.log("true") */
        if (isPalindrome(listOfAllPal[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}

function leapYear(year) {
    if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
        return true
    }

    return false;
}

function incDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var dateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;

            }
        }
    } else {
        if (day > dateArray[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalDate(date) {
    var count = 0;
    var nextPal = incDate(date)
    while (1) {
        count++;
        var verifyPal = checkPal(nextPal)
        if (verifyPal) {
            break;
        } else
            nextPal = incDate(nextPal)
    }
return [ count, nextPal]
}


 var pal = document.querySelector("#palDate")
var button = document.querySelector("#btn")
var message = document.querySelector("#message")

button.addEventListener("click", palin)

function palin (){
    var datePal = pal.value
    
if ( datePal === ""){
    console.log("type something")
}
else{
    var newDate = datePal.split("-")
    
    var date = {
        day: Number(newDate[2]),
        month : Number(newDate[1]),
        year : Number(newDate[0])
        
    }
    var finalPal = checkPal(date);
    if (finalPal){
        message.innerText = "Hurrah! this is your palindrome birthday."
    }
    else{
        var [count,nextPal] = getNextPalDate(date)
        message.innerText = `The next palindrome day is ${nextPal.day}-${nextPal.month}-${nextPal.year}  and you have missed by ${count} days.`
    }
}

}

