import React from "react";
import { Box, VStack, Heading, Text, Flex, Badge, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const DailyQuests = ({
  waterCups,
  exerciseMins,
  todayMood,
  takenReminders,
  totalReminders
}) => {
  const quests = [
    { id: "water", label: `Drink 8 cups of water (Current: ${waterCups}/8)`, done: waterCups >= 8 },
    { id: "exercise", label: `Exercise for 30 minutes (Current: ${exerciseMins}/30)`, done: exerciseMins >= 30 },
    { id: "mood", label: "Complete Daily Mood check-in", done: todayMood !== 0 },
    { id: "meds", label: `Complete medication dose (${takenReminders}/${totalReminders} taken)`, done: totalReminders > 0 && takenReminders > 0 }
  ];
  const completedQuests = quests.filter(q => q.done).length;
  const questProgress = Math.round((completedQuests / quests.length) * 100);

  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <VStack align="stretch" spacing={4.5}>
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0.5}>
            <Heading as="h3" size="xs" fontWeight="800" fontFamily="heading">
              Daily Health Quests
            </Heading>
            <Text fontSize="xs" color="mutedText">
              Complete targets to build wellness streaks
            </Text>
          </VStack>
          <Badge bg="brand.500" color="white" borderRadius="full" px={2.5}>
            {completedQuests} / {quests.length} Completed
          </Badge>
        </Flex>

        {/* Progress bar */}
        <VStack align="stretch" spacing={1.5}>
          <Flex justify="space-between" fontSize="3xs" fontWeight="bold">
            <Text>Quest Progress</Text>
            <Text color="brand.500">{questProgress}%</Text>
          </Flex>
          <Box w="100%" h="8px" bg="rgba(0,0,0,0.05)" _dark={{ bg: "rgba(255,255,255,0.05)" }} borderRadius="full" overflow="hidden">
            <motion.div
              style={{ height: "100%", background: "linear-gradient(90deg, #6366f1, #2dd4bf)" }}
              animate={{ width: `${questProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          </Box>
        </VStack>

        {/* Quest checklist cards */}
        <VStack spacing={2} align="stretch">
          {quests.map((q) => (
            <Flex
              key={q.id}
              align="center"
              justify="space-between"
              p={3}
              borderRadius="xl"
              border="1px solid"
              borderColor={q.done ? "healthTeal.200" : "cardBorder"}
              bg={q.done ? "rgba(20,184,166,0.04)" : "rgba(0,0,0,0.01)"}
              _dark={{ borderColor: q.done ? "healthTeal.900" : "cardBorder", bg: q.done ? "rgba(20,184,166,0.03)" : "rgba(255,255,255,0.01)" }}
              transition="all 0.25s"
              style={{ transform: q.done ? "scale(1.01)" : "scale(1)" }}
            >
              <HStack spacing={2.5}>
                <Box
                  w="18px"
                  h="18px"
                  borderRadius="full"
                  bg={q.done ? "healthTeal.500" : "rgba(0,0,0,0.06)"}
                  _dark={{ bg: q.done ? "healthTeal.500" : "rgba(255,255,255,0.05)" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="9px"
                  fontWeight="bold"
                >
                  {q.done ? "✓" : "○"}
                </Box>
                <Text fontSize="2xs" fontWeight={q.done ? "bold" : "normal"} color={q.done ? "textColor" : "mutedText"} textDecoration={q.done ? "line-through" : "none"} opacity={q.done ? "0.8" : "1"}>
                  {q.label}
                </Text>
              </HStack>
              {q.done && (
                <Badge size="xs" colorScheme="teal" variant="subtle" fontSize="3xs">
                  +10 XP
                </Badge>
              )}
            </Flex>
          ))}
        </VStack>
      </VStack>
    </MotionBox>
  );
};

export default DailyQuests;
