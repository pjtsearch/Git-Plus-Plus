const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		let getState = async()=>{
			
			let git = simpleGit(graviton.getCurrentDirectory());
			let status = await git.status();
			let unstaged = status.files.filter(file=>file.working_dir!==" ");
			let staged = status.files.filter(file=>file.working_dir===" ");

			let dialogContent = `
			<h3> Unstaged </h3>
			${unstaged.map(file=>`<p>${file.path} - ${file.working_dir}</p>`).join("\n")}
			<h3> Staged </h3>
			${staged.map(file=>`<p>${file.path} - ${file.index}</p>`).join("\n")}
			<button onclick="graviton.gitPlusPlus.addAll()">Add All</button>
			`
			return {git,status,unstaged,staged,dialogContent}
		}
		let state = await getState()
		
		graviton.gitPlusPlus.addAll = async()=>{
			let state = await getState()
			state.git.add('./*');
			state = await getState()
			console.log(tab)
			tab.setData(state.dialogContent)
		}
	
		/*let dialog = new Dialog({
			id: "git-plus-plus-status-dialog",
			title: "Git Menu",
			content: dialogContent,
			buttons: {
				"Add All": {
					click:e=>{
						console.log(e);
						e.preventDefault();
						git.add('./*');
					}
				},
				"Close": "closeDialog(this);"
			}
		})*/
		screens.add()
		const tab = new Tab({
				id:'git_menu',
				type:'free',
				name:'Git Menu',
				data:state.dialogContent
		}) 

	}
}




