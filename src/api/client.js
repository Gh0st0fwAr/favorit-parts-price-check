// В dev — через Vite proxy; в prod (GitHub Pages) — напрямую по HTTPS (CORS: *)
const API_BASE = import.meta.env.DEV
  ? '/hs/hsprice/'
  : 'https://api.favorit-parts.ru/hs/hsprice/'

// Тестовый ключ из документации API; в проде перекрывается через .env
const API_KEY =
  import.meta.env.VITE_API_KEY || '00000000-0000-0000-0000-000000000001'

function buildUrl({ number, brand, analogues }) {
  const params = new URLSearchParams()

  if (!API_KEY) {
    throw new Error('Не задан VITE_API_KEY в .env')
  }

  params.set('key', API_KEY)
  params.set('number', number)

  if (brand) {
    params.set('brand', brand)
  }

  if (analogues) {
    params.set('analogues', 'on')
  }

  return `${API_BASE}?${params.toString()}`
}

export async function fetchGoods({ number, brand, analogues = false }) {
  const response = await fetch(buildUrl({ number, brand, analogues }))

  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`)
  }

  const data = await response.json()

  if (data.error) {
    throw new Error(Array.isArray(data.error) ? data.error.join('; ') : String(data.error))
  }

  const goods = Array.isArray(data.goods) ? data.goods : []

  return goods.filter((item) => item && item.brand)
}

/** Минимальная цена по складам; корневой price в API — legacy. */
export function getBestPrice(item) {
  const prices = (item.warehouses || [])
    .map((warehouse) => Number(warehouse.price))
    .filter((price) => Number.isFinite(price))

  if (prices.length === 0) {
    return null
  }

  return Math.min(...prices)
}

export function getStock(item) {
  if (typeof item.count === 'number') {
    return item.count
  }

  return (item.warehouses || []).reduce((sum, warehouse) => sum + (Number(warehouse.stock) || 0), 0)
}

export function formatPrice(value) {
  if (value == null || Number.isNaN(value)) {
    return '—'
  }

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(value)
}
