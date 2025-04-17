import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface SimulationState {
  simulations: any[];
  userProgress: any[];
  loading: boolean;
  loadSimulations: () => Promise<void>;
  loadUserProgress: (userId: string) => Promise<void>;
  updateProgress: (simulationId: string, status: string, score: number) => Promise<void>;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  simulations: [],
  userProgress: [],
  loading: false,
  loadSimulations: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('simulations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      set({ simulations: data || [], loading: false });
    } catch (error) {
      console.error('Error loading simulations:', error);
      set({ loading: false });
    }
  },
  loadUserProgress: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('simulation_progress')
        .select(`
          *,
          simulations (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      set({ userProgress: data || [] });
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  },
  updateProgress: async (simulationId: string, status: string, score: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('simulation_progress')
        .upsert({
          user_id: user.id,
          simulation_id: simulationId,
          status,
          score,
          completed_at: status === 'completed' ? new Date().toISOString() : null,
        });

      if (error) throw error;
      await get().loadUserProgress(user.id);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  },
}));