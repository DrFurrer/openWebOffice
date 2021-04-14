/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Prozess-DataBaseRechteck
draw2d.shape.flowchart.DataBaseRectangle = draw2d.SetFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.DataBaseRectangle',

 init: function(attr, setter, getter) {
  this.dasharray = null;
  this._super($.extend({
   width: 80,
   height: 80,
			bgColor: "#ffffff",
			color: "#303030",
			stroke: 0
  },attr), setter, getter);
  this.strokeScale = false;
  this.radius = 0;
  this.keepAspectRatio = true;
  
 },

 createShapeElement: function() {
  var shape = this._super();
  this.originalWidth = 80;
  this.originalHeight= 80;
  return shape;
 },

 createSet: function() {
  this.canvas.paper.setStart();
  
  // BoundingBox
  shape = this.canvas.paper.path("M0,0 L80,0 L80,80 L0,80");
  shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
  shape.data("name","BoundingBox");
  
  // Circle
  shape = this.canvas.paper.path('M79.80491903790664 12.939905787879695L79.39231012048833 11.324176892819196L77.58770483143633 9.01683772881995L74.64101615137758 6.851910159069519L70.6417777247591 4.895174412268631L65.71150438746156 3.206084913927697L60 1.8359637937332707L53.68080573302677 0.8264414886077702L46.945927106677175 0.20819182294945904L40 -2.842170943040401e-14L33.0540728933228 0.20819182294945904L26.319194266973255 0.8264414886077702L19.99999999999997 1.8359637937332707L14.288495612538412 3.206084913927697L9.358222275240877 4.895174412268631L5.358983848622472 6.851910159069519L2.4122951685636735 9.01683772881995L0.6076898795116676 11.324176892819196L0.1950809620933569 12.939905787879695L0 12.939905787879695L0 13.703820318139094L0 66.29617968186088L0 67.75518706043624L0.37258692149387684 67.75518706043624L0.6076898795116676 68.6758231071808L2.4122951685636735 70.98316227118005L5.358983848622472 73.14808984093042L9.358222275240877 75.10482558773134L14.28849561253844 76.79391508607227L20 78.1640362062667L26.319194266973255 79.17355851139223L33.0540728933228 79.79180817705048L40 80L46.9459271066772 79.79180817705048L53.68080573302677 79.17355851139223L60 78.1640362062667L65.71150438746156 76.79391508607227L70.6417777247591 75.10482558773134L74.64101615137753 73.14808984093042L77.58770483143633 70.98316227118005L79.39231012048833 68.6758231071808L79.62741307850615 67.75518706043624L80 67.75518706043624L80 66.29617968186088L80 13.703820318139094L80 12.939905787879695L79.80491903790664 12.939905787879695Z');
  shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Circle");
  
  // Circle
  shape = this.canvas.paper.ellipse();
  shape.attr({"rx":40,"ry":13.5,"cx":40,"cy":25,"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Circle");
  
  // Circle
  shape = this.canvas.paper.ellipse();
  shape.attr({"rx":40,"ry":13.5,"cx":40,"cy":19.5,"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Circle");
  
  // Circle
  shape = this.canvas.paper.ellipse();
  shape.attr({"rx":40,"ry":13.5,"cx":40,"cy":13.5,"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Circle");
  
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

// Ports für Prozess-DataBaseRechteck setzen
draw2d.shape.flowchart.DataBaseRectanglePorts = draw2d.shape.flowchart.DataBaseRectangle.extend({

 NAME: 'draw2d.shape.flowchart.DataBaseRectanglePorts',

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

// FlowChart - DataBase erstellen
draw2d.shape.flowchart.DataBase = draw2d.shape.flowchart.DataBaseRectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.DataBase',

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

