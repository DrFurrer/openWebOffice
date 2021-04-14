<?php
 // ***************************************************** 
 //   Joachim Furrer, 14.04.2021                          
 // ***************************************************** 

 function fi_AutoVersion($myFile = "") {
  if(!file_exists($myFile)) {
   return $myFile;
  }
  $myFileMTime = filemtime($myFile);
  return $myFile."?".$myFileMTime;
 }
 
 function fi_getJSSlashes($myValue) {
  $myValue = str_replace("\'", "'", $myValue);
  $Content = str_replace("'", "\'", $myValue);
  return $Content;
 }

 function fi_pageContent($myPageTitle, $myPageContent) {
  $Content = "<!doctype html>
  <html lang=\"en\">
   <head>
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <meta name=\"google\" content=\"notranslate\">
    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
    <meta name=\"mobile-web-app-capable\" content=\"yes\">
    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"../files/icons/openweboffice_icon_16x16.png\">
    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"../files/icons/openweboffice_icon_32x32.png\">
    <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"../files/icons/openweboffice_icon_192x192.png\">
    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"../files/icons/openweboffice_icon_180x180.png\">
    <title>".$myPageTitle."</title>
    <script src=\"".fi_AutoVersion("../functions/openweboffice.global.lang.en.js")."\"></script>
    <link href=\"".fi_AutoVersion("../3dParty/bootstrap-icons/bootstrap-icons.css")."\" rel=\"stylesheet\">
    <link href=\"".fi_AutoVersion("../3dParty/jQuery/ui/jquery-ui.min.css")."\" rel=\"stylesheet\">
    <script src=\"".fi_AutoVersion("../3dParty/jQuery/jquery.min.js")."\"></script>
    <script src=\"".fi_AutoVersion("../3dParty/jQuery/ui/jquery-ui.min.js")."\"></script>
    <link href=\"".fi_AutoVersion("../3dParty/jQuery/jquery-contextMenu/jquery.contextMenu.css")."\" rel=\"stylesheet\">
    <script src=\"".fi_AutoVersion("../3dParty/jQuery/jquery-contextMenu/jquery.contextMenu.js")."\"></script>
    <script src=\"".fi_AutoVersion("../3dParty/jQuery/jquery-layout/jquery.browser.js")."\"></script>
    <link href=\"".fi_AutoVersion("../3dParty/jQuery/jquery-layout/jquery.layout.css")."\" rel=\"stylesheet\">
    <script src=\"".fi_AutoVersion("../3dParty/jQuery/jquery-layout/jquery.layout.js")."\"></script>
    <link href=\"".fi_AutoVersion("../3dParty/jQuery/datatables/datatables.min.css")."\" rel=\"stylesheet\">
    <link href=\"".fi_AutoVersion("../designs/themes/default/bootstrap/bootstrap.css")."\" rel=\"stylesheet\">
    <link href=\"".fi_AutoVersion("../designs/themes/default/bootstrap/bootstrap-custom.css")."\" rel=\"stylesheet\">
    <link href=\"".fi_AutoVersion("../designs/themes/default/openweboffice.github.css")."\" rel=\"stylesheet\">
    <link href=\"".fi_AutoVersion("../designs/colorschemes/default/colorscheme.css")."\" rel=\"stylesheet\">
    <link href=\"".fi_AutoVersion("../functions/openweboffice.global.css")."\" rel=\"stylesheet\">
    <script src=\"".fi_AutoVersion("../3dParty/jQuery/datatables/datatables.min.js")."\"></script>
    <script src=\"".fi_AutoVersion("../3dParty/draw2d/draw2d.js")."\"></script>
    <script src=\"".fi_AutoVersion("../3dParty/bootstrap/js/bootstrap.bundle.js")."\"></script>
    <script src=\"".fi_AutoVersion("../designs/layouts/default/openweboffice.github.function.inc.js")."\"></script>    
    <script src=\"".fi_AutoVersion("../functions/openweboffice.global.js")."\"></script>
   </head>
   <body id=\"PageBody\">
    <iframe class=\"fi_dispNone fi_fullSize\" name=\"WorkWindow\" title=\"WorkWindow\"></iframe>
    ".$myPageContent."
   </body>
  </html>";
  return $Content;
 }
 
 function fi_execSQLQuery($SQLQuery) {
  $Result = mysqli_query($GLOBALS["connIDLoc"], $SQLQuery);
  return $Result;
 }
 
 /* Generiert den entsprechenden SQL-Konformen String */
 function fi_genSQLValue($myValue, $Typ = "Text", $Nullable = 1) {
  $myValue = str_ireplace("<javascript>", "", $myValue);
  $myValue = str_ireplace("<javascript", "", $myValue);
  $myValue = str_ireplace("</javascript>", "", $myValue);
  $myValue = str_ireplace("/javascript>", "", $myValue);
  $myValue = str_ireplace("<script>", "", $myValue);
  $myValue = str_ireplace("<script", "", $myValue);
  $myValue = str_ireplace("</script>", "", $myValue);
  $myValue = str_ireplace("/script>", "", $myValue);
  $myValue = str_ireplace("<style>", "", $myValue);
  $myValue = str_ireplace("<style", "", $myValue);
  $myValue = str_ireplace("</style>", "", $myValue);
  $myValue = str_ireplace("/style>", "", $myValue);
  $myValue = str_ireplace("alert(", "", $myValue);
  if(trim($myValue) == "" && $Nullable == 1) {
   $SQLValue = "NULL";
  }else {
   if($Typ == "Number" || $Typ == "Money" || $Typ == "Integer") {
    if($Nullable == 0 && $myValue == "") {
     $myValue = 0;
    }
    if($Typ == "Number" || $Typ == "Money") {
     $myValue = fi_numberFormat($myValue);
    }
    if($Typ == "Integer") {
     $myValue = fi_numberFormat($myValue, 0, 0);
    }
    $myValue = str_replace("\\","",$myValue); 
    $SQLValue = str_replace("'","",$myValue);
   }
   if($Typ == "Text" || $Typ == "HTML") {
    //$myValue = htmlentities($myValue); // Sicherheitsrelevant für XSS Vorbeugung
    //$myValue = str_replace("\r\n", "", $myValue);
    $myValue = str_replace("\\", "\\\\", $myValue); 
    $SQLValue = "'".str_replace("'", "\\'", $myValue)."'";
   }
   if($Typ == "TextArea") {
    //$myValue = htmlentities($myValue); // Sicherheitsrelevant für XSS Vorbeugung
    $SQLValue = "'".$myValue."'";
   }
   if($Typ == "Date") {
    $myValue = str_replace(" ", "", $myValue);
    $myValue = preg_replace("/[^0-9\.-]/", "", $myValue);
    $myValue = str_replace("\\","",$myValue); 
    $myValue = str_replace("'","",$myValue);
    if($myValue == "" && $Nullable == 0) {
     $myValue = date("Y-m-d");
    }
    if(strpos($myValue,".")) {
     $SQLValue = "'".fi_TBsetFormat($myValue, "Date")."'"; 
    }else {
     $SQLValue = "'".$myValue."'"; 
    }
   }
   if($Typ == "DateTime") {
    $myValue = preg_replace("/[^0-9\.\:\- ]/", "", $myValue);
    $myValue = str_replace("\\","",$myValue); 
    $myValue = str_replace("'","",$myValue);
    $myValue = trim($myValue);
    if($myValue == "" && $Nullable == 0) {
     $myValue = date("Y-m-d H:i:s");
    }
    if(strpos($myValue,".") > 0) {
     $SQLValue = "'".fi_TBsetFormat($myValue, "DateTime")."'";
    }else {
     $SQLValue = "'".$myValue."'"; 
    }
   }
   if($Typ == "Time") {
    $myValue = preg_replace("/[^0-9\:]/", "", $myValue);
    $myValue = str_replace("\\","",$myValue); 
    $myValue = str_replace("'","",$myValue);
    $myValue = trim($myValue);
    if($myValue == "" && $Nullable == 0) {
     $myValue = date("h:i:s");
    }
    $SQLValue = "'".$myValue."'"; 
   }
  }
  if($SQLValue == "") {
   $SQLValue = "NULL";
  }
  return $SQLValue;
 }

 function fi_genSQLField($DBTabelle, $DBFieldName, $myValue, $Typ = "Text", $Nullable = 1, $WhereClausel = 0, $SQLOperator = "=") {
  $SQLValue = fi_genSQLValue($myValue, $Typ, $Nullable);
  if($WhereClausel == 1 && $SQLValue == "NULL") {
   $SQLValue = " is ".$SQLValue;
  }else {
   if($SQLOperator != "") {
    if($SQLOperator == "in") {
     $SQLValue = " ".$SQLOperator." ".str_replace("'(", "(", str_replace(")'", ")", $SQLValue));
    }else {
     $SQLValue = " ".$SQLOperator." ".$SQLValue;
    }
   }else {
    $SQLValue = " = ".$SQLValue;
   }
  }
  $ReturnWert = fi_SQLFieldClean($DBTabelle).".".fi_SQLFieldClean($DBFieldName).$SQLValue;
  return $ReturnWert;
 }

 function fi_SQLFieldClean($FieldName) {
  $FieldName = str_replace(" ", "", $FieldName);
  $FieldName = preg_replace("/[^a-zA-Z0-9\_ ]/", "", trim($FieldName));
  return $FieldName;
 }
 
 function fi_TBsetFormat($myValue, $myType = "Date") { 
  if($myValue != "") {
   if($myType == "Date") {
    $Content = date("Y-m-d", strtotime($myValue));
   }  
   if($myType == "DateTime") {
    $Content = date("Y-m-d H:i:s", strtotime($myValue));
   }  
  }
  return $Content;
 }
 
 function fi_floatNumber($myNumber) {
  if(strpos($myNumber, ",") > -1) {
   // Fremd-Format
   $myNumber = str_replace(".", "", $myNumber);
   $myNumber = str_replace(",", ".", $myNumber);
  }
  $myNumber = preg_replace("/[^\-0-9\.]/", "", $myNumber); 
  $myNumber = (float)str_replace("'", "", $myNumber);
  return $myNumber;
 }
 
 function fi_numberFormat($myNumber, $myDigits = 4, $myThousandsCd = 0) {
  $myNumber = fi_floatNumber($myNumber);
  $thousands_sep = "";
  $dec_point = "";
  if($myThousandsCd == 1) {
   $thousands_sep = "'";  // Für Schweiz
   //$thousands_sep = " ";  // Für Alle Anderen
  }
  if($myDigits > 0) {
   $dec_point = "."; // Schweiz
   //$dec_point = ","; // Alle Anderen
   
   $myNumber =  number_format($myNumber, $myDigits, $dec_point, $thousands_sep); 
  }
  return $myNumber;
 }
 
 
 
?>