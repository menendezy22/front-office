import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';
// eslint-disable-next-line import/no-unresolved
import { signin, signup } from '@src/pages/services/user'; // Update the path accordingly
import { useRouter } from 'next/router';

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [photo, setPhoto] = useState(null);
  const [adresse, setAdresse] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nifstat, setNifstat] = useState('');
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const router = useRouter();

  const handleRegister = async e => {
    e.preventDefault();

    const userData = {
      nom,
      prenom,
      photo,
      adresse,
      phone,
      email,
      nifstat,
      cin,
      hash: password,
    };

    try {
      await signup(userData);
      toast({
        title: 'Registration successful.',
        description: 'You can now log in!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Registration failed.',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await signin(email, password);
      if (res) {
        localStorage.setItem('user', JSON.stringify(res.data)); // Assuming user data is in res.data
        toast({
          title: 'Login successful.',
          description: 'Welcome back!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/produits');
        // Optionally, redirect to a different page or perform further actions here
      }
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: 'Invalid email or password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={8} p={5} borderWidth={1} borderRadius="lg">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        {isLogin ? 'Login' : 'Signup'}
      </Heading>
      <Button onClick={() => setIsLogin(!isLogin)} mb={4}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </Button>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        {!isLogin && (
          <>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="nom">Nom</FormLabel>
              <Input
                id="nom"
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                placeholder="Enter your nom"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="prenom">Prenom</FormLabel>
              <Input
                id="prenom"
                type="text"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                placeholder="Enter your prenom"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="photo">Photo</FormLabel>
              <Input
                id="photo"
                type="file"
                accept="image/*" // Accepts image files only
                onChange={(e: any) => setPhoto(e.target.files[0])} // Store the file object
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="adresse">Adresse</FormLabel>
              <Input
                id="adresse"
                type="text"
                value={adresse}
                onChange={e => setAdresse(e.target.value)}
                placeholder="Enter your adresse"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="nifstat">NIF/Stat</FormLabel>
              <Input
                id="nifstat"
                type="text"
                value={nifstat}
                onChange={e => setNifstat(e.target.value)}
                placeholder="Enter your NIF/Stat"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel htmlFor="cin">CIN</FormLabel>
              <Input
                id="cin"
                type="text"
                value={cin}
                onChange={e => setCin(e.target.value)}
                placeholder="Enter your CIN"
              />
            </FormControl>
          </>
        )}
        <Button colorScheme="teal" type="submit" width="full">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
