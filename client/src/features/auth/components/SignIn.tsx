import { VStack, FormControl, FormLabel, Input, Button,Container, Box, Text } from "@chakra-ui/react"

const SignIn = () => {
  return (
    <Container maxW="md" h="100vh">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        <Box border="2px" textAlign="center" borderRadius="2xl" borderColor="black" bg="#F4F3F2" px="14" py="20">
          <Text as="h1" fontSize="3xl" fontWeight="semibold">
            Water Analytics
          </Text>
          <Text fontSize="md" color="gray.500">
            Please enter your credentials
          </Text>
          <form onSubmit={() => {}}>
            <VStack spacing={4} mt={8}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" />
              </FormControl>
              <Button type="submit" colorScheme="cyan" width="full">
                Sign In
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn
