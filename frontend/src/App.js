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
import axios from 'axios';
import { useEffect, useState } from 'react';

import ProductSimple from './Components/Card';
import AuthorComponent from './Components/AuthorComponent';

import PaginationComponent from './Components/Pagination';

function App() {
  const [state, SetState] = useState('');
  const [data, setData] = useState([]);
  const [limit, SetLimit] = useState(0);
  const [limitTop, SetLimitTop] = useState(0);
  const [loading, SetLoading] = useState(false);
  const [paginationData, setPaginationData] = useState([]);
  const bgCenter = useColorModeValue('white', 'gray.800');
  const getData = async (e) => {
    e.preventDefault();
    try {
      SetLoading(true);
      const response = await axios.get(
        `https://gutendex.com/books/?search=${state}`
      );
      SetLoading(false);
      setData(response.data.results);
      let ans = [];
      for (let i = 0 + limit; i < 10 + limit; i++) {
        if (response.data.results[i] !== undefined) {
          ans.push(response.data.results[i]);
        }
      }
      setPaginationData(ans);
    } catch (er) {
      return console.log(er.message);
    }
  };
  const asignLimits = () => {
    let ans = [];
    for (let i = 0 + limit; i < 10 + limit; i++) {
      if (data[i]) {
        ans.push(data[i]);
      }
    }
    console.log('inside assign', ans);
    setPaginationData(ans);
  };
  const infiniteScroll = async () => {
    try {
      let scrollHeight = document.documentElement.scrollHeight;
      let innerHeight = window.innerHeight;
      let scrollTop = document.documentElement.scrollTop;
      try {
        if (innerHeight + scrollTop + 1 >= scrollHeight) {
          SetLimit((prev) => prev + 10);
          console.log(limit);
          asignLimits();
        }
      } catch (er) {
        console.log('Infinityscroll handle', er.message);
      }
      return console.log(scrollHeight, innerHeight, scrollTop);
    } catch (er) {
      return console.log(er.message);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, []);
  useEffect(() => {
    asignLimits();
  }, [limit]);
  return (
    <>
      <Box w={['80%', '80%', '80%', '50%']} m="auto" pt="10px">
        <form onSubmit={getData}>
          <Input
            placeholder="Search by title and author name"
            onChange={(e) => {
              SetState(e.target.value);
            }}
          />
        </form>
      </Box>
      {paginationData.length == 0 ? (
        <Grid
          mt="50px"
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4,1fr)',
          ]}
          gap="30px"
        >
          {data?.map(({ title, authors, download_count, formats }, index) => {
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
                        alt="#"
                      />
                    </Box>
                    <Stack pt={10} align={'center'}>
                      <Text
                        color={'gray.500'}
                        fontSize={'sm'}
                        textTransform={'uppercase'}
                      >
                        {authors.length > 0 && (
                          <AuthorComponent data={authors} />
                        )}
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
                          <a
                            href={formats['text/plain; charset=utf-8']}
                            download={'download'}
                          >
                            Download Text Version
                          </a>
                        </Button>
                      ) : null}
                    </Stack>
                  </Box>
                </Center>
              </GridItem>
            );
          })}
        </Grid>
      ) : null}
      {!loading ? (
        <Grid
          mt="50px"
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4,1fr)',
          ]}
          gap="30px"
        >
          {paginationData?.map(
            ({ title, authors, download_count, formats }, index) => {
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
                          alt="#"
                        />
                      </Box>
                      <Stack pt={10} align={'center'}>
                        <Text
                          color={'gray.500'}
                          fontSize={'sm'}
                          textTransform={'uppercase'}
                        >
                          {authors.length > 0 && (
                            <AuthorComponent data={authors} />
                          )}
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
                            <a
                              href={formats['text/plain; charset=utf-8']}
                              download={'download'}
                            >
                              Download Text Version
                            </a>
                          </Button>
                        ) : null}
                      </Stack>
                    </Box>
                  </Center>
                </GridItem>
              );
            }
          )}
        </Grid>
      ) : (
        <Box mt="30px" textAlign={'center'}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      )}
      {/* {data.length > 0 && <PaginationComponent />} */}
    </>
  );
}

export default App;
