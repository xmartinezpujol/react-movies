// Sync Action
export const loadingDone = () => ({
    type: 'LOADING_SUCCESS',
    isLoading: false
});

export const loadingStarted = () => ({
    type: 'LOADING_STARTED',
    isLoading: true
});
