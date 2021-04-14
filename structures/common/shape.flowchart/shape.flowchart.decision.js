/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Prozess-Decision
draw2d.shape.flowchart.Rhombus = draw2d.VectorFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.Rhombus',

 init: function(width, height) {
  this._super();
  this.setBackgroundColor('#ffffff');
  this.setColor('#303030');
  this.stroke = 1.4;
  if(typeof width === 'undefined'){
   this.setDimension(140, 100);
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
  var path = ['M', box.x + (box.w / 2),' ', box.y];
  path.push('L', box.x + box.w, ' ', box.y + box.h / 2);
  path.push('L', box.x + box.w / 2, ' ', box.y + box.h);
  path.push('L', box.x, ' ', box.y + box.h / 2);
  path.push('L', box.x + box.w / 2, ' ', box.y);
  attributes.path = path.join('');
  this._super(attributes);
  return this;
 },
 createShapeElement: function() {
  // create dummy line
  return this.canvas.paper.path('M0 0L1 1');
 }
    
});

// Ports für Prozess-Decision-Ports setzen
draw2d.shape.flowchart.RhomusPorts = draw2d.shape.flowchart.Rhombus.extend({

 NAME: 'draw2d.shape.flowchart.RhomusPorts',

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

// FlowChart - Decision erstellen
draw2d.shape.flowchart.Decision = draw2d.shape.flowchart.RhomusPorts.extend({

 NAME: 'draw2d.shape.flowchart.Decision',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: LangVar['txt_Decision'],
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
