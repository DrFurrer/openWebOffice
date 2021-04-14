/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Arrow-Rechteck
draw2d.shape.flowchart.ArrowRectangle = draw2d.SetFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.ArrowRectangle',

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
  this.keepAspectRatio = true;
  
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
  shape = this.canvas.paper.path('M35.389622166680795 13.321608428527668L0 13.321608428527668L0 26.678391571472304L35.339530121554134 26.678391571472304L35.28956999242689 40L60 19.71988795518206L35.49378842224132 0L35.28956999242689 12.773109243697448L35.39167920733394 12.773109243697448L35.389622166680795 13.321608428527668Z');
  shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Rectangle");
  
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

// Ports für Prozess-Arrow setzen
draw2d.shape.flowchart.ArrowRectanglePorts = draw2d.shape.flowchart.ArrowRectangle.extend({

 NAME: 'draw2d.shape.flowchart.ArrowRectanglePorts',

	init: function() {
  this._super();
 }
 
});

// FlowChart - Arrow erstellen
draw2d.shape.flowchart.Arrow = draw2d.shape.flowchart.ArrowRectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.Arrow',

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
