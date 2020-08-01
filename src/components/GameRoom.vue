<template>
    <div>
        <v-card>
            <v-card-title>
                {{ connection.name }} - {{ gameProp.currentQuestion }} - {{ stateName }}
            </v-card-title>
            <v-card-text>
                {{ gameProp.players.length }} Players
                <v-list>
                    <v-list-item
                            v-for="player in gameProp.players"
                            :key="player"

                            :class="playerClass(player)"
                    >
                        {{ player }}
                    </v-list-item>
                </v-list>

                <v-form
                        v-if="gameProp.playerState !== PlayerState.Waiting"
                        @submit.prevent="onAnswer"
                >
                    <v-radio-group v-model="answer">
                        <v-radio
                                v-for="it in answerItems"
                                :key="it.value"
                                :label="it.text"
                                :value="it.value"
                        />
                    </v-radio-group>
                    <v-text-field
                            label="Guess"

                            v-model="guess"
                    />
                    <v-btn type="submit">Answer</v-btn>
                </v-form>

            </v-card-text>
        </v-card>

        <v-divider class="pa-5"/>

        <RoundDisplay
                v-for="round in gameProp.rounds"
                :key="round.question"

                :value="round"
        />

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Connection from "@/lib/Connection";
    import Game, {PlayerState} from "@/lib/Game";
    import RoundDisplay from "@/components/RoundDisplay.vue";

    @Component({
        components: {RoundDisplay}
    })
    export default class Connect extends Vue {
        @Prop({})
        connection!: Connection;

        game!: Game;
        gameRefreshCounter = 0;

        answer: boolean | null = null;
        guess = '';

        PlayerState = PlayerState;

        created() {
            this.game = new Game(this.connection);
            this.game.refreshCallback = () => {
                this.gameRefreshCounter += 1;
            }
        }

        get gameProp() {
            const _ = this.gameRefreshCounter;
            return this.game;
        }

        get answerItems() {
            return [
                {
                    text: 'Yes',
                    value: true,
                },
                {
                    text: 'No',
                    value: false,
                },
            ]
        }

        onAnswer() {
            if (this.answer !== null && this.guess) {
                this.game.answer(this.answer);
                this.game.guess(this.guess);

                this.answer = null;
                this.guess = '';
            }
        }

        get stateName() {
            switch (this.gameProp.playerState) {
                case PlayerState.Answer:
                    return 'Answer'
                case PlayerState.Guess:
                    return 'Guess'
                case PlayerState.Waiting:
                    return 'Waiting'
            }
        }

        playerClass(player: string) {
            if (this.gameProp.has_answered.includes(player)) {
                return 'green';
            } else {
                return '';
            }
        }
    }
</script>
