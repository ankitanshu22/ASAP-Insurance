
// Checking if the browser supports local storage
function checkLocalStorage() {
    if (window.localStorage !== undefined) {

    } else {
        alert('Sorry! This browser does not support local storage.');
        location.href = "protection01.html";
    }
}

//-------------------Screen 1 Code Starts -------------------//

var Gender;
var Age;
var Smoking;
var SumAssured;

function submitBday() {
	/*var Q4A = "Your birthday is: ";*/
	var Q4A = "";
	var Bdate = document.getElementById('bday').value;
	var Bday = +new Date(Bdate);
	/*Q4A += Bdate + ". You are " + ~~ ((Date.now() - Bday) / (31557600000));*/
	Q4A += "Age : " + ~~ ((Date.now() - Bday) / (31557600000))+" years";
	var theBday = document.getElementById('resultBday');
	theBday.innerHTML = Q4A;
	document.getElementById('HowOld').value = ~~ ((Date.now() - Bday) / (31557600000));
	Age = ~~ ((Date.now() - Bday) / (31557600000));
}

// um Assured Plus Minus S
var count = Number(document.getElementById("count").value);
var countEl = document.getElementById("count");
function plus(){
	count = Number(document.getElementById("count").value);
	countEl = document.getElementById("count");
	if (count < 5000000000){
		count = count + 100000;
		countEl.value = count;
	}
	calPremium();
}
function minus(){
	count = Number(document.getElementById("count").value);
	countEl = document.getElementById("count");
	if (count > 5000000) {
		count = count - 100000;
		countEl.value = count;
	}
calPremium();
}
function MinSumAssured(){
	count = Number(document.getElementById("count").value);
	countEl = document.getElementById("count");
	if (count < 5000000) {
		count = 5000000;
		countEl.value = count;
	} else if (count > 5000000000){
		count = 5000000000;
		countEl.value = count;
	} else {
		countEl.value = count;
	}
	calPremium();
}

// adding values in local storage from screen1
function addProtectionScreen1Values() {
	
	var Step2 = Age;
	localStorage.setItem("Step2", Step2);
	
	if (Gender == "Male") {
        localStorage.setItem('Step1', 'Male');
    } else if (Gender == "Female") {
        localStorage.setItem('Step1', 'Female');
    }/* else {
		localStorage.setItem('Step1', 'NotSelected');
	}*/
	
	if (Smoking == "NonSmoker") {
        localStorage.setItem('Step3', 'NonSmoker');
    } else if (Gender == "Smoker") {
        localStorage.setItem('Step3', 'Smoker');
    }/* else {
		localStorage.setItem('Step3', 'NotSelected');
	}*/
	
}

//change goal selection on screen1 
function selectGender(genderType)
{
    if (genderType == "Male")
    {
        localStorage.setItem('Step1', 'Male');
		Gender = "Male";
    }
    else if (genderType == "Female") {
        localStorage.setItem('Step1', 'Female');
		Gender = "Female";
    }
	//document.getElementById('Gender').innerHTML = localStorage.getItem('Step1');
}

function selectSmoking(smokerType)
{
    if (smokerType == "NonSmoker")
    {
        localStorage.setItem('Step3', 'NonSmoker');
		Smoking = "NonSmoker";
    }
    else if (smokerType == "Smoker") {
        localStorage.setItem('Step3', 'Smoker');
		Smoking = "Smoker";
    }
	//document.getElementById('Smoking').innerHTML = localStorage.getItem('Step3');
}


//pre-fill the screen1 values incase values are there in local storage
function fillProtectionScreen1()
{
    $('#Screen1').page();

    //alert(localStorage.getItem("Step1"));
    if (localStorage.getItem("Step2") != null) {
        $('#slider-2').val(localStorage.getItem("Step2"));
        $('#slider-2').slider('refresh');
        
    
        $('#slider-3').val(localStorage.getItem("Step3"));
        $('#slider-3').slider('refresh');
        
        if (localStorage.getItem('Step1') == "Male") {
            $("#lnkMale").attr('class', 'maleHover');
            $("#lnkFemale").attr('class', 'female');
        }

        if (localStorage.getItem('Step1') == "Female") {
            $("#lnkMale").attr('class', 'male');
            $("#lnkFemale").attr('class', 'femaleHover');
        }
    }
}
//-------------------Screen 1 Code Ends -------------------//



//-------------------Screen 2 Code Starts -------------------//
// adding values in local storage from screen2
function displayScreen2Values() {
	document.getElementById('Gender').innerHTML = localStorage.getItem('Step1');
	document.getElementById('Age').innerHTML = localStorage.getItem('Step2');
	document.getElementById('Smoking').innerHTML = localStorage.getItem('Step3');
	//document.getElementById('SumAssured').innerHTML = document.getElementById('np').value;
}
function UpdateRPYears() {
	//document.getElementById('SumAssured').innerHTML = document.getElementById('SA').value;
	//document.getElementById('PolTerm').innerHTML = document.getElementById('PolicyTerm').value;
	document.getElementById('RPYears').value = document.getElementById('PolicyTerm').value;
}

//------------------Populate Policy Term---------------------//
var select = document.getElementById("PolicyTerm");
var options = [10,15,20,25,30,35,40,45,50,55,60,65];
var CurAge = localStorage.getItem("Step2")
var Max_PT = Math.min((85 - CurAge), 67);
for(var i = 0; i < options.length; i++) {
    var opt = options[i];
	if (opt <= Max_PT) {
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	}
}

//pre-fill the screen2 values incase values are there in local storage
function fillProtectionScreen3() {
    //alert(localStorage.getItem("Step7"));
    $('#Screen3').page();

    if (localStorage.getItem("Step7") != null) {
        $('#slider-7').val(localStorage.getItem("Step7"));
        $('#slider-7').slider('refresh');
    }

    if (localStorage.getItem("Step8") != null) {
        $('#slider-8').val(localStorage.getItem("Step8"));
        $('#slider-8').slider('refresh');
    }

    if (localStorage.getItem("Step9") != null) {
        $('#slider-9').val(localStorage.getItem("Step9"));
        $('#slider-9').slider('refresh');
    }

}
//-------------------Screen 3 Code Ends -------------------//


//-------------------Screen 2 Code Starts -------------------//
//calculate the Premium  
function numberWithCommas(x) {
	return x.toString().substring(0,x.toString().split('.')[0].length-3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length-3);
}

function calPremium() {
	UpdateRPYears();
	
	var Age_Serch = 18;
	/*var Gender = document.getElementById("Male").value;
	var Female = document.getElementById("Female").value;
	var NonSmoker = document.getElementById("NonSmoker").value;
	var Smoker = document.getElementById("Smoker").value;
	var Min_PT = 10;
	var Max_PT = Math.min((85 - CurrentAge), 67);*/
	var CurrentAge = localStorage.getItem("Step2");
	var Gender = localStorage.getItem("Step1");
	var Smoking = localStorage.getItem("Step3");
	var Sum_Assured = document.getElementById('count').value;
	var SR_PolicyTerm = document.getElementById('PolicyTerm').value;
	var Sum_Assured_band = 0;
	var LSum_Assured_Disc = 0;
	var SRP_Rate = 0;
	var SRP_PremiumRate = 0;
	var Annualised_Premium = 0;
	
	if (CurrentAge < 18 || CurrentAge > 70) {
		document.getElementById('Error').value = "Cannot calculate Premium of Age < 18 years or > 70 years"
	} /*else {
		window.location.href="protection02.html";
	}*/
	
	if (Sum_Assured >= 5000000 && Sum_Assured < 7500000) {
		Sum_Assured_band = 0.00;
	} else if (Sum_Assured >= 7500000 && Sum_Assured < 10000000) {
		Sum_Assured_band = 0.10;
	} else if (Sum_Assured >= 10000000 && Sum_Assured < 20000000) {
		Sum_Assured_band = 0.20;
	} else if (Sum_Assured >= 20000000) {
		Sum_Assured_band = 0.25;
	}

	//document.getElementById('SA Band').innerHTML = "Sum_Assured_band = " + Sum_Assured_band;

	LSum_Assured_Disc = 1 - Sum_Assured_band;

	//document.getElementById('LS Discount').innerHTML = "LSum_Assured_Disc = " + LSum_Assured_Disc;

	//SRP_Rate
	if (Gender == "Female") {
		if (CurrentAge >= 18 && CurrentAge < 22) {
			Age_Serch = 18;
		} else {
			Age_Serch = CurrentAge - 3;
		}
	} else if (Gender == "Male") {
		Age_Serch = CurrentAge;
	}

	//document.getElementById('Age Range').innerHTML = "Age_Serch = " + Age_Serch;

	// Non Smoker Regular
	if (Smoking == "NonSmoker") {
		SRP_Rate = SR_Regular_Pay_NonSmoker_array[Age_Serch - 18][SR_PolicyTerm - 10];
	}
	// Smoker Regular
	if (Smoking == "Smoker") {
		SRP_Rate = SR_Regular_Pay_Smoker_array[Age_Serch - 18][SR_PolicyTerm - 10];
	}

	//document.getElementById('SRP Rate').innerHTML = "SRP_Rate = " + SRP_Rate;

	SRP_PremiumRate = (SRP_Rate * LSum_Assured_Disc).toFixed(2);

	Annualised_Premium = Math.round((Sum_Assured * SRP_PremiumRate) / 1000);

	//Annualised_Premium = numberWithCommas(Annualised_Premium);

	//document.getElementById('premium').innerHTML = "Annualised_Premium = " + Annualised_Premium;
	/*if ((document.getElementById('PremiumMode').value == "Annual") {
		document.getElementById('PremAmt').value = Annualised_Premium;
		Annualised_Premium = numberWithCommas(Annualised_Premium);
	}*/
	var Term = document.getElementById('PremiumMode').value;
	if (Term == "Monthly"){
		Annualised_Premium = Math.round(Annualised_Premium / 12);
	}
	if (Term == "Quarterly"){
		Annualised_Premium = Math.round(Annualised_Premium / 4);
	}
	if (Term == "Half Yearly"){
		Annualised_Premium = Math.round(Annualised_Premium / 2);
	}
	if (Term == "Annually"){
		Annualised_Premium = Math.round(Annualised_Premium);
	}
	if (Annualised_Premium > 999) {
		document.getElementById('PremAmt').value = numberWithCommas(Annualised_Premium);
	} else {
		document.getElementById('PremAmt').value = Annualised_Premium;
	}
	
}

//-------------------Screen 2 Code Ends -------------------//

//-------------------SR Array -------------------//
var SR_Regular_Pay_NonSmoker_array = [
[0.73,0.74,0.74,0.74,0.74,0.74,0.74,0.74,0.75,0.75,0.75,0.76,0.76,0.76,0.76,0.77,0.77,0.78,0.78,0.78,0.79,0.79,0.79,0.80,0.80,0.80,0.80,0.81,0.81,0.81,0.82,0.82,0.82,0.82,0.82,0.82,0.82,0.82,0.82,0.82,0.82,0.94,0.95,0.95,0.96,0.96,0.97,0.97,0.98,0.99,0.99,1.00,1.00,1.01,1.02,1.02,1.03,1.04], [0.74,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.76,0.76,0.76,0.77,0.77,0.77,0.78,0.78,0.78,0.79,0.79,0.80,0.80,0.80,0.81,0.81,0.81,0.82,0.82,0.82,0.82,0.83,0.83,0.83,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.84,0.84,0.96,0.97,0.97,0.98,0.98,0.99,1.00,1.00,1.01,1.02,1.02,1.03,1.04,1.04,1.05,1.06,],
[0.75,0.76,0.76,0.76,0.76,0.76,0.76,0.76,0.77,0.77,0.77,0.77,0.78,0.78,0.79,0.79,0.79,0.80,0.80,0.81,0.81,0.81,0.82,0.82,0.82,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.85,0.85,0.85,0.85,0.85,0.85,0.85,0.85,0.85,0.98,0.99,1.00,1.00,1.01,1.01,1.02,1.03,1.03,1.04,1.05,1.05,1.06,1.07,1.08,,], [0.76,0.76,0.76,0.76,0.76,0.76,0.77,0.77,0.77,0.78,0.78,0.78,0.79,0.79,0.79,0.80,0.80,0.81,0.81,0.82,0.82,0.82,0.83,0.83,0.84,0.84,0.84,0.85,0.85,0.85,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.86,1.01,1.01,1.02,1.02,1.03,1.04,1.04,1.05,1.06,1.07,1.07,1.08,1.09,1.10,,,],
[0.76,0.77,0.77,0.77,0.77,0.77,0.77,0.78,0.78,0.78,0.79,0.79,0.80,0.80,0.80,0.81,0.81,0.82,0.82,0.83,0.83,0.83,0.84,0.84,0.85,0.85,0.85,0.86,0.86,0.86,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.88,0.88,1.03,1.04,1.04,1.05,1.06,1.06,1.07,1.08,1.09,1.09,1.10,1.11,1.12,,,,],
[0.77,0.77,0.77,0.77,0.77,0.78,0.78,0.78,0.79,0.79,0.80,0.80,0.81,0.81,0.81,0.82,0.82,0.83,0.83,0.84,0.84,0.85,0.85,0.86,0.86,0.86,0.87,0.87,0.87,0.88,0.88,0.88,0.88,0.88,0.88,0.89,0.89,0.89,0.89,0.89,0.89,1.06,1.06,1.07,1.08,1.08,1.09,1.10,1.11,1.12,1.12,1.13,1.14,,,,,],
[0.77,0.78,0.78,0.78,0.78,0.78,0.79,0.79,0.80,0.80,0.81,0.81,0.82,0.82,0.82,0.83,0.84,0.84,0.85,0.85,0.85,0.86,0.87,0.87,0.87,0.88,0.88,0.88,0.89,0.89,0.90,0.90,0.90,0.90,0.90,0.90,0.90,0.90,0.90,0.90,0.90,1.09,1.09,1.10,1.11,1.12,1.12,1.13,1.14,1.15,1.16,1.17,,,,,,],
[0.78,0.79,0.79,0.79,0.79,0.79,0.80,0.80,0.81,0.81,0.82,0.82,0.83,0.83,0.84,0.84,0.85,0.86,0.86,0.87,0.87,0.87,0.88,0.89,0.89,0.89,0.90,0.90,0.90,0.91,0.91,0.91,0.92,0.92,0.92,0.92,0.92,0.92,0.92,0.92,0.92,1.12,1.13,1.13,1.14,1.15,1.16,1.17,1.18,1.18,1.19,,,,,,,], [0.79,0.80,0.80,0.80,0.80,0.81,0.81,0.82,0.82,0.83,0.83,0.84,0.84,0.85,0.85,0.86,0.87,0.87,0.88,0.88,0.89,0.89,0.90,0.90,0.91,0.91,0.92,0.92,0.92,0.93,0.93,0.93,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,1.16,1.16,1.17,1.18,1.19,1.20,1.21,1.22,1.23,,,,,,,,], [0.80,0.81,0.81,0.81,0.82,0.82,0.83,0.83,0.84,0.84,0.85,0.86,0.86,0.87,0.87,0.88,0.89,0.89,0.90,0.91,0.91,0.92,0.92,0.93,0.93,0.94,0.94,0.94,0.95,0.95,0.96,0.96,0.96,0.96,0.96,0.96,0.96,0.97,0.97,0.97,0.97,1.20,1.21,1.22,1.23,1.23,1.24,1.25,1.26,,,,,,,,,], [0.81,0.82,0.82,0.83,0.83,0.84,0.84,0.85,0.86,0.86,0.87,0.88,0.88,0.89,0.90,0.90,0.91,0.92,0.92,0.93,0.93,0.94,0.95,0.95,0.96,0.96,0.96,0.97,0.97,0.98,0.98,0.98,0.99,0.99,0.99,0.99,0.99,0.99,0.99,0.99,1.00,1.25,1.26,1.26,1.27,1.28,1.29,1.30,,,,,,,,,,], [0.83,0.84,0.84,0.85,0.85,0.86,0.86,0.87,0.88,0.89,0.89,0.90,0.91,0.92,0.92,0.93,0.94,0.95,0.95,0.96,0.96,0.97,0.98,0.98,0.99,0.99,0.99,1.00,1.00,1.01,1.01,1.02,1.02,1.02,1.02,1.02,1.02,1.02,1.02,1.03,1.03,1.30,1.31,1.32,1.33,1.34,1.35,,,,,,,,,,,], [0.85,0.86,0.86,0.87,0.87,0.88,0.89,0.90,0.91,0.91,0.92,0.93,0.94,0.95,0.95,0.96,0.97,0.98,0.99,0.99,1.00,1.00,1.01,1.02,1.02,1.03,1.03,1.04,1.04,1.04,1.05,1.05,1.05,1.06,1.06,1.06,1.06,1.06,1.06,1.06,1.06,1.36,1.37,1.38,1.39,1.40,,,,,,,,,,,,], [0.87,0.88,0.89,0.89,0.90,0.91,0.92,0.93,0.94,0.95,0.96,0.96,0.97,0.98,0.99,1.00,1.01,1.01,1.02,1.03,1.03,1.04,1.05,1.06,1.06,1.07,1.07,1.08,1.08,1.09,1.09,1.09,1.10,1.10,1.10,1.10,1.10,1.10,1.10,1.11,1.11,1.43,1.44,1.45,1.46,,,,,,,,,,,,,], [0.89,0.91,0.92,0.92,0.93,0.94,0.95,0.96,0.97,0.98,0.99,1.00,1.01,1.02,1.03,1.04,1.05,1.06,1.06,1.07,1.08,1.08,1.09,1.10,1.11,1.11,1.11,1.12,1.13,1.13,1.14,1.14,1.14,1.14,1.15,1.15,1.15,1.15,1.15,1.15,1.15,1.50,1.51,1.53,,,,,,,,,,,,,,], [0.92,0.94,0.95,0.96,0.97,0.98,0.99,1.00,1.02,1.03,1.04,1.05,1.06,1.07,1.08,1.09,1.10,1.11,1.11,1.12,1.13,1.14,1.14,1.15,1.16,1.17,1.17,1.18,1.18,1.19,1.19,1.19,1.20,1.20,1.20,1.20,1.20,1.21,1.21,1.21,1.21,1.59,1.60,,,,,,,,,,,,,,,], [0.96,0.98,0.99,1.00,1.01,1.03,1.04,1.05,1.07,1.08,1.09,1.10,1.11,1.12,1.13,1.14,1.15,1.16,1.17,1.18,1.19,1.19,1.20,1.21,1.22,1.22,1.23,1.24,1.24,1.25,1.25,1.26,1.26,1.26,1.26,1.26,1.27,1.27,1.27,1.27,1.27,1.68,,,,,,,,,,,,,,,,], [1.00,1.03,1.04,1.05,1.06,1.08,1.09,1.11,1.12,1.13,1.15,1.16,1.17,1.18,1.19,1.20,1.21,1.22,1.23,1.24,1.25,1.26,1.27,1.28,1.28,1.29,1.29,1.30,1.31,1.31,1.32,1.32,1.33,1.33,1.33,1.33,1.33,1.34,1.34,1.34,1.34,,,,,,,,,,,,,,,,,], [1.10,1.12,1.13,1.15,1.16,1.18,1.19,1.21,1.23,1.24,1.25,1.26,1.28,1.29,1.30,1.31,1.32,1.33,1.34,1.35,1.36,1.37,1.38,1.39,1.40,1.41,1.41,1.42,1.42,1.43,1.44,1.44,1.44,1.45,1.45,1.45,1.45,1.46,1.46,1.46,,,,,,,,,,,,,,,,,,], [1.15,1.18,1.20,1.21,1.23,1.24,1.26,1.28,1.30,1.31,1.32,1.34,1.35,1.37,1.38,1.39,1.40,1.41,1.42,1.43,1.44,1.45,1.46,1.47,1.48,1.49,1.49,1.50,1.51,1.52,1.53,1.53,1.53,1.53,1.54,1.54,1.54,1.54,1.54,,,,,,,,,,,,,,,,,,,], [1.22,1.25,1.27,1.28,1.30,1.32,1.34,1.36,1.38,1.39,1.41,1.42,1.44,1.45,1.46,1.48,1.49,1.50,1.51,1.52,1.53,1.54,1.56,1.56,1.57,1.58,1.59,1.60,1.60,1.61,1.62,1.62,1.63,1.63,1.63,1.64,1.64,1.64,,,,,,,,,,,,,,,,,,,,], [1.29,1.33,1.35,1.37,1.39,1.41,1.43,1.45,1.47,1.48,1.50,1.51,1.53,1.55,1.56,1.57,1.58,1.60,1.61,1.62,1.63,1.64,1.66,1.67,1.68,1.69,1.69,1.70,1.71,1.72,1.73,1.73,1.74,1.74,1.74,1.74,1.75,,,,,,,,,,,,,,,,,,,,,], [1.37,1.41,1.44,1.46,1.48,1.50,1.52,1.55,1.57,1.58,1.60,1.62,1.64,1.65,1.66,1.68,1.69,1.71,1.72,1.74,1.75,1.76,1.77,1.78,1.79,1.81,1.81,1.82,1.83,1.84,1.85,1.85,1.86,1.86,1.86,1.86,,,,,,,,,,,,,,,,,,,,,,], [1.47,1.51,1.54,1.56,1.59,1.61,1.63,1.66,1.68,1.70,1.72,1.73,1.75,1.77,1.78,1.80,1.81,1.83,1.85,1.86,1.87,1.88,1.90,1.91,1.92,1.93,1.94,1.95,1.96,1.97,1.98,1.98,1.99,1.99,1.99,,,,,,,,,,,,,,,,,,,,,,,], [1.58,1.63,1.65,1.68,1.71,1.73,1.76,1.78,1.81,1.82,1.85,1.86,1.88,1.90,1.92,1.93,1.95,1.97,1.98,2.00,2.01,2.02,2.04,2.05,2.06,2.08,2.08,2.10,2.11,2.12,2.13,2.13,2.14,2.14,,,,,,,,,,,,,,,,,,,,,,,,], [1.70,1.75,1.78,1.81,1.84,1.87,1.89,1.92,1.95,1.96,1.99,2.01,2.03,2.05,2.06,2.08,2.10,2.12,2.14,2.15,2.16,2.18,2.20,2.21,2.22,2.24,2.24,2.26,2.27,2.28,2.29,2.29,2.30,,,,,,,,,,,,,,,,,,,,,,,,,], [1.84,1.89,1.92,1.96,1.98,2.01,2.04,2.07,2.10,2.12,2.14,2.16,2.19,2.21,2.22,2.24,2.26,2.28,2.30,2.32,2.33,2.35,2.37,2.38,2.39,2.41,2.42,2.43,2.44,2.45,2.47,2.47,,,,,,,,,,,,,,,,,,,,,,,,,,], [1.99,2.05,2.08,2.11,2.14,2.17,2.20,2.23,2.26,2.28,2.31,2.33,2.36,2.38,2.40,2.42,2.44,2.46,2.48,2.50,2.52,2.53,2.55,2.57,2.58,2.60,2.61,2.62,2.63,2.65,2.66,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[2.19,2.26,2.29,2.33,2.36,2.39,2.42,2.45,2.48,2.51,2.53,2.56,2.59,2.61,2.63,2.65,2.67,2.70,2.72,2.74,2.76,2.77,2.80,2.81,2.83,2.85,2.85,2.87,2.88,2.90,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[2.37,2.44,2.48,2.51,2.54,2.58,2.61,2.64,2.68,2.70,2.73,2.76,2.79,2.82,2.84,2.86,2.88,2.91,2.93,2.95,2.97,2.99,3.02,3.03,3.05,3.07,3.08,3.10,3.11,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
 [2.56,2.63,2.67,2.71,2.74,2.78,2.82,2.85,2.89,2.91,2.95,2.97,3.01,3.04,3.06,3.09,3.11,3.14,3.16,3.19,3.21,3.22,3.25,3.27,3.29,3.31,3.32,3.34,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
 [2.76,2.84,2.88,2.92,2.96,3.00,3.03,3.07,3.11,3.14,3.18,3.21,3.24,3.27,3.29,3.33,3.35,3.38,3.41,3.43,3.45,3.47,3.50,3.53,3.54,3.57,3.57,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
 [2.97,3.06,3.10,3.14,3.18,3.22,3.27,3.30,3.35,3.38,3.42,3.45,3.49,3.52,3.55,3.58,3.61,3.64,3.67,3.70,3.72,3.74,3.77,3.80,3.81,3.84,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
 [3.19,3.28,3.33,3.37,3.42,3.46,3.51,3.55,3.60,3.63,3.68,3.71,3.75,3.79,3.81,3.85,3.88,3.92,3.95,3.97,4.00,4.02,4.06,4.08,4.10,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
 [3.42,3.52,3.57,3.62,3.67,3.72,3.77,3.81,3.87,3.90,3.95,3.98,4.03,4.07,4.10,4.14,4.17,4.21,4.24,4.27,4.30,4.32,4.36,4.39,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
 [3.67,3.77,3.83,3.88,3.94,3.99,4.04,4.09,4.15,4.19,4.24,4.28,4.32,4.37,4.40,4.44,4.47,4.52,4.55,4.58,4.61,4.64,4.68,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
 [3.93,4.04,4.10,4.16,4.22,4.28,4.33,4.39,4.45,4.49,4.55,4.59,4.64,4.69,4.72,4.77,4.80,4.85,4.89,4.92,4.95,4.98,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[4.20,4.33,4.39,4.46,4.52,4.58,4.65,4.71,4.77,4.82,4.88,4.92,4.98,5.03,5.06,5.11,5.15,5.20,5.25,5.28,5.31,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[4.50,4.63,4.70,4.78,4.84,4.91,4.98,5.05,5.12,5.17,5.23,5.28,5.34,5.40,5.44,5.49,5.53,5.59,5.63,5.67,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[4.81,4.96,5.04,5.12,5.20,5.27,5.35,5.42,5.50,5.55,5.62,5.67,5.74,5.80,5.84,5.89,5.94,6.00,6.05,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[5.16,5.32,5.41,5.50,5.58,5.66,5.74,5.82,5.91,5.97,6.04,6.10,6.17,6.23,6.27,6.34,6.39,6.45,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[5.54,5.71,5.81,5.91,6.00,6.09,6.18,6.26,6.35,6.42,6.49,6.56,6.63,6.70,6.75,6.82,6.87,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[5.95,6.14,6.25,6.35,6.45,6.55,6.65,6.74,6.84,6.91,6.99,7.06,7.14,7.22,7.27,7.35,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[6.41,6.61,6.73,6.85,6.95,7.06,7.17,7.26,7.38,7.45,7.54,7.62,7.71,7.79,7.84,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[6.91,7.13,7.26,7.39,7.50,7.62,7.73,7.84,7.96,8.04,8.14,8.22,8.32,8.41,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[7.46,7.70,7.84,7.98,8.11,8.23,8.36,8.47,8.60,8.69,8.80,8.89,8.99,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[8.06,8.33,8.48,8.63,8.77,8.90,9.04,9.16,9.31,9.40,9.52,9.62,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[8.72,9.01,9.18,9.34,9.49,9.64,9.78,9.92,10.08,10.18,10.31,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[9.44,9.76,9.94,10.11,10.28,10.43,10.60,10.75,10.92,11.03,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[10.23,10.57,10.77,10.95,11.13,11.31,11.49,11.65,11.84,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[11.09,11.46,11.67,11.87,12.08,12.27,12.47,12.64,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[12.02,12.42,12.65,12.89,13.11,13.33,13.53,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[13.04,13.47,13.75,14.00,14.24,14.47,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,]
]
		
var SR_Regular_Pay_Smoker_array = [
[0.91,0.92,0.92,0.92,0.92,0.92,0.93,0.93,0.94,0.94,0.94,0.95,0.95,0.96,0.96,0.96,0.97,0.98,0.98,0.98,0.99,0.99,1,1,1.01,1.01,1.01,1.02,1.02,1.03,1.03,1.03,1.03,1.03,1.04,1.04,1.04,1.04,1.04,1.04,1.04,1.22,1.22,1.23,1.24,1.25,1.26,1.26,1.27,1.28,1.29,1.3,1.31,1.31,1.32,1.33,1.34,1.35],
[0.92,0.93,0.93,0.93,0.94,0.94,0.94,0.95,0.95,0.95,0.96,0.96,0.97,0.97,0.98,0.98,0.99,0.99,1.00,1.00,1.01,1.01,1.02,1.02,1.03,1.03,1.03,1.04,1.04,1.05,1.05,1.05,1.05,1.06,1.06,1.06,1.06,1.06,1.06,1.06,1.06,1.25,1.26,1.27,1.27,1.28,1.29,1.30,1.31,1.32,1.33,1.33,1.34,1.35,1.36,1.37,1.38,],
[0.94,0.95,0.95,0.95,0.95,0.95,0.96,0.96,0.97,0.97,0.97,0.98,0.98,0.99,0.99,1.00,1.00,1.01,1.02,1.02,1.02,1.03,1.04,1.04,1.05,1.05,1.05,1.06,1.06,1.07,1.07,1.07,1.07,1.08,1.08,1.08,1.08,1.08,1.08,1.08,1.08,1.29,1.29,1.30,1.31,1.32,1.33,1.34,1.35,1.36,1.36,1.37,1.38,1.39,1.40,1.41,,],
[0.95,0.96,0.96,0.96,0.96,0.96,0.97,0.97,0.98,0.98,0.99,0.99,1.00,1.00,1.01,1.01,1.02,1.03,1.03,1.04,1.04,1.05,1.06,1.06,1.06,1.07,1.07,1.08,1.08,1.09,1.09,1.09,1.09,1.10,1.10,1.10,1.10,1.10,1.10,1.10,1.10,1.32,1.33,1.34,1.35,1.36,1.37,1.38,1.39,1.40,1.41,1.42,1.43,1.44,1.45,,,],
[0.96,0.97,0.97,0.97,0.97,0.98,0.98,0.98,0.99,1.00,1.00,1.01,1.01,1.02,1.02,1.03,1.04,1.04,1.05,1.06,1.06,1.07,1.07,1.08,1.08,1.09,1.09,1.10,1.10,1.11,1.11,1.11,1.12,1.12,1.12,1.12,1.12,1.12,1.12,1.12,1.12,1.36,1.37,1.38,1.39,1.40,1.41,1.42,1.43,1.44,1.45,1.46,1.47,1.48,,,,],
[0.96,0.98,0.98,0.98,0.98,0.99,0.99,1.00,1.01,1.01,1.02,1.02,1.03,1.04,1.04,1.05,1.05,1.06,1.07,1.08,1.08,1.09,1.09,1.10,1.10,1.11,1.11,1.12,1.12,1.13,1.13,1.14,1.14,1.14,1.14,1.14,1.14,1.14,1.15,1.15,1.15,1.40,1.41,1.42,1.43,1.44,1.45,1.46,1.47,1.49,1.50,1.51,1.52,,,,,],
[0.98,0.99,0.99,0.99,1.00,1.00,1.01,1.01,1.02,1.03,1.03,1.04,1.05,1.06,1.06,1.07,1.08,1.08,1.09,1.10,1.10,1.11,1.12,1.12,1.13,1.14,1.14,1.14,1.15,1.15,1.16,1.16,1.16,1.16,1.17,1.17,1.17,1.17,1.17,1.17,1.17,1.45,1.46,1.47,1.48,1.49,1.50,1.51,1.53,1.54,1.55,1.56,,,,,,],
[0.99,1.00,1.00,1.01,1.01,1.02,1.02,1.03,1.04,1.04,1.05,1.06,1.07,1.08,1.08,1.09,1.10,1.11,1.12,1.12,1.13,1.13,1.14,1.15,1.15,1.16,1.16,1.17,1.18,1.18,1.19,1.19,1.19,1.19,1.19,1.20,1.20,1.20,1.20,1.20,1.20,1.50,1.52,1.53,1.54,1.55,1.56,1.57,1.58,1.59,1.61,,,,,,,],
[1.00,1.02,1.02,1.02,1.03,1.04,1.04,1.05,1.06,1.07,1.08,1.08,1.09,1.10,1.11,1.12,1.13,1.14,1.14,1.15,1.16,1.16,1.17,1.18,1.19,1.19,1.20,1.20,1.21,1.21,1.22,1.22,1.22,1.23,1.23,1.23,1.23,1.23,1.23,1.23,1.24,1.56,1.58,1.59,1.60,1.61,1.62,1.63,1.65,1.66,,,,,,,,],
[1.02,1.03,1.04,1.04,1.05,1.06,1.07,1.07,1.09,1.09,1.10,1.11,1.12,1.13,1.14,1.15,1.16,1.17,1.18,1.18,1.19,1.20,1.21,1.21,1.22,1.23,1.23,1.24,1.24,1.25,1.26,1.26,1.26,1.26,1.26,1.27,1.27,1.27,1.27,1.27,1.27,1.63,1.64,1.65,1.67,1.68,1.69,1.70,1.72,,,,,,,,,],
[1.04,1.05,1.06,1.07,1.07,1.08,1.09,1.10,1.12,1.12,1.13,1.14,1.16,1.17,1.17,1.19,1.19,1.21,1.21,1.22,1.23,1.24,1.25,1.26,1.26,1.27,1.27,1.28,1.29,1.29,1.30,1.30,1.30,1.31,1.31,1.31,1.31,1.31,1.31,1.32,1.32,1.71,1.72,1.73,1.74,1.76,1.77,1.78,,,,,,,,,,],
[1.06,1.08,1.09,1.10,1.11,1.12,1.13,1.14,1.15,1.16,1.17,1.18,1.20,1.21,1.22,1.23,1.24,1.25,1.26,1.27,1.28,1.28,1.30,1.30,1.31,1.32,1.32,1.33,1.34,1.34,1.35,1.35,1.35,1.36,1.36,1.36,1.36,1.36,1.37,1.37,1.37,1.79,1.80,1.82,1.83,1.84,1.86,,,,,,,,,,,],
[1.09,1.11,1.12,1.13,1.14,1.16,1.17,1.18,1.20,1.21,1.22,1.23,1.25,1.26,1.27,1.28,1.29,1.30,1.31,1.32,1.33,1.34,1.35,1.36,1.37,1.38,1.38,1.39,1.39,1.40,1.41,1.41,1.41,1.42,1.42,1.42,1.42,1.42,1.42,1.43,1.43,1.88,1.90,1.91,1.93,1.94,,,,,,,,,,,,],
[1.13,1.15,1.16,1.17,1.19,1.20,1.21,1.23,1.25,1.26,1.27,1.29,1.30,1.31,1.32,1.34,1.35,1.36,1.37,1.38,1.39,1.40,1.41,1.42,1.43,1.44,1.44,1.45,1.46,1.47,1.47,1.48,1.48,1.48,1.48,1.49,1.49,1.49,1.49,1.49,1.50,1.99,2.01,2.02,2.03,,,,,,,,,,,,,],
[1.17,1.20,1.21,1.22,1.24,1.25,1.27,1.29,1.31,1.32,1.34,1.35,1.37,1.38,1.39,1.41,1.42,1.43,1.44,1.45,1.46,1.47,1.49,1.49,1.50,1.51,1.52,1.53,1.53,1.54,1.55,1.55,1.56,1.56,1.56,1.56,1.57,1.57,1.57,1.57,1.57,2.11,2.12,2.14,,,,,,,,,,,,,,],
[1.22,1.25,1.27,1.28,1.30,1.32,1.34,1.35,1.37,1.39,1.41,1.42,1.44,1.46,1.47,1.48,1.50,1.51,1.52,1.53,1.54,1.55,1.57,1.58,1.59,1.60,1.60,1.61,1.62,1.63,1.64,1.64,1.64,1.65,1.65,1.65,1.65,1.66,1.66,1.66,1.66,2.24,2.26,,,,,,,,,,,,,,,],
[1.28,1.31,1.33,1.35,1.37,1.39,1.41,1.43,1.45,1.47,1.49,1.51,1.52,1.54,1.55,1.57,1.58,1.60,1.61,1.63,1.64,1.65,1.66,1.67,1.68,1.69,1.70,1.71,1.72,1.72,1.73,1.74,1.74,1.74,1.75,1.75,1.75,1.75,1.76,1.76,1.76,2.39,,,,,,,,,,,,,,,,],
[1.35,1.38,1.41,1.43,1.45,1.47,1.50,1.52,1.54,1.56,1.58,1.60,1.62,1.64,1.65,1.67,1.68,1.70,1.72,1.73,1.74,1.75,1.77,1.78,1.79,1.80,1.80,1.82,1.82,1.83,1.84,1.85,1.85,1.85,1.86,1.86,1.86,1.87,1.87,1.87,1.87,,,,,,,,,,,,,,,,,],
[1.47,1.51,1.54,1.56,1.59,1.61,1.64,1.66,1.69,1.71,1.73,1.75,1.77,1.79,1.80,1.82,1.84,1.85,1.87,1.88,1.90,1.91,1.92,1.94,1.95,1.96,1.97,1.98,1.99,2.00,2.01,2.01,2.02,2.02,2.02,2.03,2.03,2.03,2.03,2.04,,,,,,,,,,,,,,,,,,],
[1.56,1.61,1.64,1.66,1.69,1.72,1.75,1.77,1.80,1.82,1.85,1.87,1.89,1.91,1.93,1.95,1.96,1.98,2.00,2.01,2.03,2.04,2.06,2.07,2.08,2.10,2.10,2.12,2.13,2.14,2.15,2.15,2.16,2.16,2.16,2.17,2.17,2.17,2.18,,,,,,,,,,,,,,,,,,,],
[1.67,1.72,1.75,1.78,1.81,1.84,1.87,1.90,1.94,1.96,1.98,2.00,2.03,2.05,2.07,2.09,2.11,2.13,2.14,2.16,2.17,2.19,2.21,2.22,2.23,2.25,2.25,2.27,2.28,2.29,2.30,2.31,2.31,2.32,2.32,2.32,2.33,2.33,,,,,,,,,,,,,,,,,,,,],
[1.79,1.85,1.88,1.92,1.95,1.98,2.02,2.05,2.08,2.11,2.13,2.16,2.18,2.21,2.22,2.25,2.26,2.29,2.31,2.32,2.34,2.35,2.37,2.39,2.40,2.42,2.42,2.44,2.45,2.46,2.48,2.48,2.49,2.49,2.49,2.50,2.50,,,,,,,,,,,,,,,,,,,,,],
[1.93,1.99,2.03,2.07,2.11,2.14,2.18,2.21,2.25,2.27,2.30,2.33,2.35,2.38,2.40,2.42,2.44,2.47,2.49,2.51,2.52,2.54,2.56,2.58,2.59,2.61,2.61,2.63,2.64,2.66,2.67,2.68,2.68,2.69,2.69,2.69,,,,,,,,,,,,,,,,,,,,,,],
[2.08,2.16,2.20,2.24,2.28,2.32,2.36,2.39,2.43,2.46,2.49,2.52,2.55,2.57,2.59,2.62,2.64,2.67,2.69,2.71,2.73,2.74,2.77,2.78,2.80,2.82,2.83,2.84,2.86,2.87,2.89,2.89,2.90,2.90,2.91,,,,,,,,,,,,,,,,,,,,,,,],
[2.26,2.34,2.39,2.43,2.48,2.52,2.56,2.59,2.64,2.66,2.70,2.73,2.76,2.79,2.81,2.84,2.86,2.89,2.91,2.93,2.95,2.97,3.00,3.01,3.03,3.05,3.06,3.08,3.09,3.10,3.12,3.13,3.13,3.14,,,,,,,,,,,,,,,,,,,,,,,,],
[2.46,2.55,2.60,2.65,2.69,2.74,2.78,2.82,2.86,2.89,2.93,2.96,2.99,3.02,3.05,3.08,3.10,3.13,3.16,3.18,3.20,3.22,3.25,3.27,3.29,3.31,3.32,3.34,3.35,3.37,3.38,3.39,3.40,,,,,,,,,,,,,,,,,,,,,,,,,],
[2.68,2.78,2.83,2.88,2.93,2.98,3.02,3.06,3.11,3.14,3.18,3.21,3.25,3.28,3.31,3.34,3.37,3.40,3.43,3.45,3.47,3.50,3.53,3.55,3.57,3.59,3.60,3.62,3.63,3.65,3.67,3.68,,,,,,,,,,,,,,,,,,,,,,,,,,],
[2.93,3.03,3.08,3.14,3.19,3.24,3.29,3.33,3.38,3.42,3.46,3.49,3.53,3.57,3.59,3.63,3.66,3.69,3.72,3.75,3.77,3.80,3.83,3.85,3.87,3.90,3.90,3.93,3.95,3.96,3.99,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[3.24,3.34,3.40,3.46,3.51,3.56,3.61,3.66,3.72,3.75,3.80,3.83,3.88,3.91,3.94,3.98,4.01,4.05,4.08,4.11,4.13,4.16,4.19,4.22,4.24,4.27,4.28,4.31,4.32,4.34,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[3.52,3.64,3.70,3.76,3.82,3.87,3.92,3.98,4.03,4.07,4.12,4.16,4.20,4.25,4.28,4.32,4.35,4.39,4.43,4.46,4.48,4.51,4.55,4.58,4.60,4.63,4.64,4.67,4.68,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[3.83,3.95,4.02,4.08,4.14,4.20,4.26,4.31,4.37,4.41,4.47,4.51,4.56,4.60,4.64,4.68,4.72,4.76,4.80,4.83,4.86,4.89,4.93,4.96,4.98,5.01,5.02,5.06,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[4.16,4.29,4.36,4.42,4.49,4.55,4.61,4.67,4.74,4.78,4.84,4.88,4.93,4.98,5.02,5.07,5.11,5.15,5.19,5.23,5.26,5.29,5.33,5.36,5.39,5.43,5.44,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[4.50,4.64,4.71,4.78,4.85,4.92,4.99,5.05,5.12,5.17,5.23,5.28,5.34,5.39,5.43,5.48,5.52,5.57,5.61,5.65,5.68,5.72,5.76,5.80,5.82,5.86,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[4.86,5.01,5.09,5.16,5.24,5.31,5.38,5.45,5.53,5.58,5.65,5.70,5.76,5.82,5.86,5.91,5.96,6.01,6.06,6.10,6.13,6.17,6.22,6.26,6.29,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[5.24,5.40,5.48,5.56,5.64,5.72,5.80,5.88,5.96,6.01,6.09,6.14,6.21,6.27,6.31,6.37,6.42,6.48,6.53,6.57,6.61,6.65,6.70,6.74,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[5.64,5.81,5.90,5.99,6.08,6.16,6.25,6.33,6.42,6.48,6.55,6.62,6.69,6.76,6.80,6.87,6.92,6.98,7.03,7.08,7.12,7.16,7.22,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[6.06,6.24,6.34,6.44,6.53,6.63,6.72,6.81,6.91,6.97,7.05,7.12,7.20,7.27,7.32,7.39,7.44,7.51,7.57,7.62,7.66,7.71,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[6.51,6.71,6.82,6.92,7.03,7.13,7.23,7.32,7.43,7.50,7.59,7.66,7.75,7.82,7.87,7.95,8.01,8.08,8.14,8.20,8.24,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[6.98,7.20,7.32,7.44,7.55,7.66,7.77,7.88,7.99,8.07,8.16,8.24,8.33,8.41,8.47,8.55,8.61,8.69,8.76,8.82,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[7.50,7.74,7.87,8.00,8.12,8.24,8.36,8.47,8.60,8.68,8.79,8.87,8.97,9.05,9.11,9.20,9.27,9.36,9.43,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[8.07,8.32,8.47,8.61,8.74,8.88,9.00,9.13,9.26,9.35,9.46,9.55,9.65,9.75,9.82,9.91,9.98,10.07,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[8.68,8.96,9.12,9.27,9.42,9.56,9.70,9.83,9.98,10.08,10.20,10.29,10.40,10.50,10.58,10.67,10.75,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[9.35,9.66,9.84,10.00,10.16,10.31,10.46,10.60,10.76,10.86,10.99,11.09,11.22,11.33,11.40,11.51,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[10.09,10.42,10.61,10.79,10.97,11.13,11.29,11.45,11.62,11.72,11.86,11.97,12.11,12.23,12.31,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[10.90,11.26,11.47,11.66,11.85,12.03,12.21,12.37,12.55,12.66,12.82,12.94,13.08,13.21,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[11.78,12.18,12.40,12.62,12.82,13.01,13.20,13.38,13.57,13.70,13.87,14.00,14.15,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[12.76,13.18,13.43,13.66,13.88,14.09,14.29,14.48,14.70,14.84,15.02,15.16,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[13.82,14.29,14.55,14.80,15.04,15.26,15.48,15.70,15.93,16.08,16.28,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[14.99,15.49,15.78,16.05,16.30,16.54,16.79,17.03,17.28,17.44,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[16.26,16.81,17.12,17.41,17.68,17.96,18.23,18.48,18.75,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[17.65,18.24,18.58,18.89,19.21,19.51,19.80,20.00,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[19.17,19.81,20.05,20.42,20.76,21.08,21.39,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
[20.69,21.37,21.80,22.19,22.56,22.91,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,]
]
