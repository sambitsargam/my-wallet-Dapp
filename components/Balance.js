import { Button, Divider, Text } from "@chakra-ui/react";
import Moralis from "moralis";
import { useMoralisWeb3Api, useERC20Balances } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React from "react";

export default function Balance({ user }) {
    const [maticBalance, setMaticBalance] = React.useState(0)
    const Web3Api = useMoralisWeb3Api()

    const { fetchERC20Balances, data } = useERC20Balances()

    const fetchBalance = async () => {
        const result = await Web3Api.account.getNativeBalance({
            chain: "mumbai",
            address: user.get('maticAddress')
        }).catch(e => console.log(e))
        if (result.balance) {
            setMaticBalance(Moralis.Units.FromWei(result.balance))
        }
    }

    React.useEffect(() => {
        fetchBalance()
        fetchERC20Balances({
            params: {
                chain: "mumbai",
                address: user.get('maticAddress')
            }
        })
    }, [])

    return (
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold" textAlign="left">My ERC20 Cryptos</Text>
            {maticBalance && <Text>💰&nbsp; {maticBalance} <b>MATIC</b></Text>}
            <Divider />
            {data && data.map(token => (
                <div key={token.symbol}>
                    <Text>💰&nbsp; {Moralis.Units.FromWei(token.balance)} <b>{token.symbol}</b></Text>
                    <Divider />
                </div>
            ))}
            <Button mt="4" colorScheme="blue" onClick={() => {fetchBalance();  fetchERC20Balances({
            params: {
                chain: "mumbai",
                address: user.get('maticAddress')
            }
        }) }}>✅&nbsp; Refresh balance</Button>
        </CustomContainer>
    )
}