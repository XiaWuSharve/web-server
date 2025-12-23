"use client";

import { Upload } from "@/actions";
import { redirect } from "next/navigation";

async function upload(form: FormData) {
    const uuid = await Upload(form);
    console.log(uuid);
    redirect('/' + uuid);
}

export default function MainPage() {
    return (
        <>
            {/* Hero */}
            <section className="hero">
                <h1 className="hero-title">无人机拼接</h1>
                <p className="hero-subtitle">
                    Hyperspectral Calibration and Learning (HCL) Laboratory
                </p>
            </section>

            {/* 上传卡片 */}
            <div className="card">
                <form method="POST" className="space-y-4">
                    <input name="file" type="file" className="file-input" />
                    <button formAction={upload} className="upload-btn">
                        上传文件并计算
                    </button>
                </form>
            </div>
        </>
    );
}