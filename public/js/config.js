app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'X-Requested-With';
});