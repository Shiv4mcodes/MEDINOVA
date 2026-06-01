import React from "react";
import { Box, VStack, Heading, Text, Input, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import CustomSwitch from "./CustomSwitch";

const MotionBox = motion(Box);

export const CaregiverLink = ({
  caregiverEmail,
  setCaregiverEmail,
  caregiverNotif,
  setCaregiverNotif
}) => {
  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <VStack align="stretch" spacing={3.5}>
        <Heading as="h3" size="xs" fontWeight="800" fontFamily="heading">
          Caregiver Link Portal
        </Heading>
        <Text fontSize="2xs" color="mutedText">
          Share compliance logs automatically with a family member or doctor.
        </Text>
        
        {/* Email config */}
        <VStack spacing={2.5} align="stretch">
          <Input
            placeholder="Caregiver's Email (e.g. mom@email.com)"
            value={caregiverEmail}
            onChange={(e) => setCaregiverEmail(e.target.value)}
            size="xs"
            borderRadius="md"
            bg="cardBg"
            borderColor="cardBorder"
          />
          <Flex justify="space-between" align="center" pt={1}>
            <Text fontSize="3xs" fontWeight="bold" color="mutedText">
              SMS Compliance Alerts
            </Text>
            <CustomSwitch
              isChecked={caregiverNotif}
              onChange={() => setCaregiverNotif(!caregiverNotif)}
            />
          </Flex>
        </VStack>
      </VStack>
    </MotionBox>
  );
};

export default CaregiverLink;
