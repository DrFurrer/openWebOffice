<?php
 // *************************************************************** 
 //   Verfasser: Joachim Furrer                                     
 //   Erstellt:  21.06.2021                                         
 // *************************************************************** 
 
 include("openweboffice.head.inc.php");
 
 // Den Prozess Editor staren
  
 $DebugCd = 0;
 
 if($DebugCd == 1) {
  $JsonDiv = "<div class=\"fi_positionAbsolute fi_Left_1200 fi_Top_60 fi_Width_300 fi_Height_400 fi_overflowScroll fi_FontSize14 fi_DebugWindow\" id=\"DIV_ProcessData\"></div>";
  $gfxDiv = "<img class=\"fi_positionAbsolute fi_Left_1200 fi_Top_500 fi_Width_300\" id=\"gfx_holder\">";
 }else {
  $JsonDiv = "<div class=\"fi_dispNone\" id=\"DIV_ProcessData\"></div>";
  $gfxDiv = "<img class=\"fi_positionAbsolute fi_Left_1200 fi_Top_60 fi_Width_300\" id=\"gfx_holder\">";
 }
 
 $PageContent = "
  <link href=\"".fi_AutoVersion("../structures/common/css/contextmenu.css")."\" rel=\"stylesheet\">
  <link href=\"".fi_AutoVersion("../structures/common/css/application.css")."\" rel=\"stylesheet\">
  <script src=\"".fi_AutoVersion("../structures/common/gui/application.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/gui/view.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/gui/toolbar.processapp.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.process.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.subprocess.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.eventstart.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.eventend.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.startend.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.label.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.document.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.documents.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.transaction.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.callprocess.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.decision.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.email.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.database.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.arrow.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.data.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.delay.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.externaldata.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.manualoperation.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.manualinput.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.connectionArrow.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.connectionCircle.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.connection.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.locationXY.js")."\"></script>
  <script src=\"".fi_AutoVersion("../structures/common/shape.flowchart/shape.flowchart.labelgroup.js")."\"></script>
  
  <div id=\"content\">
   <div id=\"toolbar\"></div>
   <div id=\"canvas\"></div>
  </div>
  
  <div id=\"navigation\" >
   <div id=\"libraryTitle\" class=\"fi_zIndex_1\">
    <span class=\"fi_FontWeight_600\">Library</span>
   </div>
   <div id=\"library\">
    <center>
     <div data-shape=\"draw2d.shape.flowchart.Label\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.label.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Label</div>
     <div data-shape=\"draw2d.shape.flowchart.LabelGroup\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.labelgroup.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Labelgroup</div>
     <div data-shape=\"draw2d.shape.flowchart.StartEnd\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.startend.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Start / End</div>
     <div data-shape=\"draw2d.shape.flowchart.Process\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.rectangle.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Process</div>
     <div data-shape=\"draw2d.shape.flowchart.Subprocess\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.subprocess.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Sub Process</div>
     <div data-shape=\"draw2d.shape.flowchart.Transaction\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.transaction.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Transaction</div>
     <div data-shape=\"draw2d.shape.flowchart.CallProcess\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.callprocess.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp CallProcess</div>
     <div data-shape=\"draw2d.shape.flowchart.Decision\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.gateway.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Decision</div>
     <div data-shape=\"draw2d.shape.flowchart.StartEvent\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.start.event.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Start Event</div>
     <div data-shape=\"draw2d.shape.flowchart.EndEvent\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.end.event.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp End Event</div>
     <div data-shape=\"draw2d.shape.flowchart.Document\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.document.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Document</div>
     <div data-shape=\"draw2d.shape.flowchart.Documents\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.documents.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Documents</div>
     <div data-shape=\"draw2d.shape.flowchart.Email\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.email.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Email</div>
     <div data-shape=\"draw2d.shape.flowchart.DataBase\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.database.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Database</div>
     <div data-shape=\"draw2d.shape.flowchart.Arrow\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.arrow.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp InOutComing</div>
     <div data-shape=\"draw2d.shape.flowchart.Data\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.data.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Data</div>
     <div data-shape=\"draw2d.shape.flowchart.Delay\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.delay.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Delay</div>
     <div data-shape=\"draw2d.shape.flowchart.ExternalData\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.externaldata.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp External Data</div>
     <div data-shape=\"draw2d.shape.flowchart.ManualOperation\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.manualoperation.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Man. Operation</div>
     <div data-shape=\"draw2d.shape.flowchart.ManualInput\" class=\"palette_node_element draw2d_droppable\"><img src=\"../structures/common/icons/flowchart.manualinput.svg\" class=\"fi_Opacity_05 fi_Width_32 fi_zIndex_-1\">&nbsp Man. Input</div>
    </center>
   </div>
  </div>
  
  ".$JsonDiv."
  ".$gfxDiv."
  
  <!-- Formulare für die erarbeitung der Daten -->
  <form action=\"openweboffice.action.php\" method=\"post\" name=\"FRM_DataProcess\" target=\"WorkWindow\">
   <input type=\"hidden\" name=\"Action\" value=\"ProcessData\">
   <input type=\"hidden\" name=\"Command\" value=\"save\">
   <input type=\"hidden\" name=\"NewDataCd\" value=\"1\">
   <input type=\"hidden\" name=\"FRM_RecNo\" value=\"0\">
   <input type=\"hidden\" name=\"FRM_LangCd\" value=\"en\">
   <input type=\"hidden\" name=\"FRM_Designation\" value=\"\">
   <input type=\"hidden\" name=\"FRM_Description\" value=\"\">
   <input type=\"hidden\" name=\"FRM_ProcessData_exportType\" value=\"\">
   <input type=\"hidden\" name=\"FRM_ProcessData_minX\" value=\"\">
   <input type=\"hidden\" name=\"FRM_ProcessData_minY\" value=\"\">
   <input type=\"hidden\" name=\"FRM_ProcessData_width\" value=\"\">
   <input type=\"hidden\" name=\"FRM_ProcessData_height\" value=\"\">
   <input type=\"hidden\" name=\"FRM_ProcessData\" value=\"\">
  </form>
  
  <form action=\"openweboffice.action.php\" method=\"post\" name=\"FRM_DataDetailProcess\" target=\"WorkWindow\">
   <input type=\"hidden\" name=\"Action\" value=\"ProcessDetailData\">
   <input type=\"hidden\" name=\"Command\" value=\"save\">
   <input type=\"hidden\" name=\"FRM_Detail_LangCd\" value=\"en\">
   <input type=\"hidden\" name=\"FRM_Detail_ProcessId\" value=\"\">
   <input type=\"hidden\" name=\"FRM_Detail_ProcessTitle\" value=\"\">
   <input type=\"hidden\" name=\"FRM_Detail_ProcessText\" value=\"\">
  </form>
  
  <!-- Dialog Modal -->
  <div class=\"modal fade fi_zIndex_1056\" id=\"DialogModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"DialogModalTitle\" aria-hidden=\"true\">
   <div class=\"modal-dialog shadow-lg\" id=\"DialogModalSize\" role=\"document\">
    <div class=\"modal-content\" id=\"DialogModalContent\">
     <div class=\"modal-header\">
      <b class=\"modal-title\" id=\"DialogModalTitle\"></b>
      <button class=\"close\" type=\"button\" data-bs-dismiss=\"modal\" aria-label=\"Close\">
       <span aria-hidden=\"true\">×</span>
      </button>
     </div>
     <div class=\"modal-body\" id=\"DialogModalBody\"></div>
     <div class=\"modal-footer\" id=\"DialogModalFooter\"></div>
    </div>
   </div>
  </div>

  <!-- Javascript -->
  <script>
  
   function resetDataProcessForm() {
    ELN('NewDataCd')[0].value = '1';
    ELN('FRM_RecNo')[0].value = '0';
    ELN('FRM_LangCd')[0].value = 'en';
    ELN('FRM_Designation')[0].value = '';
    ELN('FRM_Description')[0].value = '';
    ELN('FRM_ProcessData')[0].value = '';
    ELI('DIV_ProcessData').innerText = '';
   }
  
   function saveProcess() {
    ELN('FRM_Designation')[0].value = ELN('FRM_Dialog_Designation')[0].value;
    ELN('FRM_Description')[0].value = ELN('FRM_Dialog_Description')[0].value;
    if(ELN('FRM_Dialog_NewDataCd')[0].checked == true) {
     ELN('NewDataCd')[0].value = 1;
    }else {
     ELN('NewDataCd')[0].value = 0;
    }
    hideDialog('#DialogModal');
    ELN('FRM_DataProcess')[0].submit();
   }
   
   function saveProcessDetail() {
    ELN('FRM_Detail_ProcessTitle')[0].value = ELN('FRM_Dialog_ProcessTitle')[0].value;
    ELN('FRM_Detail_ProcessText')[0].value = ELN('FRM_Dialog_ProcessText')[0].value;
    hideDialog('#DialogModal');
    ELN('FRM_DataDetailProcess')[0].submit();
   }
   
   function exportProcess() {
    ELN('FRM_Designation')[0].value = ELN('FRM_Dialog_Name')[0].value;
    if(ELN('FRM_ExportOption')[0].checked == true) {
     ELN('FRM_ProcessData_exportType')[0].value = ELN('FRM_ExportOption')[0].value;
    }else {
     ELN('FRM_ProcessData_exportType')[0].value = ELN('FRM_ExportOption')[1].value;
    }
    hideDialog('#DialogModal');
    ELN('FRM_DataProcess')[0].submit();
   }
   
   var app = '';
   document.addEventListener('DOMContentLoaded', function () {
    app  = new structure.Application();
    // Policies
    app.view.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
    app.view.installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy());
    app.view.installEditPolicy(new draw2d.policy.canvas.ExtendedKeyboardPolicy());
    app.view.installEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy(10));
    
    // Policy für Verbindungen
    app.view.installEditPolicy(new draw2d.policy.connection.ComposedConnectionCreatePolicy([
     // create a connection via Drag&Drop of ports
     new draw2d.policy.connection.DragConnectionCreatePolicy({
      createConnection: function(){
       return new draw2d.shape.flowchart.connection();
      }
     })
    ]));
    var msg = new draw2d.shape.note.PostIt({text: \"Process-App developed by openweboffice with Draw2D\\n \\n----------------> Select and delete me to start. <-----------------\"});
    app.view.add(msg, 20, 20);
    // Button steuern bei selection / deselection eines Objektes
    app.view.on('select', function(emitter, event){
     app.toolbar.deleteButton.prop('disabled', (event.figure instanceof draw2d.shape.composite.Group));
     app.toolbar.groupButton.prop('disabled', !(app.view.getSelection().getSize()>=2));
     app.toolbar.ungroupButton.prop('disabled', !(event.figure instanceof draw2d.shape.composite.Group));
    });
    app.view.on('unselect', function(emitter, event){
     app.toolbar.deleteButton.prop('disabled', true);
     app.toolbar.groupButton.prop('disabled', true);
     app.toolbar.ungroupButton.prop('disabled', true);
    });
   });
   
   function readJsonData() {
    app.view.clear();
    var reader = new draw2d.io.json.Reader();
    if($(\"#DIV_ProcessData\").text() != '') {
     reader.unmarshal(app.view, $(\"#DIV_ProcessData\").text());
    }
   }
   
   function writeJsonData() {
    var writer = new draw2d.io.json.Writer();
    writer.marshal(app.view, function(json){
     var jsonText = JSON.stringify(json, null, 2);
     $(\"#DIV_ProcessData\").text(jsonText);
    });
    ELN('FRM_ProcessData')[0].value = ELI('DIV_ProcessData').innerText;
    WorkWindow.location.href = 'openweboffice.action.php?Action=ProcessSaveDialog&Command=show';
   }
   
   function exportSVG() {
    var xCoords = [];
    var yCoords = [];
    app.view.getFigures().each(function(i,f){
        var b = f.getBoundingBox();
        xCoords.push(b.x, b.x+b.w);
        yCoords.push(b.y, b.y+b.h);
    });
    var minX   = Math.min.apply(Math, xCoords)-10;
    var minY   = Math.min.apply(Math, yCoords)-10;
    var width  = Math.max.apply(Math, xCoords)-minX+10;
    var height = Math.max.apply(Math, yCoords)-minY+10;
    
    var writerPNG = new draw2d.io.png.Writer();
    writerPNG.marshal(app.view, function(png){
       $(\"#gfx_holder\").attr(\"src\", png);
    }, new draw2d.geo.Rectangle(minX, minY, width, height));
   
    var writer = new draw2d.io.svg.Writer();
    writer.marshal(app.view, function(svg){
     $(\"#DIV_ProcessData\").text(svg);
    });
   
    ELN('FRM_ProcessData_minX')[0].value = minX;
    ELN('FRM_ProcessData_minY')[0].value = minY;
    ELN('FRM_ProcessData_width')[0].value = width;
    ELN('FRM_ProcessData_height')[0].value = height;
    ELN('FRM_ProcessData')[0].value = ELI('DIV_ProcessData').innerText;
    
    WorkWindow.location.href = 'openweboffice.action.php?Action=ProcessSaveDialog&Command=export';
    
   }
   
   function copyImage(myId){
    if(window.getSelection) {
     if(window.getSelection().empty) {
      window.getSelection().empty();
     }else if(window.getSelection().removeAllRanges) {
      window.getSelection().removeAllRanges();
     }
    }     
    var img = ELI(myId);
    var r = document.createRange();
    r.setStartBefore(img);
    r.setEndAfter(img);
    r.selectNode(img);
    var sel = window.getSelection();
    sel.addRange(r);
    document.execCommand('Copy');
    setTimeout(function(){ 
     sel.removeRange(r);
     img.src = '';
    }, 1000);
   }
   
  </script>    
 ";
 $myPageTitle = "openWebOffice";
 $PageContent = fi_pageContent($myPageTitle, $PageContent);
 echo($PageContent);
 
?>