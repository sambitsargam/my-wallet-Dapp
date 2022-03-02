import { Button, Center, Flex, Text } from "@chakra-ui/react"
export default function Header({isAuthenticated, isAuthenticating, user, authenticate, logout, isLoggingOut}) {
    
    return(
        <header>
            <Flex justifyContent="space-between" bg="blue.400" color="white" px={10} py={6}>
                <Center><Text fontSize="xl" fontWeight="bold">My Crypto Wallet</Text></Center>
                <Center>
                    {isAuthenticated ? (
                        <>
                        <Text>{user.getUsername()}</Text>
                        <Button ml={4} colorScheme="blue" onClick={logout} disabled={isLoggingOut}>Logout</Button>
                        </>
                    ) : (
                        <Button colorScheme="blue" onClick={() => authenticate({
                            signingMessage: "Sign to My Crypto Wallet"
                        })} disabled={isAuthenticating}>Login</Button>
                    )}
                </Center>
            </Flex>
        </header>
    )
}