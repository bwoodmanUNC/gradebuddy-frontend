var bs = require("browser-sync").create();

bs.watch([
    "*",
    "styles/*",
    "scripts/*",
    "components/*"
]).on('change', bs.reload);

// .init starts the server
bs.init({
    injectChanges: true,
    server: {
        baseDir: "./",
        serveStaticOptions: {
            extensions: ['html']
        },
        watch: true
    }
});

// Now call methods on bs instead of the
// main browserSync module export
bs.reload();

// Call methods like reload
// browserSync.reload("core.css");