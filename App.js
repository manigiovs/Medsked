import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// =========================================================
// COLORS
// =========================================================

const COLORS = {
  bg: "#061A1D",
  card: "#0C292D",
  card2: "#103238",
  border: "#1B4A50",
  teal: "#2DB8BC",
  tealDark: "#0A6D72",
  text: "#F4F7F7",
  muted: "#8CA8AB",
  yellow: "#FFB52E",
  red: "#FF5159",
  green: "#43CA7C",
  black: "#000000",
};

// =========================================================
// LOGO
// =========================================================

function Logo() {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoIcon}>
        <Ionicons
          name="heart-outline"
          size={25}
          color={COLORS.bg}
        />
      </View>

      <View>
        <Text style={styles.logoText}>MEDSKED</Text>
        <Text style={styles.logoSubtext}>
          Medication Care
        </Text>
      </View>
    </View>
  );
}

// =========================================================
// TOP HEADER
// =========================================================

function TopHeader() {
  return (
    <View style={styles.topHeader}>
      <Logo />

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.patientButton}>
          <Ionicons
            name="person-outline"
            size={14}
            color={COLORS.teal}
          />

          <Text style={styles.patientText}>
            Patient
          </Text>

          <Ionicons
            name="chevron-down"
            size={13}
            color={COLORS.teal}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.notification}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.text}
          />

          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// =========================================================
// BOTTOM NAVIGATION
// =========================================================

function BottomNav({ active, setActive }) {
  const tabs = [
    {
      key: "home",
      label: "Home",
      icon: "home-outline",
    },
    {
      key: "doses",
      label: "Doses",
      icon: "time-outline",
    },
    {
      key: "meds",
      label: "Meds",
      icon: "diamond-outline",
    },
    {
      key: "stats",
      label: "Stats",
      icon: "bar-chart-outline",
    },
    {
      key: "more",
      label: "More",
      icon: "list-outline",
    },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const selected = active === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.navItem,
              selected && styles.navItemActive,
            ]}
            onPress={() => setActive(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={21}
              color={
                selected
                  ? COLORS.bg
                  : COLORS.teal
              }
            />

            <Text
              style={[
                styles.navText,
                selected && styles.navTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// =========================================================
// MEDICATION DATA
// =========================================================

const medications = [
  {
    name: "Lisinopril",
    dose: "10 mg",
    instruction: "Tablet · Once Daily",
    time: "08:00 AM",
    supply: 24,
    total: 30,
    days: 24,
  },
  {
    name: "Metformin",
    dose: "500 mg",
    instruction: "Tablet · Twice Daily",
    time: "08:00 AM",
    supply: 9,
    total: 14,
    days: 5,
  },
  {
    name: "Apixaban",
    dose: "5 mg",
    instruction: "Tablet · Twice Daily",
    time: "08:00 AM",
    supply: 5,
    total: 8,
    days: 3,
  },
  {
    name: "Atorvastatin",
    dose: "20 mg",
    instruction: "Tablet · Once Daily",
    time: "09:00 PM",
    supply: 22,
    total: 30,
    days: 22,
  },
];

// =========================================================
// MEDICATION ICON
// =========================================================

function MedicineIcon() {
  return (
    <View style={styles.medicineIcon}>
      <Ionicons
        name="diamond-outline"
        size={23}
        color={COLORS.teal}
      />
    </View>
  );
}

// =========================================================
// HOME SCREEN
// =========================================================

function HomeScreen({ setActive }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        Dashboard
      </Text>

      <Text style={styles.patientName}>
        Eleanor Whitfield
      </Text>

      <Text style={styles.greeting}>
        Good evening
      </Text>

      <Text style={styles.description}>
        Medication overview for Eleanor Whitfield.
      </Text>

      {/* STAT CARDS */}

      <View style={styles.statsGrid}>
        <View style={styles.smallStatCard}>
          <View style={styles.statIconYellow}>
            <Ionicons
              name="pulse-outline"
              size={21}
              color={COLORS.yellow}
            />
          </View>

          <Text style={styles.statBig}>
            87%
          </Text>

          <Text style={styles.statLabel}>
            Adherence
          </Text>
        </View>

        <View style={styles.smallStatCard}>
          <View style={styles.statIconGreen}>
            <Ionicons
              name="checkmark"
              size={23}
              color={COLORS.green}
            />
          </View>

          <Text style={styles.statBig}>
            4/6
          </Text>

          <Text style={styles.statLabel}>
            Doses taken today
          </Text>
        </View>

        <View style={styles.smallStatCard}>
          <View style={styles.statIconBlue}>
            <Ionicons
              name="time-outline"
              size={22}
              color={COLORS.teal}
            />
          </View>

          <Text style={styles.statBig}>
            9:00 PM
          </Text>

          <Text style={styles.statLabel}>
            Next dose{"\n"}
            Atorvastatin
          </Text>
        </View>

        <View style={styles.smallStatCard}>
          <View style={styles.statIconYellow}>
            <Ionicons
              name="reader-outline"
              size={20}
              color={COLORS.yellow}
            />
          </View>

          <Text style={styles.statBig}>
            2
          </Text>

          <Text style={styles.statLabel}>
            Refills needed
          </Text>
        </View>
      </View>

      {/* REMAINING DOSES */}

      <View style={styles.largeCard}>
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={styles.cardTitle}>
              Today's remaining doses
            </Text>

            <Text style={styles.cardSubtitle}>
              1 dose left to take
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setActive("doses")}
          >
            <Text style={styles.viewAll}>
              View all →
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.doseCard}>
          <MedicineIcon />

          <View style={styles.doseInfo}>
            <Text style={styles.medName}>
              Atorvastatin{" "}
              <Text style={styles.medDose}>
                20 mg
              </Text>
            </Text>

            <Text style={styles.medTime}>
              ◷ 9:00 PM · tablet
            </Text>
          </View>

          <View style={styles.dueBadge}>
            <Text style={styles.dueText}>
              Due now
            </Text>
          </View>
        </View>
      </View>

      {/* REFILL TRACKER */}

      <View style={styles.largeCard}>
        <Text style={styles.cardTitle}>
          Refill tracker
        </Text>

        <Text style={styles.cardSubtitle}>
          Supply levels for active medications
        </Text>

        {medications.map((med) => (
          <View
            key={med.name}
            style={styles.refillRow}
          >
            <MedicineIcon />

            <View style={styles.refillInfo}>
              <Text style={styles.medName}>
                {med.name}
              </Text>

              <Text style={styles.medTime}>
                {med.supply} left · ~{med.days} days
              </Text>
            </View>

            {med.supply <= 9 && (
              <View style={styles.refillBadge}>
                <Text style={styles.refillText}>
                  Refill
                </Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => setActive("meds")}
        >
          <Text style={styles.manageText}>
            Manage medications
          </Text>
        </TouchableOpacity>
      </View>

      {/* ATTENTION */}

      <View style={styles.attentionCard}>
        <Text style={styles.attentionTitle}>
          ⚠ Attention needed
        </Text>

        <Text style={styles.attentionText}>
          2 medications are running low.
        </Text>
      </View>
    </ScrollView>
  );
}

// =========================================================
// DOSES SCREEN
// =========================================================

function DosesScreen() {
  const [filter, setFilter] = useState("All");

  const doses = [
    {
      name: "Lisinopril",
      dose: "10 mg",
      status: "Missed",
      time: "8:00 AM",
    },
    {
      name: "Metformin",
      dose: "500 mg",
      status: "Taken",
      time: "8:00 AM",
    },
    {
      name: "Apixaban",
      dose: "5 mg",
      status: "Taken",
      time: "8:00 AM",
    },
  ];

  const afternoonDoses = [
    {
      name: "Metformin",
      dose: "500 mg",
      status: "Taken",
      time: "8:00 PM",
    },
    {
      name: "Apixaban",
      dose: "5 mg",
      status: "Upcoming",
      time: "8:00 PM",
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        Today's Doses
      </Text>

      <Text style={styles.patientName}>
        Eleanor Whitfield
      </Text>

      <View style={styles.filterRow}>
        {["All", "Upcoming", "Taken", "Missed"].map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterButton,
                filter === item &&
                  styles.filterActive,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item &&
                    styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <DoseGroup
        title="8:00 AM"
        count="3 medications"
        doses={doses}
        filter={filter}
      />

      <DoseGroup
        title="8:00 PM"
        count="2 medications"
        doses={afternoonDoses}
        filter={filter}
      />
    </ScrollView>
  );
}

// =========================================================
// DOSE GROUP
// =========================================================

function DoseGroup({
  title,
  count,
  doses,
  filter,
}) {
  const filtered =
    filter === "All"
      ? doses
      : doses.filter(
          (dose) => dose.status === filter
        );

  if (filtered.length === 0) {
    return null;
  }

  return (
    <View style={styles.doseGroup}>
      <View style={styles.doseGroupTitle}>
        <Text style={styles.timeTitle}>
          ◷ {title}
        </Text>

        <Text style={styles.groupCount}>
          {count}
        </Text>
      </View>

      {filtered.map((dose) => (
        <View
          key={dose.name + dose.time}
          style={styles.doseListCard}
        >
          <MedicineIcon />

          <View style={styles.doseInfo}>
            <Text style={styles.medName}>
              {dose.name}{" "}
              <Text style={styles.medDose}>
                {dose.dose}
              </Text>
            </Text>

            <Text style={styles.medTime}>
              ◷ {dose.time} · tablet
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              dose.status === "Missed"
                ? styles.statusMissed
                : dose.status === "Taken"
                ? styles.statusTaken
                : styles.statusUpcoming,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                dose.status === "Missed" &&
                  styles.statusMissedText,
              ]}
            >
              {dose.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// =========================================================
// MEDICATIONS SCREEN
// =========================================================

function MedicationsScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        Medications
      </Text>

      <Text style={styles.patientName}>
        Eleanor Whitfield
      </Text>

      <TouchableOpacity
        style={styles.addMedication}
      >
        <Text style={styles.addMedicationText}>
          + Add medication
        </Text>
      </TouchableOpacity>

      {medications.map((med) => (
        <MedicationCard
          key={med.name}
          medication={med}
        />
      ))}
    </ScrollView>
  );
}

// =========================================================
// MEDICATION CARD
// =========================================================

function MedicationCard({ medication }) {
  const percent =
    medication.supply / medication.total;

  return (
    <View style={styles.medicationCard}>
      <View style={styles.medicationTop}>
        <MedicineIcon />

        <View style={{ flex: 1 }}>
          <Text style={styles.medicationName}>
            {medication.name}{" "}
            <Text style={styles.medicationDose}>
              {medication.dose}
            </Text>
          </Text>

          <Text style={styles.medicationInstruction}>
            {medication.instruction}
          </Text>
        </View>
      </View>

      <Text style={styles.medicationDescription}>
        Take one tablet by mouth with water.
      </Text>

      <View style={styles.timeBadge}>
        <Text style={styles.timeBadgeText}>
          ◷ {medication.time}
        </Text>
      </View>

      <Text style={styles.prescribed}>
        ♟ Prescribed by Dr. Priya Nair
      </Text>

      <View style={styles.supplyBox}>
        <View style={styles.supplyHeader}>
          <Text style={styles.supplyTitle}>
            ▣ Supply
          </Text>

          <Text style={styles.supplyValue}>
            {medication.supply} of{" "}
            {medication.total} · ~
            {medication.days} days
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${percent * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.medButtons}>
        <TouchableOpacity
          style={styles.refillButton}
        >
          <Text style={styles.refillButtonText}>
            ↻ Refill
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            ✎ Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// =========================================================
// STATS SCREEN
// =========================================================

function StatsScreen() {
  const bars = [
    70, 70, 90, 90, 70, 90, 90,
    55, 70, 90, 55, 70, 70, 70,
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        Adherence
      </Text>

      <Text style={styles.patientName}>
        Eleanor Whitfield
      </Text>

      <View style={styles.adherenceCard}>
        <Text style={styles.adherenceTitle}>
          Overall adherence
        </Text>

        <Text style={styles.adherenceSubtitle}>
          Doses taken as scheduled
        </Text>

        <View style={styles.circleContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text style={styles.percent}>
                87%
              </Text>

              <Text style={styles.percentLabel}>
                Adherence
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.outcomeRow}>
          <View>
            <Text
              style={[
                styles.outcomeNumber,
                { color: COLORS.green },
              ]}
            >
              72
            </Text>

            <Text style={styles.outcomeLabel}>
              Taken
            </Text>
          </View>

          <View>
            <Text
              style={[
                styles.outcomeNumber,
                { color: COLORS.yellow },
              ]}
            >
              7
            </Text>

            <Text style={styles.outcomeLabel}>
              Skipped
            </Text>
          </View>

          <View>
            <Text
              style={[
                styles.outcomeNumber,
                { color: COLORS.red },
              ]}
            >
              4
            </Text>

            <Text style={styles.outcomeLabel}>
              Missed
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Daily adherence
        </Text>

        <Text style={styles.chartSubtitle}>
          Percentage of scheduled doses taken each day
        </Text>

        <View style={styles.barChart}>
          {bars.map((height, index) => (
            <View
              key={index}
              style={styles.barColumn}
            >
              <View
                style={[
                  styles.bar,
                  { height },
                ]}
              />

              <Text style={styles.barLabel}>
                {index + 1}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Dose outcomes
        </Text>

        <Text style={styles.chartSubtitle}>
          83 completed doses
        </Text>

        <View style={styles.greenCircleContainer}>
          <View style={styles.greenOuterCircle}>
            <View style={styles.greenInnerCircle}>
              <Text style={styles.doseNumber}>
                83
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.medAdherenceCard}>
        <Text style={styles.chartTitle}>
          Adherence by medication
        </Text>

        <Text style={styles.chartSubtitle}>
          Lowest adherence first
        </Text>

        <AdherenceRow
          name="Atorvastatin 20 mg"
          value={77}
        />

        <AdherenceRow
          name="Lisinopril 10 mg"
          value={86}
        />

        <AdherenceRow
          name="Metformin 500 mg"
          value={86}
        />

        <AdherenceRow
          name="Apixaban 5 mg"
          value={93}
        />
      </View>
    </ScrollView>
  );
}

// =========================================================
// ADHERENCE ROW
// =========================================================

function AdherenceRow({ name, value }) {
  return (
    <View style={styles.adherenceRow}>
      <View style={styles.adherenceRowHeader}>
        <Text style={styles.adherenceMedName}>
          {name}
        </Text>

        <Text style={styles.adherenceValue}>
          {value}%
        </Text>
      </View>

      <View style={styles.adherenceBarBackground}>
        <View
          style={[
            styles.adherenceBar,
            {
              width: `${value}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.trackedText}>
        14 doses tracked
      </Text>
    </View>
  );
}

// =========================================================
// REPORTS SCREEN
// =========================================================

function ReportsScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        Reports
      </Text>

      <Text style={styles.patientName}>
        Eleanor Whitfield
      </Text>

      <Text style={styles.reportTitle}>
        Clinical Reports
      </Text>

      <Text style={styles.reportSubtitle}>
        Adherence summaries across 2 patients · last 14 days
      </Text>

      <TouchableOpacity style={styles.exportButton}>
        <Text style={styles.exportText}>
          ↓ Export all
        </Text>
      </TouchableOpacity>

      <View style={styles.reportCard}>
        <View style={styles.reportNameRow}>
          <Text style={styles.reportName}>
            Eleanor Whitfield
          </Text>

          <View style={styles.adherenceBadge}>
            <Text style={styles.adherenceBadgeText}>
              87% adherence
            </Text>
          </View>
        </View>

        <Text style={styles.reportDetails}>
          DOB 04/18/1953 · Hypertension, Type 2 Diabetes,
          Atrial Fibrillation
        </Text>

        <TouchableOpacity
          style={styles.generateButton}
        >
          <Text style={styles.generateText}>
            ▣ Generate report
          </Text>
        </TouchableOpacity>

        <View style={styles.reportStats}>
          <ReportStat
            title="Adherence"
            value="87%"
          />

          <ReportStat
            title="Active meds"
            value="4"
          />

          <ReportStat
            title="Missed doses"
            value="4"
            red
          />

          <ReportStat
            title="Skipped doses"
            value="7"
            yellow
          />
        </View>

        <Text style={styles.refillsTitle}>
          Refills needed
        </Text>

        <View style={styles.refillTags}>
          <View style={styles.refillTag}>
            <Text style={styles.refillTagText}>
              ◇ Metformin · 9 left
            </Text>
          </View>

          <View style={styles.refillTag}>
            <Text style={styles.refillTagText}>
              ◇ Apixaban · 5 left
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// =========================================================
// REPORT STAT
// =========================================================

function ReportStat({
  title,
  value,
  red,
  yellow,
}) {
  return (
    <View style={styles.reportStat}>
      <Text style={styles.reportStatTitle}>
        {title}
      </Text>

      <Text
        style={[
          styles.reportStatValue,
          red && { color: COLORS.red },
          yellow && {
            color: COLORS.yellow,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

// =========================================================
// CREATE ACCOUNT SCREEN
// =========================================================

function CreateAccountScreen({
  onBack,
  onAccountCreated,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const createAccount = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        "Missing Information",
        "Please complete all fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Error",
        "Passwords do not match."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Password Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    Alert.alert(
      "Account Created",
      "Your MedSked account has been created.",
      [
        {
          text: "Continue",
          onPress: onAccountCreated,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.loginSafe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.bg}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.createContent
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={COLORS.text}
            />

            <Text style={styles.backText}>
              Back to Sign In
            </Text>
          </TouchableOpacity>

          <View style={styles.createLogo}>
            <Logo />
          </View>

          <Text style={styles.loginTitle}>
            Create account
          </Text>

          <Text style={styles.loginSubtitle}>
            Create your account to start managing
            {"\n"}
            your medication schedule.
          </Text>

          <Text style={styles.loginLabel}>
            Full Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={COLORS.muted}
            style={styles.loginInput}
          />

          <Text style={styles.loginLabel}>
            Email Address
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.muted}
            style={styles.loginInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.loginLabel}>
            Password
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor={COLORS.muted}
            style={styles.loginInput}
            secureTextEntry
          />

          <Text style={styles.loginLabel}>
            Confirm Password
          </Text>

          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor={COLORS.muted}
            style={styles.loginInput}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={createAccount}
          >
            <Text style={styles.loginButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>

          <View style={styles.loginDivider} />

          <Text style={styles.noAccount}>
            Already have an account?
          </Text>

          <TouchableOpacity
            style={styles.createButton}
            onPress={onBack}
          >
            <Text style={styles.createButtonText}>
              Sign In
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// =========================================================
// LOGIN SCREEN
// =========================================================

function LoginScreen({
  onLogin,
  onCreateAccount,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  return (
    <SafeAreaView style={styles.loginSafe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.bg}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.loginContent
          }
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginLogo}>
            <Logo />
          </View>

          <Text style={styles.loginTitle}>
            Welcome back
          </Text>

          <Text style={styles.loginSubtitle}>
            Sign in to continue managing your
            {"\n"}
            household medication schedule.
          </Text>

          <Text style={styles.loginLabel}>
            Email Address
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.muted}
            style={styles.loginInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.loginLabel}>
            Password
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.muted}
            style={styles.loginInput}
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={onLogin}
          >
            <Text style={styles.loginButtonText}>
              Sign In
            </Text>
          </TouchableOpacity>

          <View style={styles.loginDivider} />

          <Text style={styles.noAccount}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            style={styles.createButton}
            onPress={onCreateAccount}
          >
            <Text style={styles.createButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// =========================================================
// PROFILE / MORE SCREEN
// =========================================================

function MoreScreen({ onLogout }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        Profile
      </Text>

      <Text style={styles.patientName}>
        Account settings
      </Text>

      {/* PROFILE CARD */}

      <View style={styles.profileCard}>
        <View style={styles.profileIcon}>
          <Ionicons
            name="person"
            size={32}
            color={COLORS.teal}
          />
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            Eleanor Whitfield
          </Text>

          <Text style={styles.profileEmail}>
            eleanor@example.com
          </Text>

          <View style={styles.patientRole}>
            <Text style={styles.patientRoleText}>
              Patient
            </Text>
          </View>
        </View>
      </View>

      {/* SETTINGS */}

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>
          Account
        </Text>

        <TouchableOpacity
          style={styles.settingRow}
        >
          <View style={styles.settingIcon}>
            <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.teal}
            />
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>
              Profile
            </Text>

            <Text style={styles.settingDescription}>
              Manage your personal information
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={COLORS.muted}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.settingRow}
        >
          <View style={styles.settingIcon}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={COLORS.teal}
            />
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>
              Notifications
            </Text>

            <Text style={styles.settingDescription}>
              Manage medication reminders
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={COLORS.muted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingRow}
        >
          <View style={styles.settingIcon}>
            <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.teal}
            />
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>
              Reports
            </Text>

            <Text style={styles.settingDescription}>
              Eleanor Whitfield
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={COLORS.muted}
          />
        </TouchableOpacity>

      </View>

      {/* LOGOUT */}

      <View style={styles.logoutCard}>
        <View style={styles.logoutHeader}>
          <View style={styles.logoutIcon}>
            <Ionicons
              name="log-out-outline"
              size={22}
              color={COLORS.red}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.logoutTitle}>
              Log Out
            </Text>

            <Text style={styles.logoutDescription}>
              Sign out of your MedSked account
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={19}
            color={COLORS.red}
          />

          <Text style={styles.logoutButtonText}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// =========================================================
// APP
// =========================================================

export default function App() {
  const [screen, setScreen] =
    useState("login");

  const [activeTab, setActiveTab] =
    useState("home");

  // LOGIN
  const handleLogin = () => {
    setActiveTab("home");
    setScreen("app");
  };

  // CREATE ACCOUNT
  const handleCreateAccount = () => {
    setScreen("create");
  };

  // ACCOUNT CREATED
  const handleAccountCreated = () => {
    setScreen("login");
  };

  // LOGOUT
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            setActiveTab("home");
            setScreen("login");
          },
        },
      ]
    );
  };

  // CREATE ACCOUNT SCREEN
  if (screen === "create") {
    return (
      <CreateAccountScreen
        onBack={() => setScreen("login")}
        onAccountCreated={handleAccountCreated}
      />
    );
  }

  // LOGIN SCREEN
  if (screen === "login") {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onCreateAccount={handleCreateAccount}
      />
    );
  }

  // MAIN APP
  function renderScreen() {
    if (activeTab === "home") {
      return (
        <HomeScreen
          setActive={setActiveTab}
        />
      );
    }

    if (activeTab === "doses") {
      return <DosesScreen />;
    }

    if (activeTab === "meds") {
      return <MedicationsScreen />;
    }

    if (activeTab === "stats") {
      return <StatsScreen />;
    }

    if (activeTab === "more") {
      return (
        <MoreScreen
          onLogout={handleLogout}
        />
      );
    }

    return (
      <HomeScreen
        setActive={setActiveTab}
      />
    );
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.bg}
      />

      <TopHeader />

      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      <BottomNav
        active={activeTab}
        setActive={setActiveTab}
      />
    </SafeAreaView>
  );
}

// =========================================================
// STYLES
// =========================================================

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 23,
    paddingBottom: 30,
  },

  // =======================================================
  // LOGO
  // =======================================================

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    width: 47,
    height: 47,
    borderRadius: 11,
    backgroundColor: COLORS.teal,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logoText: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  logoSubtext: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 1,
  },

  // =======================================================
  // HEADER
  // =======================================================

  topHeader: {
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.bg,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  patientButton: {
    height: 43,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  patientText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
  },

  notification: {
    marginLeft: 13,
    position: "relative",
  },

  notificationBadge: {
    position: "absolute",
    right: -7,
    top: -7,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  // =======================================================
  // TITLES
  // =======================================================

  pageTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  patientName: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },

  greeting: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 31,
  },

  description: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },

  // =======================================================
  // STAT GRID
  // =======================================================

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 18,
  },

  smallStatCard: {
    width: "48%",
    minHeight: 150,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
  },

  statIconYellow: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#263426",
    alignItems: "center",
    justifyContent: "center",
  },

  statIconGreen: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#0D4A37",
    alignItems: "center",
    justifyContent: "center",
  },

  statIconBlue: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#0C454B",
    alignItems: "center",
    justifyContent: "center",
  },

  statBig: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 12,
  },

  statLabel: {
    color: "#79A7AA",
    fontSize: 11,
    marginTop: 3,
    lineHeight: 15,
  },

  // =======================================================
  // CARDS
  // =======================================================

  largeCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 16,
    marginTop: 9,
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  cardSubtitle: {
    color: "#78A2A5",
    fontSize: 12,
    marginTop: 4,
  },

  viewAll: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 6,
  },

  doseCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  medicineIcon: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: "#075E63",
    alignItems: "center",
    justifyContent: "center",
  },

  doseInfo: {
    flex: 1,
    marginLeft: 12,
  },

  medName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },

  medDose: {
    color: "#8EAFB1",
    fontWeight: "600",
  },

  medTime: {
    color: "#80A5A8",
    fontSize: 11,
    marginTop: 4,
  },

  dueBadge: {
    backgroundColor: "#12373C",
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },

  dueText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "800",
  },

  // =======================================================
  // REFILL
  // =======================================================

  refillRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  refillInfo: {
    flex: 1,
    marginLeft: 10,
  },

  refillBadge: {
    backgroundColor: "#5A2028",
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },

  refillText: {
    color: COLORS.red,
    fontSize: 10,
    fontWeight: "900",
  },

  manageButton: {
    backgroundColor: "#10383D",
    height: 43,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  manageText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
  },

  // =======================================================
  // ATTENTION
  // =======================================================

  attentionCard: {
    backgroundColor: "#14211D",
    borderWidth: 1,
    borderColor: "#2B3C32",
    borderRadius: 15,
    padding: 15,
    marginTop: 14,
  },

  attentionTitle: {
    color: COLORS.yellow,
    fontSize: 15,
    fontWeight: "900",
  },

  attentionText: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },

  // =======================================================
  // BOTTOM NAV
  // =======================================================

  bottomNav: {
    height: 74,
    backgroundColor: "#07191C",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 7,
  },

  navItem: {
    width: 55,
    height: 58,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  navItemActive: {
    backgroundColor: COLORS.teal,
  },

  navText: {
    color: "#78A5A8",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 4,
  },

  navTextActive: {
    color: COLORS.bg,
    fontWeight: "900",
  },

  // =======================================================
  // FILTER
  // =======================================================

  filterRow: {
    flexDirection: "row",
    marginTop: 21,
    marginBottom: 13,
    gap: 6,
  },

  filterButton: {
    backgroundColor: "#11343A",
    paddingHorizontal: 14,
    height: 33,
    borderRadius: 17,
    justifyContent: "center",
  },

  filterActive: {
    backgroundColor: COLORS.teal,
  },

  filterText: {
    color: "#91AEB0",
    fontSize: 10,
    fontWeight: "800",
  },

  filterTextActive: {
    color: COLORS.bg,
  },

  // =======================================================
  // DOSE GROUP
  // =======================================================

  doseGroup: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 16,
    marginBottom: 13,
  },

  doseGroupTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  timeTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  groupCount: {
    color: COLORS.muted,
    fontSize: 12,
    marginLeft: 4,
  },

  doseListCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
  },

  statusTaken: {
    backgroundColor: COLORS.teal,
  },

  statusMissed: {
    backgroundColor: "#572329",
  },

  statusUpcoming: {
    backgroundColor: "#143A3E",
  },

  statusText: {
    color: COLORS.bg,
    fontSize: 10,
    fontWeight: "900",
  },

  statusMissedText: {
    color: COLORS.red,
  },

  // =======================================================
  // MEDICATIONS
  // =======================================================

  addMedication: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.teal,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginTop: 13,
    marginBottom: 8,
  },

  addMedicationText: {
    color: COLORS.bg,
    fontSize: 13,
    fontWeight: "900",
  },

  medicationCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },

  medicationTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  medicationName: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "900",
    marginLeft: 11,
  },

  medicationDose: {
    color: "#89AAAD",
  },

  medicationInstruction: {
    color: "#89AAAD",
    fontSize: 12,
    marginLeft: 11,
    marginTop: 4,
  },

  medicationDescription: {
    color: "#8EABAD",
    fontSize: 12,
    marginTop: 18,
  },

  timeBadge: {
    backgroundColor: "#0A4147",
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
  },

  timeBadgeText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "800",
  },

  prescribed: {
    color: "#789A9D",
    fontSize: 10,
    marginTop: 14,
  },

  supplyBox: {
    backgroundColor: "#10363A",
    borderRadius: 10,
    padding: 12,
    marginTop: 13,
  },

  supplyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  supplyTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "900",
  },

  supplyValue: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },

  progressBackground: {
    height: 6,
    backgroundColor: "#183D40",
    borderRadius: 5,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.teal,
    borderRadius: 5,
  },

  medButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
  },

  refillButton: {
    backgroundColor: COLORS.teal,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 9,
  },

  refillButtonText: {
    color: COLORS.bg,
    fontSize: 12,
    fontWeight: "900",
  },

  editButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 9,
  },

  editButtonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "900",
  },

  // =======================================================
  // STATS
  // =======================================================

  adherenceCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    marginTop: 22,
    padding: 22,
    alignItems: "center",
  },

  adherenceTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  adherenceSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },

  circleContainer: {
    marginTop: 20,
  },

  outerCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 12,
    borderColor: "#FFB72F",
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    alignItems: "center",
  },

  percent: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "900",
  },

  percentLabel: {
    color: COLORS.muted,
    fontSize: 11,
  },

  outcomeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 21,
  },

  outcomeNumber: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },

  outcomeLabel: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
  },

  chartCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    marginTop: 14,
    padding: 16,
  },

  chartTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  chartSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },

  barChart: {
    height: 180,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },

  barColumn: {
    height: 150,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bar: {
    width: 11,
    backgroundColor: COLORS.teal,
    borderRadius: 6,
  },

  barLabel: {
    color: "#63888C",
    fontSize: 8,
    marginTop: 6,
  },

  greenCircleContainer: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 2,
  },

  greenOuterCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 12,
    borderColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },

  greenInnerCircle: {
    alignItems: "center",
    justifyContent: "center",
  },

  doseNumber: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: "900",
  },

  medAdherenceCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    marginTop: 14,
    padding: 16,
  },

  adherenceRow: {
    marginTop: 18,
  },

  adherenceRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  adherenceMedName: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
  },

  adherenceValue: {
    color: COLORS.teal,
    fontSize: 13,
    fontWeight: "900",
  },

  adherenceBarBackground: {
    height: 5,
    backgroundColor: "#19383B",
    borderRadius: 5,
    marginTop: 9,
    overflow: "hidden",
  },

  adherenceBar: {
    height: "100%",
    backgroundColor: COLORS.teal,
    borderRadius: 5,
  },

  trackedText: {
    color: "#729396",
    fontSize: 9,
    marginTop: 6,
  },

  // =======================================================
  // REPORTS
  // =======================================================

  reportTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 30,
  },

  reportSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  exportButton: {
    height: 38,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 7,
  },

  exportText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "900",
  },

  reportCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    marginTop: 15,
    padding: 16,
  },

  reportNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  reportName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },

  adherenceBadge: {
    backgroundColor: COLORS.teal,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 8,
  },

  adherenceBadgeText: {
    color: COLORS.bg,
    fontSize: 8,
    fontWeight: "900",
  },

  reportDetails: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 7,
  },

  generateButton: {
    alignSelf: "flex-start",
    backgroundColor: "#103A3F",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginTop: 12,
  },

  generateText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "900",
  },

  reportStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 14,
  },

  reportStat: {
    width: "48%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 11,
    marginBottom: 7,
  },

  reportStatTitle: {
    color: COLORS.muted,
    fontSize: 9,
  },

  reportStatValue: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 7,
  },

  refillsTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 10,
  },

  refillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 8,
  },

  refillTag: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  refillTagText: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: "800",
  },

  // =======================================================
  // LOGIN
  // =======================================================

  loginSafe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  loginContent: {
    flexGrow: 1,
    paddingHorizontal: 35,
    paddingTop: 55,
    paddingBottom: 30,
    justifyContent: "center",
  },

  loginLogo: {
    alignItems: "center",
    marginBottom: 45,
  },

  loginTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    textAlign: "center",
  },

  loginSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 9,
    marginBottom: 35,
  },

  loginLabel: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 8,
  },

  loginInput: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    backgroundColor: "#0B2428",
    color: COLORS.text,
    paddingHorizontal: 13,
    fontSize: 12,
    marginBottom: 18,
  },

  forgotPassword: {
    color: COLORS.teal,
    fontSize: 10,
    fontWeight: "800",
    textAlign: "right",
    marginTop: -7,
    marginBottom: 20,
  },

  loginButton: {
    height: 45,
    backgroundColor: COLORS.teal,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    color: COLORS.bg,
    fontSize: 13,
    fontWeight: "900",
  },

  loginDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 27,
    marginBottom: 15,
  },

  noAccount: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
  },

  createButton: {
    height: 43,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  createButtonText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "900",
  },

  // =======================================================
  // CREATE ACCOUNT
  // =======================================================

  createContent: {
    flexGrow: 1,
    paddingHorizontal: 35,
    paddingTop: 20,
    paddingBottom: 35,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  backText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 7,
  },

  createLogo: {
    alignItems: "center",
    marginBottom: 30,
  },

  // =======================================================
  // PROFILE
  // =======================================================

  profileCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 18,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
  },

  profileIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#0A4147",
    alignItems: "center",
    justifyContent: "center",
  },

  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },

  profileName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },

  profileEmail: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },

  patientRole: {
    alignSelf: "flex-start",
    backgroundColor: "#103A3F",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 7,
  },

  patientRoleText: {
    color: COLORS.teal,
    fontSize: 9,
    fontWeight: "900",
  },

  settingsCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },

  settingsTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },

  settingRow: {
    minHeight: 65,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 7,
    paddingTop: 10,
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#0A4147",
    alignItems: "center",
    justifyContent: "center",
  },

  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },

  settingName: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
  },

  settingDescription: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 3,
  },

  // =======================================================
  // LOGOUT
  // =======================================================

  logoutCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: "#52252A",
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    marginBottom: 20,
  },

  logoutHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoutIcon: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: "#3D2025",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoutTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
  },

  logoutDescription: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },

  logoutButton: {
    height: 45,
    borderWidth: 1,
    borderColor: "#6A3037",
    backgroundColor: "#351C21",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  logoutButtonText: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 7,
  },
});
