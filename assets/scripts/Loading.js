var DialogManager = require("./DialogManager.js");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
		var bg = cc.find('Background', this.node);
		var visible_width = cc.visibleRect.width;
		var visible_height = cc.visibleRect.height;
		bg.scale = visible_height/bg.height;
    },

	enterGame () {
		DialogManager.createDialog("Points", "Points");
		DialogManager.destroyDialog("Loading");
	},
});

