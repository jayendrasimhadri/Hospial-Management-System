export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: number; // years
  rating: number;     // out of 5
  reviews: number;
  fee: number;        // INR
  availableToday: boolean;
};

// Sample data until a real database/API is connected.
export const doctors: Doctor[] = [
  { id: 1, name: "Dr. Robert Miller",   specialty: "Cardiologist",      image: "/doctor1.jpeg", experience: 22, rating: 4.9, reviews: 1284, fee: 1200, availableToday: true  },
  { id: 2, name: "Dr. Daniel Carter",   specialty: "Orthopedic Surgeon", image: "/doctor2.jpeg", experience: 9,  rating: 4.7, reviews: 642,  fee: 900,  availableToday: false },
  { id: 3, name: "Dr. Sofia Romero",    specialty: "Dermatologist",     image: "/doctor3.jpeg", experience: 6,  rating: 4.6, reviews: 418,  fee: 700,  availableToday: true  },
  { id: 4, name: "Dr. Arjun Mehta",     specialty: "General Physician", image: "/doctor4.jpeg", experience: 11, rating: 4.8, reviews: 2031, fee: 500,  availableToday: true  },
  { id: 5, name: "Dr. Karan Malhotra",  specialty: "Neurologist",       image: "/doctor5.jpeg", experience: 14, rating: 4.8, reviews: 957,  fee: 1500, availableToday: false },
  { id: 6, name: "Dr. Emily Clarke",    specialty: "Pediatrician",      image: "/doctor6.jpeg", experience: 8,  rating: 4.9, reviews: 1563, fee: 800,  availableToday: true  },
  { id: 7, name: "Dr. Ananya Rao",      specialty: "Gynecologist",      image: "/doctor7.jpeg", experience: 10, rating: 4.7, reviews: 874,  fee: 1000, availableToday: true  },
  { id: 8, name: "Dr. Nisha Verma",     specialty: "ENT Specialist",    image: "/doctor8.jpeg", experience: 5,  rating: 4.5, reviews: 309,  fee: 600,  availableToday: false },
  { id: 9, name: "Dr. Thomas Weber",    specialty: "Psychiatrist",      image: "/doctor9.jpeg", experience: 18, rating: 4.8, reviews: 1120, fee: 1300, availableToday: true  },
];
