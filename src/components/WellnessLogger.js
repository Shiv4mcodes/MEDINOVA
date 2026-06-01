import React, { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Flex, HStack, Input, SimpleGrid, Button, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const WellnessLogger = ({
  waterCups,
  setWaterCups,
  sleepHours,
  setSleepHours,
  exerciseMins,
  setExerciseMins
}) => {
  // Local sub-states for enhanced interactivity
  const [sleepQuality, setSleepQuality] = useState(() => {
    return localStorage.getItem("medinova_sleepQuality") || "Rested";
  });
  const [workoutType, setWorkoutType] = useState(() => {
    return localStorage.getItem("medinova_workoutType") || "Run";
  });

  // Persist local sub-states
  useEffect(() => {
    localStorage.setItem("medinova_sleepQuality", sleepQuality);
  }, [sleepQuality]);

  useEffect(() => {
    localStorage.setItem("medinova_workoutType", workoutType);
  }, [workoutType]);

  // Math for Calorie estimator
  const calorieMultipliers = {
    Run: 9.5,
    Gym: 6.5,
    Yoga: 3.5,
    Walk: 4.5
  };
  const activeMultiplier = calorieMultipliers[workoutType] || 5;
  const estimatedCalories = Math.round(exerciseMins * activeMultiplier);

  // Sleep status text helper
  const getSleepStatus = (hours) => {
    if (hours < 6) return { label: "Insufficient", color: "warmOrange" };
    if (hours <= 8.5) return { label: "Optimal", color: "teal" };
    return { label: "Extended", color: "purple" };
  };
  const sleepStatus = getSleepStatus(sleepHours);

  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <VStack align="stretch" spacing={5}>
        <VStack align="start" spacing={1}>
          <Heading as="h3" size="xs" fontWeight="800" fontFamily="heading">
            Hydration & Daily Wellness
          </Heading>
          <Text fontSize="2xs" color="mutedText">
            Log lifestyle factors to analyze wellness trends and compliance.
          </Text>
        </VStack>

        {/* 1. Water Hydration cups */}
        <VStack align="stretch" spacing={2.5} p={3.5} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl" border="1px solid" borderColor="cardBorder">
          <Flex justify="space-between" align="center">
            <Text fontSize="xs" fontWeight="bold">💧 Water Hydration:</Text>
            <Text fontSize="xs" fontWeight="bold" color="brand.500">{waterCups} / 8 Cups</Text>
          </Flex>
          <HStack spacing={2} wrap="wrap">
            {Array.from({ length: 8 }).map((_, idx) => {
              const filled = idx < waterCups;
              return (
                <Box
                  key={idx}
                  w="28px"
                  h="32px"
                  borderRadius="b"
                  border="2px solid"
                  borderColor={filled ? "brand.400" : "cardBorder"}
                  bg={filled ? "rgba(99, 102, 241, 0.4)" : "transparent"}
                  cursor="pointer"
                  onClick={() => setWaterCups(idx + 1 === waterCups ? idx : idx + 1)}
                  transition="all 0.2s"
                  position="relative"
                  _hover={{ transform: "scale(1.15)" }}
                  style={{
                    borderBottomLeftRadius: "6px",
                    borderBottomRightRadius: "6px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px"
                  }}
                >
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    height={filled ? "100%" : "0%"}
                    bg="brand.400"
                    opacity={0.85}
                    transition="height 0.3s"
                    style={{
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px"
                    }}
                  />
                </Box>
              );
            })}
          </HStack>
        </VStack>

        {/* 2. Interactive Sleep Tracker with vertical spacing utilization */}
        <VStack align="stretch" spacing={3} p={3.5} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl" border="1px solid" borderColor="cardBorder">
          <Flex justify="space-between" align="center">
            <Text fontSize="xs" fontWeight="bold">💤 Sleep Tracker:</Text>
            <Badge colorScheme={sleepStatus.color} variant="subtle" fontSize="3xs" px={2} borderRadius="md">
              {sleepStatus.label}
            </Badge>
          </Flex>

          <HStack justify="space-between" align="center" py={1}>
            <HStack spacing={1}>
              <Text fontSize="2xl" fontWeight="900" color="brand.600" _dark={{ color: "brand.400" }}>{sleepHours}</Text>
              <Text fontSize="xs" fontWeight="bold" color="mutedText">hours</Text>
            </HStack>
            <HStack spacing={1.5}>
              <Button size="xs" onClick={() => setSleepHours(prev => Math.max(0, prev - 0.5))} variant="outline" borderColor="cardBorder">-0.5h</Button>
              <Button size="xs" onClick={() => setSleepHours(prev => Math.min(24, prev + 0.5))} variant="outline" borderColor="cardBorder">+0.5h</Button>
              <Button size="xs" onClick={() => setSleepHours(8)} bg="rgba(139, 92, 246, 0.1)" color="brand.500" _hover={{ bg: "rgba(139, 92, 246, 0.2)" }}>Reset</Button>
            </HStack>
          </HStack>

          {/* Sleep Quality Logger Tags */}
          <VStack align="start" spacing={1.5} pt={1}>
            <Text fontSize="3xs" fontWeight="bold" color="mutedText">SLEEP QUALITY</Text>
            <HStack spacing={1.5} wrap="wrap">
              {[
                { key: "Deep", label: "😴 Deep", color: "purple" },
                { key: "Rested", label: "😌 Rested", color: "teal" },
                { key: "Light", label: "🥱 Light", color: "yellow" },
                { key: "Restless", label: "☠️ Restless", color: "red" }
              ].map((q) => {
                const isSelected = sleepQuality === q.key;
                return (
                  <Badge
                    key={q.key}
                    cursor="pointer"
                    px={2.5}
                    py={1}
                    borderRadius="md"
                    fontSize="3xs"
                    bg={isSelected ? "brand.500" : "rgba(0,0,0,0.04)"}
                    color={isSelected ? "white" : "textColor"}
                    _dark={{ bg: isSelected ? "brand.500" : "rgba(255,255,255,0.04)" }}
                    onClick={() => setSleepQuality(q.key)}
                    transition="all 0.2s"
                    style={{ transform: isSelected ? "scale(1.05)" : "scale(1)" }}
                  >
                    {q.label}
                  </Badge>
                );
              })}
            </HStack>
          </VStack>
        </VStack>

        {/* 3. Interactive Exercise Tracker */}
        <VStack align="stretch" spacing={3} p={3.5} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl" border="1px solid" borderColor="cardBorder">
          <Flex justify="space-between" align="center">
            <Text fontSize="xs" fontWeight="bold">🏃 Exercise & Workouts:</Text>
            <Badge colorScheme="orange" variant="subtle" fontSize="3xs" px={2} borderRadius="md">
              🔥 {estimatedCalories} kcal
            </Badge>
          </Flex>

          <HStack justify="space-between" align="center" py={1}>
            <HStack spacing={1}>
              <Text fontSize="2xl" fontWeight="900" color="warmOrange.600" _dark={{ color: "warmOrange.400" }}>{exerciseMins}</Text>
              <Text fontSize="xs" fontWeight="bold" color="mutedText">mins</Text>
            </HStack>
            <HStack spacing={1.5}>
              <Button size="xs" onClick={() => setExerciseMins(prev => Math.max(0, prev - 5))} variant="outline" borderColor="cardBorder">-5m</Button>
              <Button size="xs" onClick={() => setExerciseMins(prev => Math.min(300, prev + 5))} variant="outline" borderColor="cardBorder">+5m</Button>
              <Button size="xs" onClick={() => setExerciseMins(prev => Math.min(300, prev + 15))} bg="rgba(245, 158, 11, 0.1)" color="warmOrange.500" _hover={{ bg: "rgba(245, 158, 11, 0.2)" }}>+15m</Button>
            </HStack>
          </HStack>

          {/* Activity Category Selection */}
          <VStack align="start" spacing={1.5} pt={1}>
            <Text fontSize="3xs" fontWeight="bold" color="mutedText">WORKOUT CATEGORY</Text>
            <SimpleGrid columns={4} spacing={2} width="100%">
              {[
                { key: "Run", label: "🏃 Run" },
                { key: "Gym", label: "🏋️ Gym" },
                { key: "Yoga", label: "🧘 Yoga" },
                { key: "Walk", label: "🚶 Walk" }
              ].map((w) => {
                const isSelected = workoutType === w.key;
                return (
                  <Button
                    key={w.key}
                    size="xs"
                    variant={isSelected ? "solid" : "outline"}
                    bg={isSelected ? "warmOrange.500" : "transparent"}
                    color={isSelected ? "white" : "textColor"}
                    _hover={{ bg: isSelected ? "warmOrange.600" : "rgba(0,0,0,0.02)" }}
                    borderColor="cardBorder"
                    onClick={() => setWorkoutType(w.key)}
                    borderRadius="md"
                    fontSize="3xs"
                    py={3}
                  >
                    {w.label}
                  </Button>
                );
              })}
            </SimpleGrid>
          </VStack>
        </VStack>
      </VStack>
    </MotionBox>
  );
};

export default WellnessLogger;
