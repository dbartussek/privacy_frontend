<template>
    <v-card>
        <v-card-title>
            {{ value.question }}
        </v-card-title>
        <v-card-text>
            <v-layout row wrap>
                <v-flex
                        class="round_text_field"
                >
                    <v-text-field
                            readonly
                            :value="value.yes"
                            label="Yes"
                    />
                </v-flex>
                <v-flex
                        class="round_text_field"
                >
                    <v-text-field
                            readonly
                            :value="value.no"
                            label="No"
                    />
                </v-flex>
            </v-layout>
            <v-data-table
                    disable-pagination
                    hide-default-footer
                    hide-default-header

                    :headers="headers"
                    :items="items"
            />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {RoundData} from "@/lib/RoundData";

    @Component({})
    export default class RoundDisplay extends Vue {
        @Prop({})
        value!: RoundData;

        get headers() {
            return [
                {
                    text: 'Player',
                    value: 'player',
                },
                {
                    text: 'Guess',
                    value: 'guess',
                }
            ]
        }
        get items() {
            return Object
                .keys(this.value.guesses)
                .map(player => ({
                    player,
                    guess: this.value.guesses[player]
            }));
        }
    }
</script>
