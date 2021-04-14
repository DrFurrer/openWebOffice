/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Data-Rechteck
draw2d.shape.flowchart.locationXY = draw2d.layout.locator.Locator.extend({
 
 NAME: 'draw2d.shape.flowchart.locationXY',

 init: function(PosX, PosY) {
  this._super();
  this.PosX = PosX;
  this.PosY = PosY;
 },
    
 relocate: function(index, target) {
  var parent = target.getParent();
  var boundingBox = parent.getBoundingBox();
  var targetBoundingBox = target.getBoundingBox();
  target.setPosition(this.PosX, this.PosY);
 }
 
});
