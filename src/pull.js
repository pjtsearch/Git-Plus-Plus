const simpleGit = require('simple-git/promise');

 let openPull = async()=>{
	const git = simpleGit(graviton.getCurrentDirectory());

	const status = await git.status();
	const remotes = (await git.getRemotes()).map(remote=>remote.name)
	const branches = (await git.branch()).all

	let dialog = new Dialog({
		id: "git-plus-plus-status-dialog",
		title: "Git Pull",
		content: `
<select id="pull-remote">
${remotes.map(remote=>`<option>${remote}</option>`).join("\n")}
</select>
<select id="pull-branch">
${branches.map(branch=>`<option>${branch}</option>`).join("\n")}
</select>
`,
		buttons: {
			"Pull": {click:async()=>{
				let remote = document.getElementById("pull-remote").value;
				let branch = document.getElementById("pull-branch").value;
				try{
					console.log(await git.pull(remote,branch))
					new Notification({title:"Pulled successfully",content:`From ${remote} ${branch}`})
				}catch(err){
					console.log(err)
					new Notification({title:"Error pushing:",content:err})
				}
				graviton.gitPlusPlus.updateControlStatus()
			}},
			"Close": "closeDialog(this);"
		}
	})
	}

export default openPull
