/* Verfasser: Joachim Furrer / Datum: 29.09.2020 */       

// Wir erstellen das Connection Decoration Arrow
draw2d.shape.flowchart.connectionArrow = draw2d.decoration.connection.Decorator.extend({
 
 NAME: 'draw2d.shape.flowchart.connectionArrow',
 
 init: function(width, height) {   
  this._super(width, height);
 },
 
	paint: function(paper)	{
		var st = paper.set();
		st.push(paper.path(["M0 -0" ,
		                    "L", this.width - 6, " ", -this.height/2,
		                    "L", this.width - 6, " ",  this.height/2, 
		                    "L0 0", "Z"].join("")));
		st.attr({fill: '#5f7d87', stroke: 2});
  return st;
	}

});

