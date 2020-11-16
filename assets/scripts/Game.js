var DialogManager = require("./DialogManager.js");
var col = 3;
var row = 4;
var distance = 160;
var revise = 30;

cc.Class({
	extends: cc.Component,
	properties: {
		contentNode: cc.Node,
		imageItem: cc.Prefab,
		endLabel: cc.Node,
	},

	init (index) {
		this.gameEnd = false;
		this.index = index;
		this.combineList = [];
		for (let i = 0; i < col; ++i) {
			for (let j = 0; j < row; ++j) {
				this.combineList.push([`${i}_${j}`]);
			}
		}
		cc.loader.loadResDir("cuted/"+index, cc.SpriteFrame, (err, arr) => {
			if (err) {
				console.log(err);
			}
			else {
				this.imageList = {};
				let zIndex = 1;
				for (let spriteFrame of arr) {
					this.addSpriteNode(spriteFrame, zIndex++);
				}
			}
		});
	},

	addSpriteNode (spriteFrame, zIndex) {
		var name = spriteFrame.name;
		let node = cc.instantiate(this.imageItem);
		node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
		node.parent = this.contentNode;
		node.setPosition(this.getRandomPos());
		node.zIndex = zIndex;
		this.imageList[name] = node;
		let x = parseInt(name.split("_")[0]);
		let y = parseInt(name.split("_")[1]);

		node.on(cc.Node.EventType.TOUCH_START, () => {
			if (this.gameEnd) {
				return;
			};
			let arr = this.getCombineList(name);
			/* console.log(arr, this.imageList); */
			for (let key in this.imageList) {
				let item = this.imageList[key];
				if (item.zIndex > node.zIndex) {
					item.zIndex -= 1;
				}
			}
			for (let item of arr) {
				this.imageList[item].zIndex = col*row;
			}
		});

		node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
			if (this.gameEnd) {
				return;
			};
			let offx = event.getDeltaX();
			let offy = event.getDeltaY();
			let arr = this.getCombineList(name);
			if (!arr) {
				console.log(`${name} move error, can't find combine!`);
			}
			else {
				for (let item of arr) {
					let spriteNode = this.imageList[item];
					if (spriteNode) {
						spriteNode.x += offx;
						spriteNode.y += offy;
					}
				}
			}
		});

		node.on(cc.Node.EventType.TOUCH_END, (event) => {
			if (this.gameEnd) {
				return;
			};
			/* left combine */
			let combineList = this.getCombineList(name);
			let leftName = (x-1)+"_"+y;
			if (x > 0 && combineList.indexOf(leftName) == -1) {
				let leftNode = this.imageList[leftName];
				if ((node.x-leftNode.x) > distance-revise && (node.x-leftNode.x) < distance+revise && Math.abs(node.y-leftNode.y) < revise) {
					let offx = node.x-distance-leftNode.x;
					let offy = node.y-leftNode.y;
					let arr = this.getCombineList(leftName);
					this.delCombineList(leftName);
					for (let item of arr) {
						let spriteNode = this.imageList[item];
						spriteNode.x += offx;
						spriteNode.y += offy;
						spriteNode.zIndex = node.zIndex;
					}
					for (let i = 0; i < this.combineList.length; ++i) {
						if (this.combineList[i].indexOf(name) != -1) {
							this.combineList[i] = this.combineList[i].concat(arr);
							break;
						}
					}
					return;
				}
			}
			/* right combine */
			let rightName = (x+1)+"_"+y;
			if (x < col-1 && combineList.indexOf(rightName) == -1) {
				let rightNode = this.imageList[rightName];
				if ((rightNode.x-node.x) > distance-revise && (rightNode.x-node.x) < distance+revise && Math.abs(rightNode.y-node.y) < revise) {
					let offx = node.x+distance-rightNode.x;
					let offy = node.y-rightNode.y;
					let arr = this.getCombineList(rightName);
					this.delCombineList(rightName);
					for (let item of arr) {
						let spriteNode = this.imageList[item];
						spriteNode.x += offx;
						spriteNode.y += offy;
						spriteNode.zIndex = node.zIndex;
					}
					for (let i = 0; i < this.combineList.length; ++i) {
						if (this.combineList[i].indexOf(name) != -1) {
							this.combineList[i] = this.combineList[i].concat(arr);
							break;
						}
					}
					return;
				}
			}
			/* up combine */
			let upName = x+"_"+(y-1);
			if (y > 0 && combineList.indexOf(upName) == -1) {
				let upNode = this.imageList[upName];
				if (Math.abs(node.x-upNode.x) < revise && (upNode.y-node.y) > distance-revise && (upNode.y-node.y) < distance+revise) {
					let offx = node.x-upNode.x;
					let offy = node.y+distance-upNode.y;
					let arr = this.getCombineList(upName);
					this.delCombineList(upName);
					for (let item of arr) {
						let spriteNode = this.imageList[item];
						spriteNode.x += offx;
						spriteNode.y += offy;
						spriteNode.zIndex = node.zIndex;
					}
					for (let i = 0; i < this.combineList.length; ++i) {
						if (this.combineList[i].indexOf(name) != -1) {
							this.combineList[i] = this.combineList[i].concat(arr);
							break;
						}
					}
					return;
				}
			}
			/* down combine */
			let downName = x+"_"+(y+1);
			if (y < row-1 && combineList.indexOf(downName) == -1) {
				let downNode = this.imageList[downName];
				if (Math.abs(node.x-downNode.x) < revise && (node.y-downNode.y) > distance-revise && (node.y-downNode.y) < distance+revise) {
					let offx = node.x-downNode.x;
					let offy = node.y-distance-downNode.y;
					let arr = this.getCombineList(downName);
					this.delCombineList(downName);
					for (let item of arr) {
						let spriteNode = this.imageList[item];
						spriteNode.x += offx;
						spriteNode.y += offy;
						spriteNode.zIndex = node.zIndex;
					}
					for (let i = 0; i < this.combineList.length; ++i) {
						if (this.combineList[i].indexOf(name) != -1) {
							this.combineList[i] = this.combineList[i].concat(arr);
							break;
						}
					}
					return;
				}
			}

			if (this.combineList.length == 1) {
				this.endLabel.active = true;
				this.endLabel.runAction(cc.moveBy(1, cc.v2(0, 50)));
				this.gameEnd = true;
			}
		});
	},

	back () {
		DialogManager.destroyDialog("Game");
	},

	delCombineList (name) {
		for (let i = 0; i < this.combineList.length; ++i) {
			if (this.combineList[i].indexOf(name) != -1) {
				this.combineList.splice(i, 1);
				return;
			}
		}
		console.log(`delCombineList ${name} failed!`);
	},

	getCombineList (name) {
		for (let list of this.combineList) {
			if (list.indexOf(name) != -1) {
				return list;
			}
		}
		console.log(`getCombineList ${name} error!`);
		return null;
	},

	getRandomPos () {
		let width = cc.visibleRect.width;
		let height = cc.visibleRect.height;
		let x = Math.random()*(width-160)+80-width/2;
		let y = Math.random()*(height-160)+80-height/2;
		return cc.v2(x, y);
	},
});
