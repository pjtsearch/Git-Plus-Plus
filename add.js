const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Add",
			content: `
<h3> Untracked </h3>
<pre>${JSON.stringify(status.files.filter(file=>file.index !== "A" || file.working_dir !== " ").map(file=>file.path), null, 4)}</pre>
<h3> Tracked </h3>
<pre>${JSON.stringify(status.files.map(file=>file.path), null, 4)}</pre>
`,
			buttons: {
				"Add All": {click:()=>git.add('./*')},
				"Close": "closeDialog(this);"
			}
		})
		}
}
