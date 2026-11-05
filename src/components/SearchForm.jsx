import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBrands, resetResults } from '../store/priceSlice'

export function SearchForm() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.price.status)
  const [number, setNumber] = useState('')

  const isLoading = status === 'loading'

  function handleSubmit(event) {
    event.preventDefault()

    const value = number.trim()
    if (!value) {
      return
    }

    dispatch(resetResults())
    dispatch(loadBrands(value))
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <label className="search__field">
          <span className="search__label">Артикул детали</span>
          <input
            className="search__input"
            type="text"
            name="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="Например, 7160500039S"
            autoComplete="off"
            disabled={isLoading}
          />
        </label>
        <button className="search__submit" type="submit" disabled={isLoading || !number.trim()}>
          Найти производителей
        </button>
      </form>
    </section>
  )
}
