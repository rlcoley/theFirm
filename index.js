var employeeName = document.querySelector('.firstlast');
var employeeYears = document.querySelector('.yearsonjob');
var employeeCity = document.querySelector('.cityofemployment');
var fullEmployeeRoster = [];

var employeeExperience = document.querySelector('.yearsofexperiences');



function initialEmployeeArrayCreation(){
	$.ajax({url:"https://bitbucket.org/OggiDanailov/firm/raw/2df585250847781831c5ab8ab4a7fdff8f5ef8fc/finances.json",
		success: function(response) {
			let theFirmInfo = JSON.parse(response);
			console.log(theFirmInfo);

  			var theFirmInfoEmployees = objectSort(theFirmInfo.employees,"fname"); //the employees get sorted and isolated and put in a temporary variable
	  		for(let i=0; i<theFirmInfoEmployees.length;i++){ //the employee info gets combined with their change and pushed to the global array for all of the employees.
	  		let promotionHolder = ""; //will hold a string for whether or not they are up for a promotion before it is passed into the the array as part of the object
			if((theFirmInfo["change"][theFirmInfoEmployees[i]["fname"]])/810>.3){
				promotionHolder = "Up for a promotion";
			} else {
				promotionHolder = "Not up for a promotion";
			}
	  			fullEmployeeRoster.push({"fname" : theFirmInfoEmployees[i]["fname"], "lname" : theFirmInfoEmployees[i]["lname"],"city" : theFirmInfoEmployees[i]["city"],"experience":theFirmInfoEmployees[i]["experience"], "change": theFirmInfo["change"][theFirmInfoEmployees[i]["fname"]],"promotion" : promotionHolder});
	  		}
	  		console.log(fullEmployeeRoster);
		}
	})
}

initialEmployeeArrayCreation();

function objectSort (toBeSorted, keyName) { //arg is an an array of objects to be sorted and the key to sort by
	console.log(toBeSorted[1][keyName]);
	console.log(keyName);
    var holder1 = {}; //will hold the objects to be switched
    var holder2 = {}; //other holder
    for(var i=0;i<toBeSorted.length-1;i++){
        for(let j = 0; j<toBeSorted.length-(i+1);j++){
        	console.log("toBeSorted "+toBeSorted[j][keyName]);
            if(toBeSorted[j][keyName]>toBeSorted[j+1][keyName]){
                holder1=toBeSorted[j];
                holder2=toBeSorted[j+1]
                toBeSorted[j]=holder2;
                toBeSorted[j+1]=holder1;
            }
        }
    }
    return toBeSorted;
}	
