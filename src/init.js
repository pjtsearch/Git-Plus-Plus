const simpleGit = require('simple-git/promise');

export default {
	click:async()=>{
		const git = simpleGit(graviton.getCurrentDirectory());

		const init = await git.init();
		
		new Notification({
			title:'Git init successful',
			content:'',
		});
	}
}
