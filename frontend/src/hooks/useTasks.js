import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export function useTasks() {
  return useQuery(["tasks"], async () => {
    const res = await api.get("/tasks");
    return res.data;
  });
}
