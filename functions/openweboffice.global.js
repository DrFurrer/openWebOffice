/* Global JS-Functions */

function ELN(N){
 mOJ=document.getElementsByName(N);
 return mOJ;
}

function ELI(N){
 mOJ=document.getElementById(N);
 return mOJ;
}

function ELITryDisabled(myId, myValue){
 try{
  mOJ=document.getElementById(myId).disabled=myValue;
  return mOJ;
 }catch(e){}
}

function hideDialog(myDialogName) {
 $(myDialogName).modal('hide');
}

function showDialog(myDialogName, myElementFocus) {
 $(myDialogName).modal('show');
}

function fi_DataTableInit(myId, myMenuCd, myOrderIndex, myOrderSort, mySearching, myRowRecNo, mySelect, myFilterContentId = '') {
 $(document).ready(function() {
  var myAction = myId.substring(4, (myId.length - 5));
  if(myMenuCd == 1) {
   var table = $('#'+myId).DataTable({
    colReorder: false,
    responsive: true,
    info: false,
    paging: false,
    searching: mySearching,
    order: [ myOrderIndex, myOrderSort ],
    columnDefs: [
     { orderable: false, targets: 'no-sort' },
    ],
    dom: 'Bfrtip',
    buttons: [{
     extend: 'copyHtml5',
     text: '<i class="fa fa-clipboard"></i>&nbsp;&nbsp;' + LangVar['Copy']
    }, {
     extend: 'excelHtml5',
     text: '<i class="fa fa-file-excel"></i>&nbsp;&nbsp;' + LangVar['Excel']
    }, {
     extend: 'csvHtml5',
     text: '<i class="fa fa-table"></i>&nbsp;&nbsp;' + LangVar['CSV']
    }, {
     extend: 'pdfHtml5',
     text: '<i class="fa fa-file-pdf"></i>&nbsp;&nbsp;' + LangVar['PDF']
    }, {
     extend: 'print',
     text: '<i class="fa fa-print"></i>&nbsp;&nbsp;' + LangVar['Print']
    }], 
    language: {
     emptyTable: LangVar['NoDatasFound'],
     search: LangVar['Search'],
    },   
    initComplete: function() {
     $( document ).ready(function() {
      if(myRowRecNo > 0) {
       $('#PageLoader').show();
       setTimeout(function(){
        top.WorkWindow.location.href='openweboffice.action.php?Action=' + myAction + '&Command=select&checkRecNo=' + myRowRecNo;
       },500); 
      }else {
       //$('.nav-tabs a[href="#Result"]').tab('show');
      }
     });
    },
    select: mySelect
   });
  }else {
   var table = $('#'+myId).DataTable({
    colReorder: false,
    responsive: true,
    info: false,
    paging: false,
    searching: mySearching,
    order: [ myOrderIndex, myOrderSort ],
    columnDefs: [
     { orderable: false, targets: 'no-sort' },
    ],
    dom: 'Bfrtip',
    buttons: [], 
    language: {
     emptyTable: LangVar['NoDatasFound'],
     search: LangVar['Search'],
    }, 
    select: mySelect
   });
  }
  if(myFilterContentId != '') {
   try{
    top.$('#' + myId + '_length').addClass('d-flex justify-content-between fi_textNoDecoration');
    top.ELI(myId + '_length').insertAdjacentHTML('afterbegin', top.ELI(myFilterContentId).innerHTML);
   }catch(e){}
  }
  table.on('search.dt', function () {
   table.cells().eq(0).each( function ( index ) {
    var cell = table.cell( index );
    var data = cell.data();
    var TextHighlight = '';
    TextHighlight = fi_HighlightText(data, table.search());
    if(TextHighlight != data) {
     cell.data(TextHighlight);
    }
   });
  });
  var myProjectPrefix = '';
  var checkIndexField = 'checkRecNo';
  $('#'+myId+' .click').click(function() {
   $('#DialogModal').modal('hide');
   WorkWindow.location.href = myProjectPrefix + 'openweboffice.action.php?Action=' + myAction + '&Command=select&' + checkIndexField + '=' + $(this).parent().get(0).id;     
  });
 });
}

function fi_HighlightText(myText, mySearchWord) {
 myText = myText.replace(/<span style="background-color: #f2f48c;">/g, '');
 var newText = myText.replace(/<\/span>/g, '');
 if(mySearchWord) {
  newText = (!newText.startsWith('<') ? '<p>' + newText + '</p>' : newText).replace(/(>[^<]+)/igm,
   function (result) {
    return result.replace(new RegExp('(' + mySearchWord + ')', 'igm'), '<span style="background-color: #f2f48c;">$1</span>');
   }
  );
 }
 return newText;
}
