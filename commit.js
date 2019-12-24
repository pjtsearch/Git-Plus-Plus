const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const status = await git.status();
		const staged = status.files.filter(file=>file.working_dir===" ")

		let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Commit",
			content: `
<h3> To be commited: </h3>
${staged.map(file=>`<p>${file.path} - ${file.index}</p>`).join("\n")}
<input class="input4" id="commit-message" placeHolder="Commit message"></input>
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
