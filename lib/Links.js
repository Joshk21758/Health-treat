import {
  Users,
  Stethoscope,
  Activity,
  Pill,
  FlaskConical,
  Settings,
  TrendingUp,
} from "lucide-react";

export const DASHBOARD_MODULES = [
  {
    title: "Patient Directory",
    description:
      "Register new patients, view demographics, and manage profiles.",
    href: "/admin/dashboard/patient-directory",
    icon: Users,
    roles: ["MANAGER", "RECEPTIONIST", "DOCTOR", "NURSE"],
  },
  {
    title: "Clinical Consultations",
    description:
      "Examine waiting patients, enter diagnoses, and write prescriptions.",
    href: "/admin/dashboard/consultations",
    icon: Stethoscope,
    roles: ["MANAGER", "DOCTOR"],
  },
  {
    title: "Analytics & Reports",
    description:
      "View clinic revenue, patient traffic trends, and system performance.",
    href: "/admin/dashboard/facility-metrics",
    icon: TrendingUp,
    roles: ["MANAGER"],
  },
  {
    title: "System Settings",
    description: "Manage staff accounts, clinic roles, and system permissions.",
    href: "/admin/dashboard/settings",
    icon: Settings,
    roles: ["MANAGER"],
  },
];
