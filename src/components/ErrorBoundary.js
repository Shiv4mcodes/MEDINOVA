import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} maxW="700px" mx="auto" mt={20} bg="rgba(239, 68, 68, 0.1)" border="1px solid #ef4444" borderRadius="lg" backdropFilter="blur(10px)">
          <Heading size="md" color="red.500" mb={4}>
            Something went wrong.
          </Heading>
          <Text mb={4}>Our systems encountered an unexpected render issue. Don't worry, your health data is safe.</Text>
          <Box p={4} bg="black" color="green.400" fontFamily="monospace" fontSize="xs" borderRadius="md" overflowX="auto" textAlign="left" mb={4}>
            <Text fontWeight="bold" color="red.400" mb={2}>Error: {this.state.error?.toString()}</Text>
            <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.errorInfo?.componentStack}</pre>
          </Box>
          <Button bg="brand.500" color="white" onClick={() => window.location.reload()}>
            Refresh Dashboard
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
