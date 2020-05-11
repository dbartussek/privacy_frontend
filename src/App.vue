<template>
    <v-app>
        <v-content>
            <v-container>
                <Connect
                        v-if="!connection"

                        @connected="onConnected"
                />
                <GameRoom
                        v-else
                        :connection="connection"
                />
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Connect from "@/components/Connect.vue";
    import Connection from "@/lib/Connection";
    import GameRoom from "@/components/GameRoom.vue";
    import RoundDisplay from "@/components/RoundDisplay.vue";

    @Component({
        components: {
            RoundDisplay,
            GameRoom,
            Connect
        },
    })
    export default class App extends Vue {

        connection: Connection | null = null;

        onConnected(connection: Connection) {
            this.connection = connection;
            console.log(this.connection);
        }
    }
</script>
