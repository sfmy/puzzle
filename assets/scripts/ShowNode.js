var DialogManager = require("./DialogManager.js");

cc.Class({
	extends: cc.Component,
	properties: {
		sprite: cc.Sprite,
	},

    start () {
		var bg = this.sprite.node;
		var visible_width = cc.visibleRect.width;
		var visible_height = cc.visibleRect.height;
		bg.scale = visible_width/bg.width;
    },

	init (index) {
		var url = `origion/${index}.jpg`;
		cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame) => {
			if (err) {
				console.log(err);
			}
			else {
				this.sprite.spriteFrame = spriteFrame;
			}
		});
	},

	back () {
		DialogManager.destroyDialog("ShowNode");
	},
});
