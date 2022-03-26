/*
 *  @Soldy\i18nrc\2022.03.26\GPL3
 */
'use strict';
if(typeof  global.theUn1v3rse === 'undefined')
    require('theuniverse');
const $universe = global.theUn1v3rse.controls.interface();


if(!$universe.baseCheck('i18nrc')){
    const $i18nrc = new (require('./i18n.js')).base();
    $universe.baseAdd('i18nrc', $i18nrc);
}

exports.base = $universe.baseGet('i18nrc');
