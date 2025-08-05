import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { type BookResponse } from '../lib/api/bookApi';
import { SimpleGrid, Spinner, Center, Text } from '@chakra-ui/react';
import { BookCard } from './BookCard';

interface BookGalleryProps {
  books: BookResponse[];
  fetchMoreData: () => void;
  hasMore: boolean;
}

export const BookGallery: FC<BookGalleryProps> = ({ books, fetchMoreData, hasMore }) => {
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
          <Text fontWeight="bold">Вы все просмотрели!</Text>
        </Center>
      }
    >
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} 
        spacing={6}
      >
        {books.map((book, index) => (
          <BookCard key={`${book.isbn}-${index}`} book={book} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};