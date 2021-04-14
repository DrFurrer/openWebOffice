/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// FlowChart - StartEndRectangle erstellen
draw2d.shape.flowchart.StartEndRectangle = draw2d.VectorFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.StartEndRectangle',

 init: function(width, height) {
  this.dasharray = null;
  this._super();
  this.setBackgroundColor(new draw2d.util.Color('#ffffff'));
  this.setColor('#303030');
  if(typeof width === 'undefined'){
   this.setDimension(140, 40);
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
  attributes.r = 20;
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

// Ports für StartEnd-Rechteck setzen
draw2d.shape.flowchart.StartEndRectanglePorts = draw2d.shape.flowchart.StartEndRectangle.extend({

 NAME: 'draw2d.shape.flowchart.StartEndRectanglePorts',

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

// FlowChart - StartEnd erstellen
draw2d.shape.flowchart.StartEnd = draw2d.shape.flowchart.StartEndRectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.StartEnd',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: LangVar['txt_StartEnd'],
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
