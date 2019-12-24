const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();
		const remotes = (await git.getRemotes()).map(remote=>remote.name)
		const branches = (await git.branch()).all

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Pull",
			content: `
<!--<input class="input4" id="pull-remote" placeHolder="Remote"></input>-->
<select id="pull-remote">
${remotes.map(remote=>`<option>${remote}</option>`).join("\n")}
</select>
<!--<input class="input4" id="pull-branch" placeHolder="Branch"></input>-->
<select id="pull-branch">
${branches.map(branch=>`<option>${branch}</option>`).join("\n")}
</select>
`,
			buttons: {
				"Pull": {click:async()=>{
					let remote = document.getElementById("push-remote").value;
					let branch = document.getElementById("push-branch").value;
					console.log(await git.pull(remote,branch))
				}},
				"Close": "closeDialog(this);"
			}
		})
		}
}
