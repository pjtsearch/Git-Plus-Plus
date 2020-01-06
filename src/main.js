

//const status = require("./status")
//const add = require("./add")
import init from "./init"
//const commit = require("./commit")
import push from "./push"
import pull from "./pull"
import addRemote from "./addRemote"
import addBranch from "./addBranch"
import {updateControlStatus,init as initControl} from "./control"

//const multi = require("./multi")
import {openMenu,toggleMenu,closeMenu} from "./menu"
const simpleGit = require('simple-git/promise');
const semver = require('semver')
//openMenu()


const gitPlusPlus = new Plugin({
  name:'Git++'
})
graviton.gitPlusPlus = gitPlusPlus

if(!semver.satisfies(GravitonInfo.version,">=1.3.0")) {
  console.warn("Git++ doesn't work on your current version, you need at least 1.3.0")
  new Notification({
    title:"Git++",
    content:"You need Graviton v1.3.0+"
	})
}

const dropdown = new dropMenu({
	id:"git-plus-plus-dropdown"
});
dropdown.setList({
	"button": "Git++",
	"list":{
		/*
		"Status":status,
		"Add":add,
		"Commit":commit,
		*/
		"Init":init,
		"Push":{click:push},
		"Add Remote":addRemote,
		"Add Branch":addBranch,
		"Pull":{click:pull},
		"Open Menu (ctrl+shift+a)":{click:openMenu}
	}
})

initControl()