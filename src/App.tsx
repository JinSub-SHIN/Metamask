import './styles/App.css'
import { Layout } from './components/common-component/Layout'
import { GlobalStyle } from './styles/GlobalStyle'
import { DashBoard } from './components/component/DashBoard'

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Layout>
				<DashBoard />
			</Layout>
		</>
	)
}

export default App
