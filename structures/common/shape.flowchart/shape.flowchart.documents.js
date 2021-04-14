/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Prozess-DocumentsForm
draw2d.shape.flowchart.DocumentsForm = draw2d.SetFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.DocumentsForm',

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
  shape = this.canvas.paper.path("M0,0 L60,0 L60,60 L0,60");
  shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
  shape.data("name","BoundingBox");
  
  // Circle
  shape = this.canvas.paper.path('M10.009995351216446 48.09072836411514L10.12020650522436 48.14320986602365L12.5 48.936709553844764L15.132997611238835 49.52137000623736L17.939197038884487 49.879426611208004L20.833333333333343 50L23.72746962778217 49.879426611208004L26.533669055427822 49.52137000623736L29.166666666666657 48.936709553844764L31.546460161442326 48.14320986602365L33.600740718649604 47.16498102925826L35.26709006307402 46.031746031746025L35.41471486708775 45.88099250134303L35.492206505224374 45.84409172127795L37.872000000000014 45.05059203345681L40.50499761123888 44.46593158106418L43.31119703888453 44.10787497609357L46.205333333333385 43.987301587301545L49.099469627782184 44.10787497609357L51.905669055427836 44.46593158106418L54.5386666666667 45.05059203345681L56.91846016144234 45.84409172127795L58.972740718649675 46.822320558043316L60 47.52092926998037L60 0L10 0L10 18.159969893592603L10.009995351216446 18.159969893592603L10.009995351216446 48.09072836411514Z');
  shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Circle1");
  
  // Circle
  shape = this.canvas.paper.path('M5.009995351216446 53.09072836411514L5.12020650522436 53.14320986602365L7.5 53.936709553844764L10.132997611238835 54.52137000623736L12.939197038884487 54.879426611208004L15.833333333333343 55L18.72746962778217 54.879426611208004L21.533669055427822 54.52137000623736L24.166666666666657 53.936709553844764L26.546460161442326 53.14320986602365L28.600740718649632 52.16498102925826L30.267090063073994 51.031746031746025L30.414714867087724 50.88099250134303L30.492206505224374 50.84409172127795L32.87200000000004 50.05059203345681L35.50499761123888 49.46593158106418L38.31119703888453 49.10787497609357L41.205333333333385 48.987301587301545L44.099469627782184 49.10787497609357L46.905669055427836 49.46593158106418L49.5386666666667 50.05059203345681L51.91846016144234 50.84409172127795L53.972740718649675 51.822320558043316L55 52.52092926998037L55 5L5 5L5 23.159969893592603L5.009995351216446 23.159969893592603L5.009995351216446 53.09072836411514Z');
  shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Circle2");
  
  // Circle
  shape = this.canvas.paper.path('M0.009995351216446124 58.09072836411514L0.12020650522435972 58.14320986602365L2.5 58.936709553844764L5.132997611238835 59.52137000623736L7.939197038884487 59.879426611208004L10.833333333333343 60L13.72746962778217 59.879426611208004L16.533669055427822 59.52137000623736L19.166666666666657 58.936709553844764L21.546460161442326 58.14320986602365L23.600740718649632 57.16498102925826L25.267090063073994 56.031746031746025L25.414714867087724 55.88099250134303L25.492206505224374 55.84409172127795L27.872000000000043 55.05059203345681L30.504997611238878 54.46593158106418L33.31119703888453 54.10787497609357L36.205333333333385 53.987301587301545L39.09946962778224 54.10787497609357L41.905669055427836 54.46593158106418L44.5386666666667 55.05059203345681L46.91846016144234 55.84409172127795L48.972740718649675 56.822320558043316L50 57.52092926998037L50 10L0 10L0 28.159969893592603L0.009995351216446124 28.159969893592603L0.009995351216446124 58.09072836411514Z');
  shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
  shape.data("name","Circle3");
  
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

// Ports für Documents-Rechteck-Ports setzen
draw2d.shape.flowchart.DocumentsFormPorts = draw2d.shape.flowchart.DocumentsForm.extend({

 NAME: 'draw2d.shape.flowchart.DocumentsFormsPorts',

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

// FlowChart - Documents - Label erstellen
draw2d.shape.flowchart.Documents = draw2d.shape.flowchart.DocumentsFormPorts.extend({

 NAME: 'draw2d.shape.flowchart.Documents',

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
