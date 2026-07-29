import React, { createContext, useContext, useReducer, ReactNode, useCallback, useMemo } from 'react';
import { Service, Provider, BookingDetails } from '../types';

export interface BookingState {
  selectedService: Service | null;
  selectedProvider: Provider | null;
  bookingDetails: BookingDetails;
  currentStep: number;
  isBooking: boolean;
}

export type BookingAction =
  | { type: 'SELECT_SERVICE'; payload: Service }
  | { type: 'SELECT_PROVIDER'; payload: Provider }
  | { type: 'UPDATE_BOOKING_DETAILS'; payload: Partial<BookingDetails> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'START_BOOKING' }
  | { type: 'COMPLETE_BOOKING' }
  | { type: 'RESET_BOOKING' };

export interface BookingContextType extends BookingState {
  selectService: (service: Service) => void;
  selectProvider: (provider: Provider) => void;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  nextStep: () => void;
  prevStep: () => void;
  startBooking: () => void;
  completeBooking: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

const initialState: BookingState = {
  selectedService: null,
  selectedProvider: null,
  bookingDetails: {
    date: '',
    time: '',
    address: '',
    description: '',
    urgency: 'normal'
  },
  currentStep: 0,
  isBooking: false
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SELECT_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
        currentStep: 1
      };
    case 'SELECT_PROVIDER':
      return {
        ...state,
        selectedProvider: action.payload,
        currentStep: 2
      };
    case 'UPDATE_BOOKING_DETAILS':
      return {
        ...state,
        bookingDetails: { ...state.bookingDetails, ...action.payload }
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 3)
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      };
    case 'START_BOOKING':
      return {
        ...state,
        isBooking: true
      };
    case 'COMPLETE_BOOKING':
      return {
        ...state,
        isBooking: false,
        currentStep: 0,
        selectedService: null,
        selectedProvider: null,
        bookingDetails: initialState.bookingDetails
      };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const selectService = useCallback((service: Service) => dispatch({ type: 'SELECT_SERVICE', payload: service }), []);
  const selectProvider = useCallback((provider: Provider) => dispatch({ type: 'SELECT_PROVIDER', payload: provider }), []);
  const updateBookingDetails = useCallback((details: Partial<BookingDetails>) => dispatch({ type: 'UPDATE_BOOKING_DETAILS', payload: details }), []);
  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), []);
  const startBooking = useCallback(() => dispatch({ type: 'START_BOOKING' }), []);
  const completeBooking = useCallback(() => dispatch({ type: 'COMPLETE_BOOKING' }), []);
  const resetBooking = useCallback(() => dispatch({ type: 'RESET_BOOKING' }), []);

  const value: BookingContextType = useMemo(
    () => ({
      ...state,
      selectService,
      selectProvider,
      updateBookingDetails,
      nextStep,
      prevStep,
      startBooking,
      completeBooking,
      resetBooking
    }),
    [state, selectService, selectProvider, updateBookingDetails, nextStep, prevStep, startBooking, completeBooking, resetBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
