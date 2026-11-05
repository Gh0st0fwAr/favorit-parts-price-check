import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchGoods } from '../api/client'

export const loadBrands = createAsyncThunk(
  'price/loadBrands',
  async (number, { rejectWithValue }) => {
    try {
      const goods = await fetchGoods({ number: number.trim() })
      return { number: number.trim(), goods }
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось загрузить производителей')
    }
  },
)

export const loadOffers = createAsyncThunk(
  'price/loadOffers',
  async ({ number, brand }, { rejectWithValue }) => {
    try {
      const goods = await fetchGoods({
        number,
        brand,
        analogues: true,
      })
      return { brand, goods }
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось загрузить предложения')
    }
  },
)

function flattenOffers(goods) {
  const rows = []

  goods.forEach((item) => {
    rows.push({ ...item, isAnalogue: false })

    if (Array.isArray(item.analogues)) {
      item.analogues.forEach((analogue) => {
        if (analogue && analogue.brand) {
          rows.push({ ...analogue, isAnalogue: true })
        }
      })
    }
  })

  return rows
}

const initialState = {
  number: '',
  brands: [],
  selectedBrand: null,
  offers: [],
  status: 'idle',
  stage: null,
  error: null,
}

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    resetResults(state) {
      state.brands = []
      state.selectedBrand = null
      state.offers = []
      state.status = 'idle'
      state.stage = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBrands.pending, (state) => {
        state.status = 'loading'
        state.stage = 'brands'
        state.error = null
        state.brands = []
        state.selectedBrand = null
        state.offers = []
      })
      .addCase(loadBrands.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stage = 'brands'
        state.number = action.payload.number
        state.brands = action.payload.goods
        state.error = action.payload.goods.length === 0 ? 'По этому артикулу ничего не найдено' : null
      })
      .addCase(loadBrands.rejected, (state, action) => {
        state.status = 'failed'
        state.stage = 'brands'
        state.error = action.payload || 'Ошибка загрузки производителей'
      })
      .addCase(loadOffers.pending, (state) => {
        state.status = 'loading'
        state.stage = 'offers'
        state.error = null
        state.offers = []
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stage = 'offers'
        state.selectedBrand = action.payload.brand
        state.offers = flattenOffers(action.payload.goods)
        state.error =
          action.payload.goods.length === 0 ? 'Предложения по выбранному бренду не найдены' : null
      })
      .addCase(loadOffers.rejected, (state, action) => {
        state.status = 'failed'
        state.stage = 'offers'
        state.error = action.payload || 'Ошибка загрузки предложений'
      })
  },
})

export const { resetResults } = priceSlice.actions
export default priceSlice.reducer
