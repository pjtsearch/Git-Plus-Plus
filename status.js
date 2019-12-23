const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();
		console.log(status)

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Status",
			content: `
<pre>${JSON.stringify(status.files, null, 4)}</pre>
`,
			buttons: {
				"Close": "closeDialog(this);"
			}
		})
		}
}