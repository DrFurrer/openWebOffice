<?php
 // ***************************************************** 
 //   Joachim Furrer, 14.04.2021                          
 // ***************************************************** 

 $u_agent = $_SERVER["HTTP_USER_AGENT"];
 if(preg_match("/MSIE/i", $u_agent) || preg_match("/Trident/i", $u_agent)) { 
  header("Location: browsererror.php");
 }
 
 require_once("global.config.inc.php");
 require_once("../functions/openweboffice.github.inc.php");
 
 
?>