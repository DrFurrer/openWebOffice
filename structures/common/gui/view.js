structure.View = draw2d.Canvas.extend({
	
	init: function(id) {
		this._super(id);
		this.setScrollArea("#" + id);
		this.currentDropConnection = null;
	},
	
 onDrag: function(droppedDomNode, x, y ) {
  
 },
    
 onDrop: function(droppedDomNode, x, y, shiftKey, ctrlKey) {
  var type = $(droppedDomNode).data("shape");
  var figure = eval("new " + type + "();");
  
  // Bei Tabellendefinition müssen wir zuerst mal einen ersten Eintrag erstellen
  if(figure.NAME == 'draw2d.shape.flowchart.TableDefinition') {
   figure.addEntity("id");
  }
  
  // Bei LabelGroup müssen wir zuerst mal einen ersten Eintrag erstellen
  if(figure.NAME == 'draw2d.shape.flowchart.LabelGroup') {
   figure.addEntity("Init Label");
  }
  
  // create a command for the undo/redo support
  var command = new draw2d.command.CommandAdd(this, figure, x, y);
  this.getCommandStack().execute(command);
 }
 
});