import * as React from "react";

interface WeeklyDigestEmailProps {
  userName: string;
  workspaceName: string;
  weekStart: string;
  weekEnd: string;
  dashboardUrl: string;
  stats: {
    newLeads: number;
    newLeadsChange: number;
    dealsWon: number;
    dealsWonChange: number;
    revenue: number;
    revenueChange: number;
    pipelineValue: number;
    conversionRate: number;
  };
  topOpportunities: Array<{
    title: string;
    value: number;
    stage: string;
  }>;
  upcomingFollowUps: number;
}

export function WeeklyDigestEmail({
  userName,
  workspaceName,
  weekStart,
  weekEnd,
  dashboardUrl,
  stats,
  topOpportunities,
  upcomingFollowUps,
}: WeeklyDigestEmailProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change}%`;
  };

  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerSection}>
          <div style={logoContainer}>
            <span style={logoText}>Lead</span>
            <span style={logoAccent}>Flow</span>
          </div>
          <p style={weekLabel}>Wekelijkse Samenvatting</p>
          <p style={dateRange}>{weekStart} - {weekEnd}</p>
        </div>

        <p style={greeting}>
          Hoi <strong>{userName}</strong>,
        </p>

        <p style={text}>
          Hier is je wekelijkse update voor <strong>{workspaceName}</strong>.
          Bekijk hoe je team heeft gepresteerd!
        </p>

        {/* Stats Grid */}
        <div style={statsGrid}>
          <div style={statCard}>
            <p style={statLabel}>Nieuwe Leads</p>
            <p style={statValue}>{stats.newLeads}</p>
            <p style={{
              ...statChange,
              color: stats.newLeadsChange >= 0 ? "#22c55e" : "#ef4444"
            }}>
              {formatChange(stats.newLeadsChange)} vs vorige week
            </p>
          </div>
          <div style={statCard}>
            <p style={statLabel}>Deals Gewonnen</p>
            <p style={statValue}>{stats.dealsWon}</p>
            <p style={{
              ...statChange,
              color: stats.dealsWonChange >= 0 ? "#22c55e" : "#ef4444"
            }}>
              {formatChange(stats.dealsWonChange)} vs vorige week
            </p>
          </div>
          <div style={statCard}>
            <p style={statLabel}>Omzet</p>
            <p style={statValue}>{formatCurrency(stats.revenue)}</p>
            <p style={{
              ...statChange,
              color: stats.revenueChange >= 0 ? "#22c55e" : "#ef4444"
            }}>
              {formatChange(stats.revenueChange)} vs vorige week
            </p>
          </div>
          <div style={statCard}>
            <p style={statLabel}>Pipeline Waarde</p>
            <p style={statValue}>{formatCurrency(stats.pipelineValue)}</p>
            <p style={statChange}>{stats.conversionRate}% conversie</p>
          </div>
        </div>

        {/* Top Opportunities */}
        {topOpportunities.length > 0 && (
          <div style={sectionBox}>
            <h2 style={sectionHeading}>🔥 Top Opportunities</h2>
            <table style={table}>
              <thead>
                <tr>
                  <th style={tableHeader}>Deal</th>
                  <th style={{ ...tableHeader, textAlign: "right" }}>Waarde</th>
                  <th style={{ ...tableHeader, textAlign: "right" }}>Stage</th>
                </tr>
              </thead>
              <tbody>
                {topOpportunities.map((opp, index) => (
                  <tr key={index}>
                    <td style={tableCell}>{opp.title}</td>
                    <td style={{ ...tableCell, textAlign: "right", fontWeight: "600" }}>
                      {formatCurrency(opp.value)}
                    </td>
                    <td style={{ ...tableCell, textAlign: "right" }}>
                      <span style={stageBadge}>{opp.stage}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Follow-ups Alert */}
        {upcomingFollowUps > 0 && (
          <div style={alertBox}>
            <span style={alertIcon}>📅</span>
            <div>
              <p style={alertTitle}>Follow-ups deze week</p>
              <p style={alertText}>
                Je hebt <strong>{upcomingFollowUps}</strong> follow-ups gepland voor deze week.
              </p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div style={buttonContainer}>
          <a href={dashboardUrl} style={button}>
            Bekijk Volledig Dashboard
          </a>
        </div>

        <hr style={divider} />

        <p style={footer}>
          Je ontvangt deze email omdat je wekelijkse updates hebt ingeschakeld.
          <br />
          <a href={`${dashboardUrl}/settings`} style={footerLink}>
            Email voorkeuren aanpassen
          </a>
        </p>

        <p style={footerSmall}>
          LeadFlow - Lead Generation & CRM Platform
        </p>
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
  padding: "40px",
  maxWidth: "600px",
  margin: "0 auto",
};

const headerSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "32px",
};

const logoContainer: React.CSSProperties = {
  display: "inline-block",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "8px",
};

const logoText: React.CSSProperties = {
  color: "#18181b",
};

const logoAccent: React.CSSProperties = {
  color: "#8b5cf6",
};

const weekLabel: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#8b5cf6",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "8px 0 4px",
};

const dateRange: React.CSSProperties = {
  fontSize: "13px",
  color: "#71717a",
  margin: 0,
};

const greeting: React.CSSProperties = {
  fontSize: "16px",
  color: "#18181b",
  marginBottom: "8px",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "24px",
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "32px",
};

const statCard: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
};

const statLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "500",
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const statValue: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#18181b",
  margin: "0 0 4px",
};

const statChange: React.CSSProperties = {
  fontSize: "12px",
  margin: 0,
};

const sectionBox: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const sectionHeading: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#18181b",
  margin: "0 0 16px",
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeader: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: "8px 0",
  borderBottom: "1px solid #e4e4e7",
  textAlign: "left",
};

const tableCell: React.CSSProperties = {
  fontSize: "14px",
  color: "#3f3f46",
  padding: "12px 0",
  borderBottom: "1px solid #f4f4f5",
};

const stageBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#e0e7ff",
  color: "#4338ca",
  fontSize: "11px",
  fontWeight: "500",
  padding: "2px 8px",
  borderRadius: "9999px",
};

const alertBox: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  backgroundColor: "#fef3c7",
  border: "1px solid #fcd34d",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
};

const alertIcon: React.CSSProperties = {
  fontSize: "20px",
};

const alertTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#92400e",
  margin: "0 0 4px",
};

const alertText: React.CSSProperties = {
  fontSize: "13px",
  color: "#a16207",
  margin: 0,
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
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
  margin: "32px 0 24px",
};

const footer: React.CSSProperties = {
  fontSize: "13px",
  color: "#71717a",
  textAlign: "center",
  lineHeight: "20px",
};

const footerLink: React.CSSProperties = {
  color: "#8b5cf6",
  textDecoration: "underline",
};

const footerSmall: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
  marginTop: "16px",
};

export default WeeklyDigestEmail;
