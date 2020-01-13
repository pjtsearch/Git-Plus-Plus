import openPush from "./push"
import openPull from "./pull"
import {openMenu,toggleMenu,closeMenu} from "./menu"
import {updateControlStatus} from "./control"
const simpleGit = require('simple-git/promise');

const stageAll = async ()=>{
	let git = simpleGit(graviton.getCurrentDirectory());
	try{
		console.log(await git.add('./*'));
	}catch(err){
		console.log(err)
		new Notification({title:"Error staging:",content:err})
	}
	updateControlStatus()
}

export const init = ()=>{
	GravitonCommander.options.push({name:"Git++ Push",action:openPush})
	GravitonCommander.options.push({name:"Git++ Pull",action:openPull})
	GravitonCommander.options.push({name:"Git++ Stage All",action:stageAll})
	GravitonCommander.options.push({name:"Git++ Toggle Menu",action:toggleMenu})
}