// ==UserScript==
// @id             iitc-plugin-highlight-by-age@3ch01c
// @name           IITC plugin: highlight old portals
// @category       Highlighter
// @version        0.2.0.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Uses the fill color of the portals to show old portals. Red = over 20 days, yellow = over 10 days
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



//PLUGIN START ////////////////////////////////////////////////////////

//use own namespace for plugin
window.plugin.portalHighlighterByAge = function() {};

window.plugin.portalHighlighterByAge.highlight = function(data) {
	var d = data.portal.options.details;
	if(getTeam(d) !== 0) {
		// get portal age
		var age_in_days =  Math.floor((new Date().getTime() - d.captured.capturedTime)/(24*60*60*1000));
		// Apply colour to portal.
		if (age_in_days > 10) {
			var color = 'yellow';
			if (age_in_days > 20) color = 'red';
			var fill_opacity = age_in_days*.85/15 + .15;
			var params = {fillColor: color, fillOpacity: fill_opacity};
			data.portal.setStyle(params);
		}
	}
}

var setup =  function() {
	window.addPortalHighlighter('Age', window.plugin.portalHighlighterByAge.highlight);
}

//PLUGIN END //////////////////////////////////////////////////////////


if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);


