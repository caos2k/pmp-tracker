//////////////////////////
// starting MC approach //
/////// 05.05.2018 ///////
//////////////////////////


var controller = {

	getMonday: function(d){
		var d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1);	
		var monday = new Date(d.setDate(diff));
		return monday;
	},


	formatTime: function(timestamp) {
		var date = new Date(timestamp);

		var timeString = ('0' + date.getDate()).slice(-2) + '/'
						+ ('0' + (date.getMonth()+1)).slice(-2);

	    return timeString;
	},

	insertProgress: function(data, start) {
		var data = data;
		var start = start;
		var singleDayTodosArray = data.list[start].todos;
		var testVar = data.list[start];
		var completedNumber = 0;
		var totalNumber = 5;

		for (var w = 0; w < singleDayTodosArray.length; w++) {
			if (singleDayTodosArray[w].completed == 1) {
				completedNumber++;
			}
			else if (singleDayTodosArray[w].completed == "none") {
				totalNumber--;
			}
		}
		
		var percentage = (completedNumber / totalNumber) * 100;
		var remaining = 100 - percentage;

		//console.log("data", data);
		//console.log("start", start);
		console.log("day", testVar);
		//console.log("singleDayTodosArray", singleDayTodosArray);
		console.log("percentage", percentage);
		console.log("remaining", remaining);

		return '<div class="progress-bar bg-success" role="progressbar" style="width: '+percentage+'%" aria-valuenow="'+percentage+'" aria-valuemin="0" aria-valuemax="100"></div>'
			 + '<div class="progress-bar bg-danger" role="progressbar" style="width: '+remaining+'%" aria-valuenow="'+remaining+'" aria-valuemin="0" aria-valuemax="100"></div>';
	},

	getMondayIndex: function(data, mondayDate) {
		var data = data;
		var index = -1;
		var val = mondayDate.getTime();
		
		var filteredObj = data.find(function(item, i){
		  if(item.date === val){
		    index = i;
		    return index;
		  }
		});
		return index;
	}

};



var view = {

	init: function(){

		$.ajax({
			url: "db.json"
		})
		.done(function(data) {

			startIndex: controller.getMondayIndex(data.list, controller.getMonday(today));
			view.populateTable(data);
			
		});

	},

	populateTable: function(data){
		var dayBulb = model.today.getDay();
		var correctIndex = dayBulb == 0 ? 6 : dayBulb - 1;
		model.bulbCells[correctIndex].classList.add("table-warning");
		
		for (var i = 0; i < 7; i++) {

			daysCells[i].innerHTML += '<br>' + controller.formatTime(data.list[startIndex+i].date);
			daysCells[i].innerHTML += '<br><div class="progress">' + controller.insertProgress(data, startIndex+i) + '</div>';
									
			for (var j = 0; j < data.list[startIndex+i].todos.length; j++) {
				var id = i+"_"+j;
				var cell = document.getElementById(id);

				var checkbox = document.createElement('input');
				checkbox.type = "checkbox";
				checkbox.id = id;
				checkbox.className = "checkboxClass";
				if (data.list[startIndex+i].todos[j].completed == 1) {
					// cell.classList.add("table-success");
					checkbox.checked = true;
					cell.appendChild(checkbox);
				}
				else if (data.list[startIndex+i].todos[j].completed == 0) {
					// cell.classList.add("table-danger");
					checkbox.checked = false;
					cell.appendChild(checkbox);
				}
				else{
					// cell.classList.add("");
				}						
				
			}
		}
	}

	


};


var model = {
	
	today: new Date(),
	tblBody: document.getElementById("tableBody"),
	daysCells: document.getElementsByClassName("dayName"),
	bulbCells: document.getElementsByClassName("rowHighlightable"),	
	json: "db.json",
	
	init: function(){
		today.setHours(0,0,0,0);
		view.init();
	}

};



model.init();










	// for (var i = 0; i < 367; i++) {

	// 	var date = new Date((1525039200000 + (i*86400000)));
	// 	var weekDay = date.getDay();

	// 	console.log('{\n');
	// 	console.log('	"date": ' + (1525039200000 + (i*86400000)) + ',');
	// 	console.log('	"todos": [');

	// 	console.log('		{\n');
	// 	console.log('			"title": "Mindfullness",\n');
	// 	console.log('			"completed": 0\n');
	// 	console.log('		},\n');

	// 	console.log('		{\n');
	// 	console.log('			"title": "Stretching",\n');
	// 	console.log('			"completed": 0\n');
	// 	console.log('		},\n');

	// 	console.log('		{\n');
	// 	console.log('			"title": "Assimil",\n');
	// 	console.log('			"completed": 0\n');
	// 	console.log('		},\n');

	// 	console.log('		{\n');
	// 	console.log('			"title": "Anki",\n');
	// 	console.log('			"completed": 0\n');
	// 	console.log('		},\n');

	// 	console.log('		{\n');
	// 	console.log('			"title": "Gym",\n');

	// 	if (weekDay == 0) {
	// 		console.log('			"completed": "none"\n');
	//     }

	//     else if (weekDay == 1) {
	//     	console.log('			"completed": "none"\n');
	//     }

	//     else if (weekDay == 2) {
	//     	console.log('			"completed": 0\n');
	//     }

	//     else if (weekDay == 3) {
	//     	console.log('			"completed": "none"\n');
	//     }

	//     else if (weekDay == 4) {
	//     	console.log('			"completed": 0\n');
	//     }

	//     else if (weekDay == 5) {
	//     	console.log('			"completed": "none"\n');
	//     }

	//     else if (weekDay == 6) {
	//     	console.log('			"completed": 0\n');
	//     }

		
	// 	console.log('		}\n');

	// 	console.log('	]\n');
	// 	console.log('},\n');
	// }
