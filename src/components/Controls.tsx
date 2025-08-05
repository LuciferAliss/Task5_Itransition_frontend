import type { FC } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Flex,
  IconButton,
  VStack,
  Text
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons'

interface ControlsProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  seed: number;
  onSeedChange: (seed: number) => void;
  likes: number;
  onLikesChange: (likes: number) => void;
  reviews: number;
  onReviewsChange: (reviews: number) => void;
}

export const Controls: FC<ControlsProps> = ({
  language,
  onLanguageChange,
  seed,
  onSeedChange,
  likes,
  onLikesChange,
  reviews,
  onReviewsChange,
}) => {
  const generateRandomSeed = () => {
    onSeedChange(Math.floor(Math.random() * 1000000));
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Flex 
        direction={{ base: 'column', xl: 'row' }}
        alignItems="center" 
        gap={6} 
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          gap={6}
          w="100%"
        >
          <FormControl>
            <FormLabel htmlFor="language-select" whiteSpace="nowrap">Язык</FormLabel>
            <Select id="language-select" value={language} onChange={(e) => onLanguageChange(e.target.value)}>
              <option value="en">English</option>
              <option value="de">Deutsche</option>
              <option value="fr">French</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="seed-input">Seed</FormLabel>
            <Flex gap={2}>
              <NumberInput flex="1" size="md" value={seed} onChange={(_, valueAsNumber) => onSeedChange(isNaN(valueAsNumber) ? 0 : valueAsNumber)} min={0}>
                <NumberInputField id="seed-input" />
              </NumberInput>
              <IconButton icon={<RepeatIcon/>} onClick={generateRandomSeed} aria-label='Generate random seed'/>
            </Flex>
          </FormControl>
        </Flex>
        
        <VStack spacing={4} w="100%">
          <FormControl>
            <Text textAlign="center" mb={2}>Likes: {likes}</Text>
            <Slider
              aria-label='slider-likes'
              value={likes}
              onChange={(val) => onLikesChange(val)}
              min={0} max={10} step={0.1}
            >
              <SliderTrack><SliderFilledTrack /></SliderTrack>
              <SliderThumb bg='blue.500'/>
            </Slider>
          </FormControl>

          <FormControl>
            <Text textAlign="center" mb={2}>Reviews: {reviews}</Text>
            <Slider
              aria-label='slider-reviews'
              value={reviews}
              onChange={(val) => onReviewsChange(val)}
              min={0} max={10} step={0.1}
            >
              <SliderTrack><SliderFilledTrack /></SliderTrack>
              <SliderThumb bg='blue.500'/>
            </Slider>
          </FormControl>
        </VStack>

      </Flex>
    </Box>
  );
};