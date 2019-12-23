const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Commit",
			content: `
<h3> To be commited: </h3>
<pre>${JSON.stringify(status.files.map(file=>file.path), null, 2)}</pre>
<input id="commit-message" placeHolder="Commit message"></input>
`,
			buttons: {
				"Commit": {click:async()=>{
					let message = document.getElementById("commit-message").value;
					console.log(await git.commit(message))
				}},
				"Cancel": "closeDialog(this);"
			}
		})
		}
}
