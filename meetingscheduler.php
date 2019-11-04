<?php
include('config.php');

$id = '';

$con = mysqli_connect("localhost","root","","meeting_schedule");

//Access-Control Start

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods:*");
      header("Access-Control-Headers: *");    // cache for 1 day
      header("Acess-Control-Max-Age: 86400");
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

      exit(0);
  }

  //Access-Control End


  
  $method = $_SERVER['REQUEST_METHOD'];
  //$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
  
  
  if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
  }
  


switch ($method) {
  case 'GET':
  // $meeting_name=($_GET["meeting"]);
  // $chairman= ($_GET["chairman"]);
  // $scheduler =($_GET["scheduler"]);
  // $date = $_GET["date"];
  // $time = $_GET["time"];
  // $room = $_GET["room"];
  // $location = $_GET["location"];
  // $agenda = $_GET["agenda"];
  // $attendees = $_GET["attendees"];

  $sql = "SELECT * FROM meeting"; 
  break;
  case 'POST': 
      $meeting_name = htmlentities($_POST["meeting_name"]);
      $chairman= htmlentities($_POST["chairman"]);
      $scheduler = htmlentities($_POST["scheduler"]);
      $date = $_POST["date"];
      $time_from = $_POST["time_from"];
      $time_to = $_POST["time_to"];
      $room = $_POST["room"];
      $location = $_POST["location"];
      $agenda = $_POST["agenda"];
      $attendees = $_POST["attendees"];
      $names= $_POST["names"];

    
//adding an  file to our database
      $response = array();
      $upload_dir = 'files/';
      $server_url = 'http://localhost/';

if($_FILES['avatar']){
  $avatar_name = $_FILES["avatar"]["name"];
    //image link
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    //sizee of imaage
    $avatarsize=$_FILES["avatar"]["size"];
    //checking for errors
    $error = $_FILES["avatar"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );
              $avatar_path = $server_url."newcontact/".$upload_name;
        }
        else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }    

}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}
$tyme = date("Y/m/d h:i:sa");

      $sql = "INSERT INTO meeting ( meeting_name,chairman,scheduler,date,time_from,time_to,room,location,agenda,attendees,names,file_name,file_tmp,created_at,updated_at) values ('$meeting_name','$chairman','$scheduler','$date','$time_from','$time_to' ,'$room', '$location', '$agenda','$attendees','$names','$avatar_name','$avatar_path','$tyme','$tyme')"; 
break;
}

// run SQL statement
$result = mysqli_query($con,$sql);


// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
else{
  require 'PHP_Mailer/PHPMailerAutoload.php';
  require 'credential.php';

  
  $mail = new PHPMailer;
  
  //$mail->SMTPDebug = 3;                               // Enable verbose debug output
  
//   $mail->isSMTP();                                      // Set mailer to use SMTP
//   $mail->Host = 'smtp.mailtrap.io';  // Specify main and backup SMTP servers
//   $mail->SMTPAuth = true;                               // Enable SMTP authentication
//   $mail->Username = '17b8a287b2cc6a';                 // SMTP username
//   $mail->Password = '3f88f93a35967e';                           // SMTP password
//   $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
//   $mail->Port = '2525';

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'mail.nabamis.com';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'support@nabamis.com';                 // SMTP username
  $mail->Password = 'd9dpermit2amis';                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = '25';
  $mail->From = 'support@nabamis.com';                                    // TCP port to connect to
  
  var_dump($attendees);
  var_dump($names);
  $mail->setFrom(EMAIL, 'Mailer');
  // $mail->addAddress($attendees, $scheduler);   // Add a recipient
 
  foreach(explode(",", $names) as $email){    //this separates joined string into individual strings by commaand enables us to send mails to individual attendees.
    $mail->addAddress($email, $attendees);
  }

  foreach(explode(",", $attendees) as $name){    //this separates joined string into individual strings by commaand enables us to send mails to individual attendees.
    $mail->addAddress($email, $names);
  }

//   foreach(explode(",", $names) as $email){    //this separates joined string into individual strings by commaand enables us to send mails to individual attendees.
//     $mail->addAddress($email, $names);
//   }
//   foreach(explode(",", $attendees) as $name){    //this separates joined string into individual strings by commaand enables us to send mails to individual attendees.
//     $mail->addAddress($email, $names);
//   }
  $mail->isHTML(true);                                  // Set email format to HTML
  
  $mail->Subject = 'Meeting Schedule';
  $mail->Body    = "<div class='content'>
  <div class='container'>
  
  <div class='row'>
  <div class='col-md-12'>
  
      <div class='panel-body'>
  
          <div id='for_nab' class='clearfix'>
              <div class='pull-left'>
                 <address>
                      
                         Tel. No: 0302 506143<br>
                         <br>
                         12 Nii Amon Kotey St,East Legon Accra<br>
                        <abbr></abbr> website: www.makeduconsult.com
                        </address>
              </div>
              
             
          </div>
  <br/>
        
          <div class='row'>
              <div class='col-md-12'>
                  
                  <div class='pull-left m-t-30'>
                      <address>
                        Dear ".$name." ,</strong><br>
                      </address>
                  </div>
  
              </div>
          </div>
          <br/>
         
           <div class='m-h-50'></div>
          <div class='row'>
  
           <div class='col-md-12'>
                
                  <div class='pull-left m-t-30'>
                       <address>
                          ".$agenda."
  please contact our support team. support@meetingScheduler.com 
              
      <br>
  
  
  
                      <hr>       
                        <strong>Email: ".$email."<br>
                      
                        <strong>Password: ".$pass."</strong><br>
  
                       <hr>
                 
  
                          Click on the link below to login to your account:<a href='http://localhost:3001/login'></a>
                        </address>
                     
                  </div>
              </div>
  
          </div>
          
          <br/>
  
  
          <div id='pr_footer' class='row'>
              <div class='col-md-12'>
                
                  <div class='pull-left m-t-30'>
                       <address>
                          Signed<br>
  
                        <strong>$scheduler</strong><br>
                        DIV, Engineering Team<br>
                      
                        <strong>Makedu Consult Ltd</strong><br>
                        </address>
                     
                  </div>
              </div>
          </div>
  
      </div>
  </div>
  
  </div>
  
  </div>
  
  </div>
  ";

                 
  $mail->AltBody = '';
  
  if(!$mail->send()) {
      echo 'Message could not be sent.';
      echo 'Mailer Error: ' . $mail->ErrorInfo;
  } else {
      echo 'Message has been sent';
  }
}

//Magic


if ($method == 'GET') {
  if (!$id) echo '[';
  for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$id) echo ']';
} elseif ($method == 'POST') {
  echo json_encode($result);
} else {
  echo mysqli_affected_rows($con);
}

$con->close();