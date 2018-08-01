//////////////////////////
// starting MC approach //
/////// 05.05.2018 ///////
//////////////////////////

var startIndex, dataInside;
var completedPieceDimension = 20;

var controller = {

	init: function(){
		model.init(new Date());
	},

	weekPicked: function(newMonday){
		//console.log(newMonday);
		$("#doneContainer").empty();
		model.init(new Date(newMonday));
	},

	cellClicked: function(cell){
		//console.log("cell: ", cell);
		var cellElement = $("#"+cell);
		var image = cellElement.children('img');
		var cellId = cell;
		var cellArray = cellId.split("_");
		var dateClicked = model.startDate.getTime() + (86400000 * cellArray[0]);
		var doneContainerPosition = $("#doneContainer").position();
		var doneContainerLastX = $("#doneContainer img").length * completedPieceDimension;
		var substitutePiece = document.createElement('img');
		substitutePiece.src = "img/back.png";
		substitutePiece.className = "emptyCell align-middle";
		

		TweenMax.to(image, .5, {
			autoAlpha: 0,
			ease: Back.easeIn.config(2),
			onComplete: function(){
				//console.log("******************************", image);
				image.remove();
				TweenMax.to(image, 0.5, {margin: "1px", width: 20, height: 20, autoAlpha: 1, x: 0, y: 0});
				cellElement.append(substitutePiece);
				$("#doneContainer").append(image);
			} 
		});
		
		var clickedRowProgressBar = cellElement.parent().children('.dayName').find(".dayValues").find(".progress");

		console.log("clickedRowProgressBar: ", clickedRowProgressBar);

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
			},
			success: function (test) {
				//console.log("test", test);
		    },
			complete: function () {
				//console.log();
				$.ajax({
					url: "db.json"
				})
				.done(function(data) {
					var newStartIndex = Number(controller.getMondayIndex(data.list, controller.getMonday(model.today))) + Number(cellArray[0]);
			    	clickedRowProgressBar.empty();
			    	clickedRowProgressBar.append(controller.insertProgress(data, newStartIndex));
			    	console.log(clickedRowProgressBar);
				})
		    }
	    });

		
	},

	getData: function() {

		$.ajax({
			url: "db.json",
			async: false
		})
		.done(function(dataDone) {
			dataInside = dataDone;
			startIndex = controller.getMondayIndex(dataInside.list, controller.getMonday(model.today));
			view.populateTable(dataInside);
		});

		return dataInside;
	},

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

	getWeekNumber: function(d) {
	    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
	    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
	    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	    
	    return weekNo;
	},

	getDateOfWeek: function(w, y) {
	    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
	    //console.log("dddddddddddd:", d);
	    //console.log("yyyyy:", y);
	    //console.log("wwwww:", w);

	    return new Date(y, 0, d);
	},

	formatDate: function(date) {
	    var d = new Date(date),
	        week = '' + (controller.getWeekNumber(d)),
	        year = d.getFullYear();

	    if (week.length < 2) week = '0' + week;
	    
	    //console.log(year + "-W" + week);
	    return year + "-W" + week;
	},

	insertProgress: function(dataProgress, start) {
		var dataProgress = dataProgress;
		var start = start;
		var singleDayTodosArray = dataProgress.list[start].todos;
		var testVar = dataProgress.list[start];
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

		////console.log("dataProgress", dataProgress);
		////console.log("start", start);
		////console.log("day", testVar);
		////console.log("singleDayTodosArray", singleDayTodosArray);
		// //console.log("percentage", percentage);
		// //console.log("remaining", remaining);

		return '<div class="progress-bar bg-success" role="progressbar" style="width: '+percentage+'%" aria-valuenow="'+percentage+'" aria-valuemin="0" aria-valuemax="100"></div>'
			 + '<div class="progress-bar bg-danger" role="progressbar" style="width: '+remaining+'%" aria-valuenow="'+remaining+'" aria-valuemin="0" aria-valuemax="100"></div>';
	},

	getMondayIndex: function(dataMondayIndex, mondayDate) {
		var dataMondayIndex = dataMondayIndex;
		var index = -1;
		var val = mondayDate.getTime();

		// //console.log(dataMondayIndex);
		// //console.log(mondayDate);
		
		var filteredObj = dataMondayIndex.find(function(item, i){
		  if(item.date === val){
		    index = i;
		    return index;
		  }
		});
		return index;
	}

};



var view = {

	populateTable: function(dataRicevuta){
		var dataReceived = dataRicevuta;

		//console.log("dataReceived", dataReceived);

		var dayBulb = model.today.getDay();
		var correctIndex = dayBulb == 0 ? 6 : dayBulb - 1;
		model.bulbCells[correctIndex].classList.add("table-warning"); 
		
		for (var i = 0; i < 7; i++) {

			$(model.daysCells[i]).empty();
			$(model.daysCells[i]).append(controller.formatTime(dataReceived.list[startIndex+i].date));
			$(model.daysCells[i]).append('<br><div class="progress">' + controller.insertProgress(dataReceived, startIndex+i) + '</div>');
									
			for (var j = 0; j < dataReceived.list[startIndex+i].todos.length; j++) {
				var id = i+"_"+j;
				var cell = document.getElementById(id);
				$(cell).empty();

				var blackPiece = document.createElement('img');
				var repeatPiece = document.createElement('img');
				//blackPiece.type = "blackPiece";
				blackPiece.id = id;
				if (dataReceived.list[startIndex+i].todos[j].completed == 1) {
					// cell.classList.add("table-success");

					blackPiece.src = "img/black_round.png";
					blackPiece.width = completedPieceDimension;
					blackPiece.height = completedPieceDimension;
					blackPiece.className = "completedPiece align-middle";
					blackPiece.checked = true;

					repeatPiece.src = "img/back.png";
					repeatPiece.className = "emptyCell align-middle";
					cell.appendChild(repeatPiece);
					$("#doneContainer").append(blackPiece);
				}
				else if (dataReceived.list[startIndex+i].todos[j].completed == 0) {
					// cell.classList.add("table-danger");

					blackPiece.src = "img/black_round.png";
					blackPiece.className = "checkboxClassMetal align-middle";
					blackPiece.checked = false;
					//console.log("blackPiece.checked: ", blackPiece.checked);
					cell.appendChild(blackPiece);
				}
				else{
					// cell.classList.add("");
				}						
				
			}
		}
	}

	


};


var model = {
	
	tblBody: $("#tableBody"),
	daysCells: $(".dayName").find(".dayValues"),
	blackCells: $(".checkboxes").find("img"),
	bulbCells: $(".rowHighlightable"),

	init: function(day){
		model.today = new Date(day);
		model.today.setHours(0,0,0,0);
		$('#dateSelect').val(controller.formatDate(day));
		$('#dateSelect').attr("min", '2018-W18').attr("max", '2019-W17');
		model.startDate = controller.getMonday(model.today);
		var dataInit = controller.getData();
	}
	
};





$(document).ready(function() {

	controller.init();

	$( ".checkboxClassMetal" ).click(function() {
		console.log("clicked")

		controller.cellClicked(this.id);
	});

	$( ".emptyCell" ).click(function() {
		//console.log("clicked empty cell")

		controller.cellClicked(this.id);
	});

	$( "#dateSelect" ).on("change", function() {
		var year = this.value.substring(0,4);
		var week = this.value.substring(6,8);
		//console.log(week);
		//console.log(year);
		var mondayDateOfThatWeek = controller.getDateOfWeek(week, year);
		//console.log(mondayDateOfThatWeek);
		controller.weekPicked(mondayDateOfThatWeek);
	});

});



