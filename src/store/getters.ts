import { GetterTree } from 'vuex';
import { ICompilation } from './compilation-types';
import { State } from './state';
import { MediaUrl } from './state-types';

export type Getters = {
    /** Determines whether a compilation is availabe (created or loaded) */
    compilation(state: State): ICompilation;
    /** Defines the function to determine whether a compilation is availabe (created or loaded) */
    hasCompilation(state: State): boolean;
    mediaUrls(state: State): Map<string, MediaUrl>;
    /** Gets the latest (newest) progress message from the stack */
    progressMessage(state: State): string | null;
    /** Determines whether the given cue is the currently selected one
     * @devdoc //TODO parametrized call currently do not work, reason is unknown
     */
    isSelected(state: State, cueId: string): boolean;
    /** Gets the currently selected cue id
     * @remarks Only one cue may be selected at any time, within one compilation / application instance.
     */
    selectedCueId(state: State): string;
    /** Whether to never show the welcome overlay at application start
     */
    neverShowWelcomeMessageAgain(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
    /** @inheritdoc */
    compilation: (state) => {
        return state.compilation as ICompilation;
    },
    /** @inheritdoc */
    hasCompilation: (state) => {
        if ((state.compilation as ICompilation).Id) {
            return true;
        }
        return false;
    },
    /** @inheritdoc */
    mediaUrls: (state) => {
        return state.mediaUrls as Map<string, MediaUrl>;
    },
    /** @inheritdoc */
    progressMessage: (state) => {
        const progressMessage =
            state.progressMessageStack[state.progressMessageStack.length - 1];
        return progressMessage;
    },
    /** @inheritdoc */
    isSelected: (state, cueId: string) => {
        return cueId == state.selectedCueId;
    },
    /** @inheritdoc */
    selectedCueId: (state) => {
        return state.selectedCueId;
    },
    neverShowWelcomeMessageAgain: (state) => {
        return state.neverShowWelcomeMessageAgain;
    },
};
