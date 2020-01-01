const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Add Branch",
			content: `
<input class="input4" id="branch-name" placeHolder="Name"></input>
`,
			buttons: {
				"Add": {click:async()=>{
					let name = document.getElementById("branch-name").value;
					console.log(await git.checkoutBranch(name,"HEAD"))
				}},
				"Close": "closeDialog(this);"
			}
		})
		}
}
