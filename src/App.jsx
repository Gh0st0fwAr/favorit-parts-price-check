import { BrandList } from './components/BrandList'
import { OffersTable } from './components/OffersTable'
import { SearchForm } from './components/SearchForm'
import { StatusBar } from './components/StatusBar'

function App() {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">Проценка Favorit-parts</h1>
          <p className="header__lead">
            Поиск производителей по артикулу и получение аналогов со складов.
          </p>
        </div>
      </header>

      <main className="content">
        <SearchForm />
        <StatusBar />
        <BrandList />
        <OffersTable />
      </main>
    </div>
  )
}

export default App
