import React from 'react';
import Pagination from '@choc-ui/paginator';
import { Flex, useToken } from '@chakra-ui/react';

const PaginationComponent = () => {
  const focusRing = useToken('colors', ['brand.400'])[0];
  const handlClick = (e) => {
    console.log('clicked', e);
  };
  return (
    <Flex
      w="full"
      bg={'gray.400'}
      _dark={{
        bg: 'gray.600',
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        onChange={handlClick}
        defaultCurrent={1}
        total={32}
        paginationProps={{
          display: 'flex',
        }}
      />
    </Flex>
  );
};

export default PaginationComponent;
