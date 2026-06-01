import React from "react";
import { Box, VStack, HStack, Button, Text, Heading, Badge, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Icons from "./Icons";

const MotionBox = motion(Box);

export const MedicationList = ({
  reminders,
  activeTab,
  setActiveTab,
  handleToggleTaken,
  handleDeleteReminder,
  handleLoadDemoData,
  setShowAddMed,
  lowStockMeds,
  handleStartRefill,
  deliveryStep,
  colorMode
}) => {
  return (
    <>
      {/* Custom Tab Selectors (Time of Day Categories) */}
      <HStack p={1} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl" justify="space-between">
        {[
          { id: "Morning", icon: Icons.Morning },
          { id: "Afternoon", icon: Icons.Afternoon },
          { id: "Evening", icon: Icons.Evening },
          { id: "Night", icon: Icons.Night }
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          const IconComponent = tab.icon;
          return (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              size="sm"
              flex={1}
              borderRadius="lg"
              bg={isSelected ? "cardBg" : "transparent"}
              boxShadow={isSelected ? "sm" : "none"}
              color={isSelected ? "brand.500" : "mutedText"}
              _hover={{ bg: isSelected ? "cardBg" : "rgba(0,0,0,0.01)" }}
              py={5}
            >
              <VStack spacing={0.5}>
                <IconComponent />
                <Text fontSize="3xs" fontWeight="bold">{tab.id}</Text>
              </VStack>
            </Button>
          );
        })}
      </HStack>

      {/* Categorized Medicine Card List */}
      <VStack spacing={4.5} align="stretch">
        {reminders.length === 0 ? (
          <Box py={12} px={6} textAlign="center" bg="rgba(99,102,241,0.02)" _dark={{ bg: "rgba(99,102,241,0.01)", borderColor: "brand.900" }} borderRadius="xl" border="2px dashed" borderColor="brand.200">
            <Box display="inline-flex" p={3} borderRadius="full" bg="brand.50" _dark={{ bg: "brand.950" }} color="brand.500" mb={3}>
              <Icons.Pill />
            </Box>
            <Heading as="h4" size="sm" mb={2}>Welcome to MEDINOVA!</Heading>
            <Text fontSize="xs" color="mutedText" maxW="320px" mx="auto" mb={5}>
              Your digital medicine cabinet is empty. Get started by adding a medication, scanning a prescription, or loading our interactive demo dataset.
            </Text>
            <Flex justify="center" gap={3} wrap="wrap">
              <Button size="sm" bg="brand.500" color="white" onClick={() => setShowAddMed(true)}>
                Add Medication
              </Button>
              <Button size="sm" variant="outline" borderColor="cardBorder" onClick={handleLoadDemoData}>
                Load Demo Data
              </Button>
            </Flex>
          </Box>
        ) : reminders.filter((r) => r.timeOfDay === activeTab).length === 0 ? (
          <Box py={10} textAlign="center" bg="rgba(0,0,0,0.01)" _dark={{ bg: "rgba(255,255,255,0.01)" }} borderRadius="xl" border="1px dashed" borderColor="cardBorder">
            <Icons.Pill />
            <Text fontSize="xs" color="mutedText" mt={2}>
              No medications scheduled for {activeTab}.
            </Text>
          </Box>
        ) : (
          <AnimatePresence mode="popLayout">
            {reminders
              .filter((r) => r.timeOfDay === activeTab)
              .map((r) => (
                <MotionBox
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  layerStyle="glassPanel"
                  p={4}
                  boxShadow="xs"
                  borderColor={r.taken ? "healthTeal.200" : "cardBorder"}
                  _dark={{ borderColor: r.taken ? "healthTeal.800" : "cardBorder" }}
                  bg={r.taken ? "rgba(20,184,166,0.05)" : "cardBg"}
                  style={{
                    borderLeft: r.taken ? "4px solid #14b8a6" : "4px solid #6366f1"
                  }}
                >
                  <Flex justify="space-between" align="center" gap={3}>
                    {/* Left Info Column */}
                    <VStack align="start" spacing={1}>
                      <HStack spacing={2}>
                        <Heading as="h4" size="sm" m={0} fontWeight="700" textDecoration={r.taken ? "line-through" : "none"} opacity={r.taken ? 0.6 : 1}>
                          {r.medicine}
                        </Heading>
                        <Badge size="xs" bg="rgba(0,0,0,0.05)" _dark={{ bg: "rgba(255,255,255,0.05)" }} borderRadius="md" px={1.5}>
                          {r.foodRelation}
                        </Badge>
                      </HStack>
                      <Text fontSize="xs" color="mutedText">
                        Dosage: {r.dosage}
                      </Text>

                      {/* Stock Tracker warning indicator */}
                      <HStack spacing={1}>
                        {r.stock <= 5 ? (
                          <Box color="warmOrange.500" title="Running low!">
                            <Icons.LowStock />
                          </Box>
                        ) : (
                          <Box color="healthTeal.500">
                            <Icons.Check />
                          </Box>
                        )}
                        <Text fontSize="3xs" fontWeight="bold" color={r.stock <= 5 ? "warmOrange.600" : "mutedText"}>
                          Stock: {r.stock} left (of {r.total})
                        </Text>
                      </HStack>
                    </VStack>

                    {/* Action Buttons */}
                    <HStack spacing={2}>
                      <Button
                        size="xs"
                        bg={r.taken ? "healthTeal.500" : "brand.500"}
                        color="white"
                        px={4.5}
                        py={3.5}
                        borderRadius="md"
                        onClick={() => handleToggleTaken(r.id)}
                        _hover={{ bg: r.taken ? "healthTeal.600" : "brand.600" }}
                      >
                        {r.taken ? "Taken ✓" : "Take"}
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        color="mutedText"
                        p={2.5}
                        borderRadius="md"
                        _hover={{ color: "warmOrange.500", bg: "rgba(0,0,0,0.02)" }}
                        onClick={() => handleDeleteReminder(r.id)}
                        title="Delete reminder"
                      >
                        <Icons.Trash />
                      </Button>
                    </HStack>
                  </Flex>
                </MotionBox>
              ))}
          </AnimatePresence>
        )}
      </VStack>

      {/* Low inventory refills quick actions */}
      {lowStockMeds.length > 0 && (
        <MotionBox
          layerStyle="glass"
          p={5}
          borderColor="warmOrange.200"
          _dark={{ borderColor: "warmOrange.800" }}
          bg="rgba(245,158,11,0.04)"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          mt={4}
        >
          <VStack align="stretch" spacing={3.5}>
            <HStack spacing={2} color="warmOrange.500">
              <Icons.LowStock />
              <Heading as="h3" size="xs" fontWeight="800" m={0}>
                Low Pill Inventories Alert!
              </Heading>
            </HStack>
            <Text fontSize="xs" color="mutedText">
              The following medications are running low. Refill instantly to maintain adherence.
            </Text>
            <VStack spacing={2.5} align="stretch">
              {lowStockMeds.map((med) => (
                <Flex key={med.id} justify="space-between" align="center" bg="cardBg" p={2.5} borderRadius="lg" border="1px solid" borderColor="cardBorder">
                  <VStack align="start" spacing={0}>
                    <Text fontSize="xs" fontWeight="700">{med.medicine}</Text>
                    <Text fontSize="3xs" color="warmOrange.600" _dark={{ color: "warmOrange.400" }} fontWeight="bold">Only {med.stock} pills remaining</Text>
                  </VStack>
                  <Button
                    size="xs"
                    bg="healthTeal.500"
                    color="white"
                    px={4}
                    onClick={() => handleStartRefill([med.id])}
                    isDisabled={deliveryStep > 0}
                  >
                    Refill (100% Stock)
                  </Button>
                </Flex>
              ))}
            </VStack>
          </VStack>
        </MotionBox>
      )}
    </>
  );
};

export default MedicationList;
