# favorit-parts-price-check

Тестовое задание: поиск производителей и аналогов по артикулу через API «Проценка» Favorit-parts.

## Стек

- React (без TypeScript)
- Redux Toolkit
- Vite
- SCSS (BEM)

## Запуск

```bash
cp .env.example .env
npm install
npm run dev
```

Открыть: http://127.0.0.1:5173/

В `.env` должен быть `VITE_API_KEY` — ключ покупателя. Для демо можно оставить тестовый ключ из документации API.

Dev-сервер проксирует запросы на `https://api.favorit-parts.ru`, чтобы обойти CORS локально. На GitHub Pages запросы идут напрямую (у API `Access-Control-Allow-Origin: *`).

## Сценарий

1. Ввод артикула → запрос производителей (`number`).
2. Выбор бренда → запрос аналогов (`number` + `brand` + `analogues=on`).
3. Таблица: название/производитель, цена (минимум по `warehouses`), остаток.

Демо: https://gh0st0fwar.github.io/favorit-parts-price-check/
