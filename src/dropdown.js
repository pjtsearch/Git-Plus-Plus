import init from "./init"
import push from "./push"
import pull from "./pull"
import addRemote from "./addRemote"
import addBranch from "./addBranch"
import {openMenu,toggleMenu,closeMenu} from "./menu"

export default ()=>{
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
}