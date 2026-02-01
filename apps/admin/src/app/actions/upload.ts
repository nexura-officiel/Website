
"use server";

import { supabaseAdmin } from "@nexura/database";
import { revalidatePath } from "next/cache";

export async function uploadImageAction(formData: FormData) {
    if (!supabaseAdmin) {
        throw new Error("Supabase Admin client not initialized. Missing SERVICE_ROLE_KEY.");
    }

    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string || "images";

    if (!file) {
        throw new Error("No file uploaded");
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload using Admin Client (Bypasses RLS)
    const { error: uploadError, data } = await supabaseAdmin.storage
        .from(bucket)
        .upload(filePath, buffer, {
            contentType: file.type,
            upsert: true
        });

    if (uploadError) {
        console.error("Storage error:", uploadError);
        throw new Error(uploadError.message);
    }

    // Get Public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return publicUrl;
}
