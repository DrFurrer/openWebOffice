/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Connection Decoration Circle
draw2d.shape.flowchart.connectionCircle = draw2d.decoration.connection.Decorator.extend({
 
 NAME: 'draw2d.shape.flowchart.connectionCircle',
 
 init: function(width, height) {   
  this._super(width, height);
 },
 
	paint: function(paper)	{
		var st = paper.set();
		st.push(paper.circle(6, 0, this.width/3));
		st.attr({fill: '#5f7d87', stroke: 2});
  return st;
	}

});

