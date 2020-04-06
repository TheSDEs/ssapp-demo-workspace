const args = process.argv;

if(args.length === 2){
	require("./install");
	process.exit(0);
}

args.splice(0, 2);

if (args.length > 1) {
	console.log("args", ...args);
	throw new Error("Expected to receive maximum 1 param: folderName that needs to be updated");
}

const folderName = args[0];

const octopus = require("./index.js");
let config = octopus.readConfig();

let configPart;
for (let i = 0; i < config.dependencies.length; i++) {
	let dep = config.dependencies[i];
	if (dep.name === folderName) {
		configPart = dep;
	}
}

if (typeof configPart === "undefined") {
	throw new Error(`No config found for target "${folderName}"`);
}

octopus.runConfig(octopus.createBasicConfig(configPart), function (err, result) {
	if (err) {
		throw err;
	}

	console.log("Update finished!");
});