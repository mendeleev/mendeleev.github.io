({
    baseUrl: "./",
    appDir: "./scripts",
    dir: "./build",
    paths: {
        jquery: "../lib/jquery/dist/jquery.min"
    },
    modules: [{
        name: "modules/main",
        exclude: ["jquery"]
    }]
})