<!doctype html>
<html lang="en">

<head>
	<link rel="icon" href="img/favicon.ico" />
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link href="css/style.css" type="text/css" rel="stylesheet" />
	<title>PMP</title>
</head>

<body>

<?php
	session_start();
	if(isset($_SESSION['login']) && $_SESSION['login'] === true) {
?>

	<div class="jumbotron">
		<img id="logo" src="img/ldvmm.png" width="50">
		<h1 id="title" class="display-4">PMP Tracker<sup>&reg;</sup></h1>
	</div>

	<div class="container-fluid">

		<div class="row">
			<div class="col-3"></div>
			<div class="col-6" id="dateSelectContainer">
				<input id="dateSelect" type="week">
			</div>
			<div class="col-3"></div>
		</div>
		
		<div class="row">
			<div class="col-12">
				<table class="table table-hover">
					<thead class="thead-dark">
						<tr>
							<th id="headerEmpty" style="width: 12.5%">
							</th>
							<th style="width: 12.5%">
								<div id="headerMindfullness"></div>
							</th>
							<th style="width: 12.5%">
								<div id="headerStretching"></div>
							</th>
							<th style="width: 12.5%">
								<div id="headerAssimil"></div>
							</th>
							<th style="width: 12.5%">
								<div id="headerAnki"></div>
							</th>
							<th style="width: 12.5%">
								<div id="headerGym"></div>
							</th>
						</tr>
					</thead>
					<tbody id="tableBody">
						<tr class="rowHighlightable">
							<th class="dayName leftAlign" id="lun">
								<span class="dayTitle"> Lun </span>
								<span class="dayValues"></span>
							</td>
							<td class="checkboxes align-middle" id="0_0"></td>
							<td class="checkboxes align-middle" id="0_1"></td>
							<td class="checkboxes align-middle" id="0_2"></td>
							<td class="checkboxes align-middle" id="0_3"></td>
							<td class="checkboxes align-middle" id="0_4"></td>
						</tr>
						<tr class="rowHighlightable">
							<th class="dayName leftAlign" id="mar">
								<span class="dayTitle"> Mar </span>
								<span class="dayValues"></span>
							</td>
							<td class="checkboxes align-middle" id="1_0"></td>
							<td class="checkboxes align-middle" id="1_1"></td>
							<td class="checkboxes align-middle" id="1_2"></td>
							<td class="checkboxes align-middle" id="1_3"></td>
							<td class="checkboxes align-middle" id="1_4"></td>
						</tr>
						<tr class="rowHighlightable">
							<th class="dayName leftAlign" id="mer">
								<span class="dayTitle"> Mer </span>
								<span class="dayValues"></span>
							</td>
							<td class="checkboxes align-middle" id="2_0"></td>
							<td class="checkboxes align-middle" id="2_1"></td>
							<td class="checkboxes align-middle" id="2_2"></td>
							<td class="checkboxes align-middle" id="2_3"></td>
							<td class="checkboxes align-middle" id="2_4"></td>
						</tr>
						<tr class="rowHighlightable">
							<th class="dayName leftAlign" id="gio">
								<span class="dayTitle"> Gio </span>
								<span class="dayValues"></span>
							</td>
							<td class="checkboxes align-middle" id="3_0"></td>
							<td class="checkboxes align-middle" id="3_1"></td>
							<td class="checkboxes align-middle" id="3_2"></td>
							<td class="checkboxes align-middle" id="3_3"></td>
							<td class="checkboxes align-middle" id="3_4"></td>
						</tr>
						<tr class="rowHighlightable">
							<th class="dayName leftAlign" id="ven">
								<span class="dayTitle"> Ven </span>
								<span class="dayValues"></span>
							</td>
							<td class="checkboxes align-middle" id="4_0"></td>
							<td class="checkboxes align-middle" id="4_1"></td>
							<td class="checkboxes align-middle" id="4_2"></td>
							<td class="checkboxes align-middle" id="4_3"></td>
							<td class="checkboxes align-middle" id="4_4"></td>
						</tr>
						<tr class="rowHighlightable">
							<th class="dayName leftAlign" id="sab">
								<span class="dayTitle"> Sab </span>
								<span class="dayValues"></span>
							</td>
							<td class="checkboxes align-middle" id="5_0"></td>
							<td class="checkboxes align-middle" id="5_1"></td>
							<td class="checkboxes align-middle" id="5_2"></td>
							<td class="checkboxes align-middle" id="5_3"></td>
							<td class="checkboxes align-middle" id="5_4"></td>
						</tr>
						<tr class="rowHighlightable">
							<th class="dayName leftAlign" id="dom">
								<span class="dayTitle"> Dom </span>
								<span class="dayValues"></span>
							</td>
							<td class="checkboxes align-middle" id="6_0"></td>
							<td class="checkboxes align-middle" id="6_1"></td>
							<td class="checkboxes align-middle" id="6_2"></td>
							<td class="checkboxes align-middle" id="6_3"></td>
							<td class="checkboxes align-middle" id="6_4"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-3"></div>
			<div class="col-6">
				<div id="doneContainer"></div>
			</div>
			<div class="col-3"></div>
		</div>
	</div>	

	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js"></script>
	<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>    
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	
	<script src="js/main.js"></script>

<?php
	}
	else{

?>

	<div class="container-fluid" style="padding: 0; margin: 0">
		<div class="row">
			<div class="col-12">
				<div class="broken"></div>
			</div>
		</div>
	</div>	

	<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>    
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

<?php

	}
?>

		

	
</body>

</html>