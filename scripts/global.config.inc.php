<?php
 // ***************************************************** 
 //   Joachim Furrer, 14.04.2021                          
 // ***************************************************** 

 define("DebugCd", 0);
 
 define("DBServer", "<DBServer>");
 define("DBUsername", "<DBUsername>"); 
 define("DBPassword", "<DBPassword>"); 
 define("DBName", "<DBName>");
 define("DBPort", "<DBPort>");

 // DB Verbindung prüfen
 $connIDLoc = mysqli_connect(DBServer.":".DBPort, DBUsername, DBPassword, DBName);
 mysqli_query($connIDLoc, "use ".DBName);
 mysqli_set_charset($connIDLoc , "utf8");
  
?>