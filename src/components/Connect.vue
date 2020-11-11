<template>
    <v-form
            @submit.prevent="onSubmit"
    >
        <v-text-field
                label="Name"
                v-model="name"
        />
        <v-btn type="submit">Connect</v-btn>
    </v-form>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Connection from "@/lib/Connection";

    @Component({})
    export default class Connect extends Vue {
        @Prop({default: () => "wss://privacyapi.bartussek.myds.me"})
        address!: string;

        name: string = '';

        async onSubmit() {
            const connection = await Connection.connect(this.address, this.name);

            if (connection) {
                this.$emit('connected', connection);
            }
        }
    }
</script>
