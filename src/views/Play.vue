<template>
    <CompilationLoader />

    <!-- Handle and translate the keyboard shortcuts into Replayer events -->
    <!-- In playback view, do not require the CTRL modifier -->
    <!-- In edit view, the CTRL modifier helps disambiguate
         between other uses of the shortcut keys-->
    <CompilationKeyboardHandler :requireCtrlModifier="isEditMode" />

    <!-- Show a loading panel, similar to the edit view, but not in edit mode -->
    <Compilation
        v-if="hasCompilation"
        :compilation="compilation"
        :tracksDisplayMode="tracksDisplayMode"
    />

    <div v-else class="section pl-0 pr-0 block">
        <p class="has-text-centered">
            Replayer is a free, cue-based media player for rehearsals with
            playback music.
        </p>
    </div>
    <div
        class="section pt-6 pl-0 pr-0 block"
        v-show="isEditMode || !hasCompilation"
    >
        <!-- v-click-outside seems not to work well with v-if -->
        <!-- Additionally, v-show seems not to work properly when used directly on the MediaDropZone-Element, thus it's applied to an extra div -->
        <!-- Offer the demo only when no compilation/track is shown -->
        <MediaDropZone
            v-model:isExpanded="isMediaDropZoneExpanded"
            v-click-outside="clickedOutside"
            :offerDemo="!hasCompilation"
        />
    </div>
    <template v-if="isEditMode && hasAvailableMedia">
        <div class="has-text-centered block">
            <CollapsiblePanel>
                <template #caption>
                    <span>Available media</span>
                </template>

                <div class="block mt-5">
                    <MediaList></MediaList>
                </div>
            </CollapsiblePanel>
        </div>
    </template>
    <div class="section pl-0 pr-0 block" v-if="!hasCompilation">
        <div class="content box">
            <WelcomeText />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Compilation from '@/components/Compilation.vue';
import { ICompilation, TrackDisplayMode } from '@/store/compilation-types';
import MediaDropZone from '@/components/MediaDropZone.vue';
import WelcomeText from '@/components/WelcomeText.vue';
import CompilationLoader from '@/components/CompilationLoader.vue';
import CollapsiblePanel from '@/components/CollapsiblePanel.vue';
import MediaList from '@/components/MediaList.vue';
import CompilationKeyboardHandler from '@/components/CompilationKeyboardHandler.vue';
import { MediaUrl } from '@/store/state-types';

/** A view for playing an existing compilation */
export default defineComponent({
    name: 'Play',
    id: 'play-view',
    components: {
        Compilation,
        CompilationKeyboardHandler,
        MediaDropZone,
        CompilationLoader,
        WelcomeText,
        CollapsiblePanel,
        MediaList,
    },
    data() {
        return {
            /** Whether the media drop zone is displayed in the expanded state */
            isMediaDropZoneExpanded: false,
        };
    },
    beforeMount() {
        //Immediately apply the hasCompilation watch with the current state. (Emulates the "immediate watch" from vue2 in the options API)
        this.updateMediaDropZoneExpansion(!this.hasCompilation);
    },
    watch: {
        /** When the compilation loads or closes, update the media loader expansion accordingly
         * @remarks When there is already something loaded, only the unobtrusive icon should be shown
         */
        hasCompilation(newVal): void {
            this.updateMediaDropZoneExpansion(!newVal);
        },
    },
    methods: {
        clickedOutside(): void {
            //console.log('Play::v-click-outside:MediaDropZone');
            this.isMediaDropZoneExpanded = !this.hasCompilation;
        },

        updateMediaDropZoneExpansion(expanded: boolean): void {
            this.isMediaDropZoneExpanded = expanded;
        },
    },
    computed: {
        compilation(): ICompilation {
            return this.$store.getters.compilation;
        },

        hasCompilation(): boolean {
            const hasCompilation = this.$store.getters.hasCompilation;
            console.log(`Play::hasCompilation:${hasCompilation}`);
            return hasCompilation;
        },

        tracksDisplayMode(): TrackDisplayMode {
            if (this.isEditMode) {
                return TrackDisplayMode.Edit;
            }
            return TrackDisplayMode.Play;
        },
        /** Whether the compilation is shown as editable */
        isEditMode(): boolean {
            return this.$route.name === 'Edit';
        },
        hasAvailableMedia(): boolean {
            return this.mediaUrls.size > 0;
        },
        /** A dictionary of media URLs, representing playable media files
         * @remarks the media file path is used as key, preventing duplicate files for the same content.
         */
        mediaUrls(): Map<string, MediaUrl> {
            return this.$store.getters.mediaUrls as Map<string, MediaUrl>;
        },
    },
});
</script>
