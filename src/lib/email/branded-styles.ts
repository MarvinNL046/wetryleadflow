import type { CSSProperties } from "react";
import type { EmailBranding } from "@/lib/branding/get-branding";

// Default LeadFlow branding for emails
export const DEFAULT_EMAIL_BRANDING: EmailBranding = {
  appName: "LeadFlow",
  logoUrl: null,
  primaryColor: "#8b5cf6", // Purple
  secondaryColor: "#3b82f6", // Blue
  fromName: "LeadFlow",
  fromEmail: process.env.EMAIL_FROM_ADDRESS || "noreply@wetryleadflow.com",
};

// ============================================
// Dynamic Email Styles Generator
// ============================================
export function createBrandedStyles(branding: EmailBranding = DEFAULT_EMAIL_BRANDING) {
  const primaryColor = branding.primaryColor || DEFAULT_EMAIL_BRANDING.primaryColor;
  const secondaryColor = branding.secondaryColor || DEFAULT_EMAIL_BRANDING.secondaryColor;

  return {
    // Layout
    container: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#f4f4f5",
      padding: "40px 20px",
    } as CSSProperties,

    content: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "40px",
      maxWidth: "600px",
      margin: "0 auto",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    } as CSSProperties,

    // Header
    headerSection: {
      textAlign: "center",
      marginBottom: "24px",
    } as CSSProperties,

    logoContainer: {
      display: "inline-block",
      fontSize: "24px",
      fontWeight: "bold",
    } as CSSProperties,

    logoImage: {
      maxWidth: "150px",
      maxHeight: "50px",
      objectFit: "contain",
    } as CSSProperties,

    logoText: {
      color: primaryColor,
    } as CSSProperties,

    // Badge
    badge: {
      textAlign: "center",
      marginBottom: "16px",
    } as CSSProperties,

    badgeText: {
      backgroundColor: primaryColor,
      color: "#ffffff",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "1px",
    } as CSSProperties,

    // Typography
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#18181b",
      marginBottom: "24px",
      textAlign: "center",
    } as CSSProperties,

    text: {
      fontSize: "16px",
      lineHeight: "26px",
      color: "#3f3f46",
      marginBottom: "16px",
    } as CSSProperties,

    textSmall: {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#52525b",
      marginBottom: "16px",
    } as CSSProperties,

    // Summary Box
    summaryBox: {
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      padding: "20px 24px",
      margin: "24px 0",
      border: "1px solid #e2e8f0",
    } as CSSProperties,

    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px solid #e2e8f0",
    } as CSSProperties,

    summaryLabel: {
      fontSize: "14px",
      color: "#64748b",
    } as CSSProperties,

    summaryValue: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
    } as CSSProperties,

    summaryValueHighlight: {
      fontSize: "18px",
      fontWeight: "700",
      color: primaryColor,
    } as CSSProperties,

    // Buttons
    buttonContainer: {
      textAlign: "center",
      margin: "32px 0",
    } as CSSProperties,

    button: {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      color: "#ffffff",
      padding: "14px 36px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "16px",
      display: "inline-block",
      boxShadow: `0 4px 14px ${hexToRgba(primaryColor, 0.4)}`,
    } as CSSProperties,

    secondaryButton: {
      background: "#f4f4f5",
      color: "#3f3f46",
      padding: "12px 28px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "14px",
      display: "inline-block",
      border: "1px solid #e4e4e7",
    } as CSSProperties,

    // Links
    link: {
      color: primaryColor,
      textDecoration: "underline",
    } as CSSProperties,

    // Divider
    divider: {
      border: "none",
      borderTop: "1px solid #e4e4e7",
      margin: "32px 0",
    } as CSSProperties,

    // Footer
    footer: {
      fontSize: "15px",
      color: "#3f3f46",
      lineHeight: "24px",
    } as CSSProperties,

    footerSmall: {
      fontSize: "11px",
      color: "#a1a1aa",
      textAlign: "center",
      marginTop: "24px",
    } as CSSProperties,

    // Payment specific
    payButton: {
      background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
      color: "#ffffff",
      padding: "16px 40px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "18px",
      display: "inline-block",
      boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
      marginBottom: "16px",
    } as CSSProperties,

    paymentSection: {
      backgroundColor: "#f0fdf4",
      borderRadius: "8px",
      padding: "20px 24px",
      marginBottom: "24px",
      border: "1px solid #bbf7d0",
    } as CSSProperties,

    paymentHeading: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#166534",
      marginBottom: "12px",
    } as CSSProperties,

    paymentText: {
      fontSize: "14px",
      color: "#166534",
      marginBottom: "12px",
    } as CSSProperties,

    paymentDetails: {
      backgroundColor: "#ffffff",
      borderRadius: "6px",
      padding: "12px 16px",
    } as CSSProperties,

    paymentRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "4px 0",
    } as CSSProperties,

    paymentLabel: {
      fontSize: "13px",
      color: "#64748b",
    } as CSSProperties,

    paymentValue: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#1e293b",
      fontFamily: "monospace",
    } as CSSProperties,
  };
}

// ============================================
// Utility: Convert hex to rgba
// ============================================
function hexToRgba(hex: string, alpha: number): string {
  // Remove # if present
  const cleanHex = hex.replace("#", "");

  // Parse RGB values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================
// Email Header Component Helper
// ============================================
export interface EmailHeaderProps {
  branding: EmailBranding;
  styles: ReturnType<typeof createBrandedStyles>;
}

// Helper to format powered by footer text
export function getPoweredByText(branding: EmailBranding): string {
  // Always show "LeadFlow" in the powered by line
  // But show agency name in the main branding if applicable
  return `Deze e-mail is verzonden via ${branding.appName}`;
}
