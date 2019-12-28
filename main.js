
const gitPlusPlus = new Plugin({
  name:'Git++'
})
graviton.gitPlusPlus = gitPlusPlus

const status = require("./status")
const add = require("./add")
const init = require("./init")
const commit = require("./commit")
const push = require("./push")
const pull = require("./pull")
const addRemote = require("./addRemote")
const multi = require("./multi")


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
		"Pull":pull,
		"Open Menu (ctrl+shift+a)":multi
  }
})

const updateControlStatus = async(control,controlOptions)=>{
	const simpleGit = require('simple-git/promise');

	let git = simpleGit(graviton.getCurrentDirectory());
	let status = await git.status();
	console.log(await git.diffSummary())
	if(status.files.length > 0){
		controlOptions.text = "* Git++"
		control.setText("* Git++")
	}
}

let controlOptions = {
  text:"Git++",
  hint:"Toggle Git++ menu",
  onClick: ()=> graviton.gitPlusPlus.toggleMenu(),
	screen:editor_screens[0].id
}
const createControl = (options)=> {
	let res = new Control(options)
	updateControlStatus(res,options)
	return res
}
let control = createControl(controlOptions)

document.addEventListener("tab_created",(e)=>{
	console.log("New tab's ID:"+e.detail.tab.id)
	if (!document.querySelector(".g_status_bar > span[title='Toggle Git++ menu']")){
		control = createControl(controlOptions)
	}
})

document.addEventListener("loaded_project",(e)=>{
	updateControlStatus(control,controlOptions)
})

setInterval(async()=>{
	updateControlStatus(control,controlOptions)
},10000)

