
const gitPlusPlus = new Plugin({
  name:'Git++'
})
graviton.gitPlusPlus = gitPlusPlus

//const status = require("./status")
//const add = require("./add")
const init = require("./init")
//const commit = require("./commit")
const push = require("./push")
const pull = require("./pull")
const addRemote = require("./addRemote")
const addBranch = require("./addBranch")
//const multi = require("./multi")
const openMenu = require("./menu")

//openMenu()

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
		"Push":push,
		"Add Remote":addRemote,
		"Add Branch":addBranch,
		"Pull":pull,
		"Open Menu (ctrl+shift+a)":{click:openMenu}
  }
})


//control
let controlOptions = {
  text:"Git++",
  hint:"Toggle Git++ menu",
  onClick: ()=> graviton.gitPlusPlus.toggleMenu(),
	screen:editor_screens[0].id
}
const createControl = (options)=> {
	let res = new Control(options)
	//updateControlStatus(res,options)
	return res
}
let control = createControl(controlOptions)

const updateControlStatus = async(ctl=control,options=controlOptions)=>{
	const simpleGit = require('simple-git/promise');

	let git = simpleGit(graviton.getCurrentDirectory()).silent(true);
	//try{await git.revparse(["git-dir"])}catch(e){ return }
	let status = await git.status();
	await git.fetch()
	let currentBranch = (await git.branch()).current;
	let diff = await git.diffSummary([currentBranch,`origin/${currentBranch}`])
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
		controlOptions.screen = editor_screens[0].id
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
var {shortcutJS,Action,KeyCombo} = require("./modules/shortcut.js")
shortcutJS.init()
shortcutJS.addAction(new Action('toggleGitPlusPlus', KeyCombo.fromString('ctrl shift a')))
shortcutJS.subscribe('toggleGitPlusPlus', graviton.gitPlusPlus.toggleMenu)
