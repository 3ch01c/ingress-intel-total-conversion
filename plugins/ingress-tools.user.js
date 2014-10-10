// ==UserScript==
// @name       IITC Ingress Tools Data Helper
// @namespace  http://www.ingress-tools.com/
// @version    0.2.4
// @description  Gathers data and adds features to help agents work more efficiently
// @include        http://www.ingress.com/intel*
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress-tools.com*
// @include        https://www.ingress-tools.com*
// @match          http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress-tools.com*
// @match          https://www.ingress-tools.com*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function') window.plugin = function () { };

    // PLUGIN START ////////////////////////////////////////////////////////
    window.plugin.IngressTools = function () { };
    window.plugin.IngressTools.version = 2.4;
    window.plugin.IngressTools.setup = function () {
        addHook('portalDetailLoaded', function (data) {
            data.details.a = null; data.details.b = null; data.details.c = null;
            window.plugin.IngressTools.pushPortalData(data);
        });
    };
    window.plugin.IngressTools.pushPortalData = function (data) {
        $.ajax({
            type: 'POST',
            url: 'http://www.ingress-tools.com/api/data',
            headers: { 'x-ign': PLAYER.nickname },
            crossDomain: true,
            data: 'data=' + JSON.stringify(data).replace('&', '%26'),
            dataType: 'json',
            success: function (responseData, textStatus, jqXHR) {
                //alert('success'); //console.log(responseData);
            },
            error: function (responseData, textStatus, errorThrown) {
                //alert(textStatus +': '+ errorThrown); //console.log(responseData);
            }
        });
    };
    var setup = window.plugin.IngressTools.setup;
    // PLUGIN END //////////////////////////////////////////////////////////

    setup.info = plugin_info; //add the script info data to the function as a property
    if (!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if (window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);
