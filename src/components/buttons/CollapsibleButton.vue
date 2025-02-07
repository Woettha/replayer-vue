<template>
    <NavButton
        :iconClass="navIconClass"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        :title="titleText"
        :iconPath="mdiChevronDown"
        @click="toggleExpanded()"
        ><slot></slot
    ></NavButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavButton from '@/components/buttons/NavButton.vue';
import { mdiChevronDown } from '@mdi/js';

/** A button to display and toggle a collapsed or expanded state, using a directed chevron icon.
 * @remarks The default (expanded) chevron direction is down.
 */
export default defineComponent({
    name: 'CollapsibleButton',
    emits: ['update:modelValue'],
    components: { NavButton },
    props: {
        /** Whether this represents the expanded state. */
        modelValue: {
            type: Boolean,
            default: false,
        },
        expandedText: {
            type: String,
            default: '',
        },
        collapsedText: {
            type: String,
            default: '',
        },
        /** The direction of the chevron for the collapsed state: either 'right' (default) or 'up' */
        collapsedChevronDirection: {
            required: false,
            type: String,
            default: 'right',
        },
        /* The title*/
        title: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            /** Icons from @mdi/js */
            mdiChevronDown: mdiChevronDown,
        };
    },

    methods: {
        toggleExpanded() {
            const requestedModelValue = !this.modelValue;
            console.debug(
                `CollapsibleButton::toggleExpanded:requestedModelValue:${requestedModelValue}`,
            );
            this.$emit('update:modelValue', requestedModelValue);
        },
    },
    computed: {
        titleText(): string {
            if (this.modelValue) {
                const addOn = this.expandedText ? `(${this.expandedText})` : '';
                return `${this.title} ${addOn}`;
            }
            const addOn = this.collapsedText ? `(${this.collapsedText})` : '';
            return `${this.title} ${addOn}`;
        },
        /** The dynamic class for the rotating expander button icon */
        navIconClass(): string {
            return (
                'rotate ' +
                (this.modelValue == true
                    ? 'down'
                    : this.collapsedChevronDirection)
            );
        },
    },
});
</script>
