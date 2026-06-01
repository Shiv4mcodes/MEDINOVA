import React from "react";
import { Box, VStack, Heading, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const DigitalCabinet = ({ prescriptions }) => {
  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <VStack align="stretch" spacing={2.5}>
        <Heading as="h4" size="3xs" color="mutedText" fontWeight="bold">DIGITAL CABINET CABINET</Heading>
        {prescriptions.length === 0 ? (
          <Text fontSize="3xs" color="mutedText" textAlign="center" py={2}>
            Cabinet is empty. Scanned prescriptions will archive here.
          </Text>
        ) : (
          <VStack spacing={2} align="stretch" maxH="160px" overflowY="auto">
            {prescriptions.map((file) => (
              <Flex key={file.id} justify="space-between" align="center" bg="rgba(0,0,0,0.01)" _dark={{ bg: "rgba(255,255,255,0.01)" }} p={2} borderRadius="lg" border="1px solid" borderColor="cardBorder">
                <VStack align="start" spacing={0}>
                  <Text fontSize="3xs" fontWeight="700" noOfLines={1} maxW="150px">{file.name}</Text>
                  <Text fontSize="3xs" color="mutedText">{file.date}</Text>
                </VStack>
                <Text fontSize="3xs" color="brand.500" fontWeight="bold" noOfLines={1} maxW="120px">{file.notes}</Text>
              </Flex>
            ))}
          </VStack>
        )}
      </VStack>
    </MotionBox>
  );
};

export default DigitalCabinet;
