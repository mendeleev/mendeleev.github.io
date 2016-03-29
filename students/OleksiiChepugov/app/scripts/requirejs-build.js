({
    baseUrl: "./",
	mainConfigFile: './requirejs-config.js',

	generateSourceMaps: true,
	preserveLicenseComments:false,
	optimize: "uglify2",
	useStrict: true,

	//appDir: "./scripts",
    //dir: "./build",
    //paths: {
    // 	jquery: "../lib/jquery/dist/jquery.min",
   	//},
    //wrapShim: true,

    //modules: [
    //  {
    //    name: "modules/main",
    //    exclude: ["jquery"]
    //  }
    //],

	name: "requirejs-config",
	out: "main.min.js"
})