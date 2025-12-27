import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGearGuardStore = create(
  persist(
    (set) => ({
      tasks: [
        { id: "TK-101", name: "CNC Machine #4 Calibration", status: "todo", priority: "High", equipment: "CNC-04", time: "10:30 AM" },
        { id: "TK-102", name: "Hydraulic Press Filter Swap", status: "in-progress", priority: "Medium", equipment: "PRESS-02", time: "12:00 PM" },
      ],
      scrapItems: [
        { id: "SC-99", name: "Old Compressor Unit", reason: "Beyond repair", requester: "Tech-Alpha", status: "pending" }
      ],
      // Actions
      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, { 
            ...task, 
            id: `TK-${Math.floor(Math.random()*900)+100}`, 
            status: "todo",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }] 
      })),
      updateTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
      })),
      approveScrap: (id) => set((state) => ({
        scrapItems: state.scrapItems.filter(s => s.id !== id)
      })),
    }),
    { name: "gearguard-v5-storage" }
  )
);