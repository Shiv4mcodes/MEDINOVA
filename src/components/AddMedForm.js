import React, { useState, useEffect } from "react";
import { Box, VStack, Heading, SimpleGrid, Input, HStack, Button, Flex, Spinner, Text, Badge } from "@chakra-ui/react";
import { DRUG_SAFETY_DB } from "../constants/data";

export const AddMedForm = ({ onAddMedicine, colorMode, onCancel }) => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [foodRelation, setFoodRelation] = useState("After Food");
  const [stock, setStock] = useState(30);

  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Auto-fetch suggestions on typing
  useEffect(() => {
    if (!showSuggestions) return;
    if (!name || name.trim().length < 2) {
      setNameSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      setSuggestionsLoading(true);
      
      // 1. Get local suggestions
      const queryLower = name.toLowerCase().trim();
      const localMatches = [];
      Object.keys(DRUG_SAFETY_DB).forEach(key => {
        const drug = DRUG_SAFETY_DB[key];
        if (key.includes(queryLower) || drug.name.toLowerCase().includes(queryLower)) {
          localMatches.push({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            fullName: drug.name,
            generic: "",
            source: 'local',
            dosage: key === 'paracetamol' ? '500mg (1 tablet)' : (key === 'dolo' ? '650mg (1 tablet)' : (key === 'azithromycin' ? '250mg (1 tablet)' : (key === 'vitamin' ? '500mg (1 capsule)' : '1 tablet'))),
            foodRelation: key === 'azithromycin' ? 'Before Food' : (key === 'atorvastatin' ? 'Before Bedtime' : 'After Food'),
            timeOfDay: key === 'atorvastatin' ? 'Night' : (key === 'azithromycin' ? 'Afternoon' : 'Morning')
          });
        }
      });

      // 2. Fetch OpenFDA suggestions if query is at least 3 characters
      let fdaMatches = [];
      if (queryLower.length >= 3) {
        try {
          const url = `https://api.fda.gov/drug/label.json?search=(openfda.brand_name:${queryLower}*+openfda.generic_name:${queryLower}*)&limit=5`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data.results) {
              data.results.forEach(res => {
                const brand = res.openfda?.brand_name?.[0];
                const generic = res.openfda?.generic_name?.[0];
                if (brand) {
                  const nameClean = brand.split(" ")[0].replace(/,/g, "");
                  if (!fdaMatches.some(m => m.name.toLowerCase() === nameClean.toLowerCase())) {
                    fdaMatches.push({
                      name: nameClean.charAt(0).toUpperCase() + nameClean.slice(1).toLowerCase(),
                      generic: generic ? generic.split(" ")[0] : "",
                      source: 'fda',
                      dosage: '1 tablet',
                      foodRelation: 'After Food',
                      timeOfDay: 'Morning'
                    });
                  }
                }
              });
            }
          }
        } catch (error) {
          console.warn("FDA Autocomplete suggestions failed", error);
        }
      }

      // Merge and deduplicate by name
      const merged = [...localMatches];
      fdaMatches.forEach(item => {
        if (!merged.some(m => m.name.toLowerCase() === item.name.toLowerCase())) {
          merged.push(item);
        }
      });

      setNameSuggestions(merged.slice(0, 5));
      setSuggestionsLoading(false);
    }, 350);

    return () => clearTimeout(handler);
  }, [name, showSuggestions]);

  const handleSelectSuggestion = (item) => {
    setName(item.fullName || item.name);
    if (item.dosage) setDosage(item.dosage);
    if (item.foodRelation) setFoodRelation(item.foodRelation);
    if (item.timeOfDay) setTimeOfDay(item.timeOfDay);
    setShowSuggestions(false);
    setNameSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddMedicine({
      name: name.trim(),
      dosage: dosage || "1 Dose",
      timeOfDay,
      foodRelation,
      stock: Number(stock) || 30,
      total: Number(stock) || 30
    });

    setName("");
    setDosage("");
    setTimeOfDay("Morning");
    setFoodRelation("After Food");
    setStock(30);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={4}
      bg="rgba(0,0,0,0.02)"
      _dark={{ bg: "rgba(255,255,255,0.02)" }}
      borderRadius="xl"
      border="1px solid"
      borderColor="cardBorder"
    >
      <Heading as="h4" size="xs" mb={3}>Register New Medicine</Heading>
      <VStack spacing={3} align="stretch">
        <Box position="relative">
          <Input
            placeholder="Medicine Name (e.g. Lipitor)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
            size="sm"
            bg="cardBg"
            borderColor="cardBorder"
            borderRadius="lg"
            autoComplete="off"
            required
          />
          {showSuggestions && (nameSuggestions.length > 0 || suggestionsLoading) && (
            <Box
              position="absolute"
              top="100%"
              left={0}
              right={0}
              zIndex={999}
              border="1px solid"
              borderColor="cardBorder"
              borderRadius="lg"
              maxH="220px"
              overflowY="auto"
              bg={colorMode === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(26, 32, 44, 0.98)'}
              boxShadow="xl"
              backdropFilter="blur(12px)"
              p={1.5}
              mt={1}
            >
              {suggestionsLoading ? (
                <Flex align="center" justify="center" p={3}>
                  <Spinner size="xs" mr={2} color="brand.500" />
                  <Text fontSize="xs" color="mutedText">Searching OpenFDA...</Text>
                </Flex>
              ) : (
                nameSuggestions.map((item, index) => (
                  <Box
                    key={index}
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{
                      bg: colorMode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    <HStack justify="space-between" align="center">
                      <VStack align="start" spacing={0}>
                        <Text fontSize="xs" fontWeight="bold">
                          {item.name}
                        </Text>
                        {item.generic && (
                          <Text fontSize="3xs" color="mutedText">
                            {item.generic}
                          </Text>
                        )}
                      </VStack>
                      <Badge size="xs" colorScheme={item.source === 'local' ? 'teal' : 'purple'} variant="subtle" fontSize="3xs">
                        {item.source === 'local' ? 'Verified' : 'FDA'}
                      </Badge>
                    </HStack>
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>

        <SimpleGrid columns={2} spacing={3}>
          <Input
            placeholder="Dosage (e.g. 500mg)"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            size="sm"
            bg="cardBg"
            borderColor="cardBorder"
            borderRadius="lg"
          />
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: colorMode === "light" ? "white" : "#1f2937",
              fontSize: "14px",
              color: "inherit"
            }}
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={3}>
          <select
            value={foodRelation}
            onChange={(e) => setFoodRelation(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: colorMode === "light" ? "white" : "#1f2937",
              fontSize: "14px",
              color: "inherit"
            }}
          >
            <option value="After Food">After Food</option>
            <option value="Before Food">Before Food</option>
            <option value="With Food">With Food</option>
            <option value="Before Bedtime">Before Bedtime</option>
          </select>
          <Input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            size="sm"
            bg="cardBg"
            borderColor="cardBorder"
            borderRadius="lg"
          />
        </SimpleGrid>

        <HStack justify="flex-end" spacing={2} pt={1}>
          <Button size="xs" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button size="xs" type="submit" bg="healthTeal.500" color="white" px={4}>Save</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AddMedForm;
