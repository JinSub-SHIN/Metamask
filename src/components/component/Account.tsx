import detectEthereumProvider from '@metamask/detect-provider'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Svgs } from '../common-component/Layout'
import { LoginedLogo } from '../../images'
import { message } from 'antd'

const FlexBox = styled.div`
	display: flex;
	gap: 7px;
`

const AccountButton = styled.div`
	width: 94px;
	height: 32px;
	padding: 6px 10px 6px 10px;
	background: #123acc;
	border-radius: 4px;
	cursor: pointer;
`

const ButtonTitle = styled.div`
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 32px;
	letter-spacing: -0.4px;
	text-align: center;
	color: #ffffff;
`

const LogoutButton = styled.div`
	color: #919fc8;
	font-size: 14px;
	letter-spacing: -0.3px;
	cursor: pointer;
`

export const Account = () => {
	const [hasProvider, setHasProvider] = useState<boolean | null>(null)
	const initialState = { accounts: [] }
	const [wallet, setWallet] = useState(initialState)
	const [messageApi, contextHolder] = message.useMessage()

	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true })
			setHasProvider(Boolean(provider))
		}
		getProvider()
	}, [])

	const updateWallet = async (accounts: any) => {
		setWallet({ accounts })
	}

	const handleConnect = async () => {
		if (hasProvider) {
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			})
			return accounts
		} else {
			messageApi.info(
				'필수 확장 프로그램이 설치되어 있지 않아, 설치 페이지로 이동합니다.',
			)
			setTimeout(() => {
				window.location.href = 'https://metamask.io/download/'
			}, 2000)
		}
	}

	const WalletLogin = () => {
		const promise = handleConnect()
		promise
			.then(res => {
				updateWallet(res)
				messageApi.success('지갑이 연결되었습니다.')
			})
			.catch(err => {
				messageApi.error('필수 확장 프로그램이 정상적으로 설치되지 않았습니다.')
			})
	}

	const handleDisConnect = () => {
		setWallet({ accounts: [] })
		messageApi.success('지갑이 연결해제 되었습니다.')
	}

	if (wallet.accounts == undefined || wallet.accounts.length == 0) {
		return (
			<>
				{contextHolder}
				<AccountButton onClick={WalletLogin}>
					<ButtonTitle>지갑 연결하기</ButtonTitle>
				</AccountButton>
			</>
		)
	} else {
		return (
			<>
				{contextHolder}
				<FlexBox>
					<Svgs src={LoginedLogo} />
					{truncateString(wallet.accounts[0])}
					<LogoutButton onClick={handleDisConnect}>연결 해제</LogoutButton>
				</FlexBox>
			</>
		)
	}
}

function truncateString(accountKey: string) {
	if (accountKey.length <= 8) {
		return accountKey
	} else {
		return accountKey.slice(0, 4) + '...' + accountKey.slice(-4)
	}
}
