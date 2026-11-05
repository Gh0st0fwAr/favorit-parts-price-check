import { useSelector } from 'react-redux'
import { formatPrice, getBestPrice, getStock } from '../api/client'

export function OffersTable() {
  const { offers, selectedBrand, status, stage } = useSelector((state) => state.price)

  if (!selectedBrand && stage !== 'offers') {
    return null
  }

  if (status === 'loading' && stage === 'offers') {
    return null
  }

  if (offers.length === 0) {
    if (selectedBrand) {
      return (
        <section className="offers">
          <h2 className="offers__title">Аналоги и предложения — {selectedBrand}</h2>
          <p className="offers__empty">Нет данных для отображения.</p>
        </section>
      )
    }
    return null
  }

  return (
    <section className="offers">
      <h2 className="offers__title">Аналоги и предложения — {selectedBrand}</h2>
      <div className="offers__scroll">
        <table className="offers__table">
          <thead>
            <tr>
              <th className="offers__head">Название / Производитель</th>
              <th className="offers__head">Стоимость</th>
              <th className="offers__head">Остаток</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((item) => (
              <tr key={`${item.brand}-${item.number}-${item.goodsID || item.name}`}>
                <td className="offers__cell">
                  <div className="offers__name">
                    <span className="offers__brand">{item.brand}</span>
                    <span className="offers__detail">{item.name || 'Без наименования'}</span>
                    <span className="offers__number">{item.number}</span>
                  </div>
                </td>
                <td className="offers__cell offers__price">{formatPrice(getBestPrice(item))}</td>
                <td className="offers__cell offers__stock">{getStock(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
