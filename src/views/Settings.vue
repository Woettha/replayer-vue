<template>
    <div class="container">
        <h1 class="title">Settings</h1>

        <div class="box">
            <h3 class="subtitle">General</h3>

            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input
                            type="checkbox"
                            :checked="getSettings.preventScreenTimeout"
                            @change="preventScreenTimeoutChanged"
                        />
                        Always prevent screen timeout while any track is in use
                        (is expanded and was played)
                        <span class="has-opacity-half is-size-7">
                            (Uses more energy)</span
                        >
                    </label>
                </div>
            </div>
        </div>

        <div class="box">
            <h3 class="subtitle">Input</h3>

            <div class="field">
                <label class="label"
                    >Keyboard shortcut timeout
                    <span class="has-opacity-half is-size-7">
                        (For display and handling of playback control)</span
                    >
                </label>
                <div class="control">
                    <div class="select">
                        <select
                            v-model.number="
                                localSettings.keyboardShortcutTimeout
                            "
                            @change="keyboardShortcutTimeoutChanged"
                            class=""
                        >
                            <option v-bind:value="500">
                                Fast (500 milliseconds)
                            </option>
                            <option v-bind:value="1000">
                                Medium (1 second)
                            </option>
                            <option v-bind:value="2000">
                                Slow (2 seconds)
                            </option>
                            <option v-bind:value="5000">
                                Molto Grave (5 seconds)
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="box">
            <h3 class="subtitle">Audio</h3>

            <!-- Fading durations, with two columns -->
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label"
                            >Fade-in duration
                            <span class="has-opacity-half is-size-7">
                                (For play operations)</span
                            >
                        </label>
                        <div class="control">
                            <div class="select">
                                <select
                                    v-model.number="
                                        localSettings.fadeInDuration
                                    "
                                    @change="fadeInDurationChanged"
                                    class=""
                                >
                                    <option v-bind:value="0">no fading</option>
                                    <option v-bind:value="20">
                                        20 milliseconds
                                    </option>
                                    <option v-bind:value="50">
                                        50 milliseconds
                                    </option>
                                    <option v-bind:value="100">
                                        100 milliseconds
                                    </option>
                                    <option v-bind:value="200">
                                        200 milliseconds
                                    </option>
                                    <option v-bind:value="500">
                                        500 milliseconds
                                    </option>
                                    <option v-bind:value="1000">
                                        1 seconds
                                    </option>
                                    <option v-bind:value="2000">
                                        2 seconds
                                    </option>
                                    <option v-bind:value="5000">
                                        5 seconds
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label"
                            >Fade-out duration
                            <span class="has-opacity-half is-size-7">
                                (For pause operations)</span
                            >
                        </label>
                        <div class="control">
                            <div class="select">
                                <select
                                    v-model.number="
                                        localSettings.fadeOutDuration
                                    "
                                    @change="fadeOutDurationChanged"
                                    class=""
                                >
                                    <option v-bind:value="0">no fading</option>
                                    <option v-bind:value="20">
                                        20 milliseconds
                                    </option>
                                    <option v-bind:value="50">
                                        50 milliseconds
                                    </option>
                                    <option v-bind:value="100">
                                        100 milliseconds
                                    </option>
                                    <option v-bind:value="200">
                                        200 milliseconds
                                    </option>
                                    <option v-bind:value="500">
                                        500 milliseconds
                                    </option>
                                    <option v-bind:value="1000">
                                        1 seconds
                                    </option>
                                    <option v-bind:value="2000">
                                        2 seconds
                                    </option>
                                    <option v-bind:value="5000">
                                        5 seconds
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input
                            type="checkbox"
                            :checked="getSettings.applyFadeInOffset"
                            @change="applyFadeInOffsetChanged"
                        />
                        Apply an offset before fade-in operations
                        <span class="has-opacity-half is-size-7">
                            (The offset compensates for the fade-in
                            duration)</span
                        >
                    </label>
                </div>
            </div>
        </div>

        <div class="box">
            <h3 class="subtitle">Advanced</h3>
            <div class="field">
                <label class="label"
                    >Reset all data and settings
                    <span class="has-opacity-half is-size-7">
                        (Restores the initial application state)</span
                    >
                </label>
                <div class="control">
                    <button class="button" @click="reset()">Reset</button>
                </div>
            </div>
        </div>

        <!-- Experimental settings -->
        <hr />

        <div class="box">
            <h3 class="subtitle">Experimental</h3>
            <div class="field">
                <label class="label"
                    >Experimental settings
                    <span class="has-opacity-half is-size-7">
                        (Here be dragons (use at your own risk))</span
                    >
                </label>
            </div>
            <div class="is-experimental">
                <div class="field">
                    <div class="control">
                        <label class="checkbox">
                            <input
                                type="checkbox"
                                :checked="
                                    getSettings.displayExperimentalContent
                                "
                                @change="displayExperimentalContentChanged"
                            />
                            Display Experimental features
                            <span class="has-opacity-half is-size-7">
                                (Allows to test upcoming, experimental
                                features)</span
                            >
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MutationTypes } from '@/store/mutation-types';
import { settingsMixin } from '@/mixins/settingsMixin';
import { Settings } from '@/store/state-types';
import { ActionTypes } from '@/store/action-types';
import { confirm } from '@/code/ui/dialogs';

/** A Settings view
 */
export default defineComponent({
    name: 'Settings',
    mixins: [settingsMixin],
    components: {},
    data() {
        return {
            localSettings: undefined as unknown as Settings,
        };
    },
    created() {
        this.localSettings = this.getSettings;
    },
    methods: {
        reset() {
            console.debug('Settings::reset');
            confirm(
                'Reset',
                `Do you want to reset the application to the initial settings? Already downloaded compilations remain available on the device.`,
            ).then((ok) => {
                if (ok) {
                    this.$store
                        .dispatch(ActionTypes.RESET_APPLICATION)
                        .then(() => {
                            this.$router.push('/');
                        });
                }
            });
        },
        preventScreenTimeoutChanged(event: Event) {
            const checked = (event.target as HTMLInputElement)?.checked;
            const settings = this.getSettings;

            settings.preventScreenTimeout = checked;

            this.$store.commit(MutationTypes.UPDATE_SETTINGS, settings);
        },

        applyFadeInOffsetChanged(event: Event) {
            const checked = (event.target as HTMLInputElement)?.checked;
            const settings = this.getSettings;

            settings.applyFadeInOffset = checked;

            this.$store.commit(MutationTypes.UPDATE_SETTINGS, settings);
        },
        fadeInDurationChanged(event: Event) {
            console.debug('event', event);
            this.$store.commit(MutationTypes.UPDATE_SETTINGS, this.settings);
        },
        fadeOutDurationChanged(event: Event) {
            console.debug('event', event);
            this.$store.commit(MutationTypes.UPDATE_SETTINGS, this.settings);
        },

        keyboardShortcutTimeoutChanged() {
            console.debug('settings', this.settings);
            this.$store.commit(MutationTypes.UPDATE_SETTINGS, this.settings);
        },

        displayExperimentalContentChanged(event: Event) {
            const checked = (event.target as HTMLInputElement)?.checked;
            const settings = this.getSettings;

            settings.displayExperimentalContent = checked;
            this.$store.commit(MutationTypes.UPDATE_SETTINGS, this.settings);
        },
    },
});
</script>
