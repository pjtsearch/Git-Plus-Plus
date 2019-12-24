
const gitPlusPlus = new Plugin({
  name:'Git++'
})
graviton.gitPlusPlus = gitPlusPlus

const status = require("./status")
const add = require("./add")
const init = require("./init")
const commit = require("./commit")
const push = require("./push")
const pull = require("./pull")
const addRemote = require("./addRemote")


const dropdown = new dropMenu({
  id:"git-plus-plus-dropdown"
});
dropdown.setList({
  "button": "Git++",
  "list":{
    "Status":status,
		"Add":add,
		"Init":init,
		"Commit":commit,
		"Push":push,
		"Add Remote":addRemote,
		"Pull":pull
  }
})


