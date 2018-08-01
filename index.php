<?php
  session_start();
  $_SESSION["login"] = false;
  $errorMsg = "";
  $validUser = $_SESSION["login"] === true;
  if(isset($_POST["sub"])) {
    $validUser = $_POST["username"] == "caos2k" && $_POST["password"] == "*********";
    if(!$validUser) $errorMsg = "Invalid username or password.";
    else $_SESSION["login"] = true;
  }
  if($validUser) {
     header("Location: tracker.php"); die();
  }
?>

<!doctype html>
<html lang="en">
<head>
  <link rel="icon" href="img/favicon.ico" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link href="css/style.css" type="text/css" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
  <title>Login</title>
</head>

<body>

  <section id="loginform" class="outer-wrapper">
    <div class="inner-wrapper">
      <div class="container">
        <div class="row">
          <div class="d-sm-none d-md-block col-md-2 col-lg-4"></div>
          <div class="col-sm-12 col-md-8 col-lg-4">
            <h1 class="text-center">Bentornato.</h1>
            <hr />
            <form role="form" name="input" action="" method="post">
              <div class="form-group">
                <input type="text" class="form-control" id="username" name="username" placeholder="Enter username">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password">
              </div>
              <button type="submit" name="sub" class="btn btn-default">Submit</button>
            </form>
          </div>
          <div class="hidden-sm col-2 col-lg-4"></div>
        </div>
      </div>
    </div>
  </section>

</body>
</html>