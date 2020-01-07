import { LitElement, html } from 'lit-element';
const simpleGit = require('simple-git/promise');
import openPush from "./push"
import openPull from "./pull"
import {updateControlStatus} from "./control"
import addBranch from "./addBranch"
const {click:openAddBranch} = addBranch

let screenId;
// Extend the LitElement base class
class GitPlusPlusMenu extends LitElement {
	static get properties() {
    return {
      status: { type: Object },
      commitMessage: { type: String },
      currentBranch: { type: String },
      branches: { type: Array },
      staged: { type: Array },
			unstaged:{ type:Array }
    };
  }
	async connectedCallback() {
		super.connectedCallback()
		this.commitMessage = ""
		await this.updateStatus()
		document.addEventListener("loaded_project",async(e)=>{
			await this.updateStatus()
		})
	}

	render(){
		
		return html`
<div id="git-menu-vue-content">
	<div id="git-menu-branch-container">
		<select id="git-menu-branch" @change="${this.changeBranch}">
			${this.branches.map(branch=>html`
				<option ?selected=${this.currentBranch === branch} key="${branch}">${branch}</option>
			`)}
		</select>
		<button @click="${this.openAddBranch}" class="button1 round-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /> </svg></button>
	</div>
	<div id="git-menu-unstaged" class="git-menu-staging">
		<h3> Unstaged <button @click="${this.stageAll}" class="button1 round-button" style="float:right"><svg viewBox="0 0 24 24"> <path d="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z"/> </svg></button></h3>
		${this.unstaged.map(file=>html`
			<p key="${file.path}" @click="${()=>this.stage(file.path)}">${file.path} - ${file.working_dir}</p>
		`)}
	</div>
	<div id="git-menu-staged" class="git-menu-staging">
		<h3> Staged  <button @click="${this.unstageAll}" class="button1 round-button" style="float:right"><svg viewBox="0 0 24 24"> <path d="M2,16H10V14H2M12,14V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z"/> </svg></button></h3>
		${this.staged.map(file=>html`
			<p key="${file.path}" @click="${()=>this.unstage(file.path)}">${file.path} - ${file.index}</p>
		`)}
	</div>
	<div id="git-menu-bottom">
		<div id="git-menu-commit">
			<input class="input4" placeHolder="Commit message" @change="${e=> this.commitMessage = e.target.value}" .value="${this.commitMessage}"></input>
			<button @click="${this.commit}" class="button1 round-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M17,12C17,14.42 15.28,16.44 13,16.9V21H11V16.9C8.72,16.44 7,14.42 7,12C7,9.58 8.72,7.56 11,7.1V3H13V7.1C15.28,7.56 17,9.58 17,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /> </svg></button>
			<button @click="${this.openPush}" class="button1 round-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" /> </svg></button>
			<button @click="${this.openPull}" class="button1 round-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" /> </svg></button>
		</div>
		<button @click="${this.closeMenu}" class="button1 round-button" id="git-menu-close-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /> </svg></button>
	</div>
</div>
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
#git-menu-branch-container{
	display: grid;
	grid-template-columns: 1fr auto;
}
</style>
		`;
	}
	
	createRenderRoot() {
		return this;
	}
	
	updateStaged(){
		this.staged = this.status ? this.status.files.filter(file=>file.working_dir===" ") : []
	}
	updateUnstaged(){
		this.unstaged = this.status ? this.status.files.filter(file=>file.working_dir!==" ") : []
	}
	
	async updateStatus(){
		let git = simpleGit(graviton.getCurrentDirectory());
		this.status = await git.status();
		console.log(this.status)
		updateControlStatus()
		let branches = await git.branchLocal()
		this.branches = branches.all
		this.currentBranch = branches.all.find(branch=>branch===branches.current)
		this.updateStaged()
		this.updateUnstaged()
	}
	openPush(){
		openPush()
	}
	openPull(){
		openPull()
	}
	openAddBranch(){
		openAddBranch()
	}
	async stageAll(){
		let git = simpleGit(graviton.getCurrentDirectory());
		try{
			console.log(await git.add('./*'));
		}catch(err){
			console.log(err)
			new Notification({title:"Error staging:",content:err})
		}
		await this.updateStatus()
	}
	async stage(file){
		let git = simpleGit(graviton.getCurrentDirectory());
		try{
			console.log(await git.add(file));
		}catch(err){
			console.log(err)
			new Notification({title:"Error staging:",content:err})
		}
		await this.updateStatus()
	}
	async unstageAll(){
		let git = simpleGit(graviton.getCurrentDirectory());
		try{
			console.log(await git.reset(['./*']));
		}catch(err){
			console.log(err)
			new Notification({title:"Error unstaging:",content:err})
		}
		await this.updateStatus()
	}
	async unstage(file){
		let git = simpleGit(graviton.getCurrentDirectory());
		try{
			console.log(await git.reset([file]));
		}catch(err){
			console.log(err)
			new Notification({title:"Error unstaging:",content:err})
		}
		await this.updateStatus()
	}
	async commit(){
		let git = simpleGit(graviton.getCurrentDirectory());
		try{
			console.log(await git.commit(this.commitMessage))
			new Notification({title:"Commited successfully",content:""})
		}catch(err){
			console.log(err)
			new Notification({title:"Error commiting:",content:err})
		}
		await this.updateStatus()
		this.commitMessage = ""
	}
	async changeBranch({target:{value}}){
		let git = simpleGit(graviton.getCurrentDirectory());
		try {
			await git.checkout(value)
			new Notification({title:"Branch changed",content:`Now in ${value}`})
		}catch(err){
			console.log(err)
			new Notification({title:"Error changing branch:",content:err})
		}
		await this.updateStatus()
	}
	closeMenu(){
		closeMenu()
	}
}
// Register the new element with the browser.
customElements.define('git-plus-plus-menu', GitPlusPlusMenu);

export const openMenu = ()=>{
	//graviton.gitPlusPlus.isMenuOpen = true
	screens.add()
	screenId = editor_screens[editor_screens.length - 1].id
	var tab = new Tab({
		id:"git_menu",
		type:"free",
		name:'Git Menu',
		data:
`
<git-plus-plus-menu></git-plus-plus-menu>

`
	}) 
	//TODO To fix Graviton "ed.execute is not a function" error, probably will be fixed in Graviton eventually, so eventually remove this 
	editors.find(item=>item.id === "git_menu_editor").execute = ()=>{}
	//puffin.render(Menu,document.getElementById("git_menu_editor"))
}

//graviton.gitPlusPlus.isMenuOpen = false

export const closeMenu = ()=>{
	closeTab("git_menufree")
	if(editor_screens.length > 1){
		screens.remove(screenId)
	}
	//graviton.gitPlusPlus.isMenuOpen = false
}

export const toggleMenu = ()=>{
	if (tabs.findIndex(tab=>tab.id==="git_menufree") > -1){
		closeMenu()
	}else{
		openMenu()
	}
}
