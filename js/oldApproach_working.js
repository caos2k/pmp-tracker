var today, tblBody, startDate, dayTitle, startIndex, daysCells;

$(document).ready(function() {
	today = new Date();
	today.setHours(0,0,0,0);
	startDate = getMonday(today); 
	tblBody = document.getElementById("tableBody");
	populateCalendar();
});

function populateCalendar() {
	$.ajax({
		url: "db.json"
	})
	.done(function(data) {

		startIndex = getMondayIndex(data.list, getMonday(today));
		daysCells = document.getElementsByClassName("dayName");

		var dayBulb = today.getDay();
		var correctIndex = dayBulb == 0 ? 6 : dayBulb - 1;
		var bulbCells = document.getElementsByClassName("rowHighlightable")
		bulbCells[correctIndex].classList.add("table-warning");
		
		for (var i = 0; i < 7; i++) {

			daysCells[i].innerHTML += '<br>' + formatTime(data.list[startIndex+i].date);
			daysCells[i].innerHTML += '<br><div class="progress">' + insertProgress(data, startIndex+i) + '</div>';
									
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

		$('input:checkbox').click('change', function(){
			
			var cellClicked = this.id;
			var cellArray = cellClicked.split("_");
			var dateClicked = startDate.getTime() + (86400000 * cellArray[0]);
			
		    if (this.checked) {
		    	var parentCell = $(this).parent();
		    	var parentRow = $(this).parent().parent().children('.dayName');
				// parentCell[0].classList.remove("table-danger");
		    	$.ajax
			    ({ 
			        url: 'receiver.php',
			        type: 'POST',
					data: {
						date: dateClicked,
						index: Math.abs(startIndex)+Math.abs(cellArray[0]),
						cellRow: cellArray[0],
						cellCol: cellArray[1],
						clicked: 1
					}
					,complete: function () {
						$.ajax({
							url: "db.json"
						})
						.done(function(data) {
							var newStartIndex = Number(getMondayIndex(data.list, getMonday(today))) + Number(cellArray[0]);
					    	parentRow[0].lastChild.innerHTML = insertProgress(data, newStartIndex);
						})
				    }
			    })
		    } 
		    if (!this.checked) {
		    	var parentCell = $(this).parent();
		    	var parentRow = $(this).parent().parent().children('.dayName');
				// parentCell[0].classList.remove("table-danger");
		    	//parentRow[0].lastChild.innerHTML = insertProgress(data, newStartIndex);
		    	$.ajax
			    ({ 
			        url: 'receiver.php',
			        type: 'POST',
					data: {
						date: dateClicked,
						index: Math.abs(startIndex)+Math.abs(cellArray[0]),
						cellRow: cellArray[0],
						cellCol: cellArray[1],
						clicked: 0
					}
					,complete: function () {

						$.ajax({
							url: "db.json"
						})
						.done(function(data) {
							var newStartIndex = Number(getMondayIndex(data.list, getMonday(today))) + Number(cellArray[0]);
					    	parentRow[0].lastChild.innerHTML = insertProgress(data, newStartIndex);
						})

				    }
			    })
		    } 
		});
	});
}

function getMonday(d) {
	var d = new Date(d);
	var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : 1);	
	var monday = new Date(d.setDate(diff));
	return monday;
}

function formatTime(timestamp) {
	var date = new Date(timestamp);

	var timeString = ('0' + date.getDate()).slice(-2) + '/'
					+ ('0' + (date.getMonth()+1)).slice(-2);

    return timeString;
}

function insertProgress(data, start) {
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
}

function getMondayIndex(data, mondayDate) {
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


