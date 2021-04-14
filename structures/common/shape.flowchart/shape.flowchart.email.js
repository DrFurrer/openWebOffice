/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Prozess-EmailRechteck
draw2d.shape.flowchart.EmailRectangle = draw2d.SetFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.EmailRectangle',

 init: function(attr, setter, getter) {
  this.dasharray = null;
  this._super($.extend({
   width: 60,
   height: 40,
			bgColor: "#ffffff",
			color: "#303030",
			stroke: 0
  },attr), setter, getter);
  this.strokeScale = false;
  this.radius = 0;
  
 },

 createShapeElement: function() {
  var shape = this._super();
  this.originalWidth = 60;
  this.originalHeight= 40;
  return shape;
 },

 createSet: function() {
  this.canvas.paper.setStart();
  
  // BoundingBox
  shape = this.canvas.paper.path("M0,0 L60,0 L60,40 L0,40");
  shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
  shape.data("name","BoundingBox");
  
  // Rectangle
  shape = this.canvas.paper.path('M0 0L60 0L60 40L0 40Z');
  shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Rectangle");
  
  // Line_shadow
  shape = this.canvas.paper.path('M9.5 0.5L20.5,8.5L30.5,14.5L50.5,0.5');
  shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
  shape.data("name","Line_shadow");
  
  // Line
  shape = this.canvas.paper.path('M9.5 0.5L20.5,8.5L30.5,14.5L50.5,0.5');
  shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
  shape.data("name","Line");
  
  return this.canvas.paper.setFinish();
 },
 
 repaint: function(attributes) {
  if(this.repaintBlocked === true || this.shape === null){
   return;
  }
  if(typeof attributes === 'undefined') {
   attributes = {};
  }
  if(this.dasharray !== null){
   attributes['stroke-dasharray'] = this.dasharray;
  }
  attributes.width = this.getWidth();
  attributes.height = this.getHeight();
  attributes.r = 0;
  this._super(attributes);
 },
 
 setRadius: function(radius) {
  this.radius = radius;
  this.repaint();
  return this;
 },
 
 getRadius: function() {
  return this.radius;
 },
 
 setDashArray: function(dash) {
  this.dasharray = dash;
  this.repaint();
 },
 
 getPersistentAttributes: function() {
  var memento = this._super();
  memento.radius = this.radius;
  return memento;
 },
 
 setPersistentAttributes: function(memento) {
  this._super(memento);
  if(typeof memento.radius === 'number') {
   this.radius = memento.radius;
  }
 }
    
});

// Ports für Prozess-EmailRechteck setzen
draw2d.shape.flowchart.EmailRectanglePorts = draw2d.shape.flowchart.EmailRectangle.extend({

 NAME: 'draw2d.shape.flowchart.EmailRectanglePorts',

	init: function() {
  this._super();
  // wir setzen die Ports
  // Oben
  port = this.createPort('hybrid', new draw2d.layout.locator.TopLocator());
  port.setConnectionDirection();
  port.setName('PortTop');
  port.setMaxFanOut(20);        
  // Rechts
  port = this.createPort('hybrid', new draw2d.layout.locator.RightLocator());
  port.setConnectionDirection();
  port.setName('PortRight');
  port.setMaxFanOut(20);        
  // Unten
  port = this.createPort('hybrid', new draw2d.layout.locator.BottomLocator());
  port.setConnectionDirection();
  port.setName('PortBottom');
  port.setMaxFanOut(20);        
  // Links
  port = this.createPort('hybrid', new draw2d.layout.locator.LeftLocator());
  port.setConnectionDirection();
  port.setName('PortLeft');
  port.setMaxFanOut(20);        
 }
 
});

// FlowChart - Email erstellen
draw2d.shape.flowchart.Email = draw2d.shape.flowchart.EmailRectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.Email',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: '',
   fontSize: 16,
   color: "#",
   fontColor: "#303030",
   bgColor: "#",
   radius: 0,
   editor: new draw2d.ui.LabelInplaceEditor()
  });
  this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());
 },
 setName: function(name) {
  this.classLabel.setText(name);
  return this;
 },
 getPersistentAttributes: function() {
  var memento = this._super();
  memento.name = this.classLabel.getText();
  return memento;
 },
 setPersistentAttributes: function(memento) {
  this._super(memento);
  this.setName(memento.name);
  return this;
 }  

});

