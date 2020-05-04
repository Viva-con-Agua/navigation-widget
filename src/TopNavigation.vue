<template>
    <div id="top-navigation" class="navbar navbar-vca navbar-default vca-shadow"> <!-- navbar-default -->
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <img src="/dispenser/images/drop_small.png"/>
                    <div>
                        <span class="bold">header.applicationName</span>
                        <span>header.organizationName</span>
                    </div>
                </a>
                <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                    <span class="sr-only">nav.labels.screenreader.toggle</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse" id="navbar-main">
                <ul class="nav navbar-nav navbar-right">
                    <MenuEntry v-for="entry in entries" :key="entry.id" :entry="entry" type="button" :layer="0" :roles="currentUserRoles" />
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
        addChild: function () {
            this.entrys.entrys.push({
                name: 'new stuff'
            })
        },
        getRoles: function(user) {
            var roles = user.roles.map((role) => role.role)
            this.currentUserRoles = roles.concat(
                user.profiles.reduce((supporterRoles, profile) => supporterRoles.concat(profile.supporter.roles), [])
            )
        },
        getNavigation: function () {
            axios.get('http://localhost/api/v1/navigation/default').then(r => {
                        this.entries = r.data.entries
                    }).catch(e => {
                        this.errors.push(e)
                    })
                
        },
        getEntries: function () {
            return this.entries.filter((e) => Object.prototype.hasOwnProperty.call(e, 'hasAccess') && e.hasAccess)
        },
        hasAccess: function (entry) {
            function compare(roleUser, roleRoute) {
                function checkCrewName () {
                    return (!Object.prototype.hasOwnProperty.call(roleRoute, "crewNames") || (Object.prototype.hasOwnProperty.call(roleUser, "crew") && roleRoute.crewNames.some((crewName) => crewName === roleUser.crew.name)))
                }
                function checkPillar () {
                    return (!Object.prototype.hasOwnProperty.call(roleRoute, "pillars") || (Object.prototype.hasOwnProperty.call(roleUser, "pillar") && roleRoute.pillars.some((pillar) => pillar === roleUser.pillar.pillar)))
                }
                return ((typeof roleUser === "string") && roleUser === roleRoute.role && !Object.prototype.hasOwnProperty.call(roleRoute, "crewNames") && !Object.prototype.hasOwnProperty.call(roleRoute, "pillars")) ||
                    ((typeof roleUser === "object") && roleUser.name === roleRoute.role && checkCrewName() && checkPillar())
            }
            return !Object.prototype.hasOwnProperty.call(entry, 'permission') || entry.permission.reduce(
                (access, roleRoute) => access || this.currentUserRoles.reduce((roleAccess, roleUser) => roleAccess || compare(roleUser, roleRoute), false),
                false
            )
        },
        calcAccess: function (entries) {
            var that = this
            return entries.map((entry) => {
                entry['hasAccess'] = that.hasAccess(entry)
                if(Object.prototype.hasOwnProperty.call(entry, "entrys")) {
                    entry.entrys = that.calcAccess(entry.entrys)
                }
                return entry
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
