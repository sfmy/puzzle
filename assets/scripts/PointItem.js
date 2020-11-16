var DialogManager = require("./DialogManager.js");

cc.Class({
	extends: cc.Component,
	properties: {
		sprite: cc.Sprite,
		backButton: cc.Button,
	},


	setIndex (index) {
		this.index = index;
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

	show () {
		DialogManager.createDialog("ShowNode", "ShowNode", this.index);
	},

	game () {
		DialogManager.createDialog("Game", "Game", this.index);
	},
});
