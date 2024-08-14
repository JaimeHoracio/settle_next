'use server'

import { permanentRedirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function goToPath(path: string) {
    revalidatePath(path)    // Update cached posts
    permanentRedirect(path)          // `/post/${id}`Navigate to the new post page
}