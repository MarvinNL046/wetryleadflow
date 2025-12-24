import * as React from "react";

interface FollowUpReminderEmailProps {
  recipientName: string;
  followUps: Array<{
    contactName: string;
    contactEmail?: string;
    contactPhone?: string;
    dealTitle?: string;
    dealValue?: number;
    dueDate: string;
    dueTime?: string;
    notes?: string;
    priority: "high" | "medium" | "low";
    contactUrl: string;
  }>;
  dashboardUrl: string;
  isDaily?: boolean;
}

const priorityConfig = {
  high: { bg: "#fee2e2", text: "#dc2626", label: "Hoog" },
  medium: { bg: "#fef3c7", text: "#b45309", label: "Medium" },
  low: { bg: "#e0e7ff", text: "#4338ca", label: "Laag" },
};

export function FollowUpReminderEmail({
  recipientName,
  followUps,
  dashboardUrl,
  isDaily = false,
}: FollowUpReminderEmailProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);

  const highPriorityCount = followUps.filter((f) => f.priority === "high").length;

  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerBanner}>
          <span style={headerIcon}>⏰</span>
          <span style={headerTitle}>
            {isDaily ? "DAGELIJKSE FOLLOW-UPS" : "FOLLOW-UP HERINNERING"}
          </span>
        </div>

        <div style={mainContent}>
          <h1 style={heading}>
            {followUps.length === 1
              ? "Je hebt 1 follow-up staan"
              : `Je hebt ${followUps.length} follow-ups staan`}
          </h1>

          <p style={text}>
            Hoi <strong>{recipientName}</strong>,
          </p>

          <p style={text}>
            {isDaily ? (
              <>Dit zijn je follow-ups voor vandaag. Vergeet ze niet!</>
            ) : (
              <>Tijd om contact op te nemen met deze leads.</>
            )}
          </p>

          {/* Urgent alert */}
          {highPriorityCount > 0 && (
            <div style={urgentAlert}>
              <span style={urgentIcon}>🔥</span>
              <span style={urgentText}>
                <strong>{highPriorityCount}</strong> follow-up{highPriorityCount > 1 ? "s" : ""} met hoge prioriteit
              </span>
            </div>
          )}

          {/* Follow-ups list */}
          <div style={followUpList}>
            {followUps.map((followUp, index) => {
              const priority = priorityConfig[followUp.priority];
              return (
                <div key={index} style={followUpCard}>
                  <div style={followUpHeader}>
                    <div style={contactInfo}>
                      <div style={contactAvatar}>
                        {followUp.contactName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 style={contactName}>{followUp.contactName}</h3>
                        {followUp.dealTitle && (
                          <p style={dealInfo}>
                            {followUp.dealTitle}
                            {followUp.dealValue && (
                              <span style={dealValue}>
                                {" "}• {formatCurrency(followUp.dealValue)}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <span style={{
                      ...priorityBadge,
                      backgroundColor: priority.bg,
                      color: priority.text,
                    }}>
                      {priority.label}
                    </span>
                  </div>

                  <div style={followUpDetails}>
                    <div style={detailRow}>
                      <span style={detailIcon}>📅</span>
                      <span style={detailText}>
                        {followUp.dueDate}
                        {followUp.dueTime && ` om ${followUp.dueTime}`}
                      </span>
                    </div>
                    {followUp.contactEmail && (
                      <div style={detailRow}>
                        <span style={detailIcon}>✉️</span>
                        <a href={`mailto:${followUp.contactEmail}`} style={detailLink}>
                          {followUp.contactEmail}
                        </a>
                      </div>
                    )}
                    {followUp.contactPhone && (
                      <div style={detailRow}>
                        <span style={detailIcon}>📞</span>
                        <a href={`tel:${followUp.contactPhone}`} style={detailLink}>
                          {followUp.contactPhone}
                        </a>
                      </div>
                    )}
                    {followUp.notes && (
                      <div style={notesBox}>
                        <p style={notesText}>&quot;{followUp.notes}&quot;</p>
                      </div>
                    )}
                  </div>

                  <a href={followUp.contactUrl} style={viewButton}>
                    Bekijk Contact →
                  </a>
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div style={tipsBox}>
            <p style={tipsTitle}>💡 Follow-up tips</p>
            <ul style={tipsList}>
              <li>Personaliseer je bericht op basis van eerdere gesprekken</li>
              <li>Bel bij voorkeur, email als back-up</li>
              <li>Noteer het resultaat direct in het CRM</li>
            </ul>
          </div>

          {/* CTA */}
          <div style={buttonContainer}>
            <a href={dashboardUrl} style={button}>
              Open Dashboard
            </a>
          </div>

          <hr style={divider} />

          <p style={footerText}>
            Je ontvangt deze herinneringen omdat je follow-up notificaties hebt ingeschakeld.
          </p>
          <p style={footer}>
            LeadFlow - Lead Generation & CRM Platform
          </p>
        </div>
      </div>
    </div>
  );
}

// Inline styles
const container: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  backgroundColor: "#f4f4f5",
  padding: "40px 20px",
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden",
};

const headerBanner: React.CSSProperties = {
  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  padding: "20px",
  textAlign: "center",
};

const headerIcon: React.CSSProperties = {
  fontSize: "24px",
  display: "block",
  marginBottom: "4px",
};

const headerTitle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2px",
};

const mainContent: React.CSSProperties = {
  padding: "32px 40px 40px",
};

const heading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#18181b",
  marginBottom: "20px",
  textAlign: "center",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "16px",
};

const urgentAlert: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  backgroundColor: "#fee2e2",
  border: "1px solid #fecaca",
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "24px",
};

const urgentIcon: React.CSSProperties = {
  fontSize: "16px",
};

const urgentText: React.CSSProperties = {
  fontSize: "14px",
  color: "#dc2626",
};

const followUpList: React.CSSProperties = {
  marginBottom: "24px",
};

const followUpCard: React.CSSProperties = {
  border: "1px solid #e4e4e7",
  borderRadius: "12px",
  marginBottom: "16px",
  overflow: "hidden",
};

const followUpHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderBottom: "1px solid #e4e4e7",
};

const contactInfo: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const contactAvatar: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contactName: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#18181b",
  margin: "0 0 2px",
};

const dealInfo: React.CSSProperties = {
  fontSize: "13px",
  color: "#71717a",
  margin: 0,
};

const dealValue: React.CSSProperties = {
  fontWeight: "600",
  color: "#52525b",
};

const priorityBadge: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  padding: "4px 10px",
  borderRadius: "9999px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const followUpDetails: React.CSSProperties = {
  padding: "16px",
};

const detailRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const detailIcon: React.CSSProperties = {
  fontSize: "14px",
};

const detailText: React.CSSProperties = {
  fontSize: "14px",
  color: "#3f3f46",
};

const detailLink: React.CSSProperties = {
  fontSize: "14px",
  color: "#8b5cf6",
  textDecoration: "none",
};

const notesBox: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  borderRadius: "6px",
  padding: "10px 12px",
  marginTop: "8px",
};

const notesText: React.CSSProperties = {
  fontSize: "13px",
  color: "#52525b",
  fontStyle: "italic",
  margin: 0,
};

const viewButton: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  padding: "12px",
  backgroundColor: "#f8fafc",
  borderTop: "1px solid #e4e4e7",
  color: "#8b5cf6",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
};

const tipsBox: React.CSSProperties = {
  backgroundColor: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
};

const tipsTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#15803d",
  marginBottom: "8px",
};

const tipsList: React.CSSProperties = {
  margin: 0,
  paddingLeft: "20px",
  fontSize: "13px",
  color: "#166534",
  lineHeight: "22px",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
};

const button: React.CSSProperties = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "15px",
  display: "inline-block",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "32px 0 16px",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#71717a",
  textAlign: "center",
  marginBottom: "8px",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
};

export default FollowUpReminderEmail;
