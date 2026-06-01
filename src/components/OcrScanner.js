import React, { useState, useRef } from "react";
import { Box, VStack, Heading, Text, Flex, Spinner, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Icons from "./Icons";

const MotionBox = motion(Box);

export const OcrScanner = ({ onAddReminder, onPrescriptionAdded }) => {
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOcrScanning(true);
    setOcrResult(null);

    // Simulate OCR processing steps
    setTimeout(() => {
      const mockResult = {
        fileName: file.name,
        extractedMed: "Amoxicillin 500mg",
        schedule: "Night",
        dose: "1 capsule",
        relation: "Before Bedtime",
        confidence: "94%"
      };
      setOcrResult(mockResult);
      setOcrScanning(false);

      // Add to digital cabinet archive
      onPrescriptionAdded({
        id: Date.now(),
        name: file.name,
        date: new Date().toISOString().split("T")[0],
        notes: `AI OCR Extracted: ${mockResult.extractedMed} (${mockResult.schedule})`
      });
    }, 3500);
  };

  const handleAddOcrMedicine = () => {
    if (!ocrResult) return;

    onAddReminder({
      medicine: ocrResult.extractedMed.split(" ")[0],
      dosage: ocrResult.extractedMed.split(" ").slice(1).join(" ") || "1 capsule",
      timeOfDay: ocrResult.schedule,
      foodRelation: ocrResult.relation,
      stock: 15,
      total: 15
    });

    setOcrResult(null);
  };

  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <VStack align="stretch" spacing={4.5}>
        <VStack align="start" spacing={1}>
          <Heading as="h3" size="xs" fontWeight="800" fontFamily="heading">
            AI Prescription OCR Reader
          </Heading>
          <Text fontSize="2xs" color="mutedText">
            Upload Rx image or PDF to extract medication schedules automatically using AI.
          </Text>
        </VStack>

        {/* Upload drag drop box */}
        <Box
          border="2px dashed"
          borderColor={ocrScanning ? "brand.500" : "cardBorder"}
          borderRadius="xl"
          p={6}
          textAlign="center"
          cursor="pointer"
          onClick={() => fileInputRef.current.click()}
          _hover={{ borderColor: "brand.400" }}
          bg="rgba(0,0,0,0.01)"
          _dark={{ bg: "rgba(255,255,255,0.01)" }}
          position="relative"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*,application/pdf"
          />
          {ocrScanning ? (
            <VStack spacing={3}>
              <Spinner size="md" color="brand.500" />
              <Text fontSize="xs" fontWeight="bold">AI OCR is analyzing prescription...</Text>
              <Text fontSize="3xs" color="mutedText">Matching dosage schedules, times & names</Text>
            </VStack>
          ) : (
            <VStack spacing={2.5}>
              <Icons.Upload />
              <Text fontSize="xs" fontWeight="bold">Click or drag & drop prescription files here</Text>
              <Text fontSize="3xs" color="mutedText">Supports PNG, JPG, or PDF (Simulated AI Scan)</Text>
            </VStack>
          )}
        </Box>

        {/* Extracted result display panel */}
        {ocrResult && (
          <Box
            p={3.5}
            bg="rgba(20,184,166,0.05)"
            border="1px solid"
            borderColor="healthTeal.200"
            _dark={{ borderColor: "healthTeal.800" }}
            borderRadius="xl"
            className="glow-border"
          >
            <VStack align="stretch" spacing={2.5}>
              <Flex justify="space-between" align="center">
                <Text fontSize="xs" fontWeight="bold" color="healthTeal.600" _dark={{ color: "healthTeal.300" }}>
                  AI Extraction Success
                </Text>
                <Text fontSize="3xs" fontWeight="bold" color="mutedText">
                  Conf: {ocrResult.confidence}
                </Text>
              </Flex>

              <VStack align="start" spacing={1} fontSize="xs">
                <Text><strong>File:</strong> {ocrResult.fileName}</Text>
                <Text><strong>Medicine:</strong> {ocrResult.extractedMed}</Text>
                <Text><strong>Dosage:</strong> {ocrResult.dose} ({ocrResult.relation})</Text>
                <Text><strong>Schedule:</strong> {ocrResult.schedule}</Text>
              </VStack>

              <Button
                size="xs"
                bg="healthTeal.500"
                color="white"
                onClick={handleAddOcrMedicine}
                _hover={{ bg: "healthTeal.600" }}
                width="100%"
                borderRadius="md"
              >
                Add to Daily Trackers
              </Button>
            </VStack>
          </Box>
        )}
      </VStack>
    </MotionBox>
  );
};

export default OcrScanner;
