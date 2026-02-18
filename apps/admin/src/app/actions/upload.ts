
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

export async function deleteImageAction(url: string, bucket: string) {
    if (!supabaseAdmin) {
        throw new Error("Supabase Admin client not initialized.");
    }

    try {
        // Extract file path from URL
        // URL format: .../storage/v1/object/public/[bucket]/[path]
        // or just split by bucket name
        const pathParts = url.split(`/${bucket}/`);
        if (pathParts.length < 2) {
            console.warn(`[Delete Image] Could not extract path from URL: ${url}`);
            return; // Skip if format doesn't match, maybe it's not hosted here
        }

        const filePath = pathParts[1]; // content after bucket/
        // Decode URI component in case of spaces etc
        const decodedPath = decodeURIComponent(filePath);

        console.log(`[Delete Image] Removing ${decodedPath} from bucket ${bucket}`);

        const { error } = await supabaseAdmin.storage
            .from(bucket)
            .remove([decodedPath]);

        if (error) {
            console.error(`[Delete Image] Error removing file:`, error);
            throw new Error(error.message);
        }

    } catch (error) {
        console.error(`[Delete Image] Unexpected error:`, error);
        // Don't throw for deletion errors to allow the main save to proceed, 
        // but log it. Or should we throw? 
        // Better to fail silently on cleanup than block the main update, usually.
    }
}
