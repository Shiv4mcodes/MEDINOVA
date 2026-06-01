import React, { useState } from "react";
import { Box, VStack, Heading, Text, Input, Button, Flex, Spinner, HStack, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { DRUG_SAFETY_DB } from "../constants/data";

const MotionBox = motion(Box);

export const SafetyChecker = () => {
  const [safetySearchQuery, setSafetySearchQuery] = useState("");
  const [safetyResult, setSafetyResult] = useState(null);
  const [safetyLoading, setSafetyLoading] = useState(false);
  const [safetyError, setSafetyError] = useState(null);

  const handleDrugSafetySearch = async (query) => {
    if (!query || !query.trim()) {
      setSafetyResult(null);
      setSafetyError(null);
      return;
    }
    
    const cleanQuery = query.toLowerCase().trim();
    setSafetyLoading(true);
    setSafetyError(null);
    setSafetyResult(null);

    try {
      // 1. Try Live FDA API query
      const url = `https://api.fda.gov/drug/label.json?search=(openfda.brand_name:"${cleanQuery}"+openfda.generic_name:"${cleanQuery}"+brand_name:"${cleanQuery}"+generic_name:"${cleanQuery}")&limit=1`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const res = data.results[0];
          
          // Clean HTML-like tags from OpenFDA text
          const stripTags = (txt) => {
            if (!txt) return "";
            if (Array.isArray(txt)) txt = txt[0];
            return txt.replace(/<[^>]*>/g, "").substring(0, 450) + (txt.length > 450 ? "..." : "");
          };

          const brand = res.openfda?.brand_name?.[0] || res.openfda?.generic_name?.[0] || query;
          const generic = res.openfda?.generic_name?.[0] || "Not available";
          const usage = stripTags(res.indications_and_usage || res.purpose || "Information not found.");
          const sideEffects = stripTags(res.adverse_reactions || "Information not found.");
          const warning = stripTags(res.warnings || res.warnings_and_cautions || "Information not found.");

          setSafetyResult({
            name: `${brand} (${generic})`,
            usage,
            sideEffects,
            warning,
            isLive: true
          });
          setSafetyLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("FDA API query failed, trying local database fallback...", e);
    }

    // 2. Fallback to Local Database DRUG_SAFETY_DB
    const foundKey = Object.keys(DRUG_SAFETY_DB).find(
      (key) => cleanQuery.includes(key) || key.includes(cleanQuery)
    );
    const localDrug = foundKey ? DRUG_SAFETY_DB[foundKey] : null;

    if (localDrug) {
      setSafetyResult({
        name: localDrug.name,
        usage: localDrug.usage,
        sideEffects: localDrug.sideEffects,
        warning: localDrug.warning,
        isLive: false
      });
    } else {
      setSafetyError(`No results found for "${query}" in live OpenFDA or local database. Try search terms like "Lipitor", "Dolo", "Aspirin", "Ibuprofen", or "Amoxicillin".`);
    }
    setSafetyLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleDrugSafetySearch(safetySearchQuery);
  };

  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <VStack align="stretch" spacing={4}>
        <VStack align="start" spacing={1}>
          <Heading as="h3" size="xs" fontWeight="800" fontFamily="heading">
            Medication Safety & Side-Effect Checker
          </Heading>
          <Text fontSize="2xs" color="mutedText">
            Verify indications, side effects, and critical guidelines dynamically.
          </Text>
        </VStack>

        {/* Search Input Bar */}
        <Box as="form" onSubmit={handleFormSubmit}>
          <HStack spacing={2}>
            <Input
              placeholder="Search medicine (e.g. Paracetamol, Lipitor...)"
              value={safetySearchQuery}
              onChange={(e) => setSafetySearchQuery(e.target.value)}
              size="sm"
              borderRadius="lg"
              bg="cardBg"
              borderColor="cardBorder"
            />
            <Button type="submit" size="sm" bg="brand.500" color="white" px={4}>
              Check
            </Button>
          </HStack>
        </Box>

        {/* Loading Spinner */}
        {safetyLoading && (
          <Flex align="center" justify="center" p={4}>
            <Spinner size="sm" mr={3} color="brand.500" />
            <Text fontSize="2xs" color="mutedText">Querying database safety records...</Text>
          </Flex>
        )}

        {/* Error notification */}
        {safetyError && (
          <Box p={3} bg="rgba(245,158,11,0.06)" border="1px solid" borderColor="warmOrange.200" borderRadius="xl">
            <Text fontSize="3xs" color="warmOrange.800" _dark={{ color: "warmOrange.300" }} fontWeight="bold">
              {safetyError}
            </Text>
          </Box>
        )}

        {/* Results panel */}
        {safetyResult && (
          <Box p={3.5} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl" border="1px solid" borderColor="cardBorder">
            <Heading as="h4" size="xs" mb={3} borderBottom="1px solid" borderColor="cardBorder" pb={1.5} display="flex" justify="space-between" align="center">
              <Text as="span">{safetyResult.name}</Text>
              {safetyResult.isLive ? (
                <Badge colorScheme="purple" variant="subtle" fontSize="3xs" size="xs">Live FDA</Badge>
              ) : (
                <Badge colorScheme="teal" variant="subtle" fontSize="3xs" size="xs">Verified DB</Badge>
              )}
            </Heading>
            <VStack align="stretch" spacing={2.5} fontSize="3xs" textAlign="left">
              <Box>
                <Text fontWeight="bold" color="textColor">Primary Indication:</Text>
                <Text color="mutedText" noOfLines={4} overflow="hidden" textOverflow="ellipsis">{safetyResult.usage}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color="textColor">Side Effects:</Text>
                <Text color="mutedText" noOfLines={4} overflow="hidden" textOverflow="ellipsis">{safetyResult.sideEffects}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color="textColor">Critical Warnings / Food Interaction:</Text>
                <Text color="textColor" fontWeight="bold" noOfLines={4} overflow="hidden" textOverflow="ellipsis">{safetyResult.warning}</Text>
              </Box>
            </VStack>
          </Box>
        )}

        {!safetyLoading && !safetyResult && !safetyError && (
          <Box p={3} bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.02)" }} borderRadius="xl" textAlign="center">
            <Text fontSize="3xs" color="mutedText">
              Search above to view real-world side-effect profiles & safety warnings.
            </Text>
          </Box>
        )}
      </VStack>
    </MotionBox>
  );
};

export default SafetyChecker;
