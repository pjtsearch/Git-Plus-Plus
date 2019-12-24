const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();
		const unstaged = status.files.filter(file=>file.working_dir!==" ");
		const staged = status.files.filter(file=>file.working_dir===" ");

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Add",
			content: `
<h3> Unstaged </h3>
${unstaged.map(file=>`<p>${file.path} - ${file.working_dir}</p>`).join("\n")}
<h3> Staged </h3>
${staged.map(file=>`<p>${file.path} - ${file.index}</p>`).join("\n")}
`,
			buttons: {
				"Add All": {click:()=>git.add('./*')},
				"Close": "closeDialog(this);"
			}
		})
		}
}
