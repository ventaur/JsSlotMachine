// Karma configuration
// Generated on Thu Jun 16 2016 21:06:56 GMT-0400 (Eastern Daylight Time)

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jspm', 'jasmine'],

        jspm: {
            config: 'src/config.js',
            loadFiles: ['test/**/*.spec.js'],
            serveFiles: ['src/**/*.js']
        },

        proxies: {
            '/src/': '/base/src/',
            '/test/': '/base/test/',
            '/jspm_packages/': '/src/jspm_packages/'
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
}
