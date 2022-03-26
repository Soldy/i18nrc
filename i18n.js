/*
 *  @Soldy\i18nrc\2022.03.26\GPL3
 */
'use strict';

const fs = require('fs');
const path = require('path');
const $setuprc = require('setuprc').base;
const $clonerc = new (require('clonerc')).base();

/*
 * @param {integer} limitIn //maximum size of package
 * @prototype
 */
const i18nrcBase=function(settings){
    /*
     * @param {string} stence
     * @param {array || string} locales
     * @public
     * @return {string}
     */
    this.__ = function(stence, locales){
        return _get(stence, locales);
    }
    /*
     * @param {object}
     * @public
     */
    this.init = function(settings){
        return  _init(settings);
    }
    /*
     * @public
     */
    this.ready = function(settings){
         if(_initalized)
             return true;
         return false;
    }
    let _initalized = false;
    /*
     * @private
     *  @const {object}
     */
    const _setup_json = {
        'directory':{
            'type'    : 'string',
            'default' : 'locales'
        },
        'locales':{
            'type'    : 'array',
            'default' : ['en']
        },
        'files':{
            'type'    : 'array',
            'default' : ['en.json']
        }
    };
    let _langs = {}
    /*
     *  @private
     *  @const {setuprc}
     */
    const _setup = new $setuprc(
        _setup_json
    );
    /*
     * @param {string} stence
     * @param {array || string} locales
     * @private
     * @return {string}
     */
    const _get = function(stence, locales){
        if(typeof locales === 'string')
            locales = [locales.toString()];
        if(!Array.isArray(locales))
            locales = _setup.get('locales');
        for (let i of locales)
            if(
                 (typeof i === 'string')&&
                 (typeof _langs[i] !== 'undefined')&&
                 (typeof _langs[i][stence] !== 'undefined')
            )
                 return _langs[i][stence].toString();
        return stence.toString();
    }
    /*
     * @param {string} file_
     * @private
     */
    const _read = function(file_){
        const file = JSON.parse(
            fs.readFileSync(
                path.join(
                    process.cwd(),
                    _setup.get('directory'),
                    file_
                ),
                'utf8'
            )
        );
        if(
            (typeof file.locale !== 'string') ||
            (typeof file.dictonary !== 'object')
        )
             throw Error('Invalid lang file format');
        if(typeof _langs[file.locale] === 'undefined')
            _langs[file.locale] = {};
        for (let i in file.dictonary){
             if(typeof file.dictonary[i] === 'string')
                 _langs[file.locale][i] = file.dictonary[i].toString();
        }
    };
    /*
     * @param {object}
     * @private
     */
    const _init = function(settings){
        if(_initalized === true) 
             throw Error('Already initalized');
         _setup.setup(settings);
         _initalized = true;
         for (let i of _setup.get('files')){
             _read(i);
         }
         return true;
    }

    //constructor
    if ( typeof settings !== 'undefined' ){
        _init(settings);
    }
}


exports.base = i18nrcBase;
