import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  checkIn: '',
  checkOut: '',
  guests: 1,
  selectedRoomId: null,
  setBookingDetails: (details) => set((state) => ({ ...state, ...details })),
}));
