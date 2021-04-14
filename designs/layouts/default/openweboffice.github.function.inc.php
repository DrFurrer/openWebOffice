<?php
// *****************************************************************
//   Verfasser: Joachim Furrer                                      
//   Erstellt:  21.06.2021                                          
// *****************************************************************

 function fi_getHelloWorld() {
  $Content = "Hello World!";
  return $Content;
 }
 
 function _fi_Indiv_getBodyBTContentFormated($PageType = "", $HeaderLeft = "", $HeaderCenter = "", $HeaderRight = "", $Content = "", $HeaderClass = "px-3", $JSScript = "", $ContentInFormCd = 0) {
  if($PageType == "Home" || $PageType == "Contact" || $PageType == "Dashboard" || $PageType == "Quotation" || $PageType == "Ticket" || $PageType == "SupportPack" || $PageType == "Support" || $PageType == "RMA" || $PageType == "Forms" || $PageType == "GTC" || $PageType == "PrivacyPolicy") {
   $ContentFormated = "
    <div class=\"p-3\">
     <b>".$Title."</b>
     <br><br>
     ".$Content."
    </div>
   ";
  }
  return $ContentFormated;
 }
 
 
 
?>