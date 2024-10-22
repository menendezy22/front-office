/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */

import { Box, BoxProps, Flex } from '@chakra-ui/react';
// eslint-disable-next-line import/order
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import MobileLogo from '@icons/bonelli-mobile.svg';
import DesktopLogo from '@icons/bonelli.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { getConnectedUser } from '@src/pages/services/user';
import { useRouter } from 'next/router';

export const HEADER_HEIGHT = 60;

export const Header = (props: BoxProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null); // Initialize user state
  const router = useRouter();

  // Fetch connected user data
  const getConnected = async () => {
    const res = await getConnectedUser();
    if (res) {
      setUser(res);
    }
  };

  useEffect(() => {
    getConnected(); // Call on component mount
  }, []);

  console.log(user, 'gg');

  const handlePhotoClick = () => {
    setShowMenu(prev => !prev);
  };

  const handleGoToProfile = () => {
    router.push(`/profile/${user?.user?._id}`); // Assuming user's profile page is at /profile/[id]
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      cursor: 'pointer', // Style the image as clickable
    },
    menu: {
      position: 'absolute',
      top: '60px',
      right: '10px',
      width: '150px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      padding: '10px',
    },
    menuItem: {
      padding: '8px 12px',
      cursor: 'pointer',
      hover: {
        backgroundColor: '#f0f0f0',
      },
    },
  };

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      align="center"
      pl={{ base: 4, md: 12, lg: 12 }}
      pr={{ base: 4, md: 12, lg: 12 }}
      height={`${HEADER_HEIGHT}px`}
      zIndex="2"
      {...props}>
      <Link href="/" title={t('common.homepage')}>
        <Box
          display={{ base: 'none', md: 'block', lg: 'block' }}
          as={DesktopLogo}
          title={t('common.logoImageAltText')}
        />
        <Box
          display={{ base: 'block', md: 'none', lg: 'none' }}
          as={MobileLogo}
          title={t('common.logoImageAltText')}
        />
      </Link>

      {/* <LanguageSelector /> */}
      <div style={styles.container}>
        <div>
          <img
            className="imgUser"
            src={`http://localhost:5000/${user?.user?.photo}`}
            style={styles.image}
            onClick={() => handlePhotoClick()}
          />
          {showMenu && (
            <div style={styles.menu}>
              <div style={styles.menuItem} onClick={handleGoToProfile}>
                Go to Profile
              </div>
              <div
                style={styles.menuItem}
                onClick={() => {
                  setShowMenu(false); // Close menu on logout (or handle logout)
                  // Add your logout logic here
                }}>
                Logout
              </div>
            </div>
          )}
        </div>
        <p>{user ? user.name : 'Guest User'}</p> {/* Display user name */}
      </div>
    </Flex>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  name: {
    fontSize: '16px',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
};
