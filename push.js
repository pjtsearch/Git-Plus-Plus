const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Push",
			content: `
<input class="input4" id="push-remote" placeHolder="Remote"></input>
<input class="input4" id="push-branch" placeHolder="Branch"></input>
`,
			buttons: {
				"Push": {click:async()=>{
					let remote = document.getElementById("push-remote").value;
					let branch = document.getElementById("push-branch").value;
					console.log(await git.push(remote,branch))
				}},
				"Close": "closeDialog(this);"
			}
		})
		}
}
