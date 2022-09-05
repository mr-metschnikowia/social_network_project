(function () {
    const db_info = {
        username: 'KuriousKoala',
        password: 'Castle',
        cluster: 'cluster0.jqehjkd',
        database: 'social_network_project'
    };

    const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;
}());

// MongoDB Atlas connection details