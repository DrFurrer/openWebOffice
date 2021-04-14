/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Tabelledefinition 
draw2d.shape.flowchart.TableDefinition = draw2d.shape.layout.VerticalLayout.extend({
 
 NAME: 'draw2d.shape.flowchart.TableDefinition',

 init: function(attr) {
 	this._super($.extend({bgColor: "#ffffff", color: "#303030", stroke: 1, radius: 3}, attr));
  this.classLabel = new draw2d.shape.basic.Label({
   text: LangVar['txt_TableName'], 
   stroke: 1,
   fontColor: "#303030",  
   bgColor: "#dddddd", 
   radius: this.getRadius(), 
   padding: 10,
   resizeable: true,
   editor: new draw2d.ui.LabelInplaceEditor()
  });
  this.add(this.classLabel);
 },
     
 addEntity: function(txt, optionalIndex) {
	 var label = new draw2d.shape.basic.Label({
   text: txt,
   stroke: 0,
   radius: 0,
   bgColor: "#efefef",
   padding: {left: 10, top: 3, right: 10, bottom: 5},
   fontColor: "#303030",
   resizeable: true,
   editor: new draw2d.ui.LabelInplaceEditor()
  });

  var input = label.createPort("input");
  var output= label.createPort("output");
	     
  
  
  input.setName("input_" + label.id);
  output.setName("output_" + label.id);
  
  var _table = this;       
  label.on("contextmenu", function(emitter, event) {
   $.contextMenu({
    selector: 'body', 
    events: {  
     hide: function() {
      $.contextMenu('destroy');
     }
    },
    callback: $.proxy(function(key, options) {
     switch(key) {
      case "rename":
       setTimeout(function() {
        emitter.onDoubleClick();
       }, 10);
       break;
      case "new":
       setTimeout(function() {
        _table.addEntity("_" + LangVar['txt_New'] + "_").onDoubleClick();
       }, 10);
       break;
      case "delete":
       // with undo/redo support
       var cmd = new draw2d.command.CommandDelete(emitter);
       emitter.getCanvas().getCommandStack().execute(cmd);
      default:
       break;
     }
    }, this),
    
    x: event.x,
    y: event.y,
    
    items: {
     "rename": {name: LangVar['txt_Rename'], icon: "rename"},
     "new":    {name: LangVar['txt_New'], icon: "add"},
     "sep1":   "---------",
     "delete": {name: LangVar['txt_Delete'], icon: "delete"}
    }
   });
  });
         
  if($.isNumeric(optionalIndex)) {
   this.add(label, null, optionalIndex + 1);
  }else {
   this.add(label);
  }
  return label;
  
 },
    
 removeEntity: function(index) {
  this.remove(this.children.get(index+1).figure);
 },

 getEntity: function(index) {
  return this.children.get(index+1).figure;
 },
 
 setName: function(name) {
  this.classLabel.setText(name);
  return this;
 },
     
 getPersistentAttributes: function() {
  var memento = this._super();
  memento.name = this.classLabel.getText();
  memento.entities = [];
  this.children.each(function(i, e) {
   if(i > 0) {
    memento.entities.push({
     text: e.figure.getText(),
     id: e.figure.id
    });
   }
  });
  return memento;
 },
     
 setPersistentAttributes: function(memento) {
  this._super(memento);
  this.setName(memento.name);
  if(typeof memento.entities !== "undefined") {
   $.each(memento.entities, $.proxy(function(i, e) {
    var entity = this.addEntity(e.text);
    entity.id = e.id;
    entity.getInputPort(0).setName("input_" + e.id);
    entity.getOutputPort(0).setName("output_" + e.id);
   }, this));
  }
  // Das Haupt Label soll keine Ports aufweisen
  this.resetPorts();
  return this;
 }  
 
});
