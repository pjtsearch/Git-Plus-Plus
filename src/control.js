const simpleGit = require('simple-git/promise');
import {openMenu,toggleMenu,closeMenu} from "./menu"

var control;
var controlOptions;

export const createControl = (options)=> {
	let res = new Control(options)
	//updateControlStatus(res,options)
	return res
}

export const updateControlStatus = async(ctl=control,options=controlOptions)=>{

	
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

export const init = ()=> {
	controlOptions = {
		text:"Git++",
		hint:"Toggle Git++ menu",
		onClick: ()=> toggleMenu(),
		screen:editor_screens[0].id
	}
	control = createControl(controlOptions)
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

	// shortcut
	const {shortcutJS,Action,KeyCombo} = require("shortcutjs");
	shortcutJS.init()
	shortcutJS.addAction(new Action('toggleGitPlusPlus', KeyCombo.fromString('ctrl shift a')))
	shortcutJS.subscribe('toggleGitPlusPlus', toggleMenu)
}