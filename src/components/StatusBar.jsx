import { useSelector } from 'react-redux'

export function StatusBar() {
  const { status, error, stage } = useSelector((state) => state.price)

  if (status === 'loading') {
    return (
      <div className="loader" role="status" aria-live="polite">
        <span className="loader__spinner" aria-hidden="true" />
        <span>
          {stage === 'offers' ? 'Загружаем аналоги и предложения…' : 'Ищем производителей…'}
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert_danger" role="alert">
        {error}
      </div>
    )
  }

  return null
}
