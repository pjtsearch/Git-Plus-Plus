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
${status.files.map(file=>`<p>${file.path} - ${file.working_dir.trim() || file.index.trim()}</p>`)}
`,
			buttons: {
				"Close": "closeDialog(this);"
			}
		})
		}
}