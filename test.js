'use strict';
const nanoTest  = new (require('nanoTest')).test({
    'progress_bar'   : false,
    'debug_print'    : 'short'
});

let  $i18nrc =  (require('./index.js')).base;
let  $i18nrcreference = (require('./index.js')).base;
const _init_options = [{
    'directory': 'test',
    'locales'  : ['en','fr'],
    'files'    : [
        '0101.json',
        'en.json',
        'fr.json',
        'de.json'
    ]
}];

nanoTest.add(
    'first define',
    {
        'function':function(){
            $i18nrc = (require('./index.js')).base;
            return true;
        },
        'options':[]
    },
    '!==',
    false
);

nanoTest.add(
    'define reference',
    {
        'function':function(){
            $i18nrcreference = (require('./index.js')).base;
            return true;
        },
        'options':[]
    },
    '!==',
    false
);


nanoTest.add(
    'init the first',
    {
        'function':$i18nrc.init,
        'options':_init_options
    },
    '===',
    true
);

nanoTest.add(
    'init the first when inited',
    {
        'function':$i18nrc.init,
        'options':[]
    },
    'error'
);

nanoTest.add(
    'init the second firs inited',
    {
        'function':$i18nrcreference.init,
        'options':[]
    },
    'error'
);

nanoTest.add(
    'first ready ',
    {
        'function':$i18nrcreference.ready,
        'options':[]
    },
    '===',
    true
);

nanoTest.add(
    'reference ready',
    {
        'function':$i18nrcreference.ready,
        'options':[]
    },
    '===',
    true
);

nanoTest.add(
    'test france 1',
    {
        'function': $i18nrc.__,
        'options' : ['france test']

    },
    '===',
    'Juste un test pour le français'
);

nanoTest.add(
    'test english 1',
    {
        'function': $i18nrc.__,
        'options' : ['english test']

    },
    '===',
    'Just a test for english'
);

nanoTest.add(
    'test german 1',
    {
        'function': $i18nrc.__,
        'options' : ['german test']

    },
    '===',
    'german test'
);

nanoTest.add(
    'not exist key',
    {
        'function': $i18nrc.__,
        'options' : ['Not exist at all']

    },
    '===',
    'Not exist at all'
);

nanoTest.add(
    'test france reference',
    {
        'function': $i18nrcreference.__,
        'options' : ['france test']

    },
    '===',
    'Juste un test pour le français'
);

nanoTest.add(
    'test english reference',
    {
        'function': $i18nrcreference.__,
        'options' : ['english test']

    },
    '===',
    'Just a test for english'
);

nanoTest.add(
    'test english reference',
    {
        'function': $i18nrcreference.__,
        'options' : ['german test']

    },
    '===',
    'german test'
);


nanoTest.add(
    'test german reference',
    {
        'function': $i18nrcreference.__,
        'options' : ['german test', 'de']

    },
    '===',
    'Nur ein Test für Deutschland'
);

nanoTest.add(
    'test german test 01 reference',
    {
        'function': $i18nrcreference.__,
        'options' : ['german test', ['01', 'de']]

    },
    '===',
    '0101'
);


nanoTest.add(
    'not exist key',
    {
        'function': $i18nrcreference.__,
        'options' : ['Not exist at all']

    },
    '===',
    'Not exist at all'
);

nanoTest.run();
