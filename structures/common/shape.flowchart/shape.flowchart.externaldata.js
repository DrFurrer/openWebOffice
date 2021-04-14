/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das ExternalData-Rechteck
draw2d.shape.flowchart.ExternalDataRectangle = draw2d.VectorFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.ExternalDataRectangle',

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
  var factorX = box.w / 140;
  var factorY = box.h / 60;
  var path = ['M', box.x + 30 * factorX, ' ', box.y + 0 * factorY];
  path.push('L', box.x + 29.818880000000007 * factorX, ' ', box.y + 0 * factorY);
  path.push('L', box.x + 29.818880000000007 * factorX, ' ', box.y + 0.015845946737812255 * factorY);
  path.push('L', box.x + 24.790554669992105 * factorX, ' ', box.y + 0.45576740963375073 * factorY);
  path.push('L', box.x + 19.73939570022995 * factorX, ' ', box.y + 1.8092213764227552 * factorY);
  path.push('L', box.x + 15 * factorX, ' ', box.y + 4.01923788646684 * factorY);
  path.push('L', box.x + 10.716371709403802 * factorX, ' ', box.y + 7.018666706430679 * factorY);
  path.push('L', box.x + 7.0186667064306505 * factorX, ' ', box.y + 10.71637170940383 * factorY);
  path.push('L', box.x + 4.01923788646684 * factorX, ' ', box.y + 15 * factorY);
  path.push('L', box.x + 1.8092213764227552 * factorX, ' ', box.y + 19.73939570022995 * factorY);
  path.push('L', box.x + 0.45576740963375073 * factorX, ' ', box.y + 24.790554669992105 * factorY);
  path.push('L', box.x + 0 * factorX, ' ', box.y + 30 * factorY);
  path.push('L', box.x + 0.45576740963375073 * factorX, ' ', box.y + 35.209445330007895 * factorY);
  path.push('L', box.x + 1.8092213764227552 * factorX, ' ', box.y + 40.26060429977008 * factorY);
  path.push('L', box.x + 4.01923788646684 * factorX, ' ', box.y + 45 * factorY);
  path.push('L', box.x + 7.018666706430679 * factorX, ' ', box.y + 49.2836282905962 * factorY);
  path.push('L', box.x + 10.71637170940383 * factorX, ' ', box.y + 52.98133329356935 * factorY);
  path.push('L', box.x + 15 * factorX, ' ', box.y + 55.98076211353316 * factorY);
  path.push('L', box.x + 19.73939570022995 * factorX, ' ', box.y + 58.19077862357727 * factorY);
  path.push('L', box.x + 24.790554669992105 * factorX, ' ', box.y + 59.54423259036622 * factorY);
  path.push('L', box.x + 29.818880000000007 * factorX, ' ', box.y + 59.98415405326216 * factorY);
  path.push('L', box.x + 29.818880000000007 * factorX, ' ', box.y + 60 * factorY);
  path.push('L', box.x + 30 * factorX, ' ', box.y + 60 * factorY);
  path.push('L', box.x + 139.81887999999998 * factorX, ' ', box.y + 60 * factorY);
  path.push('L', box.x + 139.81887999999998 * factorX, ' ', box.y + 59.45287406188618 * factorY);
  path.push('L', box.x + 135.1086757002301 * factorX, ' ', box.y + 58.19077862357727 * factorY);
  path.push('L', box.x + 130.36928000000017 * factorX, ' ', box.y + 55.98076211353316 * factorY);
  path.push('L', box.x + 126.08565170940398 * factorX, ' ', box.y + 52.98133329356935 * factorY);
  path.push('L', box.x + 122.38794670643085 * factorX, ' ', box.y + 49.2836282905962 * factorY);
  path.push('L', box.x + 119.38851788646701 * factorX, ' ', box.y + 45 * factorY);
  path.push('L', box.x + 117.1785013764229 * factorX, ' ', box.y + 40.26060429977008 * factorY);
  path.push('L', box.x + 115.82504740963395 * factorX, ' ', box.y + 35.209445330007895 * factorY);
  path.push('L', box.x + 115.36928000000017 * factorX, ' ', box.y + 30 * factorY);
  path.push('L', box.x + 115.82504740963395 * factorX, ' ', box.y + 24.790554669992105 * factorY);
  path.push('L', box.x + 117.1785013764229 * factorX, ' ', box.y + 19.73939570022995 * factorY);
  path.push('L', box.x + 119.38851788646701 * factorX, ' ', box.y + 15 * factorY);
  path.push('L', box.x + 122.38794670643085 * factorX, ' ', box.y + 10.71637170940383 * factorY);
  path.push('L', box.x + 126.08565170940398 * factorX, ' ', box.y + 7.018666706430679 * factorY);
  path.push('L', box.x + 130.36928000000017 * factorX, ' ', box.y + 4.01923788646684 * factorY);
  path.push('L', box.x + 135.1086757002301 * factorX, ' ', box.y + 1.8092213764227552 * factorY);
  path.push('L', box.x + 139.81887999999998 * factorX, ' ', box.y + 0.5471259381137941 * factorY);
  path.push('L', box.x + 139.81887999999998 * factorX, ' ', box.y + 0 * factorY);
  path.push('L', box.x + 30 * factorX, ' ', box.y + 0 * factorY);
  path.push('Z');
  attributes.path = path.join('');
  this._super(attributes);
  return this;
 },
 createShapeElement: function() {
  // create dummy line
  return this.canvas.paper.path('M0 0L1 1');
 }
    
});

// Ports für SubProzess-Rechteck setzen
draw2d.shape.flowchart.ExternalDataPorts = draw2d.shape.flowchart.ExternalDataRectangle.extend({

 NAME: 'draw2d.shape.flowchart.ExternalDataPorts',

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

// FlowChart - ExternalData erstellen
draw2d.shape.flowchart.ExternalData = draw2d.shape.flowchart.ExternalDataPorts.extend({

 NAME: 'draw2d.shape.flowchart.ExternalData',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: LangVar['txt_ExternalData'],
   fontSize: 16,
   color: "#",
   fontColor: "#303030",
   bgColor: "#",
   radius: 0,
   editor: new draw2d.ui.LabelInplaceEditor()
  });
  this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());
  
  var imgSymbol = new draw2d.shape.icon.Power({width: 16, height: 16, color: "#707070"});
  imgSymbol.on("click", function() {
   WorkWindow.document.location = 'openweboffice.action.php?Action=ProcessDetailDialog&Command=show&EditModeCd=1&checkId=' + imgSymbol.parent.id;
  });
  var box = this.getBoundingBox();
  this.add(imgSymbol, new draw2d.shape.flowchart.locationXY(box.w - 44, 4)); 
  
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
