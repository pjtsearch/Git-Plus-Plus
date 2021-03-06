const simpleGit = require('simple-git/promise');
import {updateControlStatus} from "./control"

let openPush = async()=>{
	const git = simpleGit(graviton.getCurrentDirectory());

	const status = await git.status();
	const remotes = (await git.getRemotes()).map(remote=>remote.name)
	const branches = (await git.branch()).all

	let dialog = new Dialog({
		id: "git-plus-plus-status-dialog",
		title: "Git Push",
		content: `
<select id="push-remote">
${remotes.map(remote=>`<option>${remote}</option>`).join("\n")}
</select>
<select id="push-branch">
${branches.map(branch=>`<option>${branch}</option>`).join("\n")}
</select>
`,
		buttons: {
			"Push": {click:async()=>{
				let remote = document.getElementById("push-remote").value;
				let branch = document.getElementById("push-branch").value;
				try{
					console.log(await git.push(remote,branch))
					new Notification({title:"Pushed successfully",content:`To ${remote} ${branch}`})
				}catch(err){
					console.log(err)
					new Notification({title:"Error pushing:",content:err})
				}
				updateControlStatus()
			}},
			"Close": "closeDialog(this);"
		}
	})
}
export default openPush


