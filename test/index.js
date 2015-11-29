'use strict';

import BaconVdom from '../src'
import Bacon from 'baconjs'
import {h} from 'virtual-dom'

function renderer(params) {
    return h('div#bacon-virtualdom-test', [
        h('ul', [
            h('li', params.text0),
            h('li', params.text1)
        ])
    ]);

}

const html0 = '<div id="bacon-virtualdom-test"><ul><li>text0</li><li>text1</li></ul></div>',
      html1 = '<div id="bacon-virtualdom-test"><ul><li>text2</li><li>text3</li></ul></div>',
      htmls = [html0, html1];

describe('BaconVdom', () => {

    it('stream makes stream', (done) => {

        let paramsBus = new Bacon.Bus();

        BaconVdom.stream(paramsBus, renderer)
            .map('.rootNode.outerHTML')
            .slidingWindow(2, 2)
            .map(expect)
            .doAction('.toEqual', htmls)
            .assign(done);

        paramsBus.push({text0: 'text0', text1: 'text1'});
        paramsBus.push({text0: 'text2', text1: 'text3'});
    });

    it('render do rendering', () => {

        let paramsBus = new Bacon.Bus();

        BaconVdom.render(document.body, paramsBus, renderer);
        paramsBus.push({text0: 'text0', text1: 'text1'});
        expect(document.body.querySelector('#bacon-virtualdom-test').outerHTML).toBe(html0);
    });
});

describe('Bacon.vdom', () => {

    it('stream makes stream', (done) => {

        let paramsBus = new Bacon.Bus();

        Bacon.vdom.stream(paramsBus, renderer)
            .map('.rootNode.outerHTML')
            .slidingWindow(2, 2)
            .map(expect)
            .doAction('.toEqual', htmls)
            .assign(done);

        paramsBus.push({text0: 'text0', text1: 'text1'});
        paramsBus.push({text0: 'text2', text1: 'text3'});
    });

    it('render do rendering', () => {

        let paramsBus = new Bacon.Bus();

        Bacon.vdom.render(document.body, paramsBus, renderer);
        paramsBus.push({text0: 'text0', text1: 'text1'});
        expect(document.body.querySelector('#bacon-virtualdom-test').outerHTML).toBe(html0);
    });
});

describe('Bacon.Observable', () => {

    it('stream makes stream', (done) => {

        let paramsBus = new Bacon.Bus();

        paramsBus.vdom(renderer)
            .map('.rootNode.outerHTML')
            .slidingWindow(2, 2)
            .map(expect)
            .doAction('.toEqual', htmls)
            .assign(done);

        paramsBus.push({text0: 'text0', text1: 'text1'});
        paramsBus.push({text0: 'text2', text1: 'text3'});
    });

    it('renderVdom do rendering', () => {

        let paramsBus = new Bacon.Bus();

        paramsBus.renderVdom(document.body, renderer);
        paramsBus.push({text0: 'text0', text1: 'text1'});
        expect(document.body.querySelector('#bacon-virtualdom-test').outerHTML).toBe(html0);
    });
});
