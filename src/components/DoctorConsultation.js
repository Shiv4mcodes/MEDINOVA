import React, { useState } from "react";
import { Box, VStack, Heading, Text, Flex, Button, Input, HStack, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Icons from "./Icons";

const MotionBox = motion(Box);

export const DoctorConsultation = () => {
  const [doctorActive, setDoctorActive] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "doctor", text: "Hello Shivam, I am Dr. Shyam Kishore. How can I help you with your medications today?" }
  ]);
  const [docTyping, setDocTyping] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput("");
    setDocTyping(true);

    setTimeout(() => {
      let replyText = "That's a helpful question. Generally, it's vital to follow the food guidelines. If you have any unusual discomfort, let your doctor know immediately.";
      const query = currentInput.toLowerCase();

      if (query.includes("paracetamol") || query.includes("dolo")) {
        replyText = "Paracetamol (like Dolo) should be taken with or after meals to avoid stomach irritation. Do not exceed 4g (4000mg) within 24 hours.";
      } else if (query.includes("azithromycin")) {
        replyText = "Azithromycin is an antibiotic. It is highly recommended to complete the full course even if you start feeling better. Best taken 1 hour before or 2 hours after meals.";
      } else if (query.includes("miss") || query.includes("forgot")) {
        replyText = "If you miss a dose, take it as soon as you remember. If it is nearly time for your next dose, skip the missed one. Do not double the dosage.";
      } else if (query.includes("side effect") || query.includes("allergy")) {
        replyText = "Common side effects include mild nausea or drowsiness. However, if you notice rashes, breathlessness, or face swelling, seek medical aid immediately.";
      }

      setChatMessages((prev) => [...prev, { sender: "doctor", text: replyText }]);
      setDocTyping(false);
    }, 1500);
  };

  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <VStack align="stretch" spacing={4}>
        <Flex justify="space-between" align="center">
          <Heading as="h3" size="xs" fontWeight="800" fontFamily="heading" m={0}>
            1-on-1 Consultation
          </Heading>
          {doctorActive && (
            <Badge bg="healthTeal.500" color="white" fontSize="3xs" px={2} py={0.5} borderRadius="full">
              CONNECTED LIVE
            </Badge>
          )}
        </Flex>
        
        {/* Doctor Header Profile */}
        <Flex align="center" gap={3} p={2.5} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl" border="1px solid" borderColor="cardBorder">
          <Box position="relative">
            <Box w="40px" h="40px" borderRadius="full" overflow="hidden" bg="brand.100" color="brand.600" display="flex" alignItems="center" justifyContent="center">
              {!photoError ? (
                <img
                  src="/dr-shyam.jpeg"
                  alt="Dr. Shyam Kishore"
                  onError={() => setPhotoError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Icons.Doctor />
              )}
            </Box>
            <Box
              position="absolute"
              bottom="0"
              right="0"
              w="10px"
              h="10px"
              bg="healthTeal.500"
              borderRadius="full"
              border="2px solid white"
              _dark={{ border: "2px solid #030712" }}
            />
          </Box>
          <VStack align="start" spacing={0.5}>
            <Text fontSize="sm" fontWeight="bold">Dr. Shyam Kishore</Text>
            <Text fontSize="xs" fontWeight="bold">General Physician, MD </Text>
            <Text fontSize="xs" color="healthTeal.500" fontWeight="bold">Doctor (Active Now)</Text>
          </VStack>
        </Flex>

        {/* Trigger Button or Active Consult Chat Panel */}
        {!doctorActive ? (
          <Button
            size="sm"
            bg="healthTeal.500"
            color="white"
            borderRadius="lg"
            onClick={() => setDoctorActive(true)}
            _hover={{ bg: "healthTeal.600" }}
          >
            Start Consult Room
          </Button>
        ) : (
          <VStack align="stretch" spacing={3}>
            {/* Messages box */}
            <Box
              h="160px"
              overflowY="auto"
              p={3}
              bg="rgba(0,0,0,0.02)"
              _dark={{ bg: "rgba(255,255,255,0.01)" }}
              borderRadius="xl"
              border="1px solid"
              borderColor="cardBorder"
            >
              <VStack align="stretch" spacing={2.5}>
                {chatMessages.map((msg, i) => (
                  <Flex key={i} justify={msg.sender === "user" ? "flex-end" : "flex-start"}>
                    <Box
                      maxW="85%"
                      p={2}
                      px={3}
                      borderRadius="xl"
                      bg={msg.sender === "user" ? "brand.500" : "rgba(0,0,0,0.05)"}
                      color={msg.sender === "user" ? "white" : "textColor"}
                      _dark={{
                        bg: msg.sender === "user" ? "brand.500" : "rgba(255,255,255,0.05)"
                      }}
                      fontSize="xs"
                    >
                      <Text m={0}>{msg.text}</Text>
                    </Box>
                  </Flex>
                ))}
                {docTyping && (
                  <Flex justify="flex-start">
                    <Box p={2} px={3} borderRadius="xl" bg="rgba(0,0,0,0.03)" _dark={{ bg: "rgba(255,255,255,0.03)" }} fontSize="xs">
                      <Text fontStyle="italic" color="mutedText">Dr. Shyam Kishore is typing...</Text>
                    </Box>
                  </Flex>
                )}
              </VStack>
            </Box>

            {/* Chat form input */}
            <Box as="form" onSubmit={handleChatSubmit}>
              <HStack spacing={2}>
                <Input
                  placeholder="Ask about side-effects, schedules..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                  bg="cardBg"
                  borderColor="cardBorder"
                />
                <Button type="submit" size="sm" bg="brand.500" color="white" px={4.5}>
                  Send
                </Button>
              </HStack>
            </Box>
            <Button size="xs" variant="ghost" color="warmOrange.500" onClick={() => setDoctorActive(false)}>
              End Consultation Call
            </Button>
          </VStack>
        )}
      </VStack>
    </MotionBox>
  );
};

export default DoctorConsultation;
