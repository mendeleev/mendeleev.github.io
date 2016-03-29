({
    baseUrl: "./",
    // generateSourceMaps: true,
    // preserveLicenseComments:false,
    appDir: "./scripts",
    dir: "./build",
    paths: {
        jquery: "../lib/jquery/dist/jquery.min",

    },
    wrapShim: true,
    mainConfigFile: 'scripts/main.js',
    modules: [
        {
            name: "./main",
            exclude: ["jquery"]
        }
    ]
})