'use strict'

// storymap_data can be an URL or a Javascript object
var storymap_data = '../data/ddb.json';

// certain settings must be passed within a separate options object
var storymap_options = {};

var storymap = new KLStoryMap.StoryMap('mapdiv', storymap_data, storymap_options);
window.onresize = function(event) {
    storymap.updateDisplay(); // this isn't automatic
}