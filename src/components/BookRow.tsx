import type { FC } from 'react';
import type { BookResponse } from '../lib/api/bookApi';
import { Tr, Td, useDisclosure, Collapse, Box, List, ListItem, Image, Text, Flex, VStack, Icon } from '@chakra-ui/react';
import { FaThumbsUp } from 'react-icons/fa';

interface BookRowProps {
  book: BookResponse;
  index: number;
}

export const BookRow: FC<BookRowProps> = ({ book, index }) => {
  const { isOpen, onToggle } = useDisclosure();
  
  const coverImageUrl = `https://placehold.co/300x450/CD5C5C/fff?text=${book.title}&font=lora`;

  return (
    <>
      <Tr onClick={onToggle} cursor="pointer" _hover={{ bg: 'gray.100' }}>
        <Td>{index + 1}</Td>
        <Td>{book.isbn}</Td>
        <Td>{book.title}</Td>
        <Td>{book.author}</Td>
        <Td>{book.publisher}</Td>
      </Tr>
      <Tr>
        <Td colSpan={5} p={0} border="none">
          <Collapse in={isOpen} animateOpacity>
            <Box p={4} bg="gray.50">
                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                  
                  <VStack spacing={3} alignItems="center">
                    <Image 
                      src={coverImageUrl} 
                      alt={`Обложка для ${book.title}`} 
                      w="150px" 
                      h="250px" 
                      flexShrink={0} 
                      borderRadius="md"
                      objectFit="cover"
                    />
                    
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      bg="blue.500"
                      color="white"
                      borderRadius="md"
                      px={3} 
                      py={1} 
                    >
                      <Icon as={FaThumbsUp} mr={2} />
                      <Text fontWeight="bold" fontSize="md">
                        {book.likes}
                      </Text>
                    </Box>
                  </VStack>

                  <VStack spacing={2} alignItems="flex-start">
                    <Text fontWeight="bold" fontSize="x-large">{book.title}</Text>
                    <Text fontWeight="medium" fontSize="lg">by {book.author}</Text>
                    <Text fontWeight="light" fontSize="lg">{book.publisher}</Text>
                    <Text fontWeight="italic" fontSize="lg" mt='2'>Reviews:</Text>
                    
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
                  </VStack>
                
                </Flex>
            </Box>
          </Collapse>
        </Td>
      </Tr>
    </>
  );
};