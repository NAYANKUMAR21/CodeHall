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

import CardNew from './Components/CardNew';

function App() {
  const [state, SetState] = useState('');
  const [data, setData] = useState([]);
  const [limit, SetLimit] = useState(0);
  const [loading, SetLoading] = useState(false);
  const [paginationData, setPaginationData] = useState([]);
  const [page, setPage] = useState('https://gutendex.com/books');

  const getData = async () => {
    try {
      SetLoading(true);

      const response = await axios.get(`${page}/?search=${state}`);

      SetLoading(false);
      setData((prev) => [...prev, ...response.data.results]);
      setPage(response.data.next);
      console.log('LINK', response.data.next);

      let ans = [];
      for (let i = 0; i < 10; i++) {
        if (response.data.results[i]) {
          ans.push(response.data.results[i]);
        }
      }
      setPaginationData((prev) => [...prev, ...ans]);
    } catch (er) {
      return console.log(er.message);
    }
  };
  const getNextPage = async () => {
    try {
      const response = await axios.get(`${page}`);
      setData((prev) => [...prev, ...response.data.results]);
      setPage(response.data.next);

      console.log('LINK', response.data.next);
    } catch (er) {
      return console.log(er.message);
    }
  };
  const asignLimits = () => {
    let ans = [];

    for (let i = limit; i < 10 + limit; i++) {
      if (data[i]) {
        ans.push(data[i]);
      }
    }
    console.log('Ans Length - >', ans, ans.length);
    setPaginationData((prev) => [...prev, ...ans]);
  };
  const infiniteScroll = async () => {
    try {
      let scrollHeight = document.documentElement.scrollHeight;
      let innerHeight = window.innerHeight;
      let scrollTop = document.documentElement.scrollTop;
      // let scrollTop = window.scrollY;

      if (innerHeight + scrollTop + 1 >= scrollHeight) {
        SetLimit((prev) => prev + 10);
        asignLimits();
      }
      // console.log(scrollTop, innerHeight, scrollHeight);
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

  useEffect(() => {
    console.log('function call');
    if (
      paginationData.length !== 0 &&
      paginationData.length === data.length &&
      page
    ) {
      getNextPage();
    }
  }, [paginationData]);

  console.log(limit);
  console.log('paginate', paginationData);
  console.log('Actual data', data);
  return (
    <>
      <Text>{page}</Text>
      <Box
        w={['80%', '80%', '80%', '50%']}
        m="auto"
        pt="10px"
        display={'flex'}
        gap="10px"
      >
        <Input
          placeholder="Search by title and author name"
          onChange={(e) => {
            SetState(e.target.value);
          }}
        />
        <Button onClick={getData}>Submit</Button>
      </Box>

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
          {paginationData?.map((item, index) => {
            return (
              <CardNew
                title={item?.title}
                authors={item?.authors}
                download_count={item?.download_count}
                formats={item?.formats}
              />
            );
          })}
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
      {/* <Button
        onClick={() => {
          SetLimit((prev) => prev + 10);
          asignLimits();
        }}
      >
        Paginate
      </Button> */}
    </>
  );
}

export default App;
