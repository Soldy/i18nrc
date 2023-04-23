/*
 *  @Soldy\i18nrc\2022.03.26\GPL3
 */
'use strict';

const $lfs = require('legacyfsrc').base;
const $path = require('path');
const $setuprc = require('setuprc').base;

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
    };
    /*
     * @param {object}
     * @public
     */
    this.init = async function(settings){
        return await  _init(settings);
    };
    /*
     * @public
     */
    this.ready = function(){
        if(_initalized)
            return true;
        return false;
    };
    /*
     *  @private
     *  @var {integer}
     */
    let _initalized = false;
    /*
     *  @private
     *  @var {integer}
     */
    let _initalizing = false;
    /*
     *  @private
     *  @var {integer}
     */
    let _dict_size = 0;
    /*
     *  @private
     *  @var {integer}
     */
    let _readed = 0;

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
    let _langs = {};
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
        if(_initalized === false)
            return '';
        if(typeof locales === 'string')
            locales = [locales.toString()];
        if(!Array.isArray(locales))
            locales = _setup.get('locales');
        for (let i of locales)
            if(
                (typeof i === 'string')&&
                 (typeof _langs[i] !== 'undefined')&&
                 (typeof _langs[i][stence] !== 'undefined')
            ){
                return _langs[i][stence].toString();
            }
        return stence.toString();
    };

    /*
     * @param {string} data
     * @private
     */
    const _fileProcessor = function(data){
        data = JSON.parse(data);
        if(
            (typeof data.locale !== 'string') ||
            (typeof data.dictonary !== 'object')
        )
            throw Error('Invalid lang file format');
        if(typeof _langs[data.locale] === 'undefined')
            _langs[data.locale] = {};
        for (let i in data.dictonary){
            if(typeof data.dictonary[i] === 'string')
                _langs[data.locale][i] = data.dictonary[i].toString();
        }
        _readed++;
        if(_readed >= _dict_size)
            _initalized = true;
    };
    /*
     * @param {string} file_
     * @private
     */
    const _read = async function(file_){
        const data = await $lfs.readFile(
            $path.join(
                process.cwd(),
                _setup.get('directory'),
                file_
            ),
            'utf8',
        );
        _fileProcessor(data);
    };
    /*
     * @param {object}
     * @private
     */
    const _init = async function(settings){
        if(_initalizing === true) 
            throw Error('Already initalized');
        _setup.setup(settings);
        _initalizing = true;
        for (let i of _setup.get('files')){
            await _read(i);
        }
        _initalized = true;
        return true;
    };

    //constructor
    if ( typeof settings !== 'undefined' ){
        _init(settings);
    }
};


exports.base = i18nrcBase;
