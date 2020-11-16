class DialogManager {
	constructor (root) {
		this.dialogList = {};
	}

	setRootNode (root) {
		this.rootNode = root;
	}

	createDialog (res, name, data) {
		cc.log("createDialog", res, name);
		if (this.dialogList[name]) {
			cc.log(`dialog ${name} exist!`);
		}
		else {
			cc.loader.loadRes("prefabs/" + res, cc.Prefab, (err, prefab) => {
				if (err) {
					console.log(err);
				}
				else {
					let node = cc.instantiate(prefab);
					this.dialogList[name] = node;
					let logic = node.getComponent(name);
					if (data && logic && logic.init) {
						logic.init(data);
					}
					node.parent = this.rootNode;
				}
			});
		}
	}

	destroyDialog (name) {
		cc.log("destroyDialog", name);
		if (this.dialogList[name]) {
			this.dialogList[name].destroy();
			delete this.dialogList[name];
		}
		else {
			cc.log(`dialog ${name} doesn't exist!`);
		}
	}
}

var instance = null;
module.exports = (() => {
	if (instance == null) {
		instance = new DialogManager();
	}
	return instance;
})();
