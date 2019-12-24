const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Add",
			content: `
<h3> Unstaged </h3>
<pre>${JSON.stringify(status.files.filter(file=>file.working_dir!==" "), null, 4)}</pre>
<h3> Tracked </h3>
<pre>${JSON.stringify(status.staged, null, 2)}</pre>
`,
			buttons: {
				"Add All": {click:()=>git.add('./*')},
				"Close": "closeDialog(this);"
			}
		})
		}
}
