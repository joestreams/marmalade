const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .react()
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);

if (mix.inProduction()) {
    mix.version();
} else {
    mix.disableSuccessNotifications().browserSync({
        notify: false,
        open: false,
        proxy: "localhost",
    });
}


