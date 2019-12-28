const Vue = require("vue/dist/vue.js")
const simpleGit = require('simple-git/promise');

const openMenu = ()=>{
	screens.add()
	var tab = new Tab({
		id:"git_menu",
		type:"free",
		name:'Git Menu',
		data:`<div class="vue-content"></div>`
	}) 
	var menu = new Vue({
		el: '#git_menu_editor .vue-content',
		template:
`
<div>
	<button style="margin:10px" @click="openPush()" class="button1">Push</button>
	<button style="margin:10px" @click="openPull()" class="button1">Pull</button>

	<span class="divider-2"></span>

	<div id="git-menu-add" style="margin:10px">
		<h3> Unstaged <button @click="stageAll()" class="button1">Stage All</button></h3>
		<p :key="file.path" v-for="file in unstaged">{{file.path}} - {{file.working_dir}}</p>
		<h3> Staged  <button @click="unstageAll()" class="button1">Unstage All</button></h3>
		<p :key="file.path" v-for="file in staged">{{file.path}} - {{file.index}}</p>
	</div>

	<span class="divider-2"></span>

	<div id="git-menu-commit" style="margin:10px">
		<input class="input4" placeHolder="Commit message" v-model="commitMessage"></input>
		<button style="margin:10px" @click="commit()" class="button1">Commit</button>
	</div>
</div>
`
		,data: {
			status:null,
			commitMessage:""
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
			async unstageAll(){
				let git = simpleGit(graviton.getCurrentDirectory());
				console.log(await git.reset(['./*']));
				await this.updateStatus()
			},
			async commit(){
				let git = simpleGit(graviton.getCurrentDirectory());
				console.log(await git.commit(this.commitMessage))
				await this.updateStatus()
				this.commitMessage = ""
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

module.exports = openMenu
