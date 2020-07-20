<template>
    <div id="top-navigation" class="navbar navbar-vca navbar-default vca-shadow"> <!-- navbar-default -->
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <img :src="require(`@/assets/drop_small.png`)"/>
                    <div>
                        <span class="bold"> {{ name }}</span>
                    </div>
                </a>
            </div>
            <div class="navbar-collapse collapse" id="navbar-main">
                <ul class="nav navbar-nav navbar-right">
                    <MenuEntry v-for="entry in entries" :key="entry.id" :entry="entry" type="button" :layer="0" />
                </ul>
                <ul v-if="errors && errors.length">
                    <li v-for="error of errors" :key="error.id">
                        {{error.message}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import MenuEntry from './MenuEntry'

export default {
    name: 'TopNavigation',
    components: { MenuEntry },
    props: {
        name: {
            type: String,
            default: 'Nav'
        },
        nav: {
            type: String,
            default: 'test2'
        }
    },
    data () {
        return {
            'entries': [],
            'errors': [],
            'location': '',
            'currentUserRoles': [],
            'locale': navigator.language
        }
    },
    created () {
        var that = this;
        window.onhashchange = function() {
            that.getNavigation()
        }
    },
    methods: {
        getNavigation: function () {
            axios.get( process.env.VUE_APP_BACKEND_URL + '/v1/navigation/' + this.nav ).then(r => {
                        this.entries = r.data.entries
                    }).catch(e => {
                        this.errors.push(e)
                    })
                
        }
    },
    mounted () {
        this.getNavigation()
    }
}
</script>

<style lang="less">
@import "./assets/general.less";
@import "./assets/responsive.less";
@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";

.navbar {
    min-height: 64px;
}

.navbar-vca {
    .colorProfilePrimary();
    border-radius: 0;
    border: 0;
    /*top: 0;*/
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.5em 0;
    margin-bottom: 2em;

    .navbar-header {
        .navbar-brand {
            color: #colors[secundary];
        }

        .navbar-toggle {
            border-color: #colors[secundary];

            &:focus, &:hover {
                background-color: lighten(#colors[primary], 20%);
            }

            .icon-bar {
                background-color: #colors[secundary];
            }

        }
    }

    .navbar-collapse, .navbar-form {
        border: 0;

        .nav {
            @media @tablet-down {
                margin-top: 0px;
                margin-bottom: 0px;
                padding-top: 0.5em;
            }
        }
    }

    .navbar-brand {
        margin: 0 0.5em 0 0;
        padding: 0px;
        display: flex;
        flex-direction: row;

        @media @tablet-down {
            margin-left: 0.5em;
        }

        div {
            display: flex;
            flex-direction: column;
            justify-content: center;

            span.bold {
                font-size: 1.6em;
            }
        }

        img {
            margin-right: 0.5em;
            font-size: 0.6em;
        }
    }
}
</style>
