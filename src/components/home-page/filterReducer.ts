export type FilterState = {
  sort: string
  minPrice: string
  maxPrice: string
  categories: number[]
  searchText: string
}

export type Action =
  | { type: 'sort'; payload: string }
  | { type: 'minPrice'; payload: string }
  | { type: 'maxPrice'; payload: string }
  | { type: 'category'; payload: number | number[] }
  | { type: 'searchText'; payload: string }

export const handleFilter = (
  state: FilterState,
  action: Action
): FilterState => {
  switch (action.type) {
    case 'sort':
      return { ...state, sort: action.payload }
    case 'minPrice':
      return { ...state, minPrice: action.payload }
    case 'maxPrice':
      return { ...state, maxPrice: action.payload }
    case 'category':
      const newCategories = Array.isArray(action.payload)
        ? action.payload
        : state.categories.includes(action.payload)
          ? state.categories.filter((cat) => cat !== action.payload)
          : [...state.categories, action.payload]
      return { ...state, categories: newCategories }
    case 'searchText':
      return { ...state, searchText: action.payload }
    default:
      return state
  }
}
