import type { ScreenItem } from "../model/types";

interface FetchInterface {
    id: string,
    onSuccess: () => void,
    onError: (err: string) => void
}

export const deleteScreen = async ({ id, onSuccess, onError }: FetchInterface) => {
    fetch(`http://31.56.205.210:8080/api/screen/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(async response => {
        switch (response.status) {
            case 204:
                onSuccess();
                break;
            case 400:
                onError("err")
                break;
            case 500:
                onError("server")
                break;
        }
    })

}

export const fetchScreens = async (
    setScreens: (e: ScreenItem[]) => void,
    setLoading: (e:boolean)=> void,
    setError: (e: string | null) => void
) => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://31.56.205.210:8080/api/screen/all"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setScreens(data);
      } catch (err) {
        console.error("Error fetching screens:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };