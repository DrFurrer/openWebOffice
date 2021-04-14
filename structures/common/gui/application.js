var structure = {};

structure.Application = Class.extend({
 
 NAME: "structure.Application", 

 init: function() {
  
  this.view    = new structure.View("canvas");
  this.toolbar = new structure.Toolbar("toolbar",  this.view );
  
  // layout FIRST the body
  this.appLayout = $('#PageBody').layout({
   west: {
    resizable: true,
    closable: true,
    resizeWhileDragging: true,
    paneSelector: "#navigation"
   },
   center: {
    resizable: true,
    closable: true,
    resizeWhileDragging: true,
    paneSelector: "#content"
   }
  });
  
  // layout north
  this.contentLayout = $('#content').layout({
   north: {
    resizable: false,
    closable: false,
    spacing_open: 0,
    spacing_closed: 0,
    size: 50,
    paneSelector: "#toolbar"
   },
   center: {
    resizable: false,
    closable: false,
    spacing_open: 0,
    spacing_closed: 0,
    paneSelector: "#canvas"
   }
  });
  
	}
	
});