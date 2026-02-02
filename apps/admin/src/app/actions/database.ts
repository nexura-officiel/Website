
"use server";

import { supabaseAdmin } from "@nexura/database";
import { revalidatePath } from "next/cache";

export async function updateProjectAction(id: string, data: any) {
    if (!supabaseAdmin) {
        throw new Error("Supabase Admin client not initialized. Missing SERVICE_ROLE_KEY.");
    }

    console.log(`[Server Action] Updating project ${id}...`);

    // Clean data: ensure service_id is null if empty
    const cleanData = {
        ...data,
        service_id: data.service_id || null
    };

    const { data: updatedData, error } = await supabaseAdmin
        .from('projects')
        .update(cleanData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`[Server Action] Error updating project ${id}:`, error);
        throw new Error(error.message);
    }

    if (!updatedData) {
        console.warn(`[Server Action] No rows updated for ID ${id}`);
        throw new Error("Project not found or no changes made.");
    }

    console.log(`[Server Action] Successfully updated project ${id}`);

    // Revalidate paths to clear cache
    revalidatePath('/projects');
    revalidatePath(`/projects/${id}/edit`);

    return updatedData;
}

export async function updateServiceAction(id: string, data: any) {
    if (!supabaseAdmin) {
        throw new Error("Supabase Admin client not initialized.");
    }

    const { data: updatedData, error } = await supabaseAdmin
        .from('services')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);

    revalidatePath('/services');
    revalidatePath(`/services/${id}/edit`);

    return updatedData;
}

export async function createProjectAction(data: any) {
    if (!supabaseAdmin) {
        throw new Error("Supabase Admin client not initialized.");
    }

    // Ensure service_id is null if empty
    const cleanData = {
        ...data,
        service_id: data.service_id || null
    };

    const { data: insertedData, error } = await supabaseAdmin
        .from('projects')
        .insert([cleanData])
        .select()
        .single();

    if (error) throw new Error(error.message);

    revalidatePath('/projects');
    return insertedData;
}

export async function createServiceAction(data: any) {
    if (!supabaseAdmin) {
        throw new Error("Supabase Admin client not initialized.");
    }

    const { data: insertedData, error } = await supabaseAdmin
        .from('services')
        .insert([data])
        .select()
        .single();

    if (error) throw new Error(error.message);

    revalidatePath('/services');
    return insertedData;
}
