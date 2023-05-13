<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "mikuquella@gmail.com";
  $subject = "Feedback from user";
  $message = $_POST["feedback"];

  // additional headers
  $headers = "From: daskundenfeedback@gmail.com\r\n";
  $headers .= "Reply-To: daskundenfeedback@gmail.com\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  // send the email
  $send=mail($to, $subject, $message, $headers);
  if ($send) {
    // email sent successfully
    $status = "success";
  } else {
    // email failed to send
    $status = "error";
  }
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Feedback Form</title>
</head>
<body>
  <?php if (isset($status)): ?>
    <?php if ($status === "success"): ?>
      <p>Your feedback has been sent successfully. Thank you!</p>
    <?php else: ?>
      <p>Failed to send feedback. Please try again later.</p>
    <?php endif; ?>
  <?php endif; ?>
  <form method="post" action="sendemail.php">
    <label for="feedback">Enter your feedback:</label>
    <textarea id="feedback" name="feedback" rows="5"></textarea>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
