'use strict';

import Bacon from 'baconjs'
import vdom from 'virtual-dom'

let BaconVdom = {

    stream(src$, renderer) {
        return src$.scan({tree: null, rootNode: null}, (prev, params) => {
            let tree = renderer(params);
            return {
                tree,
                rootNode: prev.rootNode ?
                    vdom.patch(prev.rootNode, vdom.diff(prev.tree, tree)) :
                    vdom.create(tree)
            };
        }).changes().toProperty();
    },

    render($parentNode, src$, renderer) {
        let stream$ = this.stream(src$, renderer);
        stream$.first().map('.rootNode').assign($parentNode, 'appendChild');
        return stream$.assign();
    }
};

Bacon.Observable.prototype.vdom = function vdom(renderer) {
    return BaconVdom.stream(this, renderer);
}

Bacon.Observable.prototype.renderVdom = function renderVdom($parentNode, renderer) {
    return BaconVdom.render($parentNode, this, renderer);
}

Bacon.vdom = BaconVdom;

export default BaconVdom;
