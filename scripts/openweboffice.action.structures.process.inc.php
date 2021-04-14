<?php
 // ***************************************************** 
 //   Joachim Furrer, 14.04.2021                          
 // ***************************************************** 

 // Show process dialog
 if($_REQUEST["Action"] == "ProcessOpenDialog" && $_REQUEST["Command"] == "show") {
  // Content aufbauen
  $Content = "";
  $SQLQuery = " select RecNo, LangCd, ProcessCode, ProcessCategoryCd, Designation from crm_structure_process order by ProcessCode, LangCd ";
  $Result = fi_execSQLQuery($SQLQuery);
  while($row = mysqli_fetch_row($Result)) {
   $TBRecNo =             $row[0];
   $TBLangCd =            $row[1];
   $TBProcessCode =       $row[2];
   $TBProcessCategoryCd = $row[3];
   $TBDesignation =       $row[4];
   $Content .= "
    <tr id=\"".$TBRecNo."\" class=\"fi_Pointer\">
     <td class=\"fi_Width_6\"></td>
     <td class=\"click\">".$TBDesignation."</td>
     <td class=\"click\">".$TBLangCd."</td>
     <td class=\"click\">".$TBProcessCategoryCd."</td>
     <td class=\"click\">".$TBProcessCode."</td>
    </tr>
   "; 
  }
  $PageContent = "
   <div id=\"DialogModalTitle\">Open Process</div>
   <div id=\"DialogModalBody\">
    <table id=\"dataProcessTable\" class=\"table table-striped table-bordered fi_WidthPer_100\">
     <thead>
      <tr>
       <th class=\"no-sort fi_Width_6\"></th>
       <th class=\"fi_vAlignTop\">Designation</th>
       <th class=\"fi_vAlignTop\">Language</th>
       <th class=\"fi_vAlignTop\">Category</th>
       <th class=\"fi_vAlignTop\">Process Code</th>
      </tr>
     </thead>
     <tbody>
      ".$Content."
     </tbody>
    </table>
   </div>
   <div id=\"DialogModalButton\">
    <button class=\"btn btn-secondary\" type=\"button\" data-bs-dismiss=\"modal\">Cancel</button>
   </div>
   <script>
    parent.ELI('DialogModalTitle').innerHTML = ELI('DialogModalTitle').innerHTML;
    parent.ELI('DialogModalBody').innerHTML = ELI('DialogModalBody').innerHTML;
    parent.ELI('DialogModalFooter').innerHTML = ELI('DialogModalButton').innerHTML;
    $(document).ready(function() {
     parent.fi_DataTableInit('dataProcessTable', 1, 4, 'asc', true, 0, true);
     parent.ELI('DialogModalSize').style.maxWidth = '55%';
     parent.showDialog('#DialogModal');
    });
   </script>
  ";
 }

 
 // Dialog zeigen um Prozess zu wählen
 if($_REQUEST["Action"] == "Process" && $_REQUEST["Command"] == "select") {
  // Prozess Daten auslesen 
  $SQLQuery = " select Designation, Description, ProcessData from crm_structure_process where RecNo = ".(int)$_REQUEST["checkRecNo"]." ";
  $Result = fi_execSQLQuery($SQLQuery);
  $row = mysqli_fetch_row($Result);
  $TBDesignation = $row[0];
  $TBDescription = $row[1];
  $TBProcessData = $row[2];
  $PageContent = "
   <div id=\"FRM_Description\">".$TBDescription."</div>
   <div id=\"FRM_ProcessData\">".$TBProcessData."</div>
   <script>
    $(document).ready(function() {
     parent.ELN('NewDataCd')[0].value = '0';
     parent.ELN('FRM_RecNo')[0].value = '".(int)$_REQUEST["checkRecNo"]."';
     parent.ELN('FRM_Designation')[0].value = '".$TBDesignation."';
     parent.ELN('FRM_Description')[0].value = ELI('FRM_Description').innerText;
     parent.ELN('FRM_ProcessData')[0].value = ELI('FRM_ProcessData').innerText;
     parent.ELI('DIV_ProcessData').innerText = ELI('FRM_ProcessData').innerText;
     parent.readJsonData();
    });
   </script>
  ";
 }
 
 // Dialog for save
 if($_REQUEST["Action"] == "ProcessSaveDialog" && $_REQUEST["Command"] == "show") {
  // Content aufbauen
  $PageContent = "
   <div id=\"DialogModalTitle\">Save Process</div>
   <div id=\"DialogModalBody\">
    <div class=\"row\">
    
     <div class=\"col-12\">
      <div class=\"row\">
       <div class=\"col-4 fi_PT_10\">Designation</div>
       <div class=\"col-8 p-1 pe-3\" >
        <input type=\"text\" class=\"form-control\" name=\"FRM_Dialog_Designation\" value=\"\">
       </div>
      </div>
     </div>
     
    <div class=\"col-12\">
     <div class=\"row\">
      <div class=\"col-4 fi_PT_10\">Process Description</div>
      <div class=\"col-8 p-1 pe-3\" >
       <textarea class=\"form-control\" name=\"FRM_Dialog_Description\" rows=\"3\"></textarea>
      </div>
     </div>
    </div>
     
     <div class=\"col-12\">
      <div class=\"row\">
       <div class=\"col-4 fi_PT_10\"></div>
       <div class=\"col-8 p-1 pe-3\">
        <div class=\"form-check\">
          <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"FRM_Dialog_NewDataCd\" name=\"FRM_Dialog_NewDataCd\">
          <label class=\"form-check-label\" for=\"FRM_Dialog_NewDataCd\">
            Save as new
          </label>
        </div>       
       </div>
      </div>
     </div>
     
    </div>
   </div>
   <div id=\"DialogModalButton\">
    <button class=\"btn btn-primary\" type=\"button\" onclick=\"saveProcess();\">Save</button>
    <button class=\"btn btn-secondary\" type=\"button\" data-bs-dismiss=\"modal\">Cancel</button>
   </div>
   <script>
    parent.ELI('DialogModalTitle').innerHTML = ELI('DialogModalTitle').innerHTML;
    parent.ELI('DialogModalBody').innerHTML = ELI('DialogModalBody').innerHTML;
    parent.ELI('DialogModalFooter').innerHTML = ELI('DialogModalButton').innerHTML;
    $(document).ready(function() {
     parent.ELI('DialogModalSize').style.maxWidth = '40%';
     parent.showDialog('#DialogModal');
     // Formular data
     parent.ELN('FRM_Dialog_Designation')[0].value = parent.ELN('FRM_Designation')[0].value;
     parent.ELN('FRM_Dialog_Description')[0].value = parent.ELN('FRM_Description')[0].value;
     if(parent.ELN('NewDataCd')[0].value == '0') {
      parent.ELN('FRM_Dialog_NewDataCd')[0].checked = false;
     }else {
      parent.ELN('FRM_Dialog_NewDataCd')[0].checked = true;
     }
    });
   </script>
  ";
 }
 
 
 if($_REQUEST["Action"] == "ProcessData" && $_REQUEST["Command"] == "save") {
  // Die Daten in die Tabelle schreiben
  if($_REQUEST["NewDataCd"] == 1) {
   // Einen neuen Datensatz schreiben
   $SQLQuery = "
    insert into crm_structure_process set
           ".fi_genSQLField("crm_structure_process", "StateCd", 1, "Integer", 1, 0).",
           ".fi_genSQLField("crm_structure_process", "LangCd", $_REQUEST["FRM_LangCd"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process", "Designation", $_REQUEST["FRM_Designation"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process", "ProcessData", $_REQUEST["FRM_ProcessData"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process", "Description", $_REQUEST["FRM_Description"], "Text", 1, 0)."
   ";
   $Result = fi_execSQLQuery($SQLQuery);
  }else if($_REQUEST["FRM_RecNo"] > 0){
   // Den bestehenden Datensatz aktualisieren
   $SQLQuery = "
    update crm_structure_process set
           ".fi_genSQLField("crm_structure_process", "LangCd", $_REQUEST["FRM_LangCd"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process", "Designation", $_REQUEST["FRM_Designation"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process", "ProcessData", $_REQUEST["FRM_ProcessData"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process", "Description", $_REQUEST["FRM_Description"], "Text", 1, 0)."
     where ".fi_genSQLField("crm_structure_process", "RecNo", $_REQUEST["FRM_RecNo"], "Integer", 1, 1)."
   ";
   $Result = fi_execSQLQuery($SQLQuery);
  }
  $PageContent = "";
 } 
 
 
 // Dialog zeigen um Pruzessdetails zu wählen
 if($_REQUEST["Action"] == "ProcessDetailDialog" && $_REQUEST["Command"] == "show") {
  // Content aufbauen
  if($_REQUEST["EditModeCd"] == 1) {
   $AddButton = "<button class=\"btn btn-primary\" type=\"button\" onclick=\"saveProcessDetail();\">Save</button>";
  }else {
   $AddButton = "";
  }
  $TBLangCd = "en";
  $TBProcessTitle = "";
  $TBProcessText = "";
  $SQLQuery = " select LangCd, ProcessTitle, ProcessText from crm_structure_process_detail where StateCd = 1 and ".fi_genSQLField("crm_structure_process_detail", "ProcessId", $_REQUEST["checkId"], "Text", 1, 1)." ";
  $Result = fi_execSQLQuery($SQLQuery);
  while($row = mysqli_fetch_row($Result)) {
   $TBLangCd =       $row[0];
   $TBProcessTitle = $row[1];
   $TBProcessText =  $row[2];
  }
  
  $PageContent = "
   <div id=\"DialogModalTitle\">Process Detail</div>
   <div id=\"DialogModalBody\">
   
    <div class=\"col-12\">
     <div class=\"row\">
      <div class=\"col-4 fi_PT_10\">Process Title</div>
      <div class=\"col-8 p-1 pe-3\" >
       <input type=\"text\" class=\"form-control\" name=\"FRM_Dialog_ProcessTitle\" value=\"".$TBProcessTitle."\">
      </div>
     </div>
    </div>
   
    <div class=\"col-12\">
     <div class=\"row\">
      <div class=\"col-4 fi_PT_10\">Process Text</div>
      <div class=\"col-8 p-1 pe-3\" >
       <textarea class=\"form-control\" name=\"FRM_Dialog_ProcessText\" rows=\"8\">".$TBProcessText."</textarea>
      </div>
     </div>
    </div>
   
   </div>
   <div id=\"DialogModalButton\">
    ".$AddButton."
    <button class=\"btn btn-secondary\" type=\"button\" data-bs-dismiss=\"modal\">Cancel</button>
   </div>
   <script>
    parent.ELI('DialogModalTitle').innerHTML = ELI('DialogModalTitle').innerHTML;
    parent.ELI('DialogModalBody').innerHTML = ELI('DialogModalBody').innerHTML;
    parent.ELI('DialogModalFooter').innerHTML = ELI('DialogModalButton').innerHTML;
    $(document).ready(function() {
     parent.ELI('DialogModalSize').style.maxWidth = '40%';
     parent.showDialog('#DialogModal');
     parent.ELN('FRM_Detail_ProcessId')[0].value = '".$_REQUEST["checkId"]."'
    });
   </script>
  ";
 }
 
 
 if($_REQUEST["Action"] == "ProcessDetailData" && $_REQUEST["Command"] == "save") {
  // Die Daten in die Tabelle schreiben
  // Dann wollen wir mal prüfen ob bereits ein Eintrag besteht
  $TBRecNo = 0;
  $SQLQuery = " 
   select RecNo 
     from crm_structure_process_detail 
    where StateCd = 1 
      and ".fi_genSQLField("crm_structure_process_detail", "ProcessId", $_REQUEST["FRM_Detail_ProcessId"], "Text", 1, 1)."
      and ".fi_genSQLField("crm_structure_process_detail", "LangCd", $_REQUEST["FRM_Detail_LangCd"], "Text", 1, 1)."
  ";
  $Result = fi_execSQLQuery($SQLQuery);
  while($row = mysqli_fetch_row($Result)) {
   $TBRecNo = $row[0];
  }
  if($TBRecNo > 0) {
   $SQLQuery = "
    update crm_structure_process_detail set
           ".fi_genSQLField("crm_structure_process_detail", "LangCd", $_REQUEST["FRM_Detail_LangCd"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process_detail", "ProcessTitle", $_REQUEST["FRM_Detail_ProcessTitle"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process_detail", "ProcessText", $_REQUEST["FRM_Detail_ProcessText"], "Text", 1, 0)."
     where ".fi_genSQLField("crm_structure_process_detail", "RecNo", $TBRecNo, "Integer", 1, 1)."
   ";
  }else {
   $SQLQuery = "
    insert into crm_structure_process_detail set
           ".fi_genSQLField("crm_structure_process_detail", "StateCd", 1, "Integer", 1, 0).",
           ".fi_genSQLField("crm_structure_process_detail", "ProcessId", $_REQUEST["FRM_Detail_ProcessId"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process_detail", "LangCd", $_REQUEST["FRM_Detail_LangCd"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process_detail", "ProcessTitle", $_REQUEST["FRM_Detail_ProcessTitle"], "Text", 1, 0).",
           ".fi_genSQLField("crm_structure_process_detail", "ProcessText", $_REQUEST["FRM_Detail_ProcessText"], "Text", 1, 0)."
   ";
  }
  $Result = fi_execSQLQuery($SQLQuery);
  $PageContent = "";
 }
 
 
 // Dialog zeigen um Process zu speichern
 if($_REQUEST["Action"] == "ProcessSaveDialog" && $_REQUEST["Command"] == "export") {
  // Content aufbauen
  $PageContent = "
   <div id=\"DialogModalTitle\">Export Process</div>
   <div id=\"DialogModalBody\">
    <div class=\"row\">
    
     <div class=\"col-12\">
      <div class=\"row\">
       <div class=\"col-4 fi_PT_10\">Name</div>
       <div class=\"col-8 p-1 pe-3\" >
        <input type=\"text\" class=\"form-control\" name=\"FRM_Dialog_Name\" value=\"download\">
       </div>
      </div>
     </div>
     
     <div class=\"col-12\">
      <div class=\"row\">
       <div class=\"col-4 fi_PT_10\"></div>
       <div class=\"col-8 p-1 pe-3\" >
       
        <div class=\"col-sm-10\">
          <div class=\"form-check\">
            <input class=\"form-check-input\" type=\"radio\" name=\"FRM_ExportOption\" id=\"FRM_ExportOption1\" value=\"SVG\" checked>
            <label class=\"form-check-label\" for=\"FRM_ExportOption1\">
             SVG
            </label>
          </div>
          <div class=\"form-check\">
            <input class=\"form-check-input\" type=\"radio\" name=\"FRM_ExportOption\" id=\"FRM_ExportOption2\" value=\"PNG\" disabled>
            <label class=\"form-check-label\" for=\"FRM_ExportOption2\">
             PNG
            </label>
          </div>
        </div>
       
       </div>
      </div>
     </div>
     
    </div>
   </div>
   <div id=\"DialogModalButton\">
    <button class=\"btn btn-primary\" type=\"button\" onclick=\"ELI('gfx_holder').src = ''; exportProcess();\">Download</button>
    <button class=\"btn btn-secondary\" type=\"button\" data-bs-dismiss=\"modal\" onclick=\"copyImage('gfx_holder');\" title=\"To Clipboard\">
     <span class=\"ps-1\">To Clipboard</span>
    </button>
    <button class=\"btn btn-secondary\" type=\"button\" data-bs-dismiss=\"modal\" onclick=\"ELI('gfx_holder').src = '';\">Cancel</button>
   </div>
   <script>
    parent.ELI('DialogModalTitle').innerHTML = ELI('DialogModalTitle').innerHTML;
    parent.ELI('DialogModalBody').innerHTML = ELI('DialogModalBody').innerHTML;
    parent.ELI('DialogModalFooter').innerHTML = ELI('DialogModalButton').innerHTML;
    $(document).ready(function() {
     parent.ELI('DialogModalSize').style.maxWidth = '40%';
     parent.showDialog('#DialogModal');
     parent.FRM_DataProcess.Command.value = 'download';
    });
   </script>
  ";
 }
 
 if($_REQUEST["Action"] == "ProcessData" && $_REQUEST["Command"] == "download") {
  // Document aufbereiten
  if(strtolower($_REQUEST["FRM_ProcessData_exportType"]) == "svg") {
   $myExportData = $_REQUEST["FRM_ProcessData"];
   $myExportData = str_replace("width=\"3000\"", "width=\"".(int)($_REQUEST["FRM_ProcessData_width"] + $_REQUEST["FRM_ProcessData_minX"])."\"", $myExportData);
   $myExportData = str_replace("height=\"3000\"", "height=\"".(int)($_REQUEST["FRM_ProcessData_height"] + $_REQUEST["FRM_ProcessData_minY"])."\"", $myExportData);
   $myExportData = str_replace("style=\"overflow: hidden; position: absolute; background: linear-gradient(to right, rgb(240, 240, 240) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgb(240, 240, 240) 1px, rgb(255, 255, 255) 1px);\"", "", $myExportData);
   // Download Stream starten
   header("Content-disposition: attachment; filename=".$_REQUEST["FRM_Designation"].".".strtolower($_REQUEST["FRM_ProcessData_exportType"]));
   header("Cache-Control: max-age=0");
   echo($myExportData);
   die();
  }
 }
 
?>