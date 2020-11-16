cc.Class({
	extends: cc.Component,
	properties: {
		pointPrefab: cc.Prefab,
		contentNode: cc.Node,
	},

	start () {
		var col = 6;
		var row = 8;
		var list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17 ];
		for (let index of list) {
			let node = cc.instantiate(this.pointPrefab);
			let logic = node.getComponent("PointItem");
			logic.setIndex(index);
			node.parent = this.contentNode;
		}
	},
});
