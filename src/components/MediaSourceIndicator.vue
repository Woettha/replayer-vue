<template>
    <!-- align like a bulma level, vertically centered -->
    <p class="control is-flex is-align-items-center" :title="mediaSource">
        <span class="button is-indicator">
            <BaseIcon :path="iconPath" />
        </span>
        <span class="is-indicator is-hidden-mobile"
            >{{ typeText }}:&nbsp;
        </span>
        <span class="media-source has-text-break-word is-indicator"
            >{{ mediaSource }}

            <template
                v-if="
                    (showSize && mediaUrlSizeInMegaByte) ||
                    (showType && mediaUrl?.mediaType)
                "
            >
                <span class="has-opacity-half is-size-7 is-hidden-mobile">
                    <span class="is-family-monospace">
                        <span>(</span>
                        <span v-if="mediaUrlSizeInMegaByte"
                            >{{ mediaUrlSizeInMegaByte }}
                        </span>
                        <span>&nbsp;MB</span>
                        <span
                            v-if="mediaUrlSizeInMegaByte && mediaUrl?.mediaType"
                            >,&nbsp;</span
                        >
                        <span v-if="mediaUrl?.mediaType"
                            >{{ mediaUrl?.mediaType }}
                        </span>
                        <span>)</span>
                    </span>
                </span>
            </template>
        </span>
        <span class="has-text-break-word is-indicator">
            <!-- A slot for an adornment -->
            <slot></slot>
        </span>
    </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '@/components/icons/BaseIcon.vue';
import FileHandler from '@/store/filehandler';
import { mdiMusicCircleOutline, mdiMusicNote } from '@mdi/js';
import { MediaUrl } from '@/store/state-types';

/** A display for the media source of a track
 * @remarks Includes a slot at the end of the indicative text, for an adornment icon
 * of size 40px
 */
export default defineComponent({
    name: 'MediaSourceIndicator',
    components: { BaseIcon },
    props: {
        /** The source of the media. A path to a file or an URL
         * @remarks Alternatively, the mediaUrl property may be used
         */
        source: {
            type: String,
            default: '',
            required: false,
        },

        /** The media URL
         * @remarks Alternatively, the source property may be used
         */
        mediaUrl: {
            type: MediaUrl,
            default: null,
            required: false,
        },
        showSize: {
            type: Boolean,
            required: false,
            default: false,
        },
        showType: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            /** Icons from @mdi/js */
            mdiMusicCircleOutline: mdiMusicCircleOutline,
            mdiMusicNote: mdiMusicNote,
        };
    },
    computed: {
        typeText(): string {
            if (this.isUrl) {
                return 'URL';
            }

            return 'File';
        },
        iconPath(): string {
            if (this.isUrl) {
                return mdiMusicCircleOutline;
            }

            return mdiMusicNote;
        },
        isUrl() {
            return FileHandler.isValidHttpUrl(this.mediaSource);
        },
        /** Arbitration of the source provided */
        mediaSource(): string {
            if (this.source) {
                return this.source;
            } else {
                return this.mediaUrl?.source;
            }
        },
        /** Get the content size in MB, rounded to one decimal place */
        mediaUrlSizeInMegaByte(): number | null {
            return FileHandler.AsMegabytes(this.mediaUrl?.size);
        },
    },
});
</script>
