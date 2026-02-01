
"use client";

import { useState } from "react";
import { supabase } from "@nexura/database";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadImageAction } from "@/app/actions/upload";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    bucket?: string;
}

export default function ImageUpload({ value, onChange, bucket = "images" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("bucket", bucket);

            // Use the Server Action to bypass RLS safely
            const publicUrl = await uploadImageAction(formData);
            onChange(publicUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image! Make sure SUPABASE_SERVICE_ROLE_KEY is set.');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className="space-y-4 w-full">
            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-white/10 group">
                        <Image
                            src={value}
                            alt="Upload"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <label className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-cyan-500/50 hover:bg-white/5 transition-all">
                        {uploading ? (
                            <Loader2 className="animate-spin text-cyan-400" size={32} />
                        ) : (
                            <>
                                <Upload className="text-slate-500 mb-2" size={32} />
                                <span className="text-xs text-slate-500 font-medium text-center px-4">
                                    Click to upload image
                                </span>
                            </>
                        )}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                )}

                <div className="flex-1">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <ImageIcon size={16} />
                        <span className="text-sm font-medium">Image Preview URL</span>
                    </div>
                    <input
                        type="text"
                        value={value}
                        readOnly
                        placeholder="Uploaded URL will appear here..."
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-xs text-slate-400 outline-none truncate"
                    />
                </div>
            </div>
        </div>
    );
}
