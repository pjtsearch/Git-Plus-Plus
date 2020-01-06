

//const status = require("./status")
//const add = require("./add")
import init from "./init"
//const commit = require("./commit")
import push from "./push"
import pull from "./pull"
import addRemote from "./addRemote"
import addBranch from "./addBranch"
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



//control
let controlOptions = {
  text:"Git++",
  hint:"Toggle Git++ menu",
  onClick: ()=> toggleMenu(),
	screen:editor_screens[0].id
}
const createControl = (options)=> {
	let res = new Control(options)
	//updateControlStatus(res,options)
	return res
}
let control = createControl(controlOptions)

const updateControlStatus = async(ctl=control,options=controlOptions)=>{

	
	let git = simpleGit(graviton.getCurrentDirectory()).silent(true);
	//try{await git.revparse(["git-dir"])}catch(e){ return }
	let status = await git.status();
	await git.fetch()
	let currentBranch = (await git.branch()).current;
	let diff;
	if ((await git.branch()).all.includes(`remotes/origin/${currentBranch}`)){
		diff = await git.diffSummary([currentBranch,`origin/${currentBranch}`])
	}else{
		diff = {files:[]}
	}
	
	//console.log(diff)
	options.text = "Git++"
	if(status.files.length > 0){
		options.text += " *"
	}
	if(diff.files.length > 0){
		options.text += " ^"
	}
	ctl.setText(options.text)
}


document.addEventListener("tab_created",(e)=>{
	console.log("New tab's ID:"+e.detail.tab.id)
	if (!document.querySelector(".g_status_bar > span[title='Toggle Git++ menu']")){
		control = createControl(controlOptions)
	}
})

document.addEventListener("loaded_project",(e)=>{
	updateControlStatus()
})

setInterval(async()=>{
	updateControlStatus()
},10000)

graviton.gitPlusPlus.updateControlStatus = updateControlStatus


// shortcut
const {shortcutJS,Action,KeyCombo} = require("shortcutjs");
shortcutJS.init()
shortcutJS.addAction(new Action('toggleGitPlusPlus', KeyCombo.fromString('ctrl shift a')))
shortcutJS.subscribe('toggleGitPlusPlus', toggleMenu)
