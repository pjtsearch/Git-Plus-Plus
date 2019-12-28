const Vue = require("vue/dist/vue.js")
const simpleGit = require('simple-git/promise');

const openMenu = ()=>{
	screens.add()
	var tab = new Tab({
		id:"git_menu",
		type:"free",
		name:'Git Menu',
		data:`
		{{message}}
		`
	}) 
	var app = new Vue({
		el: '#git_menu_editor',
		data: {
			message: 'Hello Vue!'
		}
	})
	//puffin.render(Menu,document.getElementById("git_menu_editor"))
}

module.exports = openMenu
