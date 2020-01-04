const Vue = require("./modules/vue.js")
const simpleGit = require('simple-git/promise');

const openMenu = ()=>{
	//graviton.gitPlusPlus.isMenuOpen = true
	let oldScreensLength = editor_screens.length
	screens.add()
	graviton.gitPlusPlus.screenId = editor_screens[oldScreensLength].id
	var tab = new Tab({
		id:"git_menu",
		type:"free",
		name:'Git Menu',
		data:
`
<div class="vue-content"></div>
<style>
#git-menu-vue-content{
	display: grid;
	grid-template-rows: auto 1fr 1fr auto;
	height: 100%;
	overflow:auto;
}

.git-menu-staging{
	margin:10px;
}
#git-menu-commit{
	padding:10px;
	display: grid;
	grid-template-columns: 4fr auto auto auto;
	grid-gap: 5px;
	overflow: auto;
}
#git-menu-commit > input.input4 {
    max-width: none;
    margin: 3px;
}
#git-menu-branch{
	margin:8px;
}
#git-menu-close-button{
	margin:14px;
	margin-left:auto;
}
#git-menu-bottom{
	display: grid;
	grid-template-columns: 5fr 1fr;
}
.round-button{
	border-radius: 100%!important;
	width: 45px!important;
	height: 45px!important;
	padding: 10px!important;
}
</style>
`
	}) 
	//TODO To fix Graviton "ed.execute is not a function" error, probably will be fixed in Graviton eventually, so eventually remove this 
	editors.find(item=>item.id === "git_menu_editor").execute = ()=>{}
	var menu = new Vue({
		el: '#git_menu_editor .vue-content',
		template:
`
<div id="git-menu-vue-content">
	<select id="git-menu-branch" v-model="currentBranch" @change="changeBranch($event)">
		<option v-for="branch in branches" :key="branch">{{branch}}</option>
	</select>
	<div id="git-menu-unstaged" class="git-menu-staging">
		<h3> Unstaged <button @click="stageAll()" class="button1 round-button" style="float:right"><svg viewBox="0 0 24 24"> <path d="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z"/> </svg></button></h3>
		<p :key="file.path" v-for="file in unstaged" @click="stage(file.path)">{{file.path}} - {{file.working_dir}}</p>
	</div>
	<div id="git-menu-staged" class="git-menu-staging">
		<h3> Staged  <button @click="unstageAll()" class="button1 round-button" style="float:right"><svg viewBox="0 0 24 24"> <path d="M2,16H10V14H2M12,14V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z"/> </svg></button></h3>
		<p :key="file.path" v-for="file in staged" @click="unstage(file.path)">{{file.path}} - {{file.index}}</p>
	</div>
	<div id="git-menu-bottom">
		<div id="git-menu-commit">
			<input class="input4" placeHolder="Commit message" v-model="commitMessage"></input>
			<button @click="commit()" class="button1 round-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M17,12C17,14.42 15.28,16.44 13,16.9V21H11V16.9C8.72,16.44 7,14.42 7,12C7,9.58 8.72,7.56 11,7.1V3H13V7.1C15.28,7.56 17,9.58 17,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /> </svg></button>
			<button @click="openPush()" class="button1 round-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" /> </svg></button>
			<button @click="openPull()" class="button1 round-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" /> </svg></button>
		</div>
		<button @click="closeMenu()" class="button1 round-button" id="git-menu-close-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /> </svg></button>
	</div>
</div>
`
		,data: {
			status:null,
			commitMessage:"",
			currentBranch:"",
			branches:[]
		},
		async beforeMount(){
			await this.updateStatus()
			document.addEventListener("loaded_project",async(e)=>{
				await this.updateStatus()
			})
		},
		methods:{
			async updateStatus(){
				let git = simpleGit(graviton.getCurrentDirectory());
				this.status = await git.status();
				console.log(this.status)
				graviton.gitPlusPlus.updateControlStatus()
				let branches = await git.branchLocal()
				this.branches = branches.all
				this.currentBranch = branches.all.find(branch=>branch===branches.current)
			},
			openPush(){
				graviton.gitPlusPlus.openPush()
			},
			openPull(){
				graviton.gitPlusPlus.openPull()
			},
			async stageAll(){
				let git = simpleGit(graviton.getCurrentDirectory());
				console.log(await git.add('./*'));
				await this.updateStatus()
			},
			async stage(file){
				let git = simpleGit(graviton.getCurrentDirectory());
				console.log(await git.add(file));
				await this.updateStatus()
			},
			async unstageAll(){
				let git = simpleGit(graviton.getCurrentDirectory());
				console.log(await git.reset(['./*']));
				await this.updateStatus()
			},
			async unstage(file){
				let git = simpleGit(graviton.getCurrentDirectory());
				console.log(await git.reset([file]));
				await this.updateStatus()
			},
			async commit(){
				let git = simpleGit(graviton.getCurrentDirectory());
				console.log(await git.commit(this.commitMessage))
				await this.updateStatus()
				this.commitMessage = ""
			},
			async changeBranch({target:{value}}){
				let git = simpleGit(graviton.getCurrentDirectory());
				try {
					await git.checkout(value)
				}catch(err){
					console.log(err)
					new Notification({title:"Error changing branch:",content:err})
				}
				await this.updateStatus()
			},
			closeMenu(){
				graviton.gitPlusPlus.closeMenu()
			}
		},
		computed:{
			staged(){
				return this.status ? this.status.files.filter(file=>file.working_dir===" ") : []
			},
			unstaged(){
				return this.status ? this.status.files.filter(file=>file.working_dir!==" ") : []
			}
		}
	})
	//puffin.render(Menu,document.getElementById("git_menu_editor"))
}

graviton.gitPlusPlus.isMenuOpen = false

graviton.gitPlusPlus.openMenu = openMenu

graviton.gitPlusPlus.closeMenu = ()=>{
	closeTab("git_menufree")
	if(editor_screens.length > 1){
		screens.remove(graviton.gitPlusPlus.screenId)
	}
	//graviton.gitPlusPlus.isMenuOpen = false
}

graviton.gitPlusPlus.toggleMenu = ()=>{
	if (tabs.findIndex(tab=>tab.id==="git_menufree") > -1){
		graviton.gitPlusPlus.closeMenu()
	}else{
		graviton.gitPlusPlus.openMenu()
	}
}

module.exports = openMenu
