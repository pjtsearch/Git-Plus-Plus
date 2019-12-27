const simpleGit = require('simple-git/promise');

let openMulti = async()=>{
		graviton.gitPlusPlus.isMenuOpen = true
		let getState = async()=>{
			
			let git = simpleGit(graviton.getCurrentDirectory());
			let status = await git.status();
			let unstaged = status.files.filter(file=>file.working_dir!==" ");
			let staged = status.files.filter(file=>file.working_dir===" ");

			let dialogContent = `
			<button style="margin:10px" onclick="graviton.gitPlusPlus.openPush()" class="button1">Push</button>
			<button style="margin:10px" onclick="graviton.gitPlusPlus.openPull()" class="button1">Pull</button>
			
			<span class="divider-2"></span>

			<div id="git-menu-add" style="margin:10px">
				<h3> Unstaged <button onclick="graviton.gitPlusPlus.stageAll()" class="button1">Stage All</button></h3>
				${unstaged.map(file=>`<p>${file.path} - ${file.working_dir}</p>`).join("\n")}
				<h3> Staged  <button onclick="graviton.gitPlusPlus.unstageAll()" class="button1">Unstage All</button></h3>
				${staged.map(file=>`<p>${file.path} - ${file.index}</p>`).join("\n")}
				
			</div>

			<span class="divider-2"></span>

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
		
		graviton.gitPlusPlus.stageAll = async()=>{
			let state = await getState()
			console.log(state.git.add('./*'));
			state = await getState()
			tab.setData(state.dialogContent)
		}
		
		graviton.gitPlusPlus.unstageAll = async()=>{
			let state = await getState()
			console.log(state.git.reset(['./*']));
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

module.exports = {click:openMulti}

graviton.gitPlusPlus.isMenuOpen = false

graviton.gitPlusPlus.closeMenu = ()=>{
	closeTab("git_menufree")
	screens.remove(editor_screens[1].id)
	graviton.gitPlusPlus.isMenuOpen = false
}

graviton.gitPlusPlus.openMenu = openMulti

graviton.gitPlusPlus.toggleMenu = ()=>{
	if (graviton.gitPlusPlus.isMenuOpen){
		graviton.gitPlusPlus.closeMenu()
	}else{
		graviton.gitPlusPlus.openMenu()
	}
}

