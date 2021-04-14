/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das OrganizationBox-Rechteck
draw2d.shape.flowchart.OrganizationBoxRectangle = draw2d.VectorFigure.extend({
 
 NAME: 'draw2d.shape.flowchart.OrganizationBoxRectangle',

 init: function(width, height) {
  this._super();
  this.setBackgroundColor('#ffffff');
  this.setColor('#303030');
  this.stroke = 1;
  if(typeof width === 'undefined'){
   this.setDimension(160, 60);
  }else {
   this.setDimension(width, height);
  }
 },
 onContextMenu: function(x, y){
  $.contextMenu({
   selector: 'body', 
   events: {
    hide:function(){ $.contextMenu( 'destroy' ); }
   },
   callback: $.proxy(function(key, options) {
    switch(key){
     case "white":
      this.setBackgroundColor('#ffffff');
      this.classLabel.setFontColor('#303030');
      break;
     case "blue":
      this.setBackgroundColor('#256090');
      this.classLabel.setFontColor('#efefef');
      break;
     case "red":
      this.setBackgroundColor('#a84c4c');
      this.classLabel.setFontColor('#efefef');
      break;
     case "yellow":
      this.setBackgroundColor('#ecd46a');
      this.classLabel.setFontColor('#303030');
      break;
     case "green":
      this.setBackgroundColor('#5dcfa3');
      this.classLabel.setFontColor('#303030');
      break;
     case "setBold":
      if(this.classLabel.isBold() == true) {
       this.classLabel.setBold(false);
      }else {
       this.classLabel.setBold(true);
      }
      break;
     default:
      break;
    }
   }, this),
   x: x,
   y: y,
   items: {
    "white":   {name: LangVar['txt_White'], icon: "white"},
    "blue":    {name: LangVar['txt_Blue'], icon: "blue"},
    "red":     {name: LangVar['txt_Red'], icon: "red"},
    "yellow":  {name: LangVar['txt_Yellow'], icon: "yellow"},
    "green":   {name: LangVar['txt_Green'], icon: "green"},
    "sep1":                   "---------",
    "setBold": {name: LangVar['txt_Bold'], icon: "bold"},
   }
  });
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

// Ports für OrganizationBox-Rechteck setzen
draw2d.shape.flowchart.OrganizationBoxRectanglePorts = draw2d.shape.flowchart.OrganizationBoxRectangle.extend({

 NAME: 'draw2d.shape.flowchart.OrganizationBoxRectanglePorts',

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

// OrganizationBox erstellen
draw2d.shape.flowchart.OrganizationBox = draw2d.shape.flowchart.OrganizationBoxRectanglePorts.extend({

 NAME: 'draw2d.shape.flowchart.OrganizationBox',

	init: function(attr, setter, getter) {
  this._super(attr, setter, getter);
  this.classLabel = new draw2d.shape.basic.Label({
   stroke: 1,
   text: LangVar['txt_OrganizationBox'],
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
   WorkWindow.document.location = 'openweboffice.action.php?Action=OrganizationChartDetailDialog&Command=show&EditModeCd=1&checkId=' + imgSymbol.parent.id;
  });
  var box = this.getBoundingBox();
  this.add(imgSymbol, new draw2d.shape.flowchart.locationXY(box.w - 20, 4));
 },
 setName: function(name) {
  this.classLabel.setText(name);
  return this;
 },
 setFontColor: function(color) {
  if(typeof color != 'undefined') {
   this.classLabel.setFontColor(color);
  }
  return this;
 },
 setFontBold: function(fontbold) {
  if(typeof fontbold != 'undefined') {
   if(fontbold == true) {
    this.classLabel.setBold(true);
   }else {
    this.classLabel.setBold(false);
   }
  }
  return this;
 },
 getPersistentAttributes: function() {
  var memento = this._super();
  memento.name = this.classLabel.getText();
  memento.fontcolor = this.classLabel.getFontColor();
  memento.fontbold = this.classLabel.isBold();
  return memento;
 },
 setPersistentAttributes: function(memento) {
  this._super(memento);
  this.setName(memento.name);
  this.setFontColor(memento.fontcolor);
  this.setFontBold(memento.fontbold);
  return this;
 }  
 
});
