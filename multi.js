const simpleGit = require('simple-git/promise');

module.exports = {
	click:async()=>{
		let getState = async()=>{
			
			let git = simpleGit(graviton.getCurrentDirectory());
			let status = await git.status();
			let unstaged = status.files.filter(file=>file.working_dir!==" ");
			let staged = status.files.filter(file=>file.working_dir===" ");

			let dialogContent = `
			<div id="git-menu-add" style="margin:10px">
				<h3> Unstaged </h3>
				${unstaged.map(file=>`<p>${file.path} - ${file.working_dir}</p>`).join("\n")}
				<h3> Staged </h3>
				${staged.map(file=>`<p>${file.path} - ${file.index}</p>`).join("\n")}
				<button onclick="graviton.gitPlusPlus.addAll()" class="button1">Add All</button>
			</div>
			<div id="git-menu-commit" style="margin:10px">
				<input class="input4" id="commit-message" placeHolder="Commit message"></input>
				<button style="margin:10px" onclick="graviton.gitPlusPlus.commit(document.getElementById('commit-message').value)" class="button1">Commit</button>
			</div>
			<button style="margin:10px" onclick="graviton.gitPlusPlus.closeMenu()" class="button1">Close</button>
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
		graviton.gitPlusPlus.closeMenu = ()=>{
			closeTab("git_menufree")
			screens.remove(editor_screens[1].id)
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




