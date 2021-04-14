/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Connection 
draw2d.shape.flowchart.connection = draw2d.Connection.extend({
 
 NAME: 'draw2d.shape.flowchart.connection',
 
 init: function(attr) {
  
  this._super(attr);
  
  this.setRouter(new draw2d.layout.connection.ManhattanBridgedConnectionRouter());
  this.setOutlineStroke(0);
  this.setOutlineColor("#303030");
  this.setStroke(2);
  this.setColor('#256090');
  this.setRadius(4);
  this.label = null;
  
 },
 
 onContextMenu: function(x, y){
  $.contextMenu({
   selector: 'body', 
   events: {
    hide:function(){ $.contextMenu( 'destroy' ); }
   },
   callback: $.proxy(function(key, options) {
    switch(key){
     case "standard":
      this.setColor('#256090');
      break;
     case "red":
      this.setColor('#a84c4c');
      break;
     case "yellow":
      this.setColor('#ecd46a');
      break;
     case "green":
      this.setColor('#5dcfa3');
      break;
     case "black":
      this.setColor('#303030');
      break;
     case "decorationStandard":
      if(this.sourceDecoratorNode !== null){
       this.sourceDecoratorNode.remove();
       this.sourceDecoratorNode=null;
      }
      if(this.targetDecoratorNode !== null){
       this.targetDecoratorNode.remove();
       this.targetDecoratorNode=null;
      }      
      this.sourceDecorator = null;
      this.targetDecorator = null;
      this.setDashArray('');
      break;
     case "decorationDashed":
      this.setDashArray('- ');
      break;
     case "decorationDotted":
      this.setDashArray('. ');
      break;
     case "decorationSourceArrow":
      this.setSourceDecorator(new draw2d.shape.flowchart.connectionArrow);
      break;
     case "decorationTargetArrow":
      this.setTargetDecorator(new draw2d.shape.flowchart.connectionArrow);
      break;
     case "decorationSourceCircle":
      this.setSourceDecorator(new draw2d.shape.flowchart.connectionCircle);
      break;
     case "decorationTargetCircle":
      this.setTargetDecorator(new draw2d.shape.flowchart.connectionCircle);
      break;
     case "addLabel":
      this.createLabel('Label...');
      break;
     case "removeLabel":
      this.removeLabel();
      break;
     case "delete":
      var cmd = new draw2d.command.CommandDelete(this);
      this.getCanvas().getCommandStack().execute(cmd);
     default:
      break;
    }
   }, this),
   
   x: x,
   y: y,
   
   items: {
    
    "fold1": {
     "name": LangVar['txt_Color'], 
     "items": {
      "standard":               {name: LangVar['txt_Standard'], icon: "standard"},
      "red":                    {name: LangVar['txt_Red'], icon: "red"},
      "yellow":                 {name: LangVar['txt_Yellow'], icon: "yellow"},
      "green":                  {name: LangVar['txt_Green'], icon: "green"},
      "black":                  {name: LangVar['txt_Black'], icon: "black"},
     }
    },    
    "sep1":                   "---------",
    
    "fold2": {
     "name": LangVar['txt_LineArt'], 
     "items": {
      "decorationStandard":     {name: LangVar['txt_decorationStandard'], icon: "StandardConnection"},
      "decorationDashed":       {name: LangVar['txt_decorationDashed'], icon: "DashedConnection"},
      "decorationDotted":       {name: LangVar['txt_decorationDotted'], icon: "DottedConnection"},
     }
    },    
    
    "fold3": {
     "name": LangVar['txt_LineDecoration'], 
     "items": {
      "decorationSourceArrow":  {name: LangVar['txt_decorationSourceArrow'], icon: "StartArrowConnection"},
      "decorationTargetArrow":  {name: LangVar['txt_decorationTargetArrow'], icon: "EndArrowConnection"},
      "decorationSourceCircle": {name: LangVar['txt_decorationSourceCircle'], icon: "circle"},
      "decorationTargetCircle": {name: LangVar['txt_decorationTargetCircle'], icon: "circle"},
     }
    },    
    
    "sep2":                   "---------",
    "addLabel":               {name: LangVar['txt_addLabel'], icon: "addLabel"},
    "removeLabel":            {name: LangVar['txt_removeLabel'], icon: "removeLabel"},
    "sep3":                   "---------",
    "delete":                 {name: LangVar['txt_Delete'], icon: "delete"}
   }
   
  });
 }, 
 
 setName: function(name) {
  this.label.setText(name);
  return this;
 },
   
 getPersistentAttributes: function() {
  var memento= this._super();
  if(this.label != null) {
   memento.labelText = this.label.getText();
  }
  memento.entities   = [];
  this.children.each(function(i, e){
   if(i > 0){
    memento.entities.push({
     text:e.figure.getText(),
     id: e.figure.id
    });
   }
  });
  return memento;
 },
 
 createLabel: function(labelText) {
  if(this.label == null) {
   this.label = new draw2d.shape.basic.Label({
    text: labelText,
    color: "#303030",
    fontColor: "#303030",
    bgColor: "#f0f0f0",
    radius: 4,
   });
   this.add(this.label, new draw2d.layout.locator.ManhattanMidpointLocator());
   this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
   return this;
  }
 },
 
 removeLabel: function() {
  if(this.label != null) {
   this.remove(this.label);
   this.label = null;
   return this;
  }
 },
 
 setPersistentAttributes: function(memento) {
  this._super(memento);
  if(typeof(memento.labelText) !== "undefined") {
   this.createLabel(memento.labelText);
  }
  if(typeof(memento.entities) !== "undefined"){
   $.each(memento.entities, $.proxy(function(i,e){
    var entity = this.addEntity(e.text);
    entity.id = e.id;
    entity.getInputPort(0).setName("input_"+e.id);
    entity.getOutputPort(0).setName("output_"+e.id);
   },this));
  }
  return this;
 },
 
 delegateTarget: function(draggedFigure) {
  return this;
 }

});