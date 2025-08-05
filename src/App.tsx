import { useState, useEffect, useCallback } from 'react';
import { Container, Spinner, Center, Text, Box, Flex, ButtonGroup, IconButton, useBreakpointValue, Spacer } from '@chakra-ui/react';
import { type BookResponse, bookApi } from './lib/api/bookApi';
import { Controls } from './components/Controls';
import { BookTable } from './components/BookTable';
import { BookGallery } from './components/BookGallery';
import { FaDownload, FaTable, FaTh } from 'react-icons/fa';

const INITIAL_PAGE_SIZE = 20;
const SUBSEQUENT_PAGE_SIZE = 10;

type ViewMode = 'table' | 'gallery';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const effectiveViewMode: ViewMode = isMobile ? 'gallery' : viewMode;

  const [language, setLanguage] = useState('en');
  const [seed, setSeed] = useState(12345);
  const [likes, setLikes] = useState(5.0);
  const [reviews, setReviews] = useState(5.0);

  const [books, setBooks] = useState<BookResponse[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isNewRequest, setIsNewRequest] = useState(true);

  const [isDownloading, setIsDownloading] = useState(false);

  const loadBooks = useCallback(async (isInitialLoad: boolean) => {
    setIsLoading(true);
    setError(null);

    const currentPage = isInitialLoad ? 1 : page;
    const pageSize = isInitialLoad ? INITIAL_PAGE_SIZE : SUBSEQUENT_PAGE_SIZE;

    try {
      const newBooks = await bookApi.fetchBooks({
        language,
        seed,
        page: currentPage,
        pageSize,
        likes,
        reviews,
      });

      if (isInitialLoad) {
        setBooks(newBooks);
      } else {
        setBooks(prevBooks => [...prevBooks, ...newBooks]);
      }
      
      setHasMore(newBooks.length === pageSize);
      setPage(currentPage + 1);

    } catch (e) {
      setError("Some error occurred while fetching books.");
    } finally {
      setIsLoading(false);
      if(isInitialLoad) setIsNewRequest(false);
    }
  }, [language, seed, likes, reviews, page]);

  const handleDownloadCsv = async () => {
    if (books.length === 0) {
      return;
    }
    setIsDownloading(true);
    try {
      const blob = await bookApi.downloadCsv({ books });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'books.csv';
      
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      alert("Some error occurred while downloading CSV.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setBooks([]);
    setHasMore(true);
    setIsNewRequest(true);
  }, [language, seed, likes, reviews]);

  useEffect(() => {
      if (isNewRequest) {
          loadBooks(true);
      }
  }, [isNewRequest, loadBooks]);

  const fetchMoreData = () => {
    if (!isLoading && hasMore) {
      loadBooks(false);
    }
  };
  
  return (
    <Container maxW="container.xl" py={2} minH="100vh" display="flex" flexDirection="column">
      
      <Box position="sticky" top="0" zIndex={10} bg="white" py={2}>
        <Flex justify="space-between" align="center" mb={4}>
          {!isMobile && (
            <ButtonGroup isAttached variant="outline">
              <IconButton
                aria-label=""
                icon={<FaTable />}
                onClick={() => setViewMode('table')}
                isActive={effectiveViewMode === 'table'}
              />
              <IconButton
                aria-label=""
                icon={<FaTh />}
                onClick={() => setViewMode('gallery')}
                isActive={effectiveViewMode === 'gallery'}
              />
            </ButtonGroup>
          )}
          <Spacer />
          <IconButton
            aria-label=""
            colorScheme="blue"
            icon={<FaDownload />}
            onClick={handleDownloadCsv}
            isLoading={isDownloading}
            isDisabled={books.length === 0 || isLoading}
          ></IconButton>
        </Flex>

        <Controls
            language={language}
            onLanguageChange={setLanguage}
            seed={seed}
            onSeedChange={setSeed}
            likes={likes}
            onLikesChange={setLikes}
            reviews={reviews}
            onReviewsChange={setReviews}
        />
      </Box>

      <Box mt={6}>
        {isLoading && books.length === 0 ? (
          <Center h="200px"><Spinner size="xl" /></Center>
        ) : error ? (
          <Center h="200px"><Text color="red.500">{error}</Text></Center>
        ) : (
          effectiveViewMode === 'table' ? (
            <BookTable books={books} fetchMoreData={fetchMoreData} hasMore={hasMore} />
          ) : (
            <BookGallery books={books} fetchMoreData={fetchMoreData} hasMore={hasMore} />
          )
        )}
      </Box>
    </Container>
  );
}

export default App;