import React from "react";
import { Box, VStack, HStack, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const WellnessChart = ({ historyLogs, colorMode }) => {
  // SVG Chart rendering math
  const padding = 30;
  const chartWidth = 480;
  const chartHeight = 180;
  const widthArea = chartWidth - padding * 2;
  const heightArea = chartHeight - padding * 2;

  // Grid coordinates for 7 days
  const pointsAdherence = historyLogs.map((log, idx) => {
    const x = padding + (idx / 6) * widthArea;
    // adherence range 0 to 100
    const y = padding + heightArea - (log.adherence / 100) * heightArea;
    return { x, y };
  });

  const pointsMood = historyLogs.map((log, idx) => {
    const x = padding + (idx / 6) * widthArea;
    // mood range 1 to 5
    const y = padding + heightArea - ((log.mood - 1) / 4) * heightArea;
    return { x, y };
  });

  // Smooth bezier path generator
  const getBezierPath = (pts) => {
    if (!pts || pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const getBezierAreaPath = (pts) => {
    const path = getBezierPath(pts);
    if (!path) return "";
    const first = pts[0];
    const last = pts[pts.length - 1];
    const bottomY = padding + heightArea;
    return `${path} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  };

  return (
    <MotionBox
      layerStyle="glass"
      p={5}
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <VStack align="start" spacing={0}>
            <Heading as="h3" size="xs" fontWeight="700" letterSpacing="-0.02em">
              Wellness Correlation
            </Heading>
            <Text fontSize="2xs" color="mutedText">
              Adherence vs Mood (Weekly View)
            </Text>
          </VStack>
          <HStack spacing={2} fontSize="2xs" fontWeight="bold">
            <HStack spacing={1}>
              <Box w="6px" h="6px" bg="brand.500" borderRadius="full" />
              <Text>Adherence</Text>
            </HStack>
            <HStack spacing={1}>
              <Box w="6px" h="6px" bg="healthTeal.500" borderRadius="full" />
              <Text>Mood</Text>
            </HStack>
          </HStack>
        </HStack>

        {/* SVG Graph rendering */}
        <Box bg="rgba(0,0,0,0.02)" _dark={{ bg: "rgba(255,255,255,0.01)" }} borderRadius="lg" p={2} border="1px solid" borderColor="cardBorder">
          <svg width="100%" height="150" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="adherenceAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="moodAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding + ratio * heightArea;
              return (
                <line
                  key={i}
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke={colorMode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.03)'}
                  strokeWidth="1"
                />
              );
            })}

            {/* Adherence Area Fill */}
            <path
              d={getBezierAreaPath(pointsAdherence)}
              fill="url(#adherenceAreaGrad)"
            />

            {/* Adherence Line (Bezier Curve) */}
            <path
              d={getBezierPath(pointsAdherence)}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Mood Area Fill */}
            <path
              d={getBezierAreaPath(pointsMood)}
              fill="url(#moodAreaGrad)"
            />

            {/* Mood Line (Bezier Curve) */}
            <path
              d={getBezierPath(pointsMood)}
              fill="none"
              stroke="#0d9488"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Graph Dots */}
            {pointsAdherence.map((p, idx) => (
              <circle key={`ad-${idx}`} cx={p.x} cy={p.y} r="4.5" fill="#8b5cf6" stroke="white" strokeWidth="1.5" />
            ))}
            {pointsMood.map((p, idx) => (
              <circle key={`md-${idx}`} cx={p.x} cy={p.y} r="4.5" fill="#0d9488" stroke="white" strokeWidth="1.5" />
            ))}

            {/* Bottom Day Labels */}
            {historyLogs.map((log, idx) => {
              const x = padding + (idx / 6) * widthArea;
              return (
                <text
                  key={idx}
                  x={x}
                  y={chartHeight - 8}
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill={colorMode === 'light' ? '#6b7280' : '#9ca3af'}
                >
                  {log.day}
                </text>
              );
            })}
          </svg>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default WellnessChart;
