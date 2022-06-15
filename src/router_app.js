function getLifeHooks(name) {
    return {
        beforeCreate() {
            console.log('beforeCreate', name, arguments);
        },
        created() {
            console.log('created', name, arguments);
        },
        beforeMount() {
            console.log('beforeMount', name, arguments);
        },
        mounted() {
            console.log('mounted', name, arguments);
        },
        beforeUpdate() {
            console.log('beforeUpdate', name, arguments);
        },
        updated() {
            console.log('updated', name, arguments);
        },
        beforeDestroy() {
            console.log('beforeDestroy', name, arguments);
        },
        destroyed() {
            console.log('destroyed', name, arguments);
        }
    };
}

const componentA = {
    name: 'A',
    template: '<div>{{name}}</div>',
    data() {
        return {name: 'AAAA'};
    },
    ...getLifeHooks('AAAA'),
    beforeRouteEnter(to, from, next) {
        console.log(`beforeRouteEnter AAAA to:${to.path}, from:${from.path}`);
        next();
      },
      beforeRouteUpdate(to, from, next) {
        console.log(`beforeRouteUpdate AAAA to:${to.path}, from:${from.path}`);
        next();
      },
      beforeRouteLeave(to, from, next) {
        console.log(`beforeRouteLeave AAAA to:${to.path}, from:${from.path}`);
        next();
      }
};

const componentB = {
    name: 'B',
    template: '<div>{{name}}</div>',
    data() {
        return {name: 'BBBB'};
    },
    ...getLifeHooks('BBBB'),
    beforeRouteEnter(to, from, next) {
        console.log(`beforeRouteEnter BBBB to:${to.path}, from:${from.path}`);
        next();
      },
      beforeRouteUpdate(to, from, next) {
        console.log(`beforeRouteUpdate BBBB to:${to.path}, from:${from.path}`);
        next();
      },
      beforeRouteLeave(to, from, next) {
        console.log(`beforeRouteLeave BBBB to:${to.path}, from:${from.path}`);
        next();
      }
};

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/a/:id', component: componentA},
        {path: '/b/:id', component: componentB}
    ]
});

router.beforeEach((to, from, next) => {
    console.log(`%cbeforeEach to:${to.path}, from:${from.path}`, 'color: #00f');
    next();
});
router.beforeResolve((to, from, next) => {
    console.log(`%cbeforeResolve to:${to.path}, from:${from.path}`, 'color: #00f');
    next();
});
router.afterEach((to, from) => {
    console.log(`%cafterEach to:${to.path}, from:${from.path}`, 'color: #00f');
});

var app5 = new Vue({
    name: 'main',
    router,
    el: '#app-root',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    },
    ...getLifeHooks('MAIN'),
    template: `
        <div>
            <p>{{message}}</p>
            <button @click="reverseMessage">Click</button>
            <router-link to="/a/1">toA1</router-link>
            <router-link to="/a/2">toA2</router-link>
            <router-link to="/b/1">toB1</router-link>
            <router-link to="/b/2">toB2</router-link>
            <router-view></router-view>
        </div>
    `
})