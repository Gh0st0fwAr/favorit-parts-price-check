import { useDispatch, useSelector } from 'react-redux'
import { loadOffers } from '../store/priceSlice'

export function BrandList() {
  const dispatch = useDispatch()
  const { brands, number, selectedBrand, status } = useSelector((state) => state.price)

  if (brands.length === 0) {
    return null
  }

  const isLoading = status === 'loading'

  function handleSelect(brand) {
    if (isLoading) {
      return
    }

    dispatch(loadOffers({ number, brand }))
  }

  return (
    <section className="brands">
      <h2 className="brands__title">Производители</h2>
      <ul className="brands__list">
        {brands.map((item) => (
          <li className="brands__item" key={`${item.brand}-${item.goodsID || item.number}`}>
            <button
              type="button"
              className={`brands__button${selectedBrand === item.brand ? ' isActive' : ''}`}
              onClick={() => handleSelect(item.brand)}
              disabled={isLoading}
            >
              {item.brand}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
