import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { BookResponse } from '../lib/api/bookApi';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Spinner, Center, Text } from '@chakra-ui/react';
import { BookRow } from './BookRow';

interface BookTableProps {
  books: BookResponse[];
  fetchMoreData: () => void;
  hasMore: boolean;
}

export const BookTable: FC<BookTableProps> = ({ books, fetchMoreData, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <Center p={4}>
          <Spinner />
        </Center>
      }
      endMessage={
        <Center p={4}>
          <Text fontWeight="bold">You have seen it all</Text>
        </Center>
      }
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>ISBN</Th>
              <Th>Title</Th>
              <Th>Author(s)</Th>
              <Th>Publisher</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book, index) => (
              <BookRow key={`${book.isbn}-${index}`} book={book} index={index} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
};