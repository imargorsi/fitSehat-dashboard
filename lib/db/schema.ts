import {
  date,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { userInNeonAuth } from "@/lib/db/auth-schema";

/**
 * Application tables for FitSehat.
 * Apply with `npm run db:push`. Do not recreate `neon_auth` tables.
 */

const userId = () =>
  uuid("user_id")
    .notNull()
    .references(() => userInNeonAuth.id, { onDelete: "cascade" });

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: userId(),
    startWeightKg: numeric("start_weight_kg", { precision: 5, scale: 2 }),
    targetWeightKg: numeric("target_weight_kg", { precision: 5, scale: 2 }),
    startWaistCm: numeric("start_waist_cm", { precision: 5, scale: 1 }),
    weighInWeekday: integer("weigh_in_weekday").notNull().default(2),
    stepGoal: integer("step_goal").notNull().default(4000),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("profiles_user_id_uidx").on(table.userId)]
);

export const macroTargets = pgTable("macro_targets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: userId(),
  name: text("name").notNull().default("Daily Calorie Goal"),
  targetCalories: integer("target_calories").notNull(),
  proteinTargetG: integer("protein_target_g").notNull(),
  fatsTargetG: integer("fats_target_g").notNull(),
  carbsTargetG: integer("carbs_target_g").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const calorieLogs = pgTable("calorie_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: userId(),
  macroTargetId: uuid("macro_target_id").references(() => macroTargets.id, {
    onDelete: "set null",
  }),
  loggedOn: date("logged_on").notNull(),
  item: text("item").notNull(),
  meal: text("meal").notNull(),
  calories: integer("calories").notNull(),
  proteinG: numeric("protein_g", { precision: 6, scale: 1 }),
  carbsG: numeric("carbs_g", { precision: 6, scale: 1 }),
  fatsG: numeric("fats_g", { precision: 6, scale: 1 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const weeklyMeasurements = pgTable(
  "weekly_measurements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: userId(),
    measuredOn: date("measured_on").notNull(),
    weightKg: numeric("weight_kg", { precision: 5, scale: 2 }).notNull(),
    waistCm: numeric("waist_cm", { precision: 5, scale: 1 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("weekly_measurements_user_day_uidx").on(table.userId, table.measuredOn),
  ]
);

export const mealOptions = pgTable("meal_options", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: userId(),
  name: text("name").notNull(),
  mealType: text("meal_type").notNull(),
  calories: integer("calories"),
  proteinG: numeric("protein_g", { precision: 6, scale: 1 }),
  carbsG: numeric("carbs_g", { precision: 6, scale: 1 }),
  fatsG: numeric("fats_g", { precision: 6, scale: 1 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const walkDays = pgTable(
  "walk_days",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: userId(),
    walkedOn: date("walked_on").notNull(),
    steps: integer("steps").notNull(),
    goalSteps: integer("goal_steps").notNull(),
    caloriesBurned: integer("calories_burned").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("walk_days_user_day_uidx").on(table.userId, table.walkedOn)]
);

/** Legacy lift plan. Unused by the walking Move module. */
export const workouts = pgTable("workouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: userId(),
  name: text("name").notNull(),
  dayType: text("day_type").notNull(),
  sets: integer("sets"),
  repsRange: text("reps_range"),
  startingWeight: numeric("starting_weight", { precision: 6, scale: 2 }),
  startingDate: date("starting_date"),
  increaseStep: numeric("increase_step", { precision: 6, scale: 2 }),
  progressionDays: integer("progression_days"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const weeklyReports = pgTable("weekly_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: userId(),
  name: text("name").notNull(),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type TProfile = typeof profiles.$inferSelect;
export type TMacroTarget = typeof macroTargets.$inferSelect;
export type TCalorieLog = typeof calorieLogs.$inferSelect;
export type TWeeklyMeasurement = typeof weeklyMeasurements.$inferSelect;
export type TMealOption = typeof mealOptions.$inferSelect;
export type TWalkDay = typeof walkDays.$inferSelect;
export type TWorkout = typeof workouts.$inferSelect;
export type TWeeklyReport = typeof weeklyReports.$inferSelect;
