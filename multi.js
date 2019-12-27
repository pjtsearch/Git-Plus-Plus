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
			<input class="input4" id="commit-message" placeHolder="Commit message"></input>
			<button onclick="graviton.gitPlusPlus.commit(document.getElementById('commit-message').value)">Commit</button>
			`
			return {git,status,unstaged,staged,dialogContent}
		}
		let state = await getState()
		
		screens.add()
		var tab = new Tab({
				id:"git_menu",
				type:"free",
				name:'Git Menu',
				data:state.dialogContent
		}) 
		
		graviton.gitPlusPlus.addAll = async()=>{
			let state = await getState()
			console.log(state.git.add('./*'));
			state = await getState()
			tab.setData(state.dialogContent)
		}
		
		graviton.gitPlusPlus.commit = async(message)=>{
			console.log(message)
			let state = await getState()
			console.log(await state.git.commit(message))
			state = await getState()
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
		

	}
}




