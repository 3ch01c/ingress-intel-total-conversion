// ==UserScript==
// @id             iitc-plugin-barcodes@3ch01c
// @name           IITC plugin: replace player names with more easily remembered names
// @category       Portal Info
// @version        0.0.1.@@DATETIMEVERSION@@
// @namespace      https://github.com/3ch01c/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Show resonator energy percentage on resonator energy bar in portal detail panel.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.barcodes = function() {};
window.plugin.barcodes.nameMap = {
  "IIllIlIlIIlIIll": "SmurfStalkin",
  "lIIIIIIIIlIlIIl": "BK2OI",
  "IllIIIllIIIIlII": "Krapos",
  "lIIllIIllIlIIlI": "Soulweeper"
}
window.plugin.barcodes.replaceNames = function(data) {
  $(".nickname").each(function(index, value){
    value = $(value);
    value.text(window.plugin.barcodes.decode(value.text()));
  });
}
window.plugin.barcodes.decode = function(barcode) {
  if (barcode in window.plugin.barcodes.nameMap){
    return window.plugin.barcodes.nameMap[barcode];
  }
  else {
    return barcode;
  }
}

var setup =  function() {
  window.addHook('nicknameClicked', window.plugin.barcodes.replaceNames);
}

// PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
