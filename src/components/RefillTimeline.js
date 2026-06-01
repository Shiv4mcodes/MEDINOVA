import React from "react";
import { Box, VStack, Heading, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Icons from "./Icons";

const MotionBox = motion(Box);

export const RefillTimeline = ({
  deliveryStep,
  deliveryMeds,
  deliveryProgress,
  reminders,
  handleStartRefill
}) => {
  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <VStack align="stretch" spacing={4.5}>
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Heading as="h3" size="xs" fontWeight="800" fontFamily="heading" m={0}>
              Pharmacy Refills
            </Heading>
            <Text fontSize="3xs" color="mutedText">Timeline Delivery Service</Text>
          </VStack>
          <Box color="brand.500">
            <Icons.Delivery />
          </Box>
        </Flex>

        {/* Idle Checkout State */}
        {deliveryStep === 0 ? (
          <VStack spacing={3} align="stretch">
            <Text fontSize="xs" color="mutedText">
              Place order for low medicines. Our partner pharmacies deliver refills instantly.
            </Text>
            <Button
              size="xs"
              bg="brand.500"
              color="white"
              onClick={() => handleStartRefill(reminders.map((r) => r.id))}
              _hover={{ bg: "brand.600" }}
            >
              Order All Refills
            </Button>
          </VStack>
        ) : (
          /* Active delivery tracking timeline */
          <VStack spacing={4.5} align="stretch" position="relative" p={1.5}>
            <Text fontSize="2xs" fontWeight="bold" color="brand.600" _dark={{ color: "brand.400" }}>
              Delivery Status: Refilling {deliveryMeds.map(id => reminders.find(r => r.id === id)?.medicine).filter(Boolean).join(", ")}...
            </Text>

            {/* Visual Progress Bar */}
            <Box w="100%" h="6px" bg="rgba(0,0,0,0.05)" _dark={{ bg: "rgba(255,255,255,0.05)" }} borderRadius="full" overflow="hidden">
              <motion.div
                style={{ height: "100%", background: "linear-gradient(90deg, #6366f1, #2dd4bf)" }}
                animate={{ width: `${deliveryProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </Box>

            {/* Step-by-step indicator nodes */}
            <HStack justify="space-between" position="relative" pt={1}>
              {[
                { label: "Ordered", step: 1 },
                { label: "Packing", step: 2 },
                { label: "Shipped", step: 3 },
                { label: "Delivered", step: 4 }
              ].map((node) => {
                const active = deliveryStep >= node.step;
                return (
                  <VStack key={node.step} spacing={1} align="center">
                    <Box
                      w="16px"
                      h="16px"
                      borderRadius="full"
                      bg={active ? "brand.500" : "rgba(0,0,0,0.08)"}
                      _dark={{ bg: active ? "brand.400" : "rgba(255,255,255,0.08)", border: "3px solid #030712" }}
                      border="3px solid white"
                      boxShadow="xs"
                      transition="background-color 0.3s"
                    />
                    <Text fontSize="3xs" fontWeight="bold" color={active ? "textColor" : "mutedText"}>
                      {node.label}
                    </Text>
                  </VStack>
                );
              })}
            </HStack>
          </VStack>
        )}
      </VStack>
    </MotionBox>
  );
};

export default RefillTimeline;
