import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Image,
} from '@chakra-ui/react';
import { updateProfile, getUserProfile } from '@src/pages/services/user'; // Update the path accordingly
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    phone: '',
    email: '',
    photo: null,
    password: '',
  });
  const [previewPhoto, setPreviewPhoto] = useState<any>(null); // Preview for uploaded photo
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const toast = useToast();
  const router = useRouter();

  // Fetch user profile data when component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile(); // Assuming this function fetches user data
        setUserData({
          nom: user.nom,
          prenom: user.prenom,
          adresse: user.adresse,
          phone: user.phone,
          email: user.email,
          photo: user.photo,
          password: '', // Initialize password as empty
        });
        setPreviewPhoto(user.photo); // Set initial photo preview
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission to update user profile
  const handleSubmit = async e => {
    e.preventDefault();

    const updatedData = {
      nom: userData.nom,
      prenom: userData.prenom,
      adresse: userData.adresse,
      phone: userData.phone,
      email: userData.email,
      photo: userData.photo, // Photo file if updated
      password: userData.password, // Include password for updates
    };

    try {
      await updateProfile(updatedData); // Assuming this updates the user profile
      toast({
        title: 'Profile updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Optionally, redirect after update
    } catch (error) {
      toast({
        title: 'Profile update failed.',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle photo input change
  const handlePhotoChange = e => {
    const file = e.target.files[0];
    setUserData(prev => ({ ...prev, photo: file }));

    // Create a preview URL for the uploaded photo
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  // Function to trigger file input click
  const handlePhotoClick = () => {
    document.getElementById('photo-input')?.click(); // Trigger click on the hidden file input
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box maxW="400px" mx="auto" mt={8} p={5} borderWidth={1} borderRadius="lg">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Edit Profile
      </Heading>
      {/* Circular photo display */}
      <Box
        position="relative"
        mb={4}
        borderRadius="full"
        overflow="hidden"
        boxSize="150px"
        mx="auto"
        border="1px solid grey"
        cursor="pointer" // Change cursor to pointer to indicate clickable area
        onClick={handlePhotoClick} // Trigger file input click on circle click
      >
        <Image
          src={previewPhoto || 'default_photo_url'} // Show preview or default image
          alt="Profile"
          boxSize="full"
          objectFit="cover"
          borderRadius="full"
        />
        <Input
          type="file"
          accept="image/*" // Only accept image files
          onChange={handlePhotoChange} // Call the handler on change
          display="none" // Hide the input
          id="photo-input"
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="nom">Nom</FormLabel>
          <Input
            id="nom"
            type="text"
            value={userData.nom}
            onChange={e => setUserData(prev => ({ ...prev, nom: e.target.value }))}
            placeholder="Enter your nom"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="prenom">Prenom</FormLabel>
          <Input
            id="prenom"
            type="text"
            value={userData.prenom}
            onChange={e => setUserData(prev => ({ ...prev, prenom: e.target.value }))}
            placeholder="Enter your prenom"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="adresse">Adresse</FormLabel>
          <Input
            id="adresse"
            type="text"
            value={userData.adresse}
            onChange={e => setUserData(prev => ({ ...prev, adresse: e.target.value }))}
            placeholder="Enter your adresse"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input
            id="phone"
            type="text"
            value={userData.phone}
            onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Enter your phone number"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={userData.email}
            onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
          />
        </FormControl>
        {/* Password input */}
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={userData.password}
            onChange={e => setUserData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
          />
        </FormControl>

        <Button colorScheme="teal" type="submit" width="full">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProfilePage;
