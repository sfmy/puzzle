var DialogManager = require("./DialogManager.js");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
		DialogManager.setRootNode(this.node);  
		DialogManager.createDialog("Loading", "Loading");
    },
});
