<template>
    <p class="">
        <SupportedFilesText />
    </p>
    <p class="">
        <a
            href="https://replayer.app/documentation-app"
            alt="Link to the Replayer app documentation"
            target="_blank"
            >Learn more...</a
        >.
    </p>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SupportedFilesText from '@/components/SupportedFilesText.vue';

export default defineComponent({
    name: 'WelcomeText',
    components: { SupportedFilesText },
    methods: {},
});
</script>
