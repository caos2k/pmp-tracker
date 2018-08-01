<?php
	session_start(); // Starting Session

	$error=''; // Variable To Store Error Message
	
	if (isset($_POST['submit'])) {
		if (empty($_POST['username']) || empty($_POST['password'])) {
			$error = "Username or Password is invalid";
		}
		else{
			// Define $username and $password
			$username = $_POST['username'];
			$password = $_POST['password'];
			// Establishing Connection with Server by passing server_name, user_id and password as a parameter
			$mysqli = new mysqli("localhost", "root", "", "test");
			
			if ($mysqli->connect_errno) {
			    printf("Connect failed: %s\n", $mysqli->connect_error);
			    exit();
			}

			// To protect MySQL injection for Security purpose
			$username = stripslashes($username);
			$password = stripslashes($password);
			// Selecting Database
			//$db = mysql_select_db("test", $connection);
			// SQL query to fetch information of registerd users and finds user match.
			// $query = $mysqli->query("SELECT * FROM users LIMIT 10")
			// $query = $mysqli->query("SELECT * FROM users WHERE password = '$password' AND username = '$username'")
			// $query = mysql_query("select * from users where password='$password' AND username='$username'", $connection);

			if ($result = $mysqli->query("SELECT * FROM users WHERE password = '$password' AND username = '$username'")) {
			    printf("Select returned %d rows.\n", $result->num_rows);

			    /* free result set */
			    $result->close();
			}
			
			// $rows = mysql_num_rows($query);
			
			// if ($rows == 1) {
			// 	$_SESSION['login_user'] = $username; // Initializing Session

			// 	header("location: profile.php"); // Redirecting To Other Page
			// } else {
			// 	$error = "Username or Password is invalid";
			// }

			// mysql_close($connection); // Closing Connection
		}
	}
?>