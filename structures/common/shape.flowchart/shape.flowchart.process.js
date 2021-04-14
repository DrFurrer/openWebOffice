/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Prozess-Rechteck
draw2d.shape.flowchart.Rectangle = draw2d.VectorFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.Rectangle',

 init: function(width, height) {
  this._super();
  this.setBackgroundColor('#ffffff');
  this.setColor('#303030');
  this.stroke = 1;
  if(typeof width === 'undefined'){
   this.setDimension(140, 60);
  }else {
   this.setDimension(width, height);
  }
 },
 repaint: function(attributes) {
  if(this.repaintBlocked === true || this.shape === null) {
   return this;
  } 
  if(typeof attributes === 'undefined') {
   attributes = {};
  }
  var box = this.getBoundingBox();
  var path = ['M', box.x, ' ', box.y];
  path.push('L', box.x + box.w, ' ', box.y);
  path.push('L', box.x + box.w, ' ', box.y + box.h);
  path.push('L', box.x, ' ', box.y + box.h, 'Z');
  attributes.path = path.join('');
  this._super(attributes);
  return this;
 },
 createShapeElement: function() {
  // create dummy line
  return this.canvas.paper.path('M0 0L1 1');
 }
    
});

// Ports für Prozess-Rechteck setzen
draw2d.shape.flowchart.RectanglePorts = draw2d.shape.flowchart.Rectangle.extend({

 NAME: 'draw2d.shape.flowchart.RectanglePorts',

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

// FlowChart - Process erstellen
draw2d.shape.flowchart.Process = draw2d.shape.flowchart.RectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.Process',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: LangVar['txt_Process'],
   fontSize: 16,
   color: "#",
   fontColor: "#303030",
   bgColor: "#",
   radius: 0,
   editor: new draw2d.ui.LabelInplaceEditor(),
  });
  this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());
  var imgSymbol = new draw2d.shape.icon.Power({width: 16, height: 16, color: "#707070"});
  imgSymbol.on("click", function() {
   WorkWindow.document.location = 'openweboffice.action.php?Action=ProcessDetailDialog&Command=show&EditModeCd=1&checkId=' + imgSymbol.parent.id;
  });
  var box = this.getBoundingBox();
  this.add(imgSymbol, new draw2d.shape.flowchart.locationXY(box.w - 20, 4)); 
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
