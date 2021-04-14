/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Transaction-Rechteck
draw2d.shape.flowchart.TransactionRectangle = draw2d.VectorFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.TransactionRectangle',

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
draw2d.shape.flowchart.TransactionRectanglePorts = draw2d.shape.flowchart.TransactionRectangle.extend({

 NAME: 'draw2d.shape.flowchart.TransactionRectanglePorts',

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
draw2d.shape.flowchart.Transaction = draw2d.shape.flowchart.TransactionRectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.Transaction',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: LangVar['txt_Transaction'],
   fontSize: 16,
   color: "#",
   fontColor: "#303030",
   bgColor: "#",
   radius: 0,
   editor: new draw2d.ui.LabelInplaceEditor()
  });
  this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());
  var imgSymbol = new draw2d.shape.icon.Exchange({width: 16, height: 16, color: "#707070"});
  this.add(imgSymbol, new draw2d.shape.flowchart.locationXY(4, 4)); 
  
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

