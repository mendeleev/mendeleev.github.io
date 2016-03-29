({
    baseUrl: "./",
    appDir: "./scripts",
    dir: "./build",
    paths: {
        jquery: "../lib/jquery/dist/jquery.min"
    },
    mainConfigFile: 'scripts/app.js',
    modules: [{
        name: "modules/main",
        exclude: ["jquery"]
    }]
})