import {updateControlStatus,init as initControl} from "./control"
import initDropdown from "./dropdown"
const semver = require('semver')


const gitPlusPlus = new Plugin({
  name:'Git++'
})
graviton.gitPlusPlus = gitPlusPlus

if(!semver.satisfies(GravitonInfo.version,">=1.3.0")) {
  console.warn("Git++ doesn't work on your current version, you need at least 1.3.0")
  new Notification({
    title:"Git++",
    content:"You need Graviton v1.3.0+"
	})
}

initControl()
initDropdown()