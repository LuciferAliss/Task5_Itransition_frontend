import type { FC } from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  Icon,
  Flex,
  Tag,
  useDisclosure,
  Collapse,
  Divider,
  List,
  ListItem
} from '@chakra-ui/react';
import { FaThumbsUp } from 'react-icons/fa';
import { type BookResponse } from '../lib/api/bookApi';

interface BookCardProps {
  book: BookResponse;
}

export const BookCard: FC<BookCardProps> = ({ book }) => {
  const { isOpen, onToggle } = useDisclosure();

  const coverImageUrl = `https://placehold.co/300x450/CD5C5C/fff?text=${book.title}&font=lora`;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      onClick={onToggle}
      cursor="pointer"
    >
      <Image src={coverImageUrl} alt={`Обложка для ${book.title}`} objectFit="cover" />
      
      <VStack p={4} align="stretch" spacing={3}>
        <Text fontWeight="bold" fontSize="lg" noOfLines={2} title={book.title}>
          {book.title}
        </Text>
        
        <Text fontSize="sm" color="gray.600" noOfLines={1} title={book.author}>
          by {book.author}
        </Text>

        <Flex justify="space-between" align="center" mt={2}>
          <Tag size="sm" colorScheme="purple">{book.publisher}</Tag>
          
          <Box
            display="inline-flex"
            alignItems="center"
            bg="blue.500"
            color="white"
            borderRadius="md"
            px={2}
            py={1}
          >
            <Icon as={FaThumbsUp} mr={2} />
            <Text fontWeight="bold" fontSize="sm">{book.likes}</Text>
          </Box>
        </Flex>
      </VStack>

      <Collapse in={isOpen} animateOpacity>
        <Divider />
        <Box p={4}>
          <Text fontWeight="bold" mb={2}>Reviews:</Text>
          <List spacing={2}>
            {book.reviews.length > 0 ? (
              book.reviews.map((review, i) => (
                <ListItem key={i} fontSize="sm" fontStyle="italic">
                  “{review}”
                </ListItem>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">No reviews yet.</Text>
            )}
          </List>
        </Box>
      </Collapse>
    </Box>
  );
};