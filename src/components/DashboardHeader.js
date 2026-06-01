import React from "react";
import { Box, Flex, HStack, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Icons from "./Icons";
import CustomSwitch from "./CustomSwitch";

const MotionBox = motion(Box);

export const DashboardHeader = ({
  takenReminders,
  totalReminders,
  streak,
  decreaseFont,
  increaseFont,
  highContrast,
  setHighContrast,
  toggleColorMode,
  colorMode,
  handleLoadDemoData,
  isAboutOpen,
  setIsAboutOpen
}) => {
  return (
    <>
      <MotionBox
        layerStyle="glass"
        p={5}
        mb={8}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={4}>
          {/* Branding & Logo */}
          <HStack spacing={4}>
            <Box
              bg="linear-gradient(135deg, #8b5cf6, #2dd4bf)"
              p={2.5}
              borderRadius="xl"
              color="white"
              className="float-animation shadow-md"
            >
              <Icons.Pill />
            </Box>
            <VStack align="start" spacing={0}>
              <Heading as="h1" className="brand-logo-text">
                MEDINOVA
              </Heading>
              <Text className="brand-subtitle-text">
                Intelligent Medication Care & Health Companion
              </Text>
            </VStack>
          </HStack>

          {/* Centered Ticker / Quick Stats to utilize header empty space */}
          <HStack
            display={{ base: "none", lg: "flex" }}
            spacing={5}
            px={5}
            py={2}
            borderRadius="full"
            bg="rgba(139, 92, 246, 0.05)"
            border="1px solid"
            borderColor="cardBorder"
            fontSize="xs"
            fontWeight="600"
          >
            <HStack spacing={1.5}>
              <Text color="brand.500">💊</Text>
              <Text>{takenReminders} of {totalReminders} Taken Today</Text>
            </HStack>
            <Box w="1px" h="12px" bg="cardBorder" />
            <HStack spacing={1.5}>
              <Text color="warmOrange.500">🔥</Text>
              <Text>{streak}-Day Streak</Text>
            </HStack>
            <Box w="1px" h="12px" bg="cardBorder" />
            <HStack spacing={1.5}>
              <Text color="healthTeal.500">✓</Text>
              <Text>Caregiver Portal Active</Text>
            </HStack>
          </HStack>

          {/* Accessibility & Theme Controls */}
          <HStack spacing={3} wrap="wrap" justify="center">
            <HStack borderRight="1px solid" borderColor="cardBorder" pr={4} mr={1} spacing={2}>
              <Button size="xs" onClick={decreaseFont} variant="ghost" title="Decrease size">A-</Button>
              <Text fontSize="xs" fontWeight="bold">Font Size</Text>
              <Button size="xs" onClick={increaseFont} variant="ghost" title="Increase size">A+</Button>
            </HStack>

            <HStack spacing={2} mr={2}>
              <Text fontSize="xs" fontWeight="bold">Contrast</Text>
              <CustomSwitch
                isChecked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
              />
            </HStack>

            <Button
              onClick={toggleColorMode}
              size="sm"
              variant="outline"
              borderColor="cardBorder"
              borderRadius="lg"
              px={4}
              bg="cardBg"
              _hover={{ bg: "brand.50", _dark: { bg: "rgba(255,255,255,0.05)" } }}
            >
              {colorMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Button>

            <Button
              onClick={handleLoadDemoData}
              size="sm"
              variant="solid"
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.600" }}
              borderRadius="lg"
              px={3}
            >
              Load Demo Data
            </Button>

            <Button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all medication data and start fresh?")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              size="sm"
              variant="outline"
              borderColor="warmOrange.200"
              _hover={{ bg: "rgba(245,158,11,0.05)", color: "warmOrange.600" }}
              borderRadius="lg"
              px={3}
            >
              Clear Data
            </Button>

            <Button
              onClick={() => setIsAboutOpen(true)}
              size="sm"
              variant="outline"
              borderColor="cardBorder"
              _hover={{ bg: "rgba(99,102,241,0.05)" }}
              borderRadius="lg"
              px={3}
            >
              ℹ️ About
            </Button>
          </HStack>
        </Flex>
      </MotionBox>

      {/* Glassmorphic Popover Modal for About Medinova */}
      <AnimatePresence>
        {isAboutOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(3, 4, 12, 0.55)"
            backdropFilter="blur(8px)"
            zIndex={99999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
            onClick={() => setIsAboutOpen(false)}
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              layerStyle="glass"
              maxW="450px"
              w="100%"
              p={5}
              onClick={(e) => e.stopPropagation()}
              boxShadow="2xl"
            >
              <VStack align="stretch" spacing={4}>
                <Flex justify="space-between" align="center">
                  <Heading as="h3" size="xs" fontWeight="900" color="brand.500" letterSpacing="-0.02em">
                    About MEDINOVA
                  </Heading>
                  <Button
                    size="xs"
                    onClick={() => setIsAboutOpen(false)}
                    variant="ghost"
                    borderRadius="md"
                    p={1}
                    minW="auto"
                    _hover={{ bg: "rgba(255,255,255,0.08)" }}
                  >
                    ✕
                  </Button>
                </Flex>
                <Text fontSize="xs" color="textColor" lineHeight="tall">
                  Designed by Shivam Mishra in React. MEDINOVA integrates premium glassmorphic UI aesthetics, AI-simulated prescription scanning (OCR), live doctor consultation rooms, weekly lifestyle wellness trackers, drug safety checkers, and caregiver connectivity to make therapy management effortless.
                </Text>
                <Box borderTop="1px solid" borderColor="cardBorder" pt={3} mt={1}>
                  <Text fontSize="3xs" color="mutedText">
                    All AI features, OCR scans, and consultations are fully simulated design demonstrations.
                  </Text>
                </Box>
              </VStack>
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardHeader;
