import React from "react";
import { Box, VStack, HStack, Heading, Text, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const HealthCheckIn = ({
  todayMood,
  handleMoodSelect,
  todaySymptoms,
  handleSymptomToggle
}) => {
  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <VStack align="stretch" spacing={4}>
        <VStack align="start" spacing={1}>
          <Heading as="h3" size="xs" fontWeight="700">
            Daily Health Check-in
          </Heading>
          <Text fontSize="2xs" color="mutedText">
            How do you feel today, Shivam?
          </Text>
        </VStack>

        {/* Mood emojis slider */}
        <HStack justify="space-between" p={1.5} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl">
          {[
            { val: 1, emoji: "😢", label: "Awful" },
            { val: 2, emoji: "😕", label: "Poor" },
            { val: 3, emoji: "😐", label: "Okay" },
            { val: 4, emoji: "🙂", label: "Good" },
            { val: 5, emoji: "😄", label: "Great" }
          ].map((m) => (
            <VStack
              key={m.val}
              spacing={0}
              onClick={() => handleMoodSelect(m.val)}
              cursor="pointer"
              p={1.5}
              borderRadius="lg"
              bg={todayMood === m.val ? "rgba(99,102,241,0.15)" : "transparent"}
              style={{ transform: todayMood === m.val ? "scale(1.1)" : "scale(1)" }}
              transition="all 0.2s"
            >
              <Text fontSize="xl" m={0}>{m.emoji}</Text>
              <Text fontSize="3xs" color="mutedText" fontWeight="bold">{m.label}</Text>
            </VStack>
          ))}
        </HStack>

        {/* Symptoms select */}
        <VStack align="start" spacing={2}>
          <Text fontSize="3xs" fontWeight="bold" color="mutedText">ACTIVE SYMPTOMS</Text>
          <HStack wrap="wrap" spacing={1.5}>
            {["Headache", "Fatigue", "Nausea", "Muscle Pain", "Cough"].map((symptom) => {
              const isSelected = todaySymptoms.includes(symptom);
              return (
                <Badge
                  key={symptom}
                  cursor="pointer"
                  bg={isSelected ? "warmOrange.500" : "rgba(0,0,0,0.05)"}
                  color={isSelected ? "white" : "textColor"}
                  _dark={{ bg: isSelected ? "warmOrange.500" : "rgba(255,255,255,0.05)" }}
                  px={2.5}
                  py={1}
                  borderRadius="md"
                  fontSize="2xs"
                  onClick={() => handleSymptomToggle(symptom)}
                  transition="all 0.2s"
                >
                  {symptom}
                </Badge>
              );
            })}
          </HStack>
        </VStack>
      </VStack>
    </MotionBox>
  );
};

export default HealthCheckIn;
