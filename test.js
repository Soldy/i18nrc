'use strict';
const nanoTest  = new (require('nanoTest')).test({
    'progress_bar' : false,
    'debug_print'  : 'short'
});

let $i18nrc ;$i18nrcreference;

nanoTest.add(
    'init the first',
    {
        'function':function(){
             $i18nrc = new (require('./index.js')).base;

        },
        'options':[]
    },
    '!==',
    false
);

nanoTest.add(
    'init the reference',
    {
        'function':function(){
             $i18nrcreference = new (require('./index.js')).base;

        },
        'options':[]
    },
    '!==',
    false
);

nanoTest.add(
    'init the first',
    {
        'function':function(){
             $i18nrc = new (require('./index.js')).base;

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
        'options':[{
             'directory': 'test',
             'locales'  : ['en','fr'],
             'files'    : [
                 'en.js',
                 'fr.js',
                 'de.js'
             ]
        }]
    },
    '===',
    true
);

nanoTest.add(
    'init the first',
    {
        'function':$i18nrc.init,
        'options':[{
             'directory': 'test',
             'locales' : ['en','fr']
        }]
    },
    'error'
);

nanoTest.add(
    'init the first',
    {
        'function':$i18nrcreference.init,
        'options':[{
             'directory': 'test',
             'locales' : ['en','fr']
        }]
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
         'function': $i18n.__
         'options' : ['france test']

    },
    '===',
    'Juste un test pour le français'
);

nanoTest.add(
    'test english 1',
    {
         'function': $i18n.__
         'options' : ['english test']

    },
    '===',
    'Just a test for english'
);

nanoTest.add(
    'test english 1',
    {
         'function': $i18n.__
         'options' : ['english test']

    },
    '===',
    'Just a test for english'
);

nanoTest.add(
    'not exist key',
    {
         'function': $i18n.__
         'options' : ['Not exist at all']

    },
    '===',
    'Not exist at all'
);

nanoTest.add(
    'test france reference',
    {
         'function': $i18nreference.__
         'options' : ['france test']

    },
    '===',
    'Juste un test pour le français'
);

nanoTest.add(
    'test english reference',
    {
         'function': $i18nreference.__
         'options' : ['english test']

    },
    '===',
    'Just a test for english'
);

nanoTest.add(
    'test english reference',
    {
         'function': $i18nreference.__
         'options' : ['german test']

    },
    '===',
    'german test
);


nanoTest.add(
    'test english reference',
    {
         'function': $i18nreference.__
         'options' : ['german test', 'de']

    },
    '===',
    'Nur ein Test für Deutschland'
);

nanoTest.add(
    'test english reference',
    {
         'function': $i18nreference.__
         'options' : ['german test', ['01', 'de']

    },
    '===',
    '0101'
);


nanoTest.add(
    'not exist key',
    {
         'function': $i18nreference.__
         'options' : ['Not exist at all']

    },
    '===',
    'Not exist at all'
);

nanoTest.run();
