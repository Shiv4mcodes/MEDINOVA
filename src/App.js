import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, VStack, Heading, Text, Badge, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorMode } from "./hooks/useColorMode";
import "./App.css";

// Component imports
import Icons from "./components/Icons";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardHeader from "./components/DashboardHeader";
import AdherenceTracker from "./components/AdherenceTracker";
import WellnessChart from "./components/WellnessChart";
import HealthCheckIn from "./components/HealthCheckIn";
import AddMedForm from "./components/AddMedForm";
import MedicationList from "./components/MedicationList";
import OcrScanner from "./components/OcrScanner";
import WellnessLogger from "./components/WellnessLogger";
import DailyQuests from "./components/DailyQuests";
import RefillTimeline from "./components/RefillTimeline";
import SafetyChecker from "./components/SafetyChecker";
import DigitalCabinet from "./components/DigitalCabinet";
import DoctorConsultation from "./components/DoctorConsultation";

// Constants
import {
  DEFAULT_REMINDERS,
  DEFAULT_HISTORY_LOGS,
  DEFAULT_PRESCRIPTIONS
} from "./constants/data";

const MotionBox = motion(Box);

// Confetti Particle Component Helper
const Confetti = () => {
  const particles = Array.from({ length: 80 });
  return (
    <Box position="fixed" top={0} left={0} right={0} bottom={0} pointerEvents="none" zIndex={9999} overflow="hidden">
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = 2 + Math.random() * 3;
        const size = 5 + Math.random() * 10;
        const colors = ["#6366f1", "#10b981", "#f43f5e", "#fbbf24", "#3b82f6", "#a855f7"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: -20,
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              backgroundColor: randomColor,
            }}
            animate={{
              y: "110vh",
              x: Math.random() > 0.5 ? [0, 40, -40] : [0, -40, 40],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              delay,
              ease: "easeOut",
              repeat: Infinity,
            }}
          />
        );
      })}
    </Box>
  );
};

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  // Time-based affirmation quote
  const [timeAffirmation, setTimeAffirmation] = useState({ greeting: "Welcome back", quote: "Wellness is a lifelong journey of care." });

  // 1. Reminders State (active medicines)
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("medinova_reminders");
    return saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
  });

  // Active Category tab (Morning, Afternoon, Evening, Night)
  const [activeTab, setActiveTab] = useState("Morning");

  // Health and Mood Logs history (for Graph)
  const [historyLogs, setHistoryLogs] = useState(() => {
    const saved = localStorage.getItem("medinova_historyLogs");
    return saved ? JSON.parse(saved) : DEFAULT_HISTORY_LOGS;
  });

  // Today's Checkin States
  const [todayMood, setTodayMood] = useState(() => {
    const saved = localStorage.getItem("medinova_todayMood");
    return saved ? Number(saved) : 4;
  });
  const [todaySymptoms, setTodaySymptoms] = useState(() => {
    const saved = localStorage.getItem("medinova_todaySymptoms");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAddMed, setShowAddMed] = useState(false);

  // Archive Cabinet prescriptions
  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem("medinova_prescriptions");
    return saved ? JSON.parse(saved) : DEFAULT_PRESCRIPTIONS;
  });

  // Delivery simulation timeline state
  const [deliveryStep, setDeliveryStep] = useState(0); // 0: Idle, 1: Ordered, 2: Packing, 3: Out for Delivery, 4: Refilled!
  const [deliveryMeds, setDeliveryMeds] = useState([]);
  const [deliveryProgress, setDeliveryProgress] = useState(0);

  // Confetti & Streak State
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("medinova_streak");
    return saved ? Number(saved) : 0;
  });
  const [streakCelebrated, setStreakCelebrated] = useState(false);

  // Caregiver configuration
  const [caregiverEmail, setCaregiverEmail] = useState(() => {
    const saved = localStorage.getItem("medinova_caregiverEmail");
    return saved ? saved : "";
  });
  // eslint-disable-next-line no-unused-vars
  const [caregiverNotif, setCaregiverNotif] = useState(() => {
    const saved = localStorage.getItem("medinova_caregiverNotif");
    return saved ? saved === "true" : true;
  });

  // Wellness & Safety Checker States
  const [waterCups, setWaterCups] = useState(() => {
    const saved = localStorage.getItem("medinova_waterCups");
    return saved ? Number(saved) : 0;
  });
  const [sleepHours, setSleepHours] = useState(() => {
    const saved = localStorage.getItem("medinova_sleepHours");
    return saved ? Number(saved) : 7.0;
  });
  const [exerciseMins, setExerciseMins] = useState(() => {
    const saved = localStorage.getItem("medinova_exerciseMins");
    return saved ? Number(saved) : 30;
  });
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleLoadDemoData = () => {
    const demoReminders = [
      { id: 1, medicine: "Paracetamol", dosage: "500mg (1 tablet)", timeOfDay: "Morning", taken: false, foodRelation: "After Food", stock: 8, total: 30 },
      { id: 2, medicine: "Azithromycin", dosage: "250mg (1 tablet)", timeOfDay: "Afternoon", taken: true, foodRelation: "Before Food", stock: 3, total: 10 },
      { id: 3, medicine: "Vitamin C", dosage: "500mg (1 capsule)", timeOfDay: "Evening", taken: false, foodRelation: "After Food", stock: 24, total: 60 },
      { id: 4, medicine: "Dolo 650", dosage: "650mg (1 tablet)", timeOfDay: "Morning", taken: false, foodRelation: "After Food", stock: 5, total: 15 },
      { id: 5, medicine: "Eno", dosage: "1 Sachet", timeOfDay: "Afternoon", taken: true, foodRelation: "With Food", stock: 12, total: 20 },
      { id: 6, medicine: "Atorvastatin", dosage: "10mg (1 tablet)", timeOfDay: "Night", taken: false, foodRelation: "Before Bedtime", stock: 4, total: 30 }
    ];
    const demoHistory = [
      { day: "Mon", adherence: 60, mood: 2 },
      { day: "Tue", adherence: 80, mood: 3 },
      { day: "Wed", adherence: 100, mood: 5 },
      { day: "Thu", adherence: 50, mood: 2 },
      { day: "Fri", adherence: 90, mood: 4 },
      { day: "Sat", adherence: 100, mood: 5 },
      { day: "Sun", adherence: 70, mood: 4 }
    ];
    const demoPrescriptions = [
      { id: 1, name: "Dr. Sharma Rx - May 24.png", date: "2026-05-24", notes: "Regular blood pressure prescription" }
    ];
    
    setReminders(demoReminders);
    setHistoryLogs(demoHistory);
    setPrescriptions(demoPrescriptions);
    setStreak(7);
    setTodayMood(4);
    setTodaySymptoms([]);
    setCaregiverEmail("caregiver.mom@gmail.com");
    setWaterCups(5);
    setSleepHours(7.5);
    setExerciseMins(45);
  };

  // Generate dynamic quotes/greetings on load
  useEffect(() => {
    const hrs = new Date().getHours();
    let greeting = "";
    let quote = "";

    if (hrs < 12) {
      greeting = "Good morning, Shivam";
      quote = "Start your day with gentle care. Every healthy habit builds a happier you.";
    } else if (hrs < 17) {
      greeting = "Good afternoon, Shivam";
      quote = "Take a moment to breathe and rest. Consistency is the secret of vitality.";
    } else {
      greeting = "Good evening, Shivam";
      quote = "Unwind gracefully. As you end the day, appreciate the health you nurture.";
    }

    setTimeAffirmation({ greeting, quote });
  }, [reminders]);

  // Calculate today's adherence rate
  const totalReminders = reminders.length;
  const takenReminders = reminders.filter((r) => r.taken).length;
  const adherenceRate = totalReminders > 0 ? Math.round((takenReminders / totalReminders) * 100) : 0;

  // Handle Confetti and Streak increment when 100% adherence is hit
  useEffect(() => {
    if (adherenceRate === 100 && totalReminders > 0) {
      if (!streakCelebrated) {
        setShowConfetti(true);
        setStreak((prev) => prev + 1);
        setStreakCelebrated(true);
      }
    } else if (adherenceRate < 100) {
      setStreakCelebrated(false);
    }
  }, [adherenceRate, totalReminders, streakCelebrated]);

  // Update dynamic log point (for today, Sunday index 6)
  useEffect(() => {
    setHistoryLogs((prev) => {
      const copy = [...prev];
      copy[6] = { ...copy[6], adherence: adherenceRate, mood: todayMood };
      return copy;
    });
  }, [adherenceRate, todayMood]);

  // Synchronize state data with localStorage
  useEffect(() => {
    localStorage.setItem("medinova_reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem("medinova_historyLogs", JSON.stringify(historyLogs));
  }, [historyLogs]);

  useEffect(() => {
    localStorage.setItem("medinova_todayMood", String(todayMood));
  }, [todayMood]);

  useEffect(() => {
    localStorage.setItem("medinova_todaySymptoms", JSON.stringify(todaySymptoms));
  }, [todaySymptoms]);

  useEffect(() => {
    localStorage.setItem("medinova_prescriptions", JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem("medinova_streak", String(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("medinova_caregiverEmail", caregiverEmail);
  }, [caregiverEmail]);

  useEffect(() => {
    localStorage.setItem("medinova_caregiverNotif", String(caregiverNotif));
  }, [caregiverNotif]);

  useEffect(() => {
    localStorage.setItem("medinova_waterCups", String(waterCups));
  }, [waterCups]);

  useEffect(() => {
    localStorage.setItem("medinova_sleepHours", String(sleepHours));
  }, [sleepHours]);

  useEffect(() => {
    localStorage.setItem("medinova_exerciseMins", String(exerciseMins));
  }, [exerciseMins]);

  // Toggle reminder taken status
  const handleToggleTaken = (id) => {
    setReminders((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextTaken = !item.taken;
          let nextStock = item.stock;
          if (nextTaken) {
            nextStock = Math.max(0, item.stock - 1);
          } else {
            nextStock = Math.min(item.total, item.stock + 1);
          }
          return { ...item, taken: nextTaken, stock: nextStock };
        }
        return item;
      })
    );
  };

  // Delete medicine
  const handleDeleteReminder = (id) => {
    setReminders((prev) => prev.filter((item) => item.id !== id));
  };

  // Add new medicine reminder (from form inputs)
  const handleAddMedicine = (medData) => {
    const newMed = {
      id: Date.now(),
      medicine: medData.name,
      dosage: medData.dosage,
      timeOfDay: medData.timeOfDay,
      taken: false,
      foodRelation: medData.foodRelation,
      stock: medData.stock,
      total: medData.total
    };
    setReminders((prev) => [...prev, newMed]);
    setShowAddMed(false);
  };

  // Simulates OCR scan prescription added
  const handlePrescriptionAdded = (newArchive) => {
    setPrescriptions((prev) => [newArchive, ...prev]);
  };

  // Pharmacy simulation timeline trigger
  const handleStartRefill = (medsToOrder) => {
    if (medsToOrder.length === 0) return;
    setDeliveryMeds(medsToOrder);
    setDeliveryStep(1);
    setDeliveryProgress(25);

    // Step 2: Packing
    setTimeout(() => {
      setDeliveryStep(2);
      setDeliveryProgress(50);
    }, 4000);

    // Step 3: Out for delivery
    setTimeout(() => {
      setDeliveryStep(3);
      setDeliveryProgress(75);
    }, 8000);

    // Step 4: Refilled/Delivered
    setTimeout(() => {
      setDeliveryStep(4);
      setDeliveryProgress(100);

      // Replenish stock in reminders
      setReminders((prev) =>
        prev.map((r) => {
          if (medsToOrder.includes(r.id)) {
            return { ...r, stock: r.total };
          }
          return r;
        })
      );

      // Reset delivery timeline
      setTimeout(() => {
        setDeliveryStep(0);
        setDeliveryProgress(0);
        setDeliveryMeds([]);
      }, 5000);
    }, 12000);
  };

  const handleMoodSelect = (level) => {
    setTodayMood(level);
  };

  const handleSymptomToggle = (symptom) => {
    setTodaySymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const increaseFont = () => setFontSize((s) => Math.min(s + 2, 24));
  const decreaseFont = () => setFontSize((s) => Math.max(s - 2, 12));

  // Low stock inventory warning filters
  const lowStockMeds = reminders.filter((r) => r.stock <= 5);

  return (
    <ErrorBoundary>
      {/* Ambient background blobs for cozy glassmorphism */}
      <div className="bg-blob-container">
        <div className="bg-blob blob-purple"></div>
        <div className="bg-blob blob-teal"></div>
        <div className="bg-blob blob-amber"></div>
      </div>

      <Box
        as="main"
        minHeight="100vh"
        position="relative"
        zIndex={1}
        className="transition-bg"
        bg="bgGradient"
        color="textColor"
        fontSize={fontSize}
        p={{ base: 4, md: 8 }}
        style={{
          filter: highContrast ? "contrast(1.4)" : "none",
        }}
      >
        {/* Render Confetti on full adherence */}
        {showConfetti && <Confetti />}

        {/* TOP DASHBOARD HEADER */}
        <DashboardHeader
          takenReminders={takenReminders}
          totalReminders={totalReminders}
          streak={streak}
          decreaseFont={decreaseFont}
          increaseFont={increaseFont}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          toggleColorMode={toggleColorMode}
          colorMode={colorMode}
          handleLoadDemoData={handleLoadDemoData}
          isAboutOpen={isAboutOpen}
          setIsAboutOpen={setIsAboutOpen}
        />

        {/* MAIN GRID DASHBOARD */}
        <div className="dashboard-grid">
          
          {/* COLUMN 1: LEFT AREA (USER WELCOME, HEALTH INSIGHTS & GRAPHS, HEALTH CHECKIN) */}
          <VStack spacing={6} gridColumn={{ base: "span 12", lg: "span 4" }} align="stretch">
            
            {/* Greeting & Motivation Card */}
            <MotionBox
              layerStyle="glass"
              p={6}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <VStack align="start" spacing={3}>
                <Badge bg="brand.100" color="brand.700" _dark={{ bg: "brand.900", color: "brand.300" }} px={2.5} py={0.5} borderRadius="md" fontWeight="bold" fontSize="xs">
                  DAILY MOTIVATION
                </Badge>
                <Heading as="h2" size="md" fontWeight="800" fontFamily="heading">
                  {timeAffirmation.greeting}
                </Heading>
                <Text fontSize="xs" color="textColor" lineHeight="relaxed">
                  "{timeAffirmation.quote}"
                </Text>
              </VStack>
            </MotionBox>

            {/* Compliance Progress & Streak Circular Wheel */}
            <AdherenceTracker adherenceRate={adherenceRate} streak={streak} />

            {/* Bezier Correlation Weekly Chart */}
            <WellnessChart historyLogs={historyLogs} colorMode={colorMode} />

            {/* Health Logger Mood Checkin */}
            <HealthCheckIn
              todayMood={todayMood}
              handleMoodSelect={handleMoodSelect}
              todaySymptoms={todaySymptoms}
              handleSymptomToggle={handleSymptomToggle}
            />

            {/* Gamified Health Quest Tracker Checklist */}
            <DailyQuests
              waterCups={waterCups}
              exerciseMins={exerciseMins}
              todayMood={todayMood}
              takenReminders={takenReminders}
              totalReminders={totalReminders}
            />

          </VStack>

          {/* COLUMN 2: MIDDLE AREA (ACTIVE MEDICINE LIST, ADD MED FORM) */}
          <VStack spacing={6} gridColumn={{ base: "span 12", lg: "span 5" }} align="stretch">
            
            {/* Active Medicine schedule tracker lists */}
            <MotionBox
              layerStyle="glass"
              p={6}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <VStack align="stretch" spacing={5}>
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={0}>
                    <Heading as="h2" size="md" fontWeight="800" fontFamily="heading">
                      Medication Tracker
                    </Heading>
                    <Text fontSize="xs" color="mutedText">
                      {takenReminders} of {totalReminders} capsules taken today
                    </Text>
                  </VStack>
                  <Button
                    size="sm"
                    bg="linear-gradient(135deg, #6366f1, #4f46e5)"
                    color="white"
                    borderRadius="lg"
                    leftIcon={<Icons.Plus />}
                    onClick={() => setShowAddMed(!showAddMed)}
                    _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
                  >
                    Add Med
                  </Button>
                </Flex>

                {/* Form to Add Medication */}
                {showAddMed && (
                  <AddMedForm
                    onAddMedicine={handleAddMedicine}
                    colorMode={colorMode}
                    onCancel={() => setShowAddMed(false)}
                  />
                )}

                {/* Categories Tab and Scheduled Cards List */}
                <MedicationList
                  reminders={reminders}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  handleToggleTaken={handleToggleTaken}
                  handleDeleteReminder={handleDeleteReminder}
                  handleLoadDemoData={handleLoadDemoData}
                  setShowAddMed={setShowAddMed}
                  lowStockMeds={lowStockMeds}
                  handleStartRefill={handleStartRefill}
                  deliveryStep={deliveryStep}
                  colorMode={colorMode}
                />
              </VStack>
            </MotionBox>

            {/* Pharmacy refill delivery timelines */}
            <RefillTimeline
              deliveryStep={deliveryStep}
              deliveryMeds={deliveryMeds}
              deliveryProgress={deliveryProgress}
              reminders={reminders}
              handleStartRefill={handleStartRefill}
            />

            {/* Wellness Factors Logger */}
            <WellnessLogger
              waterCups={waterCups}
              setWaterCups={setWaterCups}
              sleepHours={sleepHours}
              setSleepHours={setSleepHours}
              exerciseMins={exerciseMins}
              setExerciseMins={setExerciseMins}
            />
          </VStack>

          {/* COLUMN 3: RIGHT AREA (OCR SCANNER, SAFETY CHECKER & CAREGIVER LINK) */}
          <VStack spacing={6} gridColumn={{ base: "span 12", lg: "span 3" }} align="stretch">
            
            {/* Simulated OCR Scanner upload box */}
            <OcrScanner
              onAddReminder={(ocrMed) => handleAddMedicine({ ...ocrMed, name: ocrMed.medicine })}
              onPrescriptionAdded={handlePrescriptionAdded}
            />

            {/* Scanned Archive Cabinet listing */}
            <DigitalCabinet prescriptions={prescriptions} />

            {/* Drug side effect checker searching */}
            <SafetyChecker />

            {/* 1-1 Doctor Consultation Room */}
            <DoctorConsultation />

          </VStack>

        </div>

        {/* GLASSMORPHIC FOOTER */}
        <Box
          as="footer"
          mt={8}
          p={4}
          bg="rgba(13, 9, 29, 0.4)"
          _light={{ bg: "rgba(255, 255, 255, 0.4)" }}
          borderTop="1px solid"
          borderColor="cardBorder"
          backdropFilter="blur(10px)"
          borderRadius="xl"
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} alignItems="center" fontSize="3xs" color="mutedText">
            {/* Trademark on Left */}
            <Box textAlign={{ base: "center", md: "left" }}>
              <Text fontWeight="bold" fontSize="xs" letterSpacing="wider" color="brand.500">
                ShivamCodes &trade;
              </Text>
            </Box>

            {/* About Description in Middle */}
            <Box textAlign="center" maxW="550px" mx="auto">
              <Text lineHeight="tall">
                Made with 🤍 by Shivam Mishra.
              </Text>
            </Box>

            {/* Copyright on Right */}
            <Box textAlign={{ base: "center", md: "right" }}>
              <Text>
                &copy; {new Date().getFullYear()} MEDINOVA &bull; All Rights Reserved.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
