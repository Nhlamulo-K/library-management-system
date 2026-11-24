import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from "react";

type Book = {
    id: number
    title: string
    author: string
    isbn: string
}

type ReadingListAction = 
    | {type: 'ADD_BOOK'; payload: Book}
    | {type: 'REMOVE_BOOK'; payload: number}
    | {type: 'CLEAR_LIST'}

function readingListReducer(state: Book[], action: ReadingListAction): Book[] {
    switch (action.type) {
        case 'ADD_BOOK':
            return [...state, action.payload]
        
        case 'CLEAR_LIST':
            return []

        case 'REMOVE_BOOK':
            return state.filter((book) => book.id !== action.payload)

        default:
            return state
    }
}

type ReadingListContextType = {
    readingList : Book[]
    dispatch : Dispatch<ReadingListAction>
}

const ReadingListContext = createContext<ReadingListContextType | undefined>(undefined)

type ReadingListProviderProps = {children: ReactNode}

export function ReadingListProvider({children}: ReadingListProviderProps) {
    const [readingList, dispatch] = useReducer(
        readingListReducer, 
        [],
        () => {
            const savedList = localStorage.getItem('readingList')
            return savedList ? JSON.parse(savedList) as Book[] : []
        }
    )

    useEffect(() => {
        localStorage.setItem('readingList', JSON.stringify(readingList))
    }, [readingList])

    return (
        <ReadingListContext.Provider value={{readingList, dispatch}}>{children}</ReadingListContext.Provider>
    )
}

export function useReadingList() {
    const context = useContext(ReadingListContext)

    if (!context) {
        throw new Error('useReadingList must be used within ReadingListProvider')
    }

    return context
}