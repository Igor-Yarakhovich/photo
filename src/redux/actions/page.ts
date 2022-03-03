export const setCurrentPageAC = (currentPage: number) =>
    ({ type: 'image/SET_CURRENT_PAGE_COUNT', currentPage } as const)

export const setPageSizeAC = (pageSize: number) =>
    ({ type: 'image/SET_PAGE_SIZE', pageSize } as const)
