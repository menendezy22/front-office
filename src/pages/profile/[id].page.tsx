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
// eslint-disable-next-line import/no-unresolved
import { updateUser, getUserProfile } from '@src/pages/services/user'; // Update the path accordingly
import { useRouter } from 'next/router';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    phone: '',
    email: '',
    photo: null,
  });
  const [previewPhoto, setPreviewPhoto] = useState<any>(null); // Preview for uploaded photo
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const toast = useToast();
  const router = useRouter();

  const { id } = router.query;

  console.log(id, 'ez');

  // Fetch user profile data when component loads
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        if (id !== undefined) {
          const user: any = await getUserProfile(id);
          console.log(user, 'lele');

          // Update user data
          setUserData({
            nom: user.user.nom,
            prenom: user.user.prenom,
            adresse: user.user.adresse,
            phone: user.user.phone,
            email: user.user.email,
          });

          // Option 1: Use the file path
          const photoUrl = `http://localhost:5000/${user.user.photo.replace(/\\/g, '/')}`;
          setPreviewPhoto(photoUrl); // Use the corrected URL

          // Option 2: Use the base64 data if you prefer
          // setPreviewPhoto(user.photo); // Uncomment this if using base64
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch completion
      }
    };

    fetchProfile();
  }, [id]);

  console.log(userData, 'test');

  // Handle form submission to update user profile
  const handleSubmit = async e => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append user data to the FormData object
    formData.append('nom', userData.nom);
    formData.append('prenom', userData.prenom);
    formData.append('adresse', userData.adresse);
    formData.append('phone', userData.phone);
    formData.append('email', userData.email);

    // Append the photo if it exists (assuming it's a file input)
    if (userData.photo) {
      formData.append('photo', userData.photo); // Ensure this is a file object
    }

    try {
      // Call the function to update the profile, ensure it handles the PUT request correctly
      await updateUser(id, formData); // Assuming updateProfile takes ID and FormData
      toast({
        title: 'Profile updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Optionally, redirect after update or refresh user data
    } catch (error) {
      console.error('Profile update error:', error); // Log error for debugging
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
          src={previewPhoto || 'default_photo_url'}
          boxSize="full"
          objectFit="cover"
          borderRadius="full"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          display="none"
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

        <Button colorScheme="teal" type="submit" width="full">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProfilePage;
