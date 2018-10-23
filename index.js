var employeeName = document.querySelector('.firstlast');
var employeeYears = document.querySelector('.yearsonjob');
var employeeCity = document.querySelector('.cityofemployment');
var searchBar = document.querySelector('.searchbar');
var submitBtn = document.querySelector('.submitbtn');
var portrait = document.querySelector('.employeeimage');
var expense = document.getElementById('expense')
var detailsList = document.getElementById('detailsList')

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
	{"Blanca" : 'images/portraits/woman4.jpg'},
	{"Boro" : 'images/portraits/man2.jpeg'},
	{"Carlos" : 'images/portraits/man3.jpeg'},
	{"Christina" : 'images/portraits/woman5.jpg'},
	{"George" : 'images/portraits/man4.jpeg'},
	{"Gina" : 'images/portraits/woman6.jpeg'},
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
	{"Scott" : 'images/portraits/man15.jpeg'},
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
				//adds a promotion notice into the object
				let promotionHolder = "";
				if ((theFirmInfo["change"][theFirmInfoEmployees[i]["fname"]])/810>0.3){
					promotionHolder = "Up for promotion";
				}else {
					promotionHolder = "Not up for a promotion";
				}
				fullEmployeeRoster.push({
					"fname" : theFirmInfoEmployees[i]["fname"],
					"lname" : theFirmInfoEmployees[i]["lname"],
					"city" : theFirmInfoEmployees[i]["city"],"experience":theFirmInfoEmployees[i]["experience"],
					"change": theFirmInfo["change"][theFirmInfoEmployees[i]["fname"]],
					"portrait":portraitArray[i][theFirmInfoEmployees[i]['fname']],
					"promotion": promotionHolder
				});
	  		}

	  		// console.log(fullEmployeeRoster);
        getCities()


	  		employeeListFunction();

        runExpenses();
		}
	})
}

// Get all cities, then push into each array basesd on city
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
      container.style.width = "50%";
      container.style.height = "40%";
      container.style.marginTop = "50px"
      container.style.display = "inline";

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
      employeeTile.style.border = "2px solid black";
      employeeTile.style.backgroundColor = "#3A7CA5";
      employeeTile.style.color = "white";
      employeeTile.style.width = "100px";
      employeeTile.style.height = "100px";
      employeeTile.style.display = "inline-block";
      employeeTile.style.margin = "10px";
      // employeeTile.style.paddingTop = '50px'
      employeeTile.style.borderRadius = "5px";
      employeeTile.style.fontSize = "1em";
      employeeTile.style.textAlign = "center";
      employeeTile.style.overflow = "hidden";
      employeeTile.innerHTML = fullEmployeeRoster[i].fname+" " +fullEmployeeRoster[i].lname;
      // employeeTile.innerHTML = "City: " +fullEmployeeRoster[i].city;

      // allows user to click on particular employee and displays their information in display
      employeeTile.addEventListener('click', function(){
      	personname.innerHTML =fullEmployeeRoster[i].fname + " " +fullEmployeeRoster[i].lname;
      	city.innerHTML ="City: " + fullEmployeeRoster[i].city;
      	years.innerHTML ="Experience: " + fullEmployeeRoster[i].experience;
      	portrait.style.backgroundImage = 'url(' +fullEmployeeRoster[i]['portrait']+')';
        personname.style.display ='block'
        city.style.display ='block'
        years.style.display ='block'

        expense.addEventListener('click', function() {
            employeeYears.innerHTML = "Expenses saved: $"+ fullEmployeeRoster[i].change;
            employeeCity.innerHTML = 'Promotion candidate: ' + fullEmployeeRoster[i].promotion;
            detailsList.style.marginTop = '20px';
            detailsList.style.fontSize ='1em'
            var expenseCompareButton = document.createElement("div");
            expenseCompareButton.style.border = "2px solid white";
            expenseCompareButton.style.borderRadius = "5px";
            expenseCompareButton.style.backgroundColor = "#3A7CA5";
            expenseCompareButton.style.color = "white";
            expenseCompareButton.style.width = "150px";
            expenseCompareButton.style.height = "20px";
            expenseCompareButton.style.textAlign = "center";
            expenseCompareButton.style.display = "inline-block";
            expenseCompareButton.style.marginBottom = "10px";
            expenseCompareButton.style.marginRight = "30px";
            expenseCompareButton.innerHTML = "Compare Expenses";
            detailsList.appendChild(expenseCompareButton);
              expenseCompareButton.addEventListener('click', function(){
                createChart(false,fullEmployeeRoster[i]);
              })
        })

      })
     }
 };




// Event listener for search bar
submitBtn.addEventListener('click', function (){
	for(let i = 0; i < fullEmployeeRoster.length; i++) {
		if(searchBar.value.toLowerCase() == fullEmployeeRoster[i]["fname"].toLowerCase() || searchBar.value == fullEmployeeRoster[i]["lname"].toLowerCase()){
			console.log(fullEmployeeRoster[i]);
			employeeName.innerHTML = `${fullEmployeeRoster[i]['fname']}	${fullEmployeeRoster[i]['lname']}	`;
			employeeYears.innerHTML ="Experience: " + fullEmployeeRoster[i]['experience'];
			employeeCity.innerHTML = "City: " +  fullEmployeeRoster[i]['city'];
			portrait.style.backgroundImage = 'url(' +fullEmployeeRoster[i]['portrait']+')';
			portrait.style.backgroundImage = 'url(' +fullEmployeeRoster[i]['portrait']+')';

	}
}
})

//charts

function createChart(allPeople, whichPerson){
  setTimeout(function(){
    var chartLabel = [];
    var chartData = [];
    var chartBorderColor = [];
    var chartBarColor = [];
    var chartBarColorList = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ];
    var chartBorderColorList= [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ];
    if (allPeople==true){
      for(let i=0; i<fullEmployeeRoster.length; i++){
        chartLabel.push(fullEmployeeRoster[i].fname);
        chartData.push(fullEmployeeRoster[i].change);
      }
    } else {
      let citySpending = 0;
      let experienceSpending = 0;
      let experienceCount = 0;
      let cityCount = 0;
      chartLabel.push("employees from: "+whichPerson.city+" average");
      chartLabel.push("empolyees of "+whichPerson.experience+" years of experience average");
      chartLabel.push(whichPerson.lname+", "+whichPerson.fname+": total change");
      for(let i = 0; i < fullEmployeeRoster.length;i++){
        if(fullEmployeeRoster[i].city==whichPerson.city){
          citySpending += fullEmployeeRoster[i].change;
          cityCount++;
        }
        if(fullEmployeeRoster[i].experience == whichPerson.experience){
          experienceSpending += fullEmployeeRoster[i].change;
          experienceCount++;
        }
      }
      chartData.push(citySpending/cityCount);
      chartData.push(experienceSpending/experienceCount);
      chartData.push(whichPerson.change);
    }

    // setTimeout(function(){
    for(let i=0; i<chartLabel.length; i++){
      chartBorderColor.push(chartBorderColorList[i%chartBorderColorList.length]);
      chartBarColor.push(chartBarColorList[i%chartBarColorList.length]);
    }
  // },500);

    console.log(chartData);
    console.log(chartLabel);
    console.log(chartBorderColor);
    console.log(chartBarColor)
    var chartSection = document.getElementById("firmChart").getContext('2d');
    var firmChart = new Chart(chartSection, {
        type: 'bar',
        data: {
            labels: chartLabel,
            // labels:[fullEmployeeRoster.fname];
            datasets: [{
                label: "Eployee Change from Spending Budget",
                data: chartData,
                backgroundColor: chartBarColor,
                borderColor: chartBorderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }, 500);
}


window.setTimeout(function(){
  createChart(true,fullEmployeeRoster[9]);
}, 500);

function runExpenses() {
}
