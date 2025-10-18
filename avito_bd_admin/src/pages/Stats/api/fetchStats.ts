import type { StatsData } from "../Stats";

export const fetchStats = async (
    setStats: (newstat: StatsData | null) => void,
    setLoading: (e: boolean) => void,
    setError: (e: string) => void
) => {
    try {
        setLoading(true);
        const response = await fetch("http://31.56.205.210:8080/api/stats/all");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);
        setStats(data);
    } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
        setLoading(false);
    }
};