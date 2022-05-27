import React, { useState } from 'react'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Box, Flex, Input, FormControl, FormLabel, FormHelperText, Stack, Button, Heading, useToast } from '@chakra-ui/core'

export default function Login() {
  firebaseClient();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  return (
    <Flex>
      <Box w={500} p={4} my={12} mx="auto">
        <Heading as="h2" textAlign="center">Login</Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input type="email" id="emailAddress" aria-describedby='email-helper-text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" id="password" aria-describedby='password-helper-text' value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Stack mt={6} justifyContent="center" isInline spacing={10} >
          <Button minWidth="40%" variant="solid" variantColor="blue" isDisabled={email === "" || password === ""} onClick={async () => {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function() {
              window.location.href = '/'
            }).catch(function(error) {
              const message = error.message;
              toast({
                title: "An error occurred",
                description: message,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            })
          }}>Create Account</Button>


          <Button minWidth="40%" variant="solid" variantColor="blue" isDisabled={email === "" || password === ""} onClick={async () => {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function() {
              window.location.href = '/'
            }).catch(function(error) {
              const message = error.message;
              toast({
                title: "An error occurred",
                description: message,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            })
          }}>Login</Button>
        </Stack>
      </Box>
    </Flex>
  )
}

