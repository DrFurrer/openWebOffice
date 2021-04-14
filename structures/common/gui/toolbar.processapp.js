structure.Toolbar = Class.extend({
	
	init: function(elementId, view) {
		this.html = $("#" + elementId);
		this.view = view;
		
		view.getCommandStack().addEventListener(this);
  view.on("select", $.proxy(this.onSelectionChanged, this));
		
		// New Button
		this.newButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-file\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_New'] + "</span></button>");
		this.html.append(this.newButton);
		this.newButton.button().click($.proxy(function(){
   this.view.clear();
   resetDataProcessForm();
		}, this)).button("option", "disabled", false);

		// Open Prozess
		this.readJsonButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-folder-open\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Open'] + "</span></button>");
		this.html.append(this.readJsonButton);
		this.readJsonButton.button().click($.proxy(function(){
   WorkWindow.location.href = 'openweboffice.action.php?Action=ProcessOpenDialog&Command=show';
		}, this));
		
		// Write Json
		this.writeJsonButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-save\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Save'] + "</span></button>");
		this.html.append(this.writeJsonButton);
		this.writeJsonButton.button().click($.proxy(function(){
		 writeJsonData();
		}, this));
		
		// Export
		this.ExportButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-file-download\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Export'] + "</span></button>");
		this.html.append(this.ExportButton);
		this.ExportButton.button().click($.proxy(function(){
		 exportSVG();
		}, this));

		this.delimiter = $("<span class=\"p-1 px-1\" style=\"height: 48px;\">&nbsp;</span>");
		this.html.append(this.delimiter);
		
		// Undo Button
		this.undoButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-undo\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Undo'] + "</span></button>");
		this.html.append(this.undoButton);
		this.undoButton.button().click($.proxy(function(){
		 this.view.getCommandStack().undo();
		}, this)).button("option", "disabled", true);

		// Redo Button
		this.redoButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-redo\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Redo'] + "</span></button>");
		this.html.append(this.redoButton);
		this.redoButton.button().click($.proxy(function(){
		 this.view.getCommandStack().redo();
		}, this)).button("option", "disabled", true);
		
		this.delimiter = $("<span class=\"p-1 px-1\" style=\"height: 48px;\">&nbsp;</span>");
		this.html.append(this.delimiter);

		// Delete Button
		this.deleteButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-trash\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Delete'] + "</span></button>");
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function() {
			var node = this.view.getPrimarySelection();
			var command = new draw2d.command.CommandDelete(node);
			this.view.getCommandStack().execute(command);
		}, this)).button("option", "disabled", true);
		this.deleteButton.prop("disabled", true);
		
		this.delimiter = $("<span class=\"p-1 px-1\" style=\"height: 48px;\">&nbsp;</span>");
		this.html.append(this.delimiter);
		
  // Group Button
		this.groupButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-object-group\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Group'] + "</span></button>");
		this.html.append(this.groupButton);
		this.groupButton.button().click($.proxy(function(){
	  this.view.getCommandStack().execute(new draw2d.command.CommandGroup(this.view, this.view.getSelection()));
		}, this));
		this.groupButton.prop("disabled", true);
  
  // Ungroup Button
		this.ungroupButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-object-ungroup\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Ungroup'] + "</span></button>");
		this.html.append(this.ungroupButton);
		this.ungroupButton.button().click($.proxy(function(){
	  this.view.getCommandStack().execute(new draw2d.command.CommandUngroup(this.view, this.view.getSelection()));
		}, this));
		this.ungroupButton.prop("disabled", true);
		
		this.delimiter = $("<span class=\"p-1 px-1\" style=\"height: 48px;\">&nbsp;</span>");
		this.html.append(this.delimiter);
		
		// Zoom in
		this.zoomInButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-search-plus\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Zoom'] + "</span></button>");
		this.html.append(this.zoomInButton);
		this.zoomInButton.button().click($.proxy(function(){
   this.view.setZoom(this.view.getZoom() * 0.7, true);
		}, this));

		// Orginal Grösse
		this.resetButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><span class=\"nav-link-text\" style=\"color: #256090;\">1:1</span></button>");
		this.html.append(this.resetButton);
		this.resetButton.button().click($.proxy(function(){
   this.view.setZoom(1.0, true);
		}, this));
		
		// Zoom out
		this.zoomOutButton = $("<button type=\"button\" class=\"toolbarButton p-1 px-2\" style=\"height: 48px;\"><i class=\"far fa-fw fa-search-minus\" style=\"color: #256090;\"></i><span class=\"nav-link-text\"> " + LangVar['txt_Zoom'] + "</span></button>");
		this.html.append(this.zoomOutButton);
		this.zoomOutButton.button().click($.proxy(function(){
   this.view.setZoom(this.view.getZoom() * 1.3, true);
		}, this));
		
	},

	onSelectionChanged: function(emitter, event){
		this.deleteButton.button("option", "disabled", event.figure === null);
	},
	
	stackChanged: function(event)	{
		this.undoButton.button("option", "disabled", !event.getStack().canUndo());
		this.redoButton.button("option", "disabled", !event.getStack().canRedo());
	}
	
});