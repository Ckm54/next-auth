import React from "react";
import nookies from "nookies";
import firebaseClient from "../firebaseClient";
import { verifyIdToken } from "../firebaseAdmin";
import firebase from "firebase/compat/app";
import {Box, Flex,Text,Heading,Button} from "@chakra-ui/core";  

function Authenticated({session}) {
  firebaseClient();
  if(session) {
    return (
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" textAlign="center">Authenticated</Heading>
          <Text mt={8} textAlign="center">{session}</Text>
          <Text textAlign="center">You are now authenticated</Text>
        </Box>

        <Box w={500} p={4} my={12} mx="auto">
          <Button width="100%" 
            variant="solid" 
            variantColor="red" 
            onClick={async () => {
              await firebase.auth().signOut();
              window.location.href="/";
            }}>SignOut</Button>
        </Box>
      </Flex>
    )
  }
  else {
    return (
      <Box>
        <Text>Loading....</Text>
      </Box>
    )
  }
}

export async function getServerSideProps(context) { 
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const {uid, email} = token;

    return {
      props: {
        session: `Your email is ${email} and your user ID is ${uid}`
      },
    } 
  } catch(err) {
    context.res.writeHead(302, {location: "/login"});
    context.res.end();
    return {
      props: []
    }
  }
}


export default Authenticated;