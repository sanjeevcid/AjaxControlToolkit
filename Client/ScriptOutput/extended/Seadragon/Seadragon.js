// (c) 2010 CodePlex Foundation
if(!window.SIGNAL)window.SIGNAL="----seadragon----";Type.registerNamespace("Sys.Extended.UI.Seadragon");Type.registerNamespace("Seadragon");Sys.Extended.UI.Seadragon.ControlAnchor=function(){throw Error.invalidOperation();};Sys.Extended.UI.Seadragon.ControlAnchor.prototype={NONE:0,TOP_LEFT:1,TOP_RIGHT:2,BOTTOM_RIGHT:3,BOTTOM_LEFT:4};Sys.Extended.UI.Seadragon.ControlAnchor.registerEnum("Sys.Extended.UI.Seadragon.ControlAnchor",false);Seadragon.ControlAnchor=Sys.Extended.UI.Seadragon.ControlAnchor;Sys.Extended.UI.Seadragon.OverlayPlacement=function(){throw Error.invalidOperation();};Sys.Extended.UI.Seadragon.OverlayPlacement.prototype={CENTER:0,TOP_LEFT:1,TOP:2,TOP_RIGHT:3,RIGHT:4,BOTTOM_RIGHT:5,BOTTOM:6,BOTTOM_LEFT:7,LEFT:8};Sys.Extended.UI.Seadragon.OverlayPlacement.registerEnum("Sys.Extended.UI.Seadragon.OverlayPlacement",false);Seadragon.OverlayPlacement=Sys.Extended.UI.Seadragon.OverlayPlacement;Sys.Extended.UI.Seadragon.NavControl=function(c){var b=null,a=this;a._group=b;a._zooming=false;a._zoomFactor=b;a._lastZoomTime=b;a._viewer=c;a.config=a._viewer.config;a.elmt=b;a.initialize()};Sys.Extended.UI.Seadragon.NavControl.prototype={initialize:function(){var c=null,a=this,f=Function.createDelegate(a,a._beginZoomingIn),d=Function.createDelegate(a,a._endZooming),h=Function.createDelegate(a,a._doSingleZoomIn),e=Function.createDelegate(a,a._beginZoomingOut),g=Function.createDelegate(a,a._doSingleZoomOut),j=Function.createDelegate(a,a._onHome),i=Function.createDelegate(a,a._onFullPage),b=a._viewer.config.navImages,n=$create(Sys.Extended.UI.Seadragon.Button,{config:a._viewer.config,tooltip:Seadragon.Strings.getString("Tooltips.ZoomIn"),srcRest:a._resolveUrl(b.zoomIn.REST),srcGroup:a._resolveUrl(b.zoomIn.GROUP),srcHover:a._resolveUrl(b.zoomIn.HOVER),srcDown:a._resolveUrl(b.zoomIn.DOWN)},{onPress:f,onRelease:d,onClick:h,onEnter:f,onExit:d},c,c),l=$create(Sys.Extended.UI.Seadragon.Button,{config:a._viewer.config,tooltip:Seadragon.Strings.getString("Tooltips.ZoomOut"),srcRest:a._resolveUrl(b.zoomOut.REST),srcGroup:a._resolveUrl(b.zoomOut.GROUP),srcHover:a._resolveUrl(b.zoomOut.HOVER),srcDown:a._resolveUrl(b.zoomOut.DOWN)},{onPress:e,onRelease:d,onClick:g,onEnter:e,onExit:d},c,c),m=$create(Sys.Extended.UI.Seadragon.Button,{config:a._viewer.config,tooltip:Seadragon.Strings.getString("Tooltips.Home"),srcRest:a._resolveUrl(b.home.REST),srcGroup:a._resolveUrl(b.home.GROUP),srcHover:a._resolveUrl(b.home.HOVER),srcDown:a._resolveUrl(b.home.DOWN)},{onRelease:j},c,c),k=$create(Sys.Extended.UI.Seadragon.Button,{config:a._viewer.config,tooltip:Seadragon.Strings.getString("Tooltips.FullPage"),srcRest:a._resolveUrl(b.fullpage.REST),srcGroup:a._resolveUrl(b.fullpage.GROUP),srcHover:a._resolveUrl(b.fullpage.HOVER),srcDown:a._resolveUrl(b.fullpage.DOWN)},{onRelease:i},c,c);a._group=$create(Sys.Extended.UI.Seadragon.ButtonGroup,{config:a._viewer.config,buttons:[n,l,m,k]},c,c,c);a.elmt=a._group.get_element();a.elmt[SIGNAL]=true;a._viewer.add_open(Function.createDelegate(a,a._lightUp))},dispose:function(){},_resolveUrl:function(a){return String.format("{1}",this._viewer.get_prefixUrl(),a)},_beginZoomingIn:function(){var a=this;a._lastZoomTime=(new Date).getTime();a._zoomFactor=a.config.zoomPerSecond;a._zooming=true;a._scheduleZoom()},_beginZoomingOut:function(){var a=this;a._lastZoomTime=(new Date).getTime();a._zoomFactor=1/a.config.zoomPerSecond;a._zooming=true;a._scheduleZoom()},_endZooming:function(){this._zooming=false},_scheduleZoom:function(){window.setTimeout(Function.createDelegate(this,this._doZoom),10)},_doZoom:function(){var a=this;if(a._zooming&&a._viewer.viewport){var b=(new Date).getTime(),d=b-a._lastZoomTime,c=Math.pow(a._zoomFactor,d/1e3);a._viewer.viewport.zoomBy(c);a._viewer.viewport.applyConstraints();a._lastZoomTime=b;a._scheduleZoom()}},_doSingleZoomIn:function(){var a=this;if(a._viewer.viewport){a._zooming=false;a._viewer.viewport.zoomBy(a.config.zoomPerClick/1);a._viewer.viewport.applyConstraints()}},_doSingleZoomOut:function(){var a=this;if(a._viewer.viewport){a._zooming=false;a._viewer.viewport.zoomBy(1/a.config.zoomPerClick);a._viewer.viewport.applyConstraints()}},_lightUp:function(){this._group.emulateEnter();this._group.emulateExit()},_onHome:function(){this._viewer.viewport&&this._viewer.viewport.goHome()},_onFullPage:function(){var a=this;a._viewer.setFullPage(!a._viewer.isFullPage());a._group.emulateExit();a._viewer.viewport&&a._viewer.viewport.applyConstraints()}};Sys.Extended.UI.Seadragon.NavControl.registerClass("Sys.Extended.UI.Seadragon.NavControl",null,Sys.IDisposable);Sys.Extended.UI.Seadragon.Control=function(d,c,b){var a=this;a.elmt=d;a.anchor=c;a.container=b;a.wrapper=Seadragon.Utils.makeNeutralElement("span");a.initialize()};Sys.Extended.UI.Seadragon.Control.prototype={initialize:function(){var a=this;a.wrapper=Seadragon.Utils.makeNeutralElement("span");a.wrapper.style.display="inline-block";a.wrapper.appendChild(a.elmt);if(a.anchor==Seadragon.ControlAnchor.NONE)a.wrapper.style.width=a.wrapper.style.height="100%";a.addToAnchor()},addToAnchor:function(){var a=this;if(a.anchor==Seadragon.ControlAnchor.TOP_RIGHT||a.anchor==Seadragon.ControlAnchor.BOTTOM_RIGHT)a.container.insertBefore(a.elmt,a.container.firstChild);else a.container.appendChild(a.elmt)},destroy:function(){var a=this;a.wrapper.removeChild(a.elmt);a.container.removeChild(a.wrapper)},isVisible:function(){return this.wrapper.style.display!="none"},setVisible:function(a){this.wrapper.style.display=a?"inline-block":"none"},setOpacity:function(a){if(this.elmt[SIGNAL]&&Seadragon.Utils.getBrowser()==Seadragon.Browser.IE)Seadragon.Utils.setElementOpacity(this.elmt,a,true);else Seadragon.Utils.setElementOpacity(this.wrapper,a,true)}};Sys.Extended.UI.Seadragon.Control.registerClass("Sys.Extended.UI.Seadragon.Control",null,Sys.IDisposable);Sys.Extended.UI.Seadragon.Viewer=function(c){var b=null,a=this;Sys.Extended.UI.Seadragon.Viewer.initializeBase(a,[c]);a.config=new Sys.Extended.UI.Seadragon.Config;a._prefixUrl=b;a._controls=[];a._customControls=b;a._overlays=[];a._overlayControls=b;a._container=b;a._canvas=b;a._controlsTL=b;a._controlsTR=b;a._controlsBR=b;a._controlsBL=b;a._bodyWidth=b;a._bodyHeight=b;a._bodyOverflow=b;a._docOverflow=b;a._fsBoundsDelta=b;a._prevContainerSize=b;a._lastOpenStartTime=0;a._lastOpenEndTime=0;a._animating=false;a._forceRedraw=false;a._mouseInside=false;a._xmlPath=b;a.source=b;a.drawer=b;a.viewport=b;a.profiler=b};Sys.Extended.UI.Seadragon.Viewer.prototype={initialize:function(){var n="absolute",b="0px",f="100%",c="div",a=this;Sys.Extended.UI.Seadragon.Viewer.callBaseMethod(a,"initialize");a._container=Seadragon.Utils.makeNeutralElement(c);a._canvas=Seadragon.Utils.makeNeutralElement(c);a._controlsTL=Seadragon.Utils.makeNeutralElement(c);a._controlsTR=Seadragon.Utils.makeNeutralElement(c);a._controlsBR=Seadragon.Utils.makeNeutralElement(c);a._controlsBL=Seadragon.Utils.makeNeutralElement(c);var g=new Seadragon.MouseTracker(a._canvas,a.config.clickTimeThreshold,a.config.clickDistThreshold),h=new Seadragon.MouseTracker(a._container,a.config.clickTimeThreshold,a.config.clickDistThreshold);a._bodyWidth=document.body.style.width;a._bodyHeight=document.body.style.height;a._bodyOverflow=document.body.style.overflow;a._docOverflow=document.documentElement.style.overflow;a._fsBoundsDelta=new Sys.Extended.UI.Seadragon.Point(1,1);var e=a._canvas.style,d=a._container.style,l=a._controlsTL.style,m=a._controlsTR.style,k=a._controlsBR.style,j=a._controlsBL.style;d.width=f;d.height=f;d.position="relative";d.left=b;d.top=b;d.textAlign="left";e.width=f;e.height=f;e.overflow="hidden";e.position=n;e.top=b;e.left=b;l.position=m.position=k.position=j.position=n;l.top=m.top=b;l.left=j.left=b;m.right=k.right=b;j.bottom=k.bottom=b;g.clickHandler=Function.createDelegate(a,a._onCanvasClick);g.dragHandler=Function.createDelegate(a,a._onCanvasDrag);g.releaseHandler=Function.createDelegate(a,a._onCanvasRelease);g.setTracking(true);if(a.get_showNavigationControl()){navControl=(new Sys.Extended.UI.Seadragon.NavControl(a)).elmt;navControl.style.marginRight="4px";navControl.style.marginBottom="4px";a.addControl(navControl,Sys.Extended.UI.Seadragon.ControlAnchor.BOTTOM_RIGHT)}for(var i=0;i<a._customControls.length;i++)a.addControl(a._customControls[i].id,a._customControls[i].anchor);h.enterHandler=Function.createDelegate(a,a._onContainerEnter);h.exitHandler=Function.createDelegate(a,a._onContainerExit);h.releaseHandler=Function.createDelegate(a,a._onContainerRelease);h.setTracking(true);window.setTimeout(Function.createDelegate(a,a._beginControlsAutoHide),1);a._container.appendChild(a._canvas);a._container.appendChild(a._controlsTL);a._container.appendChild(a._controlsTR);a._container.appendChild(a._controlsBR);a._container.appendChild(a._controlsBL);a.get_element().appendChild(a._container);a._xmlPath&&a.openDzi(a._xmlPath)},_raiseEvent:function(c,a){var b=this.get_events().getHandler(c);if(b){if(!a)a=Sys.EventArgs.Empty;b(this,a)}},_beginControlsAutoHide:function(){var a=this;if(!a.config.autoHideControls)return;a._controlsShouldFade=true;a._controlsFadeBeginTime=(new Date).getTime()+a._controlsFadeDelay;window.setTimeout(Function.createDelegate(a,a._scheduleControlsFade),a._controlsFadeDelay)},_scheduleControlsFade:function(){window.setTimeout(Function.createDelegate(this,this._updateControlsFade),20)},_updateControlsFade:function(){var b=this;if(b._controlsShouldFade){var d=(new Date).getTime(),e=d-b._controlsFadeBeginTime,a=1-e/b._controlsFadeLength;a=Math.min(1,a);a=Math.max(0,a);for(var c=b._controls.length-1;c>=0;c--)b._controls[c].setOpacity(a);a>0&&b._scheduleControlsFade()}},_onCanvasClick:function(g,c,e,f){var a=this;if(a.viewport&&e){var b=a.config.zoomPerClick,d=f?1/b:b;a.viewport.zoomBy(d,a.viewport.pointFromPixel(c,true));a.viewport.applyConstraints()}},_onCanvasDrag:function(c,b,a){this.viewport&&this.viewport.panBy(this.viewport.deltaPointsFromPixels(a.negate()))},_onCanvasRelease:function(d,c,a){a&&this.viewport&&this.viewport.applyConstraints()},_onContainerExit:function(d,c,a){if(!a){this._mouseInside=false;!this._animating&&this._beginControlsAutoHide()}},_onContainerRelease:function(d,c,b,a){if(!a){this._mouseInside=false;!this._animating&&this._beginControlsAutoHide()}},_getControlIndex:function(b){for(var a=this._controls.length-1;a>=0;a--)if(this._controls[a].elmt==b)return a;return-1},_abortControlsAutoHide:function(){this._controlsShouldFade=false;for(var a=this._controls.length-1;a>=0;a--)this._controls[a].setOpacity(1)},_onContainerEnter:function(){this._mouseInside=true;this._abortControlsAutoHide()},_updateOnce:function(){var a=this;if(!a.source)return;a.profiler.beginUpdate();var c=Seadragon.Utils.getElementSize(a._container);if(!c.equals(a._prevContainerSize)){a.viewport.resize(c,true);a._prevContainerSize=c;a._raiseEvent("resize",a)}var b=a.viewport.update();if(!a._animating&&b){a._raiseEvent("animationstart",self);a._abortControlsAutoHide()}if(b){a.drawer.update();a._raiseEvent("animation",self)}else if(a._forceRedraw||a.drawer.needsUpdate()){a.drawer.update();a._forceRedraw=false}else a.drawer.idle();if(a._animating&&!b){a._raiseEvent("animationfinish",a);!a._mouseInside&&a._beginControlsAutoHide()}a._animating=b;a.profiler.endUpdate()},_onClose:function(){var b=null,a=this;a.source=b;a.viewport=b;a.drawer=b;a.profiler=b;a._canvas.innerHTML=""},_beforeOpen:function(){var a=this;a.source&&a._onClose();a._lastOpenStartTime=(new Date).getTime();window.setTimeout(Function.createDelegate(a,function(){this._lastOpenStartTime>this._lastOpenEndTime&&this._setMessage(Seadragon.Strings.getString("Messages.Loading"))}),2e3);return a._lastOpenStartTime},_setMessage:function(d){var b="normal",c=document.createTextNode(d);this._canvas.innerHTML="";this._canvas.appendChild(Seadragon.Utils.makeCenteredNode(c));var a=c.parentNode.style;a.color="white";a.fontFamily="verdana";a.fontSize="13px";a.fontSizeAdjust="none";a.fontStyle=b;a.fontStretch=b;a.fontVariant=b;a.fontWeight=b;a.lineHeight="1em";a.textAlign="center";a.textDecoration="none"},_onOpen:function(f,d,e){var a=this;a._lastOpenEndTime=(new Date).getTime();if(f<a._lastOpenStartTime){Seadragon.Debug.log("Ignoring out-of-date open.");a._raiseEvent("ignore");return}else if(!d){a._setMessage(e);a._raiseEvent("error");return}a._canvas.innerHTML="";a._prevContainerSize=Seadragon.Utils.getElementSize(a._container);a.source=d;a.viewport=new Sys.Extended.UI.Seadragon.Viewport(a._prevContainerSize,a.source.dimensions,a.config);a.drawer=new Sys.Extended.UI.Seadragon.Drawer(a.source,a.viewport,a._canvas);a.profiler=new Sys.Extended.UI.Seadragon.Profiler;a._animating=false;a._forceRedraw=true;a._scheduleUpdate(a._updateMulti);for(var c=0;c<a._overlayControls.length;c++){var b=a._overlayControls[c];if(b.point!=null)a.drawer.addOverlay(b.id,new Sys.Extended.UI.Seadragon.Point(b.point.X,b.point.Y),Sys.Extended.UI.Seadragon.OverlayPlacement.TOP_LEFT);else a.drawer.addOverlay(b.id,new Sys.Extended.UI.Seadragon.Rect(b.rect.Point.X,b.rect.Point.Y,b.rect.Width,b.rect.Height),b.placement)}a._raiseEvent("open")},_scheduleUpdate:function(c,a){if(this._animating)return window.setTimeout(Function.createDelegate(this,c),1);var b=(new Date).getTime(),a=a?a:b,d=a+1e3/60,e=Math.max(1,d-b);return window.setTimeout(Function.createDelegate(this,c),e)},_updateMulti:function(){if(!this.source)return;var a=(new Date).getTime();this._updateOnce();this._scheduleUpdate(arguments.callee,a)},_updateOnce:function(){var a=this;if(!a.source)return;a.profiler.beginUpdate();var c=Seadragon.Utils.getElementSize(a._container);if(!c.equals(a._prevContainerSize)){a.viewport.resize(c,true);a._prevContainerSize=c;a._raiseEvent("resize")}var b=a.viewport.update();if(!a._animating&&b){a._raiseEvent("animationstart");a._abortControlsAutoHide()}if(b){a.drawer.update();a._raiseEvent("animation")}else if(a._forceRedraw||a.drawer.needsUpdate()){a.drawer.update();a._forceRedraw=false}else a.drawer.idle();if(a._animating&&!b){a._raiseEvent("animationfinish");!a._mouseInside&&a._beginControlsAutoHide()}a._animating=b;a.profiler.endUpdate()},getNavControl:function(){return this._navControl},get_xmlPath:function(){return this._xmlPath},set_xmlPath:function(a){this._xmlPath=a},get_debugMode:function(){return this.config.debugMode},set_debugMode:function(a){this.config.debugMode=a},get_animationTime:function(){return this.config.animationTime},set_animationTime:function(a){this.config.animationTime=a},get_blendTime:function(){return this.config.blendTime},set_blendTime:function(a){this.config.blendTime=a},get_alwaysBlend:function(){return this.config.alwaysBlend},set_alwaysBlend:function(a){this.config.alwaysBlend=a},get_autoHideControls:function(){return this.config.autoHideControls},set_autoHideControls:function(a){this.config.autoHideControls=a},get_immediateRender:function(){return this.config.immediateRender},set_immediateRender:function(a){this.config.immediateRender=a},get_wrapHorizontal:function(){return this.config.wrapHorizontal},set_wrapHorizontal:function(a){this.config.wrapHorizontal=a},get_wrapVertical:function(){return this.config.wrapVertical},set_wrapVertical:function(a){this.config.wrapVertical=a},get_minZoomDimension:function(){return this.config.minZoomDimension},set_minZoomDimension:function(a){this.config.minZoomDimension=a},get_maxZoomPixelRatio:function(){return this.config.maxZoomPixelRatio},set_maxZoomPixelRatio:function(a){this.config.maxZoomPixelRatio=a},get_visibilityRatio:function(){return this.config.visibilityRatio},set_visibilityRatio:function(a){this.config.visibilityRatio=a},get_springStiffness:function(){return this.config.springStiffness},set_springStiffness:function(a){this.config.springStiffness=a},get_imageLoaderLimit:function(){return this.config.imageLoaderLimit},set_imageLoaderLimit:function(a){this.config.imageLoaderLimit=a},get_clickTimeThreshold:function(){return this.config.clickTimeThreshold},set_clickTimeThreshold:function(a){this.config.clickTimeThreshold=a},get_clickDistThreshold:function(){return this.config.clickDistThreshold},set_clickDistThreshold:function(a){this.config.clickDistThreshold=a},get_zoomPerClick:function(){return this.config.zoomPerClick},set_zoomPerClick:function(a){this.config.zoomPerClick=a},get_zoomPerSecond:function(){return this.config.zoomPerSecond},set_zoomPerSecond:function(a){this.config.zoomPerSecond=a},get_maxImageCacheCount:function(){return this.config.maxImageCacheCount},set_maxImageCacheCount:function(a){this.config.maxImageCacheCount=a},get_showNavigationControl:function(){return this.config.showNavigationControl},set_showNavigationControl:function(a){this.config.showNavigationControl=a},get_minPixelRatio:function(){return this.config.minPixelRatio},set_minPixelRatio:function(a){this.config.minPixelRatio=a},get_mouseNavEnabled:function(){return this.config.mouseNavEnabled},set_mouseNavEnabled:function(a){this.config.mouseNavEnabled=a},get_controls:function(){return this._customControls},set_controls:function(a){this._customControls=a},get_overlays:function(){return this._overlayControls},set_overlays:function(a){this._overlayControls=a},get_prefixUrl:function(){return this._prefixUrl},set_prefixUrl:function(a){this._prefixUrl=a},add_open:function(a){this.get_events().addHandler("open",a)},remove_open:function(a){this.get_events().removeHandler("open",a)},add_error:function(a){this.get_events().addHandler("error",a)},remove_error:function(a){this.get_events().removeHandler("error",a)},add_ignore:function(a){this.get_events().addHandler("ignore",a)},remove_ignore:function(a){this.get_events().removeHandler("ignore",a)},add_resize:function(a){this.get_events().addHandler("resize",a)},remove_resize:function(a){this.get_events().removeHandler("resize",a)},add_animationstart:function(a){this.get_events().addHandler("animationstart",a)},remove_animationstart:function(a){this.get_events().removeHandler("animationstart",a)},add_animationend:function(a){this.get_events().addHandler("animationend",a)},remove_animationend:function(a){this.get_events().removeHandler("animationend",a)},addControl:function(a,e){var d="relative",b=this,a=Seadragon.Utils.getElement(a);if(b._getControlIndex(a)>=0)return;var c=null;switch(e){case Sys.Extended.UI.Seadragon.ControlAnchor.TOP_RIGHT:c=b._controlsTR;a.style.position=d;break;case Sys.Extended.UI.Seadragon.ControlAnchor.BOTTOM_RIGHT:c=b._controlsBR;a.style.position=d;break;case Sys.Extended.UI.Seadragon.ControlAnchor.BOTTOM_LEFT:c=b._controlsBL;a.style.position=d;break;case Sys.Extended.UI.Seadragon.ControlAnchor.TOP_LEFT:c=b._controlsTL;a.style.position=d;break;case Sys.Extended.UI.Seadragon.ControlAnchor.NONE:default:c=b._container;a.style.position="absolute"}b._controls.push(new Sys.Extended.UI.Seadragon.Control(a,e,c))},isOpen:function(){return!!this.source},openDzi:function(c,b){var a=this._beforeOpen();Sys.Extended.UI.Seadragon.DziTileSourceHelper.createFromXml(c,b,Seadragon.Utils.createCallback(null,Function.createDelegate(this,this._onOpen),a))},openTileSource:function(b){var a=beforeOpen();window.setTimeout(Function.createDelegate(this,function(){onOpen(a,b)}),1)},close:function(){if(!this.source)return;this._onClose()},removeControl:function(b){var b=Seadragon.Utils.getElement(b),a=this._getControlIndex(b);if(a>=0){this._controls[a].destroy();this._controls.splice(a,1)}},clearControls:function(){while(this._controls.length>0)this._controls.pop().destroy()},isDashboardEnabled:function(){for(var a=this._controls.length-1;a>=0;a--)if(this._controls[a].isVisible())return true;return false},isFullPage:function(){return this._container.parentNode==document.body},isMouseNavEnabled:function(){return this._innerTracker.isTracking()},isVisible:function(){return this._container.style.visibility!="hidden"},setDashboardEnabled:function(b){for(var a=this._controls.length-1;a>=0;a--)this._controls[a].setVisible(b)},setFullPage:function(f){var a=this;if(f==a.isFullPage())return;var i=document.body,b=i.style,e=document.documentElement.style,c=a._container.style,d=a._canvas.style;if(f){bodyOverflow=b.overflow;docOverflow=e.overflow;b.overflow="hidden";e.overflow="hidden";bodyWidth=b.width;bodyHeight=b.height;b.width="100%";b.height="100%";d.backgroundColor="black";d.color="white";c.position="fixed";c.zIndex="99999999";i.appendChild(a._container);a._prevContainerSize=Seadragon.Utils.getWindowSize();a._onContainerEnter()}else{b.overflow=bodyOverflow;e.overflow=docOverflow;b.width=bodyWidth;b.height=bodyHeight;d.backgroundColor="";d.color="";c.position="relative";c.zIndex="";a.get_element().appendChild(a._container);a._prevContainerSize=Seadragon.Utils.getElementSize(a.get_element());a._onContainerExit()}if(a.viewport){var h=a.viewport.getBounds();a.viewport.resize(a._prevContainerSize);var g=a.viewport.getBounds();if(f)a._fsBoundsDelta=new Sys.Extended.UI.Seadragon.Point(g.width/h.width,g.height/h.height);else{a.viewport.update();a.viewport.zoomBy(Math.max(a._fsBoundsDelta.x,a._fsBoundsDelta.y),null,true)}a._forceRedraw=true;a._raiseEvent("resize",a);a._updateOnce()}},setMouseNavEnabled:function(a){this._innerTracker.setTracking(a)},setVisible:function(a){this._container.style.visibility=a?"":"hidden"}};Sys.Extended.UI.Seadragon.Viewer.registerClass("Sys.Extended.UI.Seadragon.Viewer",Sys.UI.Control);