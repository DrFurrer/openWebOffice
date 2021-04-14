/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// FlowChart - LabelRectangle erstellen
draw2d.shape.flowchart.LabelRectangle = draw2d.VectorFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.LabelRectangle',

 init: function(width, height) {
  this.dasharray = null;
  this._super();
  this.stroke = 0;
  if(typeof width === 'undefined'){
   this.setDimension(20, 10);
  }else {
   this.setDimension(width, height);
  }
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
  attributes.r = 4;
  this._super(attributes);
 },
 createShapeElement: function() {
  return this.canvas.paper.rect(this.getAbsoluteX(), this.getAbsoluteY(), this.getWidth(), this.getHeight());
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

// Ports für Label-Rechteck setzen
draw2d.shape.flowchart.LabelRectanglePorts = draw2d.shape.flowchart.LabelRectangle.extend({

 NAME: 'draw2d.shape.flowchart.LabelRectanglePorts',

	init: function() {
  this._super();
 }
 
});

// FlowChart - Label erstellen
draw2d.shape.flowchart.Label = draw2d.shape.flowchart.LabelRectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.Label',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: "Label",
   fontSize: 12,
   color: "#303030",
   fontColor: "#303030",
   bgColor: "#f0f0f0",
   radius: 4,
   editor: new draw2d.ui.LabelInplaceEditor()
  });
  this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());
  this.setResizeable(0); 
  //this.setSelectable(0);
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
