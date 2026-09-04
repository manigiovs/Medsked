import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  StatusBar,
} from "react-native";

const COLORS = {
  bg: "#06171B",
  card: "#0D2429",
  card2: "#112D32",
  border: "#234148",
  text: "#F4FAFB",
  muted: "#8CAAB0",
  teal: "#2DB8B5",
  tealDark: "#0B5559",
  green: "#45C77A",
  red: "#FF5B5B",
  yellow: "#F5B82E",
  white: "#FFFFFF",
};

const patients = [
  {
    id: "p1",
    name: "Eleanor Whitfield",
    dob: "04/18/1953",
    conditions: "Hypertension, Type 2 Diabetes, Atrial Fibrillation",
    adherence: 87,
  },
  {
    id: "p2",
    name: "Marcus Reed",
    dob: "11/02/1967",
    conditions: "High Cholesterol, Hypothyroidism",
    adherence: 93,
  },
];

const initialMedications = [
  {
    id: 1,
    name: "Lisinopril",
    dose: "10 mg",
    frequency: "Once Daily",
    times: ["08:00"],
    supply: 24,
    total: 30,
    instruction: "Take one tablet by mouth with water.",
  },
  {
    id: 2,
    name: "Metformin",
    dose: "500 mg",
    frequency: "Twice Daily",
    times: ["08:00", "20:00"],
    supply: 9,
    total: 60,
    instruction: "Take with breakfast and dinner to reduce stomach upset.",
  },
  {
    id: 3,
    name: "Apixaban",
    dose: "5 mg",
    frequency: "Twice Daily",
    times: ["08:00", "20:00"],
    supply: 5,
    total: 60,
    instruction: "Blood thinner. Do not skip doses. Take with or without food.",
  },
  {
    id: 4,
    name: "Atorvastatin",
    dose: "20 mg",
    frequency: "Once Daily",
    times: ["21:00"],
    supply: 22,
    total: 30,
    instruction: "Take at bedtime.",
  },
];

const historyData = [
  {
    date: "Sep 3",
    time: "9:00 PM",
    medicine: "Atorvastatin 20 mg",
    status: "Due now",
  },
  {
    date: "Sep 3",
    time: "8:00 PM",
    medicine: "Metformin 500 mg",
    status: "Taken",
  },
  {
    date: "Sep 3",
    time: "8:00 PM",
    medicine: "Apixaban 5 mg",
    status: "Taken",
  },
  {
    date: "Sep 3",
    time: "8:00 AM",
    medicine: "Lisinopril 10 mg",
    status: "Missed",
  },
  {
    date: "Sep 3",
    time: "8:00 AM",
    medicine: "Metformin 500 mg",
    status: "Taken",
  },
  {
    date: "Sep 3",
    time: "8:00 AM",
    medicine: "Apixaban 5 mg",
    status: "Taken",
  },
  {
    date: "Sep 2",
    time: "9:00 PM",
    medicine: "Atorvastatin 20 mg",
    status: "Taken",
  },
  {
    date: "Sep 2",
    time: "8:00 PM",
    medicine: "Metformin 500 mg",
    status: "Taken",
  },
  {
    date: "Sep 2",
    time: "8:00 PM",
    medicine: "Apixaban 5 mg",
    status: "Taken",
  },
  {
    date: "Sep 2",
    time: "8:00 AM",
    medicine: "Lisinopril 10 mg",
    status: "Skipped",
  },
];

export default function App() {
  const [role, setRole] = useState("caregiver");
  const [page, setPage] = useState("dashboard");
  const [patient, setPatient] = useState(patients[0]);
  const [medications, setMedications] = useState(initialMedications);
  const [notifications, setNotifications] = useState(2);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAddMedication, setShowAddMedication] = useState(false);

  const [newMedication, setNewMedication] = useState({
    name: "",
    dose: "",
    time: "",
  });

  const refillCount = medications.filter(
    (med) => med.supply <= 10
  ).length;

  const takenToday = 4;
  const totalToday = 6;

  const pageTitle = useMemo(() => {
    const titles = {
      dashboard: "Dashboard",
      doses: "Today's Doses",
      medications: "Medications",
      adherence: "Adherence",
      history: "History",
      alerts: "Alerts",
      reports: "Reports",
    };

    return titles[page];
  }, [page]);

  function navigate(screen) {
    setPage(screen);
  }

  function markTaken(id) {
    Alert.alert("Dose Confirmed", "The medication has been marked as taken.");
  }

  function markSkipped(id) {
    Alert.alert("Dose Skipped", "The dose has been marked as skipped.");
  }

  function refillMedication(med) {
    Alert.alert(
      "Refill Request",
      `Refill request created for ${med.name} ${med.dose}.`
    );
  }

  function addMedication() {
    if (!newMedication.name || !newMedication.dose) {
      Alert.alert("Missing Information", "Please enter medication name and dose.");
      return;
    }

    const medication = {
      id: Date.now(),
      name: newMedication.name,
      dose: newMedication.dose,
      frequency: "Once Daily",
      times: [newMedication.time || "08:00"],
      supply: 30,
      total: 30,
      instruction: "Follow the instructions provided by the clinician.",
    };

    setMedications((current) => [...current, medication]);

    setNewMedication({
      name: "",
      dose: "",
      time: "",
    });

    setShowAddMedication(false);

    Alert.alert("Medication Added", `${medication.name} has been added.`);
  }

  function generateReport() {
    Alert.alert(
      "Clinical Report",
      `Report generated for ${patient.name}.\n\nAdherence: ${patient.adherence}%\nActive medications: ${medications.length}\nMissed doses: 4\nSkipped doses: 7`
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.app}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>♡</Text>
            </View>

            <View>
              <Text style={styles.logoTitle}>MEDSKED</Text>
              <Text style={styles.logoSubtitle}>Medication Care</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => setShowRoleModal(true)}
            >
              <Text style={styles.roleIcon}>♙</Text>
              <Text style={styles.roleText}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigate("alerts")}
            >
              <Text style={styles.bell}>♧</Text>

              {notifications > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notifications}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.body}>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.pageHeader}>
              <View>
                <Text style={styles.pageTitle}>{pageTitle}</Text>

                <Text style={styles.pageSubtitle}>
                  {patient.name}
                </Text>
              </View>

              {page === "medications" && (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => setShowAddMedication(true)}
                >
                  <Text style={styles.primaryButtonText}>
                    + Add medication
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {page === "dashboard" && (
              <Dashboard
                patient={patient}
                medications={medications}
                takenToday={takenToday}
                totalToday={totalToday}
                refillCount={refillCount}
                navigate={navigate}
              />
            )}

            {page === "doses" && (
              <TodaysDoses
                medications={medications}
                markTaken={markTaken}
                markSkipped={markSkipped}
              />
            )}

            {page === "medications" && (
              <Medications
                medications={medications}
                refillMedication={refillMedication}
                onAdd={() => setShowAddMedication(true)}
              />
            )}

            {page === "adherence" && (
              <Adherence patient={patient} />
            )}

            {page === "history" && (
              <History />
            )}

            {page === "alerts" && (
              <Alerts
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}

            {page === "reports" && (
              <Reports
                patients={patients}
                generateReport={generateReport}
              />
            )}
          </ScrollView>

          {/* MOBILE NAVIGATION */}
          <View style={styles.bottomNav}>
            <NavButton
              icon="⌂"
              label="Home"
              active={page === "dashboard"}
              onPress={() => navigate("dashboard")}
            />

            <NavButton
              icon="◷"
              label="Doses"
              active={page === "doses"}
              onPress={() => navigate("doses")}
            />

            <NavButton
              icon="♢"
              label="Meds"
              active={page === "medications"}
              onPress={() => navigate("medications")}
            />

            <NavButton
              icon="▥"
              label="Stats"
              active={page === "adherence"}
              onPress={() => navigate("adherence")}
            />

            <NavButton
              icon="☷"
              label="More"
              active={
                page === "history" ||
                page === "alerts" ||
                page === "reports"
              }
              onPress={() => navigate("reports")}
            />
          </View>
        </View>

        {/* ROLE MODAL */}
        <Modal
          visible={showRoleModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowRoleModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Select Role</Text>

              <RoleOption
                title="Patient"
                description="Manage your medications and doses"
                active={role === "patient"}
                onPress={() => {
                  setRole("patient");
                  setShowRoleModal(false);
                }}
              />

              <RoleOption
                title="Caregiver / Family"
                description="Monitor patients and receive alerts"
                active={role === "caregiver"}
                onPress={() => {
                  setRole("caregiver");
                  setShowRoleModal(false);
                }}
              />

              <RoleOption
                title="Administrator"
                description="Manage users and system access"
                active={role === "administrator"}
                onPress={() => {
                  setRole("administrator");
                  setShowRoleModal(false);
                }}
              />

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowRoleModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ADD MEDICATION MODAL */}
        <Modal
          visible={showAddMedication}
          transparent
          animationType="slide"
          onRequestClose={() => setShowAddMedication(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Add Medication</Text>

              <Text style={styles.inputLabel}>Medication name</Text>

              <TextInput
                value={newMedication.name}
                onChangeText={(text) =>
                  setNewMedication({
                    ...newMedication,
                    name: text,
                  })
                }
                placeholder="e.g. Lisinopril"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />

              <Text style={styles.inputLabel}>Dose</Text>

              <TextInput
                value={newMedication.dose}
                onChangeText={(text) =>
                  setNewMedication({
                    ...newMedication,
                    dose: text,
                  })
                }
                placeholder="e.g. 10 mg"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />

              <Text style={styles.inputLabel}>Schedule</Text>

              <TextInput
                value={newMedication.time}
                onChangeText={(text) =>
                  setNewMedication({
                    ...newMedication,
                    time: text,
                  })
                }
                placeholder="e.g. 08:00"
                placeholderTextColor={COLORS.muted}
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.primaryButtonLarge}
                onPress={addMedication}
              >
                <Text style={styles.primaryButtonText}>
                  Add Medication
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddMedication(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  patient,
  medications,
  takenToday,
  totalToday,
  refillCount,
  navigate,
}) {
  return (
    <>
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>Good evening</Text>

        <Text style={styles.greetingSubtitle}>
          Medication overview for {patient.name}.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="⌁"
          value={`${patient.adherence}%`}
          label="Adherence"
          color={COLORS.yellow}
        />

        <StatCard
          icon="✓"
          value={`${takenToday}/${totalToday}`}
          label="Doses taken today"
          color={COLORS.green}
        />

        <StatCard
          icon="◷"
          value="9:00 PM"
          label="Next dose"
          extra="Atorvastatin"
          color={COLORS.teal}
        />

        <StatCard
          icon="▣"
          value={refillCount}
          label="Refills needed"
          color={COLORS.yellow}
        />
      </View>

      <SectionCard
        title="Today's remaining doses"
        subtitle="1 dose left to take"
        action="View all"
        onAction={() => navigate("doses")}
      >
        <DoseRow
          medication="Atorvastatin"
          dose="20 mg"
          time="9:00 PM"
          status="Due now"
        />
      </SectionCard>

      <SectionCard
        title="Refill tracker"
        subtitle="Supply levels for active medications"
      >
        {medications.map((med) => (
          <RefillRow key={med.id} medication={med} />
        ))}

        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigate("medications")}
        >
          <Text style={styles.manageText}>Manage medications</Text>
        </TouchableOpacity>
      </SectionCard>

      <View style={styles.attentionCard}>
        <Text style={styles.attentionTitle}>⚠ Attention needed</Text>

        <Text style={styles.attentionText}>
          Metformin and Apixaban are running low. Refill requests should
          be reviewed.
        </Text>
      </View>
    </>
  );
}

/* =========================================================
   TODAY'S DOSES
========================================================= */

function TodaysDoses({
  medications,
  markTaken,
  markSkipped,
}) {
  return (
    <>
      <View style={styles.filterRow}>
        <FilterButton title="All" active />
        <FilterButton title="Upcoming" />
        <FilterButton title="Taken" />
        <FilterButton title="Missed" />
      </View>

      <DoseTimeGroup
        time="8:00 AM"
        medications={medications.slice(0, 3)}
        markTaken={markTaken}
        markSkipped={markSkipped}
      />

      <DoseTimeGroup
        time="8:00 PM"
        medications={medications.slice(1, 3)}
        markTaken={markTaken}
        markSkipped={markSkipped}
      />

      <DoseTimeGroup
        time="9:00 PM"
        medications={medications.slice(3, 4)}
        markTaken={markTaken}
        markSkipped={markSkipped}
      />
    </>
  );
}

function DoseTimeGroup({
  time,
  medications,
  markTaken,
  markSkipped,
}) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>◷ {time}</Text>

        <Text style={styles.sectionSubtitle}>
          {medications.length} medications
        </Text>
      </View>

      {medications.map((med, index) => (
        <View style={styles.doseItem} key={med.id}>
          <View style={styles.medIcon}>
            <Text style={styles.medIconText}>◇</Text>
          </View>

          <View style={styles.doseInfo}>
            <Text style={styles.medName}>
              {med.name}{" "}
              <Text style={styles.medDose}>{med.dose}</Text>
            </Text>

            <Text style={styles.doseDetails}>
              ◷ {time} · tablet
            </Text>
          </View>

          {index === 0 && time === "8:00 AM" ? (
            <View style={styles.statusMissed}>
              <Text style={styles.statusMissedText}>Missed</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.statusTaken}
              onPress={() => markTaken(med.id)}
            >
              <Text style={styles.statusTakenText}>Taken</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

/* =========================================================
   MEDICATIONS
========================================================= */

function Medications({
  medications,
  refillMedication,
  onAdd,
}) {
  return (
    <>
      {medications.map((med) => {
        const percentage = Math.max(
          0,
          Math.min(100, (med.supply / med.total) * 100)
        );

        const low = med.supply <= 10;

        return (
          <View style={styles.medicationCard} key={med.id}>
            <View style={styles.medicationHeader}>
              <View style={styles.bigMedIcon}>
                <Text style={styles.bigMedIconText}>◇</Text>
              </View>

              <View style={styles.medicationTitleBox}>
                <Text style={styles.medicationName}>
                  {med.name}{" "}
                  <Text style={styles.medicationDose}>
                    {med.dose}
                  </Text>
                </Text>

                <Text style={styles.medicationFrequency}>
                  Tablet · {med.frequency}
                </Text>
              </View>
            </View>

            <Text style={styles.instruction}>
              {med.instruction}
            </Text>

            <View style={styles.timeRow}>
              {med.times.map((time) => (
                <View style={styles.timePill} key={time}>
                  <Text style={styles.timeText}>
                    ◷ {time}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={styles.prescribed}>
              ♙ Prescribed by Dr. Priya Nair
            </Text>

            <View style={styles.supplyBox}>
              <View style={styles.supplyHeader}>
                <Text style={styles.supplyTitle}>
                  ▣ Supply
                </Text>

                <Text
                  style={[
                    styles.supplyValue,
                    low && { color: COLORS.red },
                  ]}
                >
                  {med.supply} of {med.total} · ~
                  {Math.ceil(med.supply / (med.times.length || 1))} days
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${percentage}%`,
                      backgroundColor: low
                        ? COLORS.red
                        : COLORS.teal,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.refillButton}
                onPress={() => refillMedication(med)}
              >
                <Text style={styles.refillText}>↻ Refill</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  Alert.alert(
                    "Edit Medication",
                    `Edit ${med.name} ${med.dose}`
                  )
                }
              >
                <Text style={styles.editText}>✎ Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <TouchableOpacity
        style={styles.addMedicationBottom}
        onPress={onAdd}
      >
        <Text style={styles.addMedicationBottomText}>
          + Add medication
        </Text>
      </TouchableOpacity>
    </>
  );
}

/* =========================================================
   ADHERENCE
========================================================= */

function Adherence({ patient }) {
  const daily = [80, 80, 100, 100, 80, 100, 100, 65, 80, 100, 65, 80, 80, 77];

  return (
    <>
      <View style={styles.adherenceGrid}>
        <View style={styles.adherenceCard}>
          <Text style={styles.centerTitle}>Overall adherence</Text>

          <Text style={styles.centerSubtitle}>
            Doses taken as scheduled
          </Text>

          <View style={styles.circle}>
            <Text style={styles.circleValue}>
              {patient.adherence}%
            </Text>

            <Text style={styles.circleLabel}>
              Adherence
            </Text>
          </View>

          <View style={styles.outcomeRow}>
            <Outcome value="72" label="Taken" color={COLORS.green} />
            <Outcome value="7" label="Skipped" color={COLORS.yellow} />
            <Outcome value="4" label="Missed" color={COLORS.red} />
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>
            Daily adherence
          </Text>

          <Text style={styles.sectionSubtitle}>
            Percentage of scheduled doses taken each day
          </Text>

          <View style={styles.chart}>
            {daily.map((value, index) => (
              <View style={styles.barContainer} key={index}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${value * 0.7}%`,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>
                  {index + 1}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Dose outcomes</Text>

        <Text style={styles.sectionSubtitle}>
          83 completed doses
        </Text>

        <View style={styles.donut}>
          <View style={styles.donutInner}>
            <Text style={styles.donutText}>83</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Adherence by medication
        </Text>

        <Text style={styles.sectionSubtitle}>
          Lowest adherence first
        </Text>

        <MedicationAdherence
          name="Atorvastatin 20 mg"
          percentage={77}
        />

        <MedicationAdherence
          name="Lisinopril 10 mg"
          percentage={86}
        />

        <MedicationAdherence
          name="Metformin 500 mg"
          percentage={86}
        />

        <MedicationAdherence
          name="Apixaban 5 mg"
          percentage={93}
        />
      </View>
    </>
  );
}

function MedicationAdherence({ name, percentage }) {
  return (
    <View style={styles.adherenceMedication}>
      <View style={styles.adherenceMedicationHeader}>
        <Text style={styles.medName}>{name}</Text>

        <Text style={styles.adherencePercent}>
          {percentage}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progress,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.tracked}>
        14 doses tracked
      </Text>
    </View>
  );
}

/* =========================================================
   HISTORY
========================================================= */

function History() {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Dose log</Text>

          <Text style={styles.sectionSubtitle}>
            84 records
          </Text>
        </View>

        <View style={styles.filterRow}>
          <FilterButton title="All" active />
        </View>
      </View>

      {historyData.map((item, index) => (
        <View style={styles.historyRow} key={index}>
          <View style={styles.historyDate}>
            <Text style={styles.historyDateText}>
              {item.date}
            </Text>
          </View>

          <View style={styles.historyTime}>
            <Text style={styles.historyMuted}>
              {item.time}
            </Text>
          </View>

          <View style={styles.historyMedicine}>
            <Text style={styles.medName}>
              {item.medicine}
            </Text>
          </View>

          <Status status={item.status} />
        </View>
      ))}
    </View>
  );
}

/* =========================================================
   ALERTS
========================================================= */

function Alerts({
  notifications,
  setNotifications,
}) {
  function markAllRead() {
    setNotifications(0);
    Alert.alert("Alerts", "All alerts marked as read.");
  }

  return (
    <>
      <View style={styles.alertTop}>
        <View>
          <Text style={styles.sectionTitle}>
            Caregiver Alerts
          </Text>

          <Text style={styles.sectionSubtitle}>
            {notifications} unread · activity across your patients
          </Text>
        </View>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={markAllRead}
        >
          <Text style={styles.outlineText}>
            Mark all read
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoAlert}>
        <Text style={styles.infoAlertTitle}>
          ✉ Email delivery is simulated
        </Text>

        <Text style={styles.infoAlertText}>
          Connect an email service later to send real dose reminders
          and caregiver alerts.
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Activity feed</Text>

        <Text style={styles.sectionSubtitle}>
          Notifications for all dose activity and refills
        </Text>

        <AlertItem
          title="Refill needed soon"
          description="Apixaban 5 mg is running low — 5 doses remaining."
          patient="Eleanor Whitfield"
          color={COLORS.teal}
        />

        <AlertItem
          title="Dose missed"
          description="Eleanor missed the evening dose of Metformin 500 mg."
          patient="Eleanor Whitfield"
          color={COLORS.red}
        />

        <AlertItem
          title="Dose confirmed"
          description="Eleanor took Lisinopril 10 mg on time this morning."
          patient="Eleanor Whitfield"
          color={COLORS.green}
        />

        <AlertItem
          title="Refill needed soon"
          description="Rosuvastatin 10 mg is running low — 6 doses remaining."
          patient="Marcus Reed"
          color={COLORS.teal}
        />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          Delivery preferences
        </Text>

        <Text style={styles.sectionSubtitle}>
          How caregivers receive alerts
        </Text>

        <PreferenceRow
          title="In-app notifications"
          description="Show alerts inside MEDSKED"
          enabled
        />

        <PreferenceRow
          title="Email alerts"
          description="Send to caregiver email addresses"
          enabled
        />

        <PreferenceRow
          title="Push notifications"
          description="Mobile push notifications"
          enabled={false}
        />
      </View>
    </>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function Reports({
  patients,
  generateReport,
}) {
  return (
    <>
      <View style={styles.reportHeader}>
        <View>
          <Text style={styles.pageTitle}>
            Clinical Reports
          </Text>

          <Text style={styles.pageSubtitle}>
            Adherence summaries across {patients.length} patients ·
            last 14 days
          </Text>
        </View>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={generateReport}
        >
          <Text style={styles.outlineText}>
            ↓ Export all
          </Text>
        </TouchableOpacity>
      </View>

      {patients.map((p) => (
        <View style={styles.reportCard} key={p.id}>
          <View style={styles.reportPatientHeader}>
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.reportPatientName}>
                  {p.name}
                </Text>

                <View style={styles.adherenceBadge}>
                  <Text style={styles.adherenceBadgeText}>
                    {p.adherence}% adherence
                  </Text>
                </View>
              </View>

              <Text style={styles.reportPatientDetails}>
                DOB {p.dob} · {p.conditions}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.generateButton}
              onPress={generateReport}
            >
              <Text style={styles.generateText}>
                ▣ Generate report
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reportStats}>
            <ReportStat
              title="Adherence"
              value={`${p.adherence}%`}
            />

            <ReportStat
              title="Active meds"
              value={p.id === "p1" ? "4" : "2"}
            />

            <ReportStat
              title="Missed doses"
              value={p.id === "p1" ? "4" : "1"}
              danger
            />

            <ReportStat
              title="Skipped doses"
              value={p.id === "p1" ? "7" : "1"}
              warning
            />
          </View>

          <Text style={styles.refillsTitle}>
            Refills needed
          </Text>

          <View style={styles.refillTags}>
            {p.id === "p1" ? (
              <>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>
                    ◇ Metformin · 9 left
                  </Text>
                </View>

                <View style={styles.tag}>
                  <Text style={styles.tagText}>
                    ◇ Apixaban · 5 left
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  ◇ Rosuvastatin · 6 left
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function StatCard({
  icon,
  value,
  label,
  color,
  extra,
}) {
  return (
    <View style={styles.statCard}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: color + "25" },
        ]}
      >
        <Text
          style={[
            styles.statIconText,
            { color },
          ]}
        >
          {icon}
        </Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>

      {extra && (
        <Text style={styles.statExtra}>{extra}</Text>
      )}
    </View>
  );
}

function SectionCard({
  title,
  subtitle,
  action,
  onAction,
  children,
}) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.sectionSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>

        {action && (
          <TouchableOpacity onPress={onAction}>
            <Text style={styles.viewAll}>
              {action} →
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {children}
    </View>
  );
}

function DoseRow({
  medication,
  dose,
  time,
  status,
}) {
  return (
    <View style={styles.doseRow}>
      <View style={styles.medIcon}>
        <Text style={styles.medIconText}>◇</Text>
      </View>

      <View style={styles.doseInfo}>
        <Text style={styles.medName}>
          {medication}{" "}
          <Text style={styles.medDose}>{dose}</Text>
        </Text>

        <Text style={styles.doseDetails}>
          ◷ {time} · tablet
        </Text>
      </View>

      <View style={styles.dueBadge}>
        <Text style={styles.dueText}>{status}</Text>
      </View>
    </View>
  );
}

function RefillRow({ medication }) {
  const low = medication.supply <= 10;

  return (
    <View style={styles.refillRow}>
      <View style={styles.smallMedIcon}>
        <Text style={styles.smallMedIconText}>◇</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.refillName}>
          {medication.name}
        </Text>

        <Text style={styles.refillDays}>
          {medication.supply} left · ~
          {Math.max(
            1,
            Math.ceil(
              medication.supply / medication.times.length
            )
          )} days
        </Text>
      </View>

      {low && (
        <View style={styles.refillBadge}>
          <Text style={styles.refillBadgeText}>
            Refill
          </Text>
        </View>
      )}
    </View>
  );
}

function NavButton({
  icon,
  label,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.navButton,
        active && styles.navButtonActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.navIcon,
          active && styles.navIconActive,
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.navLabel,
          active && styles.navLabelActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function RoleOption({
  title,
  description,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.roleOption,
        active && styles.roleOptionActive,
      ]}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.roleOptionTitle}>
          {title}
        </Text>

        <Text style={styles.roleOptionDescription}>
          {description}
        </Text>
      </View>

      <View
        style={[
          styles.radio,
          active && styles.radioActive,
        ]}
      >
        {active && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
  );
}

function FilterButton({ title, active }) {
  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        active && styles.filterButtonActive,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          active && styles.filterTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function Outcome({
  value,
  label,
  color,
}) {
  return (
    <View style={styles.outcome}>
      <Text
        style={[
          styles.outcomeValue,
          { color },
        ]}
      >
        {value}
      </Text>

      <Text style={styles.outcomeLabel}>
        {label}
      </Text>
    </View>
  );
}

function Status({ status }) {
  if (status === "Taken") {
    return (
      <View style={styles.statusTaken}>
        <Text style={styles.statusTakenText}>
          Taken
        </Text>
      </View>
    );
  }

  if (status === "Missed") {
    return (
      <View style={styles.statusMissed}>
        <Text style={styles.statusMissedText}>
          Missed
        </Text>
      </View>
    );
  }

  if (status === "Skipped") {
    return (
      <View style={styles.statusSkipped}>
        <Text style={styles.statusSkippedText}>
          Skipped
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.dueBadge}>
      <Text style={styles.dueText}>
        Due now
      </Text>
    </View>
  );
}

function AlertItem({
  title,
  description,
  patient,
  color,
}) {
  return (
    <View
      style={[
        styles.alertItem,
        { borderColor: color + "60" },
      ]}
    >
      <View
        style={[
          styles.alertIcon,
          { backgroundColor: color + "20" },
        ]}
      >
        <Text
          style={[
            styles.alertIconText,
            { color },
          ]}
        >
          !
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.alertTitle}>
          {title}
        </Text>

        <Text style={styles.alertDescription}>
          {description}
        </Text>

        <View style={styles.patientTag}>
          <Text style={styles.patientTagText}>
            {patient}
          </Text>
        </View>
      </View>
    </View>
  );
}

function PreferenceRow({
  title,
  description,
  enabled,
}) {
  return (
    <View style={styles.preferenceRow}>
      <View style={styles.preferenceIcon}>
        <Text style={styles.preferenceIconText}>
          ◉
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.preferenceTitle}>
          {title}
        </Text>

        <Text style={styles.preferenceDescription}>
          {description}
        </Text>
      </View>

      <View
        style={[
          styles.switch,
          enabled && styles.switchOn,
        ]}
      >
        <View
          style={[
            styles.switchThumb,
            enabled && styles.switchThumbOn,
          ]}
        />
      </View>
    </View>
  );
}

function ReportStat({
  title,
  value,
  danger,
  warning,
}) {
  return (
    <View style={styles.reportStat}>
      <Text style={styles.reportStatTitle}>
        {title}
      </Text>

      <Text
        style={[
          styles.reportStatValue,
          danger && { color: COLORS.red },
          warning && { color: COLORS.yellow },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  app: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    height: 76,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.teal,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logoText: {
    fontSize: 29,
    color: COLORS.bg,
    fontWeight: "bold",
  },

  logoTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },

  logoSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  roleButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  roleIcon: {
    color: COLORS.muted,
    fontSize: 18,
    marginRight: 5,
  },

  roleText: {
    color: COLORS.text,
    fontSize: 13,
  },

  arrow: {
    color: COLORS.muted,
    marginLeft: 5,
    fontSize: 18,
  },

  notificationButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  bell: {
    color: COLORS.text,
    fontSize: 24,
  },

  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
  },

  body: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    padding: 18,
    paddingBottom: 100,
  },

  pageHeader: {
    marginBottom: 22,
  },

  pageTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "800",
    marginBottom: 4,
  },

  pageSubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
  },

  greeting: {
    marginBottom: 18,
  },

  greetingTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
  },

  greetingSubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 3,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },

  statCard: {
    width: "48%",
    minHeight: 150,
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },

  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  statIconText: {
    fontSize: 20,
    fontWeight: "800",
  },

  statValue: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
  },

  statLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  statExtra: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 2,
  },

  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },

  viewAll: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 13,
  },

  doseRow: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  doseItem: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 12,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  medIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.tealDark,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  medIconText: {
    color: COLORS.teal,
    fontSize: 25,
  },

  doseInfo: {
    flex: 1,
  },

  medName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },

  medDose: {
    color: COLORS.muted,
    fontWeight: "500",
  },

  doseDetails: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },

  dueBadge: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  dueText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "700",
  },

  refillRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  smallMedIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: COLORS.card2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  smallMedIconText: {
    color: COLORS.muted,
    fontSize: 22,
  },

  refillName: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 14,
  },

  refillDays: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  refillBadge: {
    backgroundColor: "#382126",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  refillBadgeText: {
    color: COLORS.red,
    fontSize: 11,
    fontWeight: "800",
  },

  manageButton: {
    backgroundColor: COLORS.card2,
    borderRadius: 9,
    padding: 12,
    alignItems: "center",
    marginTop: 5,
  },

  manageText: {
    color: COLORS.text,
    fontWeight: "700",
  },

  attentionCard: {
    backgroundColor: "#151F1C",
    borderWidth: 1,
    borderColor: "#26352E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  attentionTitle: {
    color: COLORS.yellow,
    fontSize: 16,
    fontWeight: "800",
  },

  attentionText: {
    color: COLORS.muted,
    marginTop: 7,
    lineHeight: 20,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: "#081B1F",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },

  navButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 55,
    height: 58,
    borderRadius: 10,
    paddingHorizontal: 7,
  },

  navButtonActive: {
    backgroundColor: COLORS.teal,
  },

  navIcon: {
    color: COLORS.muted,
    fontSize: 21,
  },

  navIconActive: {
    color: COLORS.bg,
  },

  navLabel: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 3,
    fontWeight: "700",
  },

  navLabelActive: {
    color: COLORS.bg,
  },

  primaryButton: {
    backgroundColor: COLORS.teal,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 11,
    alignSelf: "flex-start",
    marginTop: 10,
  },

  primaryButtonText: {
    color: COLORS.bg,
    fontWeight: "800",
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },

  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: COLORS.card2,
  },

  filterButtonActive: {
    backgroundColor: COLORS.teal,
  },

  filterText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },

  filterTextActive: {
    color: COLORS.bg,
  },

  statusTaken: {
    backgroundColor: COLORS.teal,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
  },

  statusTakenText: {
    color: COLORS.bg,
    fontSize: 11,
    fontWeight: "800",
  },

  statusMissed: {
    backgroundColor: "#3A2025",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
  },

  statusMissedText: {
    color: COLORS.red,
    fontSize: 11,
    fontWeight: "800",
  },

  statusSkipped: {
    backgroundColor: "#2C2C20",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
  },

  statusSkippedText: {
    color: COLORS.yellow,
    fontSize: 11,
    fontWeight: "800",
  },

  medicationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },

  medicationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  bigMedIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.tealDark,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  bigMedIconText: {
    color: COLORS.teal,
    fontSize: 29,
  },

  medicationTitleBox: {
    flex: 1,
  },

  medicationName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  medicationDose: {
    color: COLORS.muted,
    fontWeight: "500",
  },

  medicationFrequency: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },

  instruction: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 16,
  },

  timeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 12,
  },

  timePill: {
    backgroundColor: COLORS.card2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  timeText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "700",
  },

  prescribed: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 13,
  },

  supplyBox: {
    backgroundColor: COLORS.card2,
    borderRadius: 11,
    padding: 12,
    marginTop: 14,
  },

  supplyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  supplyTitle: {
    color: COLORS.text,
    fontWeight: "800",
  },

  supplyValue: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
  },

  progressBackground: {
    height: 5,
    backgroundColor: "#1A3034",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 9,
  },

  progress: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.teal,
  },

  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
  },

  refillButton: {
    backgroundColor: COLORS.teal,
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  refillText: {
    color: COLORS.bg,
    fontWeight: "800",
  },

  editButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  editText: {
    color: COLORS.text,
    fontWeight: "700",
  },

  addMedicationBottom: {
    borderWidth: 1,
    borderColor: COLORS.teal,
    borderRadius: 11,
    padding: 14,
    alignItems: "center",
    marginBottom: 20,
  },

  addMedicationBottomText: {
    color: COLORS.teal,
    fontWeight: "800",
  },

  adherenceGrid: {
    gap: 14,
  },

  adherenceCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  centerTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "800",
  },

  centerSubtitle: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 4,
  },

  circle: {
    width: 190,
    height: 190,
    borderRadius: 100,
    borderWidth: 12,
    borderColor: COLORS.yellow,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  circleValue: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
  },

  circleLabel: {
    color: COLORS.muted,
    fontSize: 12,
  },

  outcomeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },

  outcome: {
    alignItems: "center",
  },

  outcomeValue: {
    fontSize: 20,
    fontWeight: "800",
  },

  outcomeLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  chartCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
  },

  chart: {
    height: 180,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  barContainer: {
    height: "100%",
    width: 15,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bar: {
    width: 11,
    maxHeight: "100%",
    backgroundColor: COLORS.teal,
    borderRadius: 5,
  },

  barLabel: {
    color: COLORS.muted,
    fontSize: 8,
    marginTop: 4,
  },

  donut: {
    width: 170,
    height: 170,
    borderRadius: 90,
    borderWidth: 24,
    borderColor: COLORS.green,
    alignSelf: "center",
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  donutInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  donutText: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: "800",
  },

  adherenceMedication: {
    marginTop: 18,
  },

  adherenceMedicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  adherencePercent: {
    color: COLORS.teal,
    fontWeight: "800",
  },

  tracked: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },

  historyRow: {
    minHeight: 58,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
  },

  historyDate: {
    width: 55,
  },

  historyDateText: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 12,
  },

  historyTime: {
    width: 72,
  },

  historyMuted: {
    color: COLORS.muted,
    fontSize: 11,
  },

  historyMedicine: {
    flex: 1,
    paddingRight: 5,
  },

  alertTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },

  outlineText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },

  infoAlert: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 14,
    marginBottom: 14,
  },

  infoAlertTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
  },

  infoAlertText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },

  alertItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 13,
    padding: 12,
    marginTop: 10,
  },

  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  alertIconText: {
    fontSize: 19,
    fontWeight: "800",
  },

  alertTitle: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 14,
  },

  alertDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },

  patientTag: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 7,
  },

  patientTagText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "700",
  },

  preferenceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },

  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: COLORS.card2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  preferenceIconText: {
    color: COLORS.muted,
  },

  preferenceTitle: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 13,
  },

  preferenceDescription: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 3,
  },

  switch: {
    width: 38,
    height: 22,
    borderRadius: 12,
    backgroundColor: "#26393D",
    padding: 3,
  },

  switchOn: {
    backgroundColor: COLORS.teal,
  },

  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.muted,
  },

  switchThumbOn: {
    backgroundColor: COLORS.white,
    marginLeft: 16,
  },

  reportHeader: {
    marginBottom: 15,
  },

  reportCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  reportPatientHeader: {
    marginBottom: 15,
  },

  nameRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 7,
  },

  reportPatientName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "800",
  },

  adherenceBadge: {
    backgroundColor: COLORS.teal,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 13,
  },

  adherenceBadgeText: {
    color: COLORS.bg,
    fontSize: 10,
    fontWeight: "800",
  },

  reportPatientDetails: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  generateButton: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.card2,
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginTop: 10,
  },

  generateText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },

  reportStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  reportStat: {
    width: "48%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 11,
  },

  reportStatTitle: {
    color: COLORS.muted,
    fontSize: 10,
  },

  reportStatValue: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 5,
  },

  refillsTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 8,
  },

  refillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },

  tag: {
    backgroundColor: COLORS.card2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  tagText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  modalTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 18,
  },

  roleOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 14,
    marginBottom: 9,
  },

  roleOptionActive: {
    borderColor: COLORS.teal,
    backgroundColor: COLORS.tealDark,
  },

  roleOptionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },

  roleOptionDescription: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 3,
  },

  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.muted,
    alignItems: "center",
    justifyContent: "center",
  },

  radioActive: {
    borderColor: COLORS.teal,
  },

  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.teal,
  },

  inputLabel: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 5,
  },

  input: {
    backgroundColor: COLORS.card2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    color: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 8,
  },

  primaryButtonLarge: {
    backgroundColor: COLORS.teal,
    borderRadius: 11,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },

  cancelButton: {
    alignItems: "center",
    padding: 14,
  },

  cancelText: {
    color: COLORS.muted,
    fontWeight: "700",
  },
});