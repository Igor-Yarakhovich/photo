import { useEffect, useState } from 'react'
import styles from 'components/common/Pagination/Pagination.module.css'

export const usePagination = (
    pageSize: number,
    portionSize: number,
    currentPage: number,
    totalItemsCount: number
): any => {
    const [portionNumber, setPortionNumber] = useState<number>(1)

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = []

    for (let i = 1; i <= pagesCount; i + 1) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    const currentClassNamePage = (page: number): string =>
        currentPage === page
            ? `${styles.selectedActivePage} ${styles.selectedPage}`
            : styles.selectedPage
    const filteredPages = pages.filter(
        (page: number) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
    )

    const getPreviousPortion = () => {
        setPortionNumber(portionNumber - 1)
    }

    const getNextPortion = () => {
        setPortionNumber(portionNumber + 1)
    }

    useEffect(
        () => setPortionNumber(Math.ceil(currentPage / portionSize)),
        [currentPage, portionSize]
    )

    return {
        pages,
        portionNumber,
        portionCount,
        leftPortionPageNumber,
        rightPortionPageNumber,
        getPreviousPortion,
        getNextPortion,
        currentClassNamePage,
        filteredPages,
    }
}
