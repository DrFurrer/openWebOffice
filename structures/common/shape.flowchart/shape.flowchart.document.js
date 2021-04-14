/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Prozess-DocumentForm
draw2d.shape.flowchart.DocumentForm = draw2d.SetFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.DocumentForm',

 init: function(attr, setter, getter) {
  this.dasharray = null;
  this._super($.extend({
   width: 60,
   height: 60,
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
  this.originalHeight= 60;
  return shape;
 },

 createSet: function() {
  this.canvas.paper.setStart();

  // BoundingBox
  shape = this.canvas.paper.path("M0,0 L60,0 L60,63 L0,63");
  shape.attr({"stroke":"none", "stroke-width": 0, "fill": "none"});
  shape.data("name", "BoundingBox");
  
  // Circle
  shape = this.canvas.paper.path('M0.011994421459746718 60.59431773878504L0.1442478062692203 60.660444431189774L3 61.660254037844396L6.1595971334866135 62.39692620785908L9.527036446661384 62.84807753012208L13 63L16.472963553338616 62.84807753012208L19.840402866513386 62.39692620785908L23 61.660254037844396L25.85575219373078 60.660444431189774L28.320888862379547 59.42787609686539L30.320508075688792 58L30.49765784050527 57.8100505516922L30.59064780626926 57.763555568810204L33.44640000000004 56.76374596215558L36.60599713348665 56.0270737921409L39.973436446661424 55.575922469877895L43.44640000000004 55.42399999999998L46.919363553338655 55.575922469877895L50.286802866513426 56.0270737921409L53.44640000000004 56.76374596215558L56.30215219373082 57.763555568810204L58.76728886237959 58.99612390313459L60 59.87637088017527L60 0L0 0L0 22.881562065926687L0.011994421459746718 22.881562065926687L0.011994421459746718 60.59431773878504Z');
  shape.attr({"stroke": "#303030", "stroke-width": 1, "fill": "#FFFFFF", "dasharray": null, "opacity": 1});
  shape.data("name", "Circle");
  
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

// Ports für StartEnd-Rechteck setzen
draw2d.shape.flowchart.DocumentFormPorts = draw2d.shape.flowchart.DocumentForm.extend({

 NAME: 'draw2d.shape.flowchart.DocumentFormPorts',

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

// FlowChart - Document - Label erstellen
draw2d.shape.flowchart.Document = draw2d.shape.flowchart.DocumentFormPorts.extend({

 NAME: 'draw2d.shape.flowchart.Document',

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
