import React from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Input,
  Grid,
  GridItem,
  Button,
  Spinner,
} from '@chakra-ui/react';
import AuthorComponent from './AuthorComponent';
const CardNew = ({ key, title, authors, download_count, formats }) => {
  const bgCenter = useColorModeValue('white', 'gray.800');

  return (
    <GridItem>
      <Center py={12} pb="10px">
        <Box
          role={'group'}
          maxW={'330px'}
          w={'full'}
          bg={bgCenter}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${formats['image/jpeg']})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={formats['image/jpeg']}
              //   src={''}
              alt="#"
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              {authors.length > 0 && <AuthorComponent data={authors} />}
            </Text>
            <Heading
              fontSize={'2xl'}
              fontFamily={'body'}
              fontWeight={500}
              textAlign={'center'}
            >
              {title}
            </Heading>
            <Text> download_count :{download_count}</Text>
            {formats['text/plain; charset=utf-8'] ? (
              <Button textAlign={'center'} color={'blue.400'}>
                <a href={formats['text/plain; charset=utf-8']} download>
                  Download Text Version
                </a>
              </Button>
            ) : null}
          </Stack>
        </Box>
      </Center>
    </GridItem>
  );
};

export default CardNew;
