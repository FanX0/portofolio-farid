"use server";

import { resend } from "@/app/lib/resend";
import type { EmailState } from "@/app/types/email";

export async function sendEmail(
  prevState: EmailState,
  formData: FormData
): Promise<EmailState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  const fieldErrors: EmailState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Name is required";
  if (!email) {
    fieldErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Invalid email format";
  }

  if (!message) {
    fieldErrors.message = "Message is required";
  } else if (message.length < 10) {
    fieldErrors.message = "Message must be at least 10 characters";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  try {
    const response = await resend.emails.send({
      from: "Farid Portfolio <onboarding@resend.dev>",
      to: ["faridazhari111@gmail.com"],
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    if (response.error) {
      return { success: false, error: response.error.message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
