export default {
    data() {
        return {
            currentRoute: '',
            currentView: 'hub',

            migrating: false,
            migrationMessage: '',

            sitesNav: [],
        }
    },
    computed: {
        currentProps() {
            let route = (this.currentRoute || '/');
            let chunks = [];

            if (route != '/') {
                chunks = route.split('/');
            } else {
                chunks = [ 'hub' ];
            }

            switch (chunks[0] || '') {
                case 'hub':
                    this.currentView = 'hub';
                    break;

                case 'migration':
                    this.currentView = 'migration';
                    break;
            }

            switch (this.currentView) {
                case 'hub':
                    return {
                        migrationMessage: this.migrationMessage,
                    };

                case 'migration':
                    return {
                        migrationMessage: this.migrationMessage,
                    };
            }

            return {};
        },
    },
    methods: {
        init() {

            // main listener that lets us have nice looking urls
            window.addEventListener('click', (e) => {
                if (e.target && e.target.closest('a')) {
                    const anchor = e.target.closest('a');
                    if ('pass' in anchor.dataset && anchor.dataset.pass == 1) {
                        return;
                    }

                    if (e.metaKey || e.ctrlKey) {
                        return;
                    }

                    e.preventDefault();

                    const url = anchor.getAttribute('href');
                    history.pushState({ page: url }, null, url);

                    const chips = window.location.pathname.split('/');
                    this.setCurrentRoute(chips.slice(1).join('/'));
                }
            });

            // listen on back button events
            window.addEventListener('popstate', (e) => {
                if (e.state) {
                    const chips = e.state.page.split('/');
                    this.setCurrentRoute(chips.slice(1).join('/'));
                }
            });
            const chips = window.location.pathname.split('/');
            history.pushState({ page: window.location.pathname }, null, window.location.pathname);
            this.setCurrentRoute(chips.slice(1).join('/'));
        },

        setCurrentRoute(route) {
            if (!route.length) {
                route = 'hub';
            }
            this.currentRoute = route;
        },

        setBootstrapData(bootstrap) {
            this.sitesNav = bootstrap.sitesNav;
        },

        migrateReporter() {
            if (this.migrating) {
                return;
            }

            this.migrating = true;

            const transferData = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                transferData[key] = localStorage.getItem(key);
            }

            if (window.opener) {
                window.opener.postMessage(
                    JSON.stringify(transferData),
                    'https://reporter.reportworm.com'
                );

                window.close();
            } else {
                this.migrationMessage = "Migration failed: No opener window detected.";
            }
        },
    },

    components: {
        'hub': {
            template: '#hub-template',
            props: [ 'migrationMessage' ],
        },

        'migration': {
            template: '#migration-template',
            props: [ 'migrationMessage' ],
            mounted: function() {
                this.$parent.migrateReporter();
            },
        }
    },
}
