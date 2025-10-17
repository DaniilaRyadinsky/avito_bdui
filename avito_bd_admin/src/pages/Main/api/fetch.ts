import { createNewScreen } from "../../../entities/screen/constants/screenTemplates";

export const fetchScreenData = async (
    id: string | undefined,
    setFetchedData: (e: any) => void,
    setLoading: (e: boolean) => void,
    setError: (e: string | null) => void) => {
    try {
        setLoading(true);
        setError(null);

        console.log("Screen ID from URL:", id);

        if (!id) {
            const newScreen = createNewScreen();
            setFetchedData(newScreen);
            return;
        }

        if (id === "new") {
            const newScreen = createNewScreen();
            setFetchedData(newScreen);
        } else {
            const response = await fetch(
                `http://31.56.205.210:8080/api/screen/get?id=${id}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFetchedData(data);
        }
    } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
        setLoading(false);
    }
};

export const fetchCreateScreen: any = async (screenData: any) => {
    const response = await fetch("http://31.56.205.210:8080/api/screen/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(screenData),
    });

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            `HTTP error! status: ${response.status}, error: ${responseText}`
        );
    }
    else {
        if (responseText && responseText.trim() !== "") {
            console.log(JSON.parse(responseText))
            return JSON.parse(responseText);
        } else {
            return { success: true, message: "Пустой ответ" };
        }
    }

}

export const fetchUpdateScreen: any = async (screenData: any, id: string) => {
    const response = await fetch(`http://31.56.205.210:8080/api/screen/rewrite?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(screenData),
    });

    const responseText = await response.text();
    if (!response.ok) {
        throw new Error(
            `HTTP error! status: ${response.status}, error: ${responseText}`
        );
    }
    else {
        if (responseText && responseText.trim() !== "") {
            return JSON.parse(responseText);
        } else {
            return { success: true, message: "Пустой ответ" };
        }
    }
}

export const fetchReloadScreen = async(id: string) => {
    fetch(`http://31.56.205.210:8080/api/client/reload?id=${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
}