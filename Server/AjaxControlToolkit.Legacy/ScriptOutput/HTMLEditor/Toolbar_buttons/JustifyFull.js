Type.registerNamespace("Sys.Extended.UI.HTMLEditor.ToolbarButton");Sys.Extended.UI.HTMLEditor.ToolbarButton.JustifyFull=function(a){Sys.Extended.UI.HTMLEditor.ToolbarButton.JustifyFull.initializeBase(this,[a])};Sys.Extended.UI.HTMLEditor.ToolbarButton.JustifyFull.prototype={checkState:function(){return!Sys.Extended.UI.HTMLEditor.ToolbarButton.JustifyFull.callBaseMethod(this,"checkState")?false:this._designPanel._textAlignState("justify")},callMethod:function(){if(!Sys.Extended.UI.HTMLEditor.ToolbarButton.JustifyFull.callBaseMethod(this,"callMethod"))return false;this._designPanel._execCommand("JustifyFull")}};Sys.Extended.UI.HTMLEditor.ToolbarButton.JustifyFull.registerClass("Sys.Extended.UI.HTMLEditor.ToolbarButton.JustifyFull",Sys.Extended.UI.HTMLEditor.ToolbarButton.EditorToggleButton);