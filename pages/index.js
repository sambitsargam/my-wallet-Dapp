import { useMoralis } from "react-moralis"
import Head from "next/head"
import { Flex, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Link } from "@chakra-ui/react"

import Balance from "../components/Balance";
import Header from "../components/Header";
import Nft from "../components/Nft";
import Profile from "../components/Profile";
import Send from "../components/Send";
import Transactions from "../components/Transactions";
import Coffee from "../components/Coffee";

export default function Home() {
  const {isAuthenticated, user, isAuthenticating, authenticate, logout, isLoggingOut} = useMoralis()
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | DApp</title>
        </Head>
        <Flex direction="column" justifyContent="center" alignItems="center" width="100vw" height="100vh" bgGradient="linear(to-br, teal.400, blue.300)">
          <Text fontSize="5xl" fontWeight="bold" color="white">My Crypto wallet </Text>
          <Button colorScheme="blue" size="lg" mt="6" onClick={() => authenticate({
            signingMessage: "Sign required to login in Dashboard3"
          })} disabled={isAuthenticating}>Login with Metamask</Button>
        </Flex>
      </>
    )
  }
  return (
    <>
    <Head>
      <title>My Dapp</title>
    </Head>
    <Flex direction="column" width="100vw" height="100vh">
      <Header isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating} user={user} authenticate={authenticate} logout={logout} isLoggingOut={isLoggingOut} />
      <Box flex="1" bg="blue.100" px="52" py="20">
        <Tabs size="lg" colorScheme="blue" align="center" variant="enclosed">
          <TabList>
            <Tab fontWeight="bold">Profile</Tab>
            <Tab fontWeight="bold">Balance</Tab>
            <Tab fontWeight="bold">Transactions</Tab>
            <Tab fontWeight="bold">NFTs</Tab>
            <Tab fontWeight="bold">Send MATIC</Tab>
            <Tab fontWeight="bold">Buy Coffee For Me </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Profile user={user}/>
            </TabPanel>
            <TabPanel>
              <Balance user={user} />
            </TabPanel>
            <TabPanel>
              <Transactions user={user}/>
            </TabPanel>
            <TabPanel>
              <Nft user={user}/>
            </TabPanel>
            <TabPanel>
              <Send/>
            </TabPanel>
            <TabPanel>
              <Coffee/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
   </>
  )
}
