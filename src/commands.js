import openPush from "./push"
import openPull from "./pull"

export const init = ()=>{
	GravitonCommander.options.push({name:"Git++ Push",action:openPush})
	GravitonCommander.options.push({name:"Git++ Pull",action:openPull})
}