var employeeName = document.querySelector('.firstlast');
var employeeYears = document.querySelector('.yearsonjob');
var employeeCity = document.querySelector('.cityofemployment');
var searchBar = document.querySelector('.searchbar');
var submitBtn = document.querySelector('.submitbtn');
var portrait = document.querySelector('.employeeimage');
var fullEmployeeRoster = [];

var cities = []
var fromPhilly = []
var fromBarcelona = []
var fromSofia = []
var fromNYC = []
var fromBerlin = []
var fromWarsaw = []
var employeeExperience = document.querySelector('.yearsofexperiences');

var employeeList = document.getElementById('employeeList');
var personname = document.getElementById('firstlast');
var city = document.getElementById('city');
var years = document.getElementById('years');



// Array of portrait objects containing image file path for each employee.
var portraitArray = [
	{"Amelie" : 'images/portraits/woman1.jpeg'},
	{"Anatoli" : 'images/portraits/man1.jpeg'},
	{"Anna" : 'images/portraits/woman2.jpeg'},
	{"Anna" : 'images/portraits/woman3.jpeg'},
	{"Blanca" : 'images/portraits/woman4.jpeg'},
	{"Boro" : 'images/portraits/man2.jpeg'},
	{"Carlos" : 'images/portraits/man3.jpeg'},
	{"Christina" : 'images/portraits/woman5.jpg'},
	{"George" : 'images/portraits/man4.jpeg'},
	{"Gina" : 'images/portraits/woman6.jpg'},
	{"Helen" : 'images/portraits/woman7.jpeg'},
	{"Hilary" : 'images/portraits/woman8.jpeg'},
	{"Inga" : 'images/portraits/woman9.jpeg'},
	{"James" : 'images/portraits/man5.jpg'},
	{"Johannes" : 'images/portraits/man6.jpg'},
	{"John" : 'images/portraits/man7.jpeg'},
	{"Karolina" : 'images/portraits/woman10.jpeg'},
	{"Luca" : 'images/portraits/man8.jpeg'},
	{"Lucy" : 'images/portraits/woman11.jpeg'},
	{"Maria" : 'images/portraits/woman12.jpeg'},
	{"Michael" : 'images/portraits/man9.jpg'},
	{"Oggi" : 'images/portraits/man10.jpg'},
	{"Paco" : 'images/portraits/man11.jpg'},
	{"Paul" : 'images/portraits/man12.jpg'},
	{"Rad" : 'images/portraits/man13.jpeg'},
	{"Ringo" : 'images/portraits/man14.jpg'},
	{"Scott" : 'images/portraits/man15.jpg'},
	{"Spas" : 'images/portraits/man16.jpg'},
	{"Suzanne" : 'images/portraits/woman13.jpeg'},
	{"Uros" : 'images/portraits/man17.jpeg'},
	{"Vasil" : 'images/portraits/woman14.jpeg'},
	{"Zoraida" : 'images/portraits/woman15.jpeg'},
];

function initialEmployeeArrayCreation(){
	$.ajax({url:"https://bitbucket.org/OggiDanailov/firm/raw/2df585250847781831c5ab8ab4a7fdff8f5ef8fc/finances.json",
		success: function(response) {
			let theFirmInfo = JSON.parse(response);
			console.log(theFirmInfo);
  			var theFirmInfoEmployees = objectSort(theFirmInfo.employees,"fname"); //the employees get sorted and isolated and put in a temporary variable
	  		for(let i=0; i<theFirmInfoEmployees.length;i++){ //the employee info gets combined with their change and pushed to the global array for all of the employees.
	  			fullEmployeeRoster.push({
					"fname" : theFirmInfoEmployees[i]["fname"],
					"lname" : theFirmInfoEmployees[i]["lname"],
					"city" : theFirmInfoEmployees[i]["city"],"experience":theFirmInfoEmployees[i]["experience"],
					"change": theFirmInfo["change"][theFirmInfoEmployees[i]["fname"]],
					"portrait":portraitArray[i][theFirmInfoEmployees[i]['fname']]
				});

	  		}

	  		// console.log(fullEmployeeRoster);
        getCities()

	  		console.log(fullEmployeeRoster);
	  		employeeListFunction();

		}
	})
}

function getCities() {

  for (var i = 0; i < fullEmployeeRoster.length; i++) {
    cities.push({
      city: fullEmployeeRoster[i].city
    })
    if (fullEmployeeRoster[i].city == "Philadelphia") {
      fromPhilly.push(fullEmployeeRoster[i])
    }if (fullEmployeeRoster[i].city == "Barcelona") {
      fromBarcelona.push(fullEmployeeRoster[i])
    }if (fullEmployeeRoster[i].city == "Sofia") {
      fromSofia.push(fullEmployeeRoster[i])
    }if (fullEmployeeRoster[i].city == "NYC") {
      fromNYC.push(fullEmployeeRoster[i])
    }if (fullEmployeeRoster[i].city == "Warsaw") {
      fromWarsaw.push(fullEmployeeRoster[i])
    }else if(fullEmployeeRoster[i].city == "Berlin") {
      fromBerlin.push(fullEmployeeRoster[i])
    }
  }

  // for (var i = 0; i < cities.length; i++) {
  //   console.log(cities[i]);
  // }
  console.log(fromBarcelona);
  console.log(fromBerlin);
  console.log(fromNYC);
  console.log(fromSofia);
  console.log(fromPhilly);
  console.log(fromWarsaw);

  // console.log(fullEmployeeRoster);
  // }
}
initialEmployeeArrayCreation();

function objectSort (toBeSorted, keyName) { //arg is an an array of objects to be sorted and the key to sort by
	// console.log(toBeSorted[1][keyName]);
	// console.log(keyName);
    var holder1 = {}; //will hold the objects to be switched
    var holder2 = {}; //other holder
    for(var i=0;i<toBeSorted.length-1;i++){
        for(let j = 0; j<toBeSorted.length-(i+1);j++){
        	// console.log("toBeSorted "+toBeSorted[j][keyName]);
            if(toBeSorted[j][keyName]>toBeSorted[j+1][keyName]){
                holder1=toBeSorted[j];
                holder2=toBeSorted[j+1]
                toBeSorted[j]=holder2;
                toBeSorted[j+1]=holder1;
            }
        }
    }
    // console.log(fullEmployeeRoster["fname"] + fullEmployeeRoster['lname']);
    return toBeSorted;
}	



function employeeListFunction(){
  //on start button, creates a container box which holds each letter of the word to guess
      var container = document.createElement("div");
      container.id = 'employeeContainer';
      container.className = "employeeContainer";
      // container.style.border = "2px solid black";
      container.style.borderRadius = "5px";
      container.style.width = "60%";
      container.style.height = "40%";
      container.style.marginTop = "150px"
      container.style.display = "inline-block";
      container.style.backgroundColor = "white";
      
      // container.style.boxShadow = "2px 2px 2px";
      container.style.overflow = "hidden";
      employeeList.appendChild(container);

      //on start button, creates a box for each letter of the word to guess
  for (let i = 0; i < fullEmployeeRoster.length;i++){
      var employeeTile = document.createElement("div");
      employeeList.setAttribute("align", "center");
      employeeTile.id = "employeeTile"+[i];
      employeeTile.className = "employeeTile";
      container.appendChild(employeeTile)[i]
      employeeTile.style.border = "2px solid white";
      employeeTile.style.backgroundColor = "#3A7CA5";
      employeeTile.style.color = "white";
      employeeTile.style.width = "100px";
      employeeTile.style.height = "100px";
      employeeTile.style.display = "inline-block";
      employeeTile.style.margin = "10px"
      employeeTile.style.borderRadius = "5px"
      employeeTile.style.fontSize = "1em"
      employeeTile.style.textAlign = "center"
      employeeTile.style.overflow = "hidden"
      employeeTile.innerHTML = fullEmployeeRoster[i].fname+" " +fullEmployeeRoster[i].lname;
      // employeeTile.innerHTML = "City: " +fullEmployeeRoster[i].city;


      employeeTile.addEventListener('click', function(){
      	personname.innerHTML = fullEmployeeRoster[i].fname + " " +fullEmployeeRoster[i].lname;
      	city.innerHTML = fullEmployeeRoster[i].city;
      	years.innerHTML = fullEmployeeRoster[i].experience;

      })
     }
 };



  }


// Event listener for search bar
submitBtn.addEventListener('click', function (){
	for(let i = 0; i < fullEmployeeRoster.length; i++) {
		if(searchBar.value.toLowerCase() == fullEmployeeRoster[i]["fname"].toLowerCase() || searchBar.value == fullEmployeeRoster[i]["lname"].toLowerCase()){
			console.log(fullEmployeeRoster[i]);
			employeeName.innerHTML = `${fullEmployeeRoster[i]['fname']}	${fullEmployeeRoster[i]['lname']}	`;
			employeeYears.innerHTML = fullEmployeeRoster[i]['experience'];
			employeeCity.innerHTML = fullEmployeeRoster[i]['city'];
			portrait.style.backgroundImage = 'url(' +fullEmployeeRoster[i]['portrait']+')';
	}
}
})
