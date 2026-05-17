import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 12);

  const patient = await prisma.user.upsert({
    where: { email: "patient@test.com" },
    update: {},
    create: {
      name: "Maria Santos",
      email: "patient@test.com",
      password,
      role: Role.PATIENT,
      patient: {
        create: {
          age: 32,
          trimester: "Second",
          bloodPressure: "128/82",
          heartRate: 78,
          oxygenLevel: 98,
          cholesterol: 195,
          weight: 68,
          sleepHours: 6.5,
          stressLevel: 5,
          riskScore: 38,
        },
      },
    },
  });

  const patient2 = await prisma.user.upsert({
    where: { email: "patient2@test.com" },
    update: {},
    create: {
      name: "Jordan Kim",
      email: "patient2@test.com",
      password,
      role: Role.PATIENT,
      patient: {
        create: {
          age: 28,
          trimester: "Third",
          bloodPressure: "138/88",
          heartRate: 84,
          oxygenLevel: 97,
          cholesterol: 210,
          weight: 72,
          sleepHours: 5.5,
          stressLevel: 7,
          riskScore: 52,
        },
      },
    },
  });

  const doctor = await prisma.user.upsert({
    where: { email: "doctor@test.com" },
    update: {},
    create: {
      name: "Dr. Elena Chen",
      email: "doctor@test.com",
      password,
      role: Role.DOCTOR,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@test.com",
      password,
      role: Role.ADMIN,
    },
  });

  const hospitals = [
    {
      name: "UCLA Medical Center",
      city: "Los Angeles",
      county: "Los Angeles",
      maternalHealthScore: 82,
      cardiovascularRiskRate: 18,
      mortalityRate: 12,
      prenatalAccess: 91,
      postpartumFollowUp: 78,
      latitude: 34.0652,
      longitude: -118.445,
    },
    {
      name: "UC San Diego Health",
      city: "San Diego",
      county: "San Diego",
      maternalHealthScore: 85,
      cardiovascularRiskRate: 15,
      mortalityRate: 10,
      prenatalAccess: 88,
      postpartumFollowUp: 82,
      latitude: 32.8751,
      longitude: -117.2351,
    },
    {
      name: "UC Davis Medical Center",
      city: "Sacramento",
      county: "Sacramento",
      maternalHealthScore: 79,
      cardiovascularRiskRate: 22,
      mortalityRate: 14,
      prenatalAccess: 84,
      postpartumFollowUp: 75,
      latitude: 38.5549,
      longitude: -121.4544,
    },
    {
      name: "UCSF Medical Center",
      city: "San Francisco",
      county: "San Francisco",
      maternalHealthScore: 88,
      cardiovascularRiskRate: 12,
      mortalityRate: 8,
      prenatalAccess: 94,
      postpartumFollowUp: 86,
      latitude: 37.7625,
      longitude: -122.4579,
    },
    {
      name: "Community Regional Medical",
      city: "Fresno",
      county: "Fresno",
      maternalHealthScore: 71,
      cardiovascularRiskRate: 28,
      mortalityRate: 19,
      prenatalAccess: 72,
      postpartumFollowUp: 65,
      latitude: 36.7783,
      longitude: -119.784,
    },
    {
      name: "Stanford Health Care",
      city: "Palo Alto",
      county: "Santa Clara",
      maternalHealthScore: 90,
      cardiovascularRiskRate: 10,
      mortalityRate: 7,
      prenatalAccess: 95,
      postpartumFollowUp: 89,
      latitude: 37.4346,
      longitude: -122.175,
    },
    {
      name: "LAC+USC Medical Center",
      city: "Los Angeles",
      county: "Los Angeles",
      maternalHealthScore: 74,
      cardiovascularRiskRate: 26,
      mortalityRate: 17,
      prenatalAccess: 80,
      postpartumFollowUp: 70,
      latitude: 34.057,
      longitude: -118.212,
    },
    {
      name: "Cedars-Sinai Medical Center",
      city: "Los Angeles",
      county: "Los Angeles",
      maternalHealthScore: 86,
      cardiovascularRiskRate: 14,
      mortalityRate: 9,
      prenatalAccess: 93,
      postpartumFollowUp: 84,
      latitude: 34.0753,
      longitude: -118.3814,
    },
    {
      name: "Long Beach Memorial",
      city: "Long Beach",
      county: "Los Angeles",
      maternalHealthScore: 76,
      cardiovascularRiskRate: 23,
      mortalityRate: 15,
      prenatalAccess: 82,
      postpartumFollowUp: 72,
      latitude: 33.7701,
      longitude: -118.1937,
    },
    {
      name: "Hoag Memorial Hospital",
      city: "Newport Beach",
      county: "Orange",
      maternalHealthScore: 88,
      cardiovascularRiskRate: 13,
      mortalityRate: 8,
      prenatalAccess: 92,
      postpartumFollowUp: 85,
      latitude: 33.6189,
      longitude: -117.9298,
    },
    {
      name: "UC Irvine Medical Center",
      city: "Orange",
      county: "Orange",
      maternalHealthScore: 84,
      cardiovascularRiskRate: 16,
      mortalityRate: 11,
      prenatalAccess: 89,
      postpartumFollowUp: 80,
      latitude: 33.7879,
      longitude: -117.8531,
    },
    {
      name: "Riverside Community Hospital",
      city: "Riverside",
      county: "Riverside",
      maternalHealthScore: 70,
      cardiovascularRiskRate: 29,
      mortalityRate: 20,
      prenatalAccess: 74,
      postpartumFollowUp: 66,
      latitude: 33.9784,
      longitude: -117.3891,
    },
  ];

  await prisma.hospital.deleteMany();
  await prisma.hospital.createMany({ data: hospitals });

  await prisma.forumPost.deleteMany();
  const thread1 = await prisma.forumPost.create({
    data: {
      title: "Managing stress & heart health",
      tag: "Wellness",
      content:
        "Third trimester and my BP has been borderline. What helps you calm down without feeling guilty about resting?",
      anonymousName: "CalmMom42",
      senderId: patient.id,
    },
  });
  await prisma.forumPost.createMany({
    data: [
      {
        parentId: thread1.id,
        content:
          "Breathing exercises and short walks after meals helped me more than I expected.",
        anonymousName: "ValleyMom",
        senderId: patient.id,
      },
      {
        title: "Postpartum BP experiences",
        tag: "Recovery",
        content:
          "Six weeks postpartum and still monitoring daily. Anyone else still on meds?",
        anonymousName: "HeartStrong88",
        senderId: patient.id,
      },
      {
        title: "Advocating when symptoms are dismissed",
        tag: "Support",
        content: "Trust your body—how do you speak up at appointments?",
        anonymousName: "AdvocateMama",
        senderId: patient.id,
      },
    ],
  });

  await prisma.message.deleteMany();
  await prisma.message.createMany({
    data: [
      {
        senderId: patient.id,
        receiverId: doctor.id,
        content:
          "I've had headaches and swelling in my hands this week. Could this be related to my blood pressure?",
        anonymousName: "CalmMom42",
      },
      {
        senderId: doctor.id,
        receiverId: patient.id,
        content:
          "Those symptoms can be related to blood pressure during pregnancy. Please track your BP twice daily and seek urgent care if you have vision changes or severe headache.",
        anonymousName: "Dr. Elena Chen",
      },
      {
        senderId: patient.id,
        receiverId: doctor.id,
        content:
          "Is it normal to feel heart palpitations after delivery? I'm 3 weeks postpartum.",
        anonymousName: "NewMomCA",
      },
      {
        senderId: patient2.id,
        receiverId: doctor.id,
        content:
          "My BP readings have been higher this week (around 138/88). Should I be worried in the third trimester?",
        anonymousName: "JordanK",
      },
    ],
  });

  console.log("Seed complete: demo users, hospitals, messages, forum");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
