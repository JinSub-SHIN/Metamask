import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { MainLogo } from '../../images'
import { Account } from '../component/Account'
import { ReactNode } from 'react'

const Header = styled.div`
	box-sizing: border-box;
	background: #ffffff;
	border-bottom: 1px solid #edeff5;
	width: 100vw;
	height: 121px;
`

const HeaderItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 22px 0px 11px;
	width: 90vw;
	height: 65px;
	max-width: 1200px;
	margin: 0 auto;
	background: #ffffff;
`

const Content = styled.div`
	width: 100vw;
	min-height: calc(100vh - 121px);
	background-color: #f6f7fa;
`

const ContentInner = styled.div`
	align-items: center;
	width: 90vw;
	height: auto;
	max-width: 1200px;
	margin: 0 auto;

	padding-top: 42px;
`

export const Svgs = styled.img``

type LayoutNode = {
	children: ReactNode
}

export const Layout = ({ children }: LayoutNode) => {
	const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1441 })

	console.log(isDesktopOrLaptop)
	// pc 1441px ~
	if (isDesktopOrLaptop) {
		return (
			<>
				<Header>
					<HeaderItem>
						<Svgs src={MainLogo}></Svgs>
						<Account />
					</HeaderItem>
				</Header>
				<Content>
					<ContentInner>{children}</ContentInner>
				</Content>
			</>
		)
	} else {
		return <h1>모바일</h1>
	}
}
