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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* =========================================================
   COLORS
========================================================= */

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
};

/* =========================================================
   LOGO
========================================================= */

function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("./medskedlogo.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <View>
        <Text style={styles.logoText}>MEDSKED</Text>
        <Text style={styles.logoSubtext}>
          Medication Care
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   TOP HEADER
========================================================= */

function TopHeader({ onLogout, onProfile }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.topHeader}>
      <Logo />

      <View style={styles.headerRight}>
        <View>
          <TouchableOpacity
            style={styles.patientButton}
            onPress={() =>
              setMenuVisible(!menuVisible)
            }
          >
            <Ionicons
              name="person-outline"
              size={14}
              color={COLORS.teal}
            />

            <Text style={styles.patientText}>
              Patient
            </Text>

            <Ionicons
              name={
                menuVisible
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={13}
              color={COLORS.teal}
            />
          </TouchableOpacity>

          {menuVisible && (
            <View style={styles.profileMenu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  onProfile();
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={COLORS.text}
                />

                <Text style={styles.menuText}>
                  Profile
                </Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  onLogout();
                }}
              >
                <Ionicons
                  name="log-out-outline"
                  size={19}
                  color={COLORS.red}
                />

                <Text
                  style={[
                    styles.menuText,
                    { color: COLORS.red },
                  ]}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.notification}
          onPress={() =>
            Alert.alert(
              "Notifications",
              "You have 2 notifications."
            )
          }
        >
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

/* =========================================================
   BOTTOM NAVIGATION
========================================================= */

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

/* =========================================================
   MEDICATION DATA
========================================================= */

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

/* =========================================================
   MEDICINE ICON
========================================================= */

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

/* =========================================================
   HOME SCREEN
========================================================= */

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

      <View style={styles.statsGrid}>
        <View style={styles.smallStatCard}>
          <View style={styles.statIconYellow}>
            <Ionicons
              name="pulse-outline"
              size={21}
              color={COLORS.yellow}
            />
          </View>

          <Text style={styles.statBig}>87%</Text>

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

          <Text style={styles.statBig}>4/6</Text>

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
            Next dose{"\n"}Atorvastatin
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

          <Text style={styles.statBig}>2</Text>

          <Text style={styles.statLabel}>
            Refills needed
          </Text>
        </View>
      </View>

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

/* =========================================================
   DOSES SCREEN
========================================================= */

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

  const filteredDoses =
    filter === "All"
      ? doses
      : doses.filter(
          (dose) => dose.status === filter
        );

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
        {[
          "All",
          "Upcoming",
          "Taken",
          "Missed",
        ].map((item) => (
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
        ))}
      </View>

      <DoseGroup
        title="8:00 AM"
        count={`${filteredDoses.length} medications`}
        doses={filteredDoses}
      />

      {filter === "All" && (
        <DoseGroup
          title="8:00 PM"
          count="2 medications"
          doses={[
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
          ]}
        />
      )}
    </ScrollView>
  );
}

/* =========================================================
   DOSE GROUP
========================================================= */

function DoseGroup({
  title,
  count,
  doses,
}) {
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

      {doses.length === 0 ? (
        <Text style={styles.emptyText}>
          No doses found.
        </Text>
      ) : (
        doses.map((dose) => (
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
        ))
      )}
    </View>
  );
}

/* =========================================================
   MEDICATIONS SCREEN
========================================================= */

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
        onPress={() =>
          Alert.alert(
            "Add Medication",
            "Medication form will be available here."
          )
        }
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

/* =========================================================
   MEDICATION CARD
========================================================= */

function MedicationCard({
  medication,
}) {
  const percent =
    medication.supply /
    medication.total;

  return (
    <View style={styles.medicationCard}>
      <View style={styles.medicationTop}>
        <MedicineIcon />

        <View style={styles.medicationDetails}>
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
          onPress={() =>
            Alert.alert(
              "Refill",
              `Refill request for ${medication.name}.`
            )
          }
        >
          <Text style={styles.refillButtonText}>
            ↻ Refill
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            Alert.alert(
              "Edit",
              `Edit ${medication.name}.`
            )
          }
        >
          <Text style={styles.editButtonText}>
            ✎ Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =========================================================
   STATS SCREEN
========================================================= */

function StatsScreen() {
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
          {[
            70, 70, 90, 90,
            70, 90, 90, 55,
            70, 90, 55, 70,
            70, 70,
          ].map((height, index) => (
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

/* =========================================================
   ADHERENCE ROW
========================================================= */

function AdherenceRow({
  name,
  value,
}) {
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

      <View
        style={styles.adherenceBarBackground}
      >
        <View
          style={[
            styles.adherenceBar,
            { width: `${value}%` },
          ]}
        />
      </View>

      <Text style={styles.trackedText}>
        14 doses tracked
      </Text>
    </View>
  );
}

/* =========================================================
   REPORTS SCREEN
========================================================= */

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

      <TouchableOpacity
        style={styles.exportButton}
        onPress={() =>
          Alert.alert(
            "Export",
            "Reports exported successfully."
          )
        }
      >
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
            <Text
              style={styles.adherenceBadgeText}
            >
              87% adherence
            </Text>
          </View>
        </View>

        <Text style={styles.reportDetails}>
          DOB 04/18/1953 · Hypertension,
          Type 2 Diabetes, Atrial Fibrillation
        </Text>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={() =>
            Alert.alert(
              "Report",
              "Clinical report generated."
            )
          }
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

/* =========================================================
   REPORT STAT
========================================================= */

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
          yellow && { color: COLORS.yellow },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* =========================================================
   PROFILE SCREEN
========================================================= */

function ProfileScreen({ onLogout }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>
        Profile
      </Text>

      <Text style={styles.profileSubtitle}>
        Account settings
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Ionicons
            name="person"
            size={30}
            color={COLORS.teal}
          />
        </View>

        <View>
          <Text style={styles.profileName}>
            Eleanor Whitfield
          </Text>

          <Text style={styles.profileEmail}>
            eleanor@example.com
          </Text>

          <View style={styles.patientBadge}>
            <Text style={styles.patientBadgeText}>
              Patient
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.accountCard}>
        <Text style={styles.accountTitle}>
          Account
        </Text>

        <View style={styles.accountDivider} />

        <TouchableOpacity
          style={styles.accountRow}
          onPress={() =>
            Alert.alert(
              "Profile",
              "Manage your personal information."
            )
          }
        >
          <View style={styles.accountIcon}>
            <Ionicons
              name="person-outline"
              size={21}
              color={COLORS.teal}
            />
          </View>

          <View style={styles.accountInfo}>
            <Text style={styles.accountItemTitle}>
              Profile
            </Text>

            <Text style={styles.accountItemSubtitle}>
              Manage your personal information
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.muted}
          />
        </TouchableOpacity>

        <View style={styles.accountDivider} />

        <TouchableOpacity
          style={styles.accountRow}
          onPress={() =>
            Alert.alert(
              "Notifications",
              "Manage your medication reminders."
            )
          }
        >
          <View style={styles.accountIcon}>
            <Ionicons
              name="notifications-outline"
              size={21}
              color={COLORS.teal}
            />
          </View>

          <View style={styles.accountInfo}>
            <Text style={styles.accountItemTitle}>
              Notifications
            </Text>

            <Text style={styles.accountItemSubtitle}>
              Manage medication reminders
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.muted}
          />
        </TouchableOpacity>

        <View style={styles.accountDivider} />

        <TouchableOpacity
          style={styles.accountRow}
          onPress={() =>
            Alert.alert(
              "Reports",
              "Clinical reports for Eleanor Whitfield."
            )
          }
        >
          <View style={styles.accountIcon}>
            <Ionicons
              name="document-text-outline"
              size={21}
              color={COLORS.teal}
            />
          </View>

          <View style={styles.accountInfo}>
            <Text style={styles.accountItemTitle}>
              Reports
            </Text>

            <Text style={styles.accountItemSubtitle}>
              Eleanor Whitfield
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.muted}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutCard}
        onPress={onLogout}
      >
        <View style={styles.logoutIcon}>
          <Ionicons
            name="log-out-outline"
            size={23}
            color={COLORS.red}
          />
        </View>

        <View>
          <Text style={styles.logoutTitle}>
            Log Out
          </Text>

          <Text style={styles.logoutSubtitle}>
            Sign out of your MedSked account
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* =========================================================
   LOGIN SCREEN
========================================================= */

function LoginScreen({
  onLogin,
  onCreateAccount,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    onLogin();
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
          contentContainerStyle={styles.loginContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginLogo}>
            <Logo />
          </View>

          <Text style={styles.loginTitle}>
            Welcome back
          </Text>

          <Text style={styles.loginSubtitle}>
            Sign in to continue managing{"\n"}
            your household medication schedule.
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

          <View style={styles.passwordInputWrapper}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.muted}
              style={[
                styles.loginInput,
                styles.passwordInput,
              ]}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() =>
                setShowPassword((visible) => !visible)
              }
              accessibilityRole="button"
              accessibilityLabel={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={20}
                color={COLORS.muted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Forgot Password",
                "Password reset will be available here."
              )
            }
          >
            <Text style={styles.forgotPassword}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
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

/* =========================================================
   CREATE ACCOUNT SCREEN
   WITH CAREGIVER / PATIENT ROLE
========================================================= */

function CreateAccountScreen({
  onCreateAccount,
  onBackToLogin,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [role, setRole] = useState("");

  const handleCreateAccount = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields and select your household role."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Password",
        "Password must be at least 6 characters."
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

    onCreateAccount({
      name,
      email,
      password,
      role,
    });
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
          contentContainerStyle={styles.loginContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginLogo}>
            <Logo />
          </View>

          <Text style={styles.loginTitle}>
            Create Account
          </Text>

          <Text style={styles.loginSubtitle}>
            Create your account to start managing your{"\n"}
            medication schedule.
          </Text>

          {/* FULL NAME */}

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

          {/* EMAIL */}

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

          {/* PASSWORD */}

          <Text style={styles.loginLabel}>
            Password
          </Text>

          <View style={styles.passwordInputWrapper}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor={COLORS.muted}
              style={[
                styles.loginInput,
                styles.passwordInput,
              ]}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() =>
                setShowPassword((visible) => !visible)
              }
              accessibilityRole="button"
              accessibilityLabel={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={20}
                color={COLORS.muted}
              />
            </TouchableOpacity>
          </View>

          {/* CONFIRM PASSWORD */}

          <Text style={styles.loginLabel}>
            Confirm Password
          </Text>

          <View style={styles.passwordInputWrapper}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor={COLORS.muted}
              style={[
                styles.loginInput,
                styles.passwordInput,
              ]}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() =>
                setShowConfirmPassword((visible) => !visible)
              }
              accessibilityRole="button"
              accessibilityLabel={
                showConfirmPassword
                  ? "Hide password confirmation"
                  : "Show password confirmation"
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={20}
                color={COLORS.muted}
              />
            </TouchableOpacity>
          </View>

          {/* =================================================
              HOUSEHOLD ROLE
          ================================================= */}

          <Text style={styles.roleTitle}>
            Your role in this household
          </Text>

          <View style={styles.roleRow}>
            {/* CAREGIVER */}

            <TouchableOpacity
              style={[
                styles.roleCard,
                role === "Caregiver" &&
                  styles.roleCardSelected,
              ]}
              onPress={() =>
                setRole("Caregiver")
              }
              activeOpacity={0.8}
            >
              <View style={styles.roleTopRow}>
                <Text
                  style={[
                    styles.roleName,
                    role === "Caregiver" &&
                      styles.roleNameSelected,
                  ]}
                >
                  Caregiver
                </Text>

                {role === "Caregiver" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.teal}
                  />
                )}
              </View>

              <Text style={styles.roleDescription}>
                Manages the schedule
              </Text>
            </TouchableOpacity>

            {/* PATIENT */}

            <TouchableOpacity
              style={[
                styles.roleCard,
                role === "Patient" &&
                  styles.roleCardSelected,
              ]}
              onPress={() =>
                setRole("Patient")
              }
              activeOpacity={0.8}
            >
              <View style={styles.roleTopRow}>
                <Text
                  style={[
                    styles.roleName,
                    role === "Patient" &&
                      styles.roleNameSelected,
                  ]}
                >
                  Patient
                </Text>

                {role === "Patient" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.teal}
                  />
                )}
              </View>

              <Text style={styles.roleDescription}>
                Follows the schedule
              </Text>
            </TouchableOpacity>
          </View>

          {/* CREATE ACCOUNT */}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleCreateAccount}
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
            onPress={onBackToLogin}
          >
            <Text style={styles.createButtonText}>
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [screen, setScreen] =
    useState("login");

  const [activeTab, setActiveTab] =
    useState("home");

  const [accountRole, setAccountRole] =
    useState("Patient");

  /* =======================================================
     LOGIN
  ======================================================= */

  if (screen === "login") {
    return (
      <LoginScreen
        onLogin={() => {
          setActiveTab("home");
          setScreen("app");
        }}
        onCreateAccount={() => {
          setScreen("create");
        }}
      />
    );
  }

  /* =======================================================
     CREATE ACCOUNT
  ======================================================= */

  if (screen === "create") {
    return (
      <CreateAccountScreen
        onCreateAccount={(account) => {
          console.log(
            "Account created:",
            account
          );

          setAccountRole(account.role);

          Alert.alert(
            "Success",
            `Your ${account.role.toLowerCase()} account has been created successfully!`,
            [
              {
                text: "OK",
                onPress: () =>
                  setScreen("login"),
              },
            ]
          );
        }}
        onBackToLogin={() => {
          setScreen("login");
        }}
      />
    );
  }

  /* =======================================================
     LOGOUT
  ======================================================= */

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

  /* =======================================================
     PROFILE
  ======================================================= */

  const openProfile = () => {
    setActiveTab("profile");
  };

  /* =======================================================
     MAIN SCREEN
  ======================================================= */

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
      return <ReportsScreen />;
    }

    if (activeTab === "profile") {
      return (
        <ProfileScreen
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

      <TopHeader
        onLogout={handleLogout}
        onProfile={openProfile}
      />

      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      <BottomNav
        active={
          activeTab === "profile"
            ? "more"
            : activeTab
        }
        setActive={setActiveTab}
      />
    </SafeAreaView>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  /* APP */

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

logoImage: {
  width: 47,
  height: 47,
  borderRadius: 24,
  borderWidth: 2,
  borderColor: COLORS.teal,
  backgroundColor: "#F8FAFA",
  marginRight: 10,
},
  /* =======================================================
     LOGO
  ======================================================= */

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

  /* =======================================================
     HEADER
  ======================================================= */

  topHeader: {
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.bg,
    zIndex: 100,
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
  },

  patientText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
    marginHorizontal: 6,
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

  /* =======================================================
     PROFILE DROPDOWN
  ======================================================= */

  profileMenu: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 155,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 7,
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  menuText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 10,
  },

  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 10,
  },

  /* =======================================================
     TITLES
  ======================================================= */

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

  /* =======================================================
     STATS
  ======================================================= */

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

  /* =======================================================
     CARDS
  ======================================================= */

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

  /* =======================================================
     REFILL
  ======================================================= */

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

  /* =======================================================
     BOTTOM NAV
  ======================================================= */

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

  /* =======================================================
     FILTER
  ======================================================= */

  filterRow: {
    flexDirection: "row",
    marginTop: 21,
    marginBottom: 13,
  },

  filterButton: {
    backgroundColor: "#11343A",
    paddingHorizontal: 14,
    height: 33,
    borderRadius: 17,
    justifyContent: "center",
    marginRight: 6,
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

  emptyText: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 15,
  },

  /* =======================================================
     DOSE GROUP
  ======================================================= */

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
    marginTop: 8,
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
  },

  statusMissed: {
    backgroundColor: "#522029",
  },

  statusTaken: {
    backgroundColor: "#104A38",
  },

  statusUpcoming: {
    backgroundColor: "#123D42",
  },

  statusText: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: "900",
  },

  statusMissedText: {
    color: COLORS.red,
  },

  /* =======================================================
     MEDICATION
  ======================================================= */

  addMedication: {
    backgroundColor: COLORS.teal,
    height: 43,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 12,
  },

  addMedicationText: {
    color: COLORS.bg,
    fontWeight: "900",
    fontSize: 12,
  },

  medicationCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
  },

  medicationTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  medicationDetails: {
    marginLeft: 12,
    flex: 1,
  },

  medicationName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },

  medicationDose: {
    color: COLORS.muted,
    fontWeight: "600",
  },

  medicationInstruction: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },

  medicationDescription: {
    color: "#88A5A8",
    fontSize: 11,
    marginTop: 14,
  },

  timeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#12383D",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },

  timeBadgeText: {
    color: COLORS.teal,
    fontSize: 10,
    fontWeight: "800",
  },

  prescribed: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 10,
  },

  supplyBox: {
    marginTop: 13,
    padding: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
  },

  supplyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  supplyTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },

  supplyValue: {
    color: COLORS.muted,
    fontSize: 10,
  },

  progressBackground: {
    height: 6,
    backgroundColor: "#17383C",
    borderRadius: 5,
    marginTop: 9,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.teal,
    borderRadius: 5,
  },

  medButtons: {
    flexDirection: "row",
    marginTop: 13,
  },

  refillButton: {
    flex: 1,
    height: 38,
    backgroundColor: "#123C40",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  refillButtonText: {
    color: COLORS.teal,
    fontSize: 11,
    fontWeight: "900",
  },

  editButton: {
    flex: 1,
    height: 38,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },

  editButtonText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "900",
  },

  /* =======================================================
     STATS
  ======================================================= */

  adherenceCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 17,
    marginTop: 16,
  },

  adherenceTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  adherenceSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },

  circleContainer: {
    alignItems: "center",
    marginVertical: 22,
  },

  outerCircle: {
    width: 145,
    height: 145,
    borderRadius: 73,
    borderWidth: 13,
    borderColor: COLORS.teal,
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    alignItems: "center",
    justifyContent: "center",
  },

  percent: {
    color: COLORS.text,
    fontSize: 29,
    fontWeight: "900",
  },

  percentLabel: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 2,
  },

  outcomeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  outcomeNumber: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },

  outcomeLabel: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 3,
  },

  chartCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 17,
    marginTop: 12,
  },

  chartTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },

  chartSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },

  barChart: {
    height: 160,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
  },

  barColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },

  bar: {
    width: 10,
    backgroundColor: COLORS.teal,
    borderRadius: 4,
  },

  barLabel: {
    color: COLORS.muted,
    fontSize: 8,
    marginTop: 5,
  },

  greenCircleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },

  greenOuterCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
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
    fontSize: 31,
    fontWeight: "900",
  },

  medAdherenceCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 17,
    marginTop: 12,
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
    fontSize: 11,
    fontWeight: "800",
  },

  adherenceValue: {
    color: COLORS.teal,
    fontSize: 11,
    fontWeight: "900",
  },

  adherenceBarBackground: {
    height: 7,
    backgroundColor: "#17383C",
    borderRadius: 5,
    marginTop: 7,
    overflow: "hidden",
  },

  adherenceBar: {
    height: "100%",
    backgroundColor: COLORS.teal,
    borderRadius: 5,
  },

  trackedText: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 4,
  },

  /* =======================================================
     REPORTS
  ======================================================= */

  reportTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 32,
  },

  reportSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },

  exportButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 10,
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
    padding: 16,
    marginTop: 16,
  },

  reportNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reportName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },

  adherenceBadge: {
    backgroundColor: COLORS.teal,
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  adherenceBadgeText: {
    color: COLORS.bg,
    fontSize: 9,
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
    backgroundColor: "#123B40",
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 9,
    marginTop: 13,
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
    marginTop: 13,
  },

  reportStat: {
    width: "48%",
    height: 70,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
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
    marginTop: 6,
  },

  refillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  refillTag: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 5,
  },

  refillTagText: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: "800",
  },

  /* =======================================================
     PROFILE
  ======================================================= */

  profileSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },

  profileCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    padding: 18,
    marginTop: 21,
    flexDirection: "row",
    alignItems: "center",
  },

  profileAvatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#07565B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
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

  patientBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#07565B",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 7,
  },

  patientBadgeText: {
    color: COLORS.teal,
    fontSize: 9,
    fontWeight: "900",
  },

  accountCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 17,
    marginTop: 14,
  },

  accountTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },

  accountDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 12,
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#07565B",
    alignItems: "center",
    justifyContent: "center",
  },

  accountInfo: {
    flex: 1,
    marginLeft: 11,
  },

  accountItemTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
  },

  accountItemSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 3,
  },

  logoutCard: {
    backgroundColor: "#28181C",
    borderWidth: 1,
    borderColor: "#51252C",
    borderRadius: 15,
    padding: 15,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  logoutIcon: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: "#411C23",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoutTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
  },

  logoutSubtitle: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 3,
  },

  /* =======================================================
     LOGIN
  ======================================================= */

  loginSafe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  loginContent: {
    padding: 25,
    paddingBottom: 50,
  },

  loginLogo: {
    marginBottom: 35,
  },

  loginTitle: {
    color: COLORS.text,
    fontSize: 29,
    fontWeight: "900",
  },

  loginSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 25,
  },

  loginLabel: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 12,
  },

  loginInput: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    color: COLORS.text,
    paddingHorizontal: 14,
    fontSize: 12,
  },

  passwordInputWrapper: {
    position: "relative",
  },

  passwordInput: {
    paddingRight: 48,
  },

  passwordToggle: {
    position: "absolute",
    right: 4,
    top: 4,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  forgotPassword: {
    color: COLORS.teal,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "right",
    marginTop: 11,
  },

  loginButton: {
    height: 48,
    backgroundColor: COLORS.teal,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  loginButtonText: {
    color: COLORS.bg,
    fontSize: 13,
    fontWeight: "900",
  },

  loginDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },

  noAccount: {
    color: COLORS.muted,
    fontSize: 11,
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

  /* =======================================================
     ROLE SELECTION
  ======================================================= */

  roleTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 22,
    marginBottom: 10,
  },

  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  roleCard: {
    width: "48%",
    minHeight: 82,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 13,
  },

  roleCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.teal,
    backgroundColor: "#0D3034",
  },

  roleTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  roleName: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
  },

  roleNameSelected: {
    color: COLORS.teal,
  },

  roleDescription: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 7,
  },
});
