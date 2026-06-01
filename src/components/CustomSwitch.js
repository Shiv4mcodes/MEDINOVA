import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const CustomSwitch = ({ isChecked, onChange }) => {
  return (
    <Box
      w="38px"
      h="22px"
      bg={isChecked ? "brand.500" : "rgba(0, 0, 0, 0.15)"}
      _dark={{ bg: isChecked ? "brand.500" : "rgba(255, 255, 255, 0.15)" }}
      borderRadius="full"
      p="3px"
      cursor="pointer"
      onClick={onChange}
      transition="background-color 0.2s"
      display="flex"
      alignItems="center"
    >
      <motion.div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
        }}
        animate={{ x: isChecked ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </Box>
  );
};

export default CustomSwitch;
