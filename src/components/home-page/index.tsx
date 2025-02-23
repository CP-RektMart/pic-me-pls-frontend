import { Input } from '../ui/input'
import SearchFilterButton from './filter-button'

export default function HomePageComponent() {
  return (
    <div>
      <div>kuy</div>
      <SearchFilterButton searchOptionType='sort' />
      <SearchFilterButton searchOptionType='filter' />
      <Input
        type='text'
        placeholder='Search Photographer'
        className='rounded-full'
      />
    </div>
  )
}
