import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.question.createMany({
    data: [
      {
        quizId: "1",
        question: "What is the capital of France?",
        answer: "Paris",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
      },
      {
        quizId: "1",
        question: "What is 2 + 2?",
        answer: "4",
        options: ["3", "4", "5", "6"],
      },
      {
        quizId: "1",
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
      },
      {
        quizId: "1",
        question: "What is the chemical symbol for gold?",
        answer: "Au",
        options: ["Ag", "Au", "Pb", "Fe"],
      },
      {
        quizId: "1",
        question: "What is the speed of light?",
        answer: "299792458 m/s",
        options: ["299792458 m/s", "300000 km/s", "150000 km/s", "100000 km/s"],
      },
      {
        quizId: "1",
        question: "What is the largest mammal?",
        answer: "Blue Whale",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      },
      {
        quizId: "1",
        question: "What is the boiling point of water?",
        answer: "100°C",
        options: ["0°C", "50°C", "100°C", "150°C"],
      },
      {
        quizId: "1",
        question: "What is the smallest prime number?",
        answer: "2",
        options: ["0", "1", "2", "3"],
      },
      {
        quizId: "1",
        question: "What is the hardest natural substance on Earth?",
        answer: "Diamond",
        options: ["Gold", "Iron", "Diamond", "Graphite"],
      },
      {
        quizId: "1",
        question: "What is the main ingredient in guacamole?",
        answer: "Avocado",
        options: ["Tomato", "Avocado", "Onion", "Pepper"],
      },
    ],
  });
}

main().finally(() => {
  prisma.$disconnect();
});
