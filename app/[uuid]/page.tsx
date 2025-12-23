"use client";

import { Fetch } from "@/actions";
import MainPage from "@/components/main";
import { use, useEffect, useState } from "react";

export default function TaskPage({ params }: { params: Promise<{ uuid: string }> }) {
    const [message, setMessage] = useState("loading");
    const { uuid } = use(params);
    useEffect(() => {
        let id: NodeJS.Timeout = setTimeout(() => { }, 0);
        const refresh = async () => {
            console.log("refreshing");
            const res = await Fetch(uuid);
            if (res === "invalid") {
                window.location.href = "/";
                clearInterval(id);
                return;
            }
            if (res instanceof Blob) {
                const url = window.URL.createObjectURL(res);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'result.zip';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                setMessage("Download started");
                clearInterval(id);
                return;
            }
            setMessage(res);
            if (res == "failed") {
                clearInterval(id);
                return;
            }
        }
        refresh();
        id = setInterval(refresh, 5000);
    })


    return (
        <>
            <section className="hero">
                <h1 className="hero-title">计算任务</h1>
                <p className="hero-subtitle">任务 ID：{uuid}</p>
            </section>

            <p className="status">{message}</p>

            <MainPage />
        </>
    );
}