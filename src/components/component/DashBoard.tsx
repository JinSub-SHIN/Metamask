import styled from 'styled-components'
import { Svgs } from '../common-component/Layout'
import { EthIcon } from '../../images'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import assignmentABI from '../../api/json/Assignment.json'

const ContentHeader = styled.div`
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 25px;
`

const ContentFlexBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 24px;
	margin-bottom: 27px;
`

const ContentItem = styled.div`
	//padding + gap
	width: calc(50% - 76px);
	background: #ffffff;
	padding: 32px;

	border-radius: 12px;

	@media screen and (max-width: 800px) {
		width: 100%;
	}
`

const DashBoardSpan = styled.div<{
	marginTop?: string
	marginBottom?: string
	fontSize?: string
	color?: string
	fontWeight?: number
}>`
	margin-top: ${props => props.marginTop};
	margin-bottom: ${props => props.marginBottom};
	font-size: ${props => props.fontSize};
	color: ${props => props.color};
	font-weight: ${props => props.fontWeight};
`

const FlexBox = styled.div`
	display: flex;
	gap: 5px;
	font-size: 17px;
	font-weight: 700;
`

const Divider = styled.div`
	height: 1px;
	background: #edeff5;
`

const DonateButton = styled.div`
	height: 32px;
	line-height: 32px;
	padding: 6px 10px 6px 10px;
	background: #123acc;
	color: white;
	border-radius: 4px;
	cursor: pointer;
`

const FlexBetween = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
`

const AchievementWrapper = styled.div`
	width: 100%;
	/* background-color: #e7ebf8; */
`

const ProgressBarWrapper = styled.div`
	height: 6px;
	background-color: #e7ebf8;
`

const ProgressBar = styled.div<{ width: string }>`
	width: ${props => props.width};
	height: 6px;
	background: linear-gradient(90deg, #5a31ff 0%, #4098ff 100%);
	border-radius: 10px;
	transition: width 0.3s ease;
`

const AchievementBar = styled.div<{ width: string; left: string }>`
	width: ${props => props.width};
	left: ${props => props.left};
	position: relative;
	top: -19px;
	width: 0;
	transition: left 0.3s ease;
	color: #0e42ee;
	font-weight: 600;
`

const AchievementFlexBox = styled.div`
	height: 18px;
	display: flex;
	justify-content: space-between;
	margin-top: 7px;
`

export const DashBoard = () => {
	const [progress, setProgress] = useState<number>(0)

	useEffect(() => {
		const targetProgress = 13.68
		const animationDuration = 0.7
		const frameDuration = 1000 / 60
		const totalFrames = Math.round((animationDuration * 1000) / frameDuration)

		let currentFrame = 0

		const incrementProgress = targetProgress / totalFrames

		const animateProgress = () => {
			if (currentFrame < totalFrames) {
				currentFrame++
				setProgress(prevProgress => prevProgress + incrementProgress)

				requestAnimationFrame(animateProgress)
			} else {
				setProgress(targetProgress)
			}
		}

		animateProgress()
	}, [])

	const handleDonate = () => {
		const contractAddress = '0x...key'
		const web3 = new Web3(window.ethereum)
		const contractInstance = new web3.eth.Contract(
			assignmentABI,
			contractAddress,
		)

		contractInstance.methods
			.donate()
			.send({
				from: '0x...key',
				value: web3.utils.toWei('1', 'ether'),
			})
			.then(result => {
				// 함수 호출 결과 처리
				console.log(result)
			})
			.catch(error => {
				// 오류 처리
				console.error(error)
			})
	}

	return (
		<>
			<ContentHeader>
				<DashBoardSpan fontSize="17px" fontWeight={700}>
					대시보드
				</DashBoardSpan>
			</ContentHeader>
			<ContentFlexBox>
				<ContentItem>
					<DashBoardSpan marginBottom="3px" fontSize="17px" fontWeight={700}>
						내 이더 기부액
					</DashBoardSpan>
					<FlexBetween>
						<DashBoardSpan fontSize="30px" fontWeight={700}>
							$210.28
						</DashBoardSpan>
						<DonateButton onClick={handleDonate}>기부하기</DonateButton>
					</FlexBetween>
					<DashBoardSpan
						color="#0E42EE"
						marginBottom="15px"
						fontSize="17px"
						fontWeight={700}
					>
						내 기부량 0.127ETH
					</DashBoardSpan>
					<AchievementWrapper>
						<ProgressBarWrapper>
							<ProgressBar width={progress + '%'}></ProgressBar>
						</ProgressBarWrapper>
						<AchievementFlexBox>
							<DashBoardSpan color="#6c7180" fontSize="14px">
								달성률
							</DashBoardSpan>

							<DashBoardSpan color="#6c7180" fontSize="14px">
								1ETH
							</DashBoardSpan>
						</AchievementFlexBox>
						<AchievementBar width={progress + '%'} left={progress - 4 + '%'}>
							{progress.toFixed(2)}%
						</AchievementBar>
					</AchievementWrapper>
				</ContentItem>
				<ContentItem>
					<FlexBox>
						<Svgs src={EthIcon} />
						ETH 가격
					</FlexBox>
					<DashBoardSpan
						marginTop="8px"
						marginBottom="15px"
						fontSize="32px"
						fontWeight={700}
					>
						$1,657.22
					</DashBoardSpan>
					<Divider />
				</ContentItem>
			</ContentFlexBox>
			<ContentFlexBox>
				<ContentItem>
					<DashBoardSpan fontSize="17px" fontWeight={700}>
						자산 상세 구성
					</DashBoardSpan>
				</ContentItem>
				<ContentItem>
					<DashBoardSpan fontSize="17px" fontWeight={700}>
						자산 정보
					</DashBoardSpan>
				</ContentItem>
			</ContentFlexBox>
		</>
	)
}
