import React from "react";
import { Box, SimpleGrid, VStack, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Icons from "./Icons";

const MotionBox = motion(Box);

export const AdherenceTracker = ({ adherenceRate, streak }) => {
  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <SimpleGrid columns={2} spacing={4}>
        {/* Progress Wheel */}
        <VStack spacing={2} align="center" justify="center">
          <Box position="relative" w="80px" h="80px">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="transparent"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="6"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                fill="transparent"
                stroke="url(#progressGrad)"
                strokeWidth="6.5"
                strokeDasharray={2 * Math.PI * 34}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - adherenceRate / 100) }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
            >
              <Text fontWeight="800" fontSize="md" m={0}>
                {adherenceRate}%
              </Text>
            </Box>
          </Box>
          <Text fontSize="xs" fontWeight="bold" color="mutedText">
            Today's Adherence
          </Text>
        </VStack>

        {/* Consecutive Streak widget */}
        <VStack spacing={1} justify="center" borderLeft="1px solid" borderColor="cardBorder">
          <Box color="warmOrange.500" className="float-animation">
            <Icons.HeartGlow />
          </Box>
          <Heading as="h4" size="md" m={0} fontWeight="900" color="warmOrange.600" _dark={{ color: "warmOrange.400" }}>
            {streak} Days Streak
          </Heading>
          <Text fontSize="2xs" color="mutedText" textAlign="center">
            Adherence maintained!
          </Text>
        </VStack>
      </SimpleGrid>
    </MotionBox>
  );
};

export default AdherenceTracker;
