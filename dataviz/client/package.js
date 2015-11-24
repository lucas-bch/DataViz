/**
 * Created by Kevin on 11/11/2015.
 */


Package.describe({
    summary: 'Simple HTML5 Charts using the <canvas> tag'
});

Package.on_use(function (api) {
    api.add_files([
        'lib/chart.min.js'
    ], 'client');
    api.export('Chart');
});