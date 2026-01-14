import { EvidenceItem, AnalysisResult } from "../types";

/**
 * Simulated Forensic Engine (Marketing Demo)
 * ------------------------------------------------------------
 * This project intentionally ships **no live API keys** to the browser.
 * For the public marketing site, we provide a deterministic, offline
 * analysis routine that mirrors the structure of the real engine output.
 *
 * A production deployment should proxy any LLM calls through a secure
 * server-side endpoint (serverless function / API) where secrets remain
 * private.
 */

type RiskTier = "Low" | "Medium" | "High";

function scoreSignals(text: string) {
  const t = text.toLowerCase();

  const signals: { label: string; re: RegExp; weight: number }[] = [
    { label: "Delay / Failure to Respond", re: /(no response|paged twice|ignored|unavailable|did not respond)/i, weight: 3 },
    { label: "Deteriorating Vitals", re: /(bp\s*\d{2,3}\s*\/\s*\d{2,3}|hr\s*\d{2,3}|hypotens|tachycard)/i, weight: 3 },
    { label: "Documentation / Credibility", re: /(do not recall|can't recall|battery.*dead|off the main channel|keep this off)/i, weight: 2 },
    { label: "Protocol / Staffing", re: /(below protocol|ratio.*below|staffing|policy violation)/i, weight: 2 },
    { label: "Escalation / Chain of Command", re: /(charge nurse|supervisor|rapid response|code|escalat)/i, weight: 1 },
  ];

  let score = 0;
  const hits: string[] = [];
  for (const s of signals) {
    if (s.re.test(t)) {
      score += s.weight;
      hits.push(s.label);
    }
  }
  return { score, hits };
}

function tierFromScore(score: number): RiskTier {
  if (score >= 6) return "High";
  if (score >= 3) return "Medium";
  return "Low";
}

function buildStatutes(type: EvidenceItem["type"], hits: string[]): string[] {
  const statutes: string[] = [];

  // Core med-mal / operations concepts (kept general + audit-safe)
  if (hits.includes("Delay / Failure to Respond")) statutes.push("Failure to Rescue / Delay in Treatment (clinical escalation standard)");
  if (hits.includes("Deteriorating Vitals")) statutes.push("Standard of Care: recognition & response to hemodynamic instability");
  if (hits.includes("Protocol / Staffing")) statutes.push("Policy Compliance: staffing ratio / coverage protocol adherence");
  if (hits.includes("Documentation / Credibility")) statutes.push("Impeachment / Credibility: inconsistent recollection & record variance");

  // Evidence-type specific additions
  if (type === "Email") statutes.push("Spoliation Risk Indicators: informal routing / off-channel communications");
  if (type === "Deposition") statutes.push("Testimony Consistency: recollection vs contemporaneous notes");
  if (type === "Medical Record") statutes.push("Charting Integrity: time-stamped note correlation");

  // Ensure 2–3 items minimum
  while (statutes.length < 2) statutes.push("Clinical Governance: escalation pathways & documentation standards");
  return statutes.slice(0, 3);
}

function buildLiability(tier: RiskTier, hits: string[]): string {
  if (tier === "High") {
    if (hits.includes("Delay / Failure to Respond") && hits.includes("Deteriorating Vitals")) {
      return "High Risk: Delay in treatment during patient deterioration.";
    }
    if (hits.includes("Documentation / Credibility")) {
      return "High Risk: Credibility gap between testimony and contemporaneous records.";
    }
    return "High Risk: Multiple adverse signals present in the record.";
  }
  if (tier === "Medium") return "Moderate Risk: Escalation / protocol questions require verification.";
  return "Lower Risk: Limited adverse indicators; verify against full chart and timeline.";
}

function buildSummary(e: EvidenceItem, tier: RiskTier): string {
  const shortType = e.type.toLowerCase();
  return `This ${shortType} entry (${e.id}, ${e.timestamp}) contains indicators consistent with a ${tier.toLowerCase()}-risk discovery node. The marketing demo engine flags it for verification against the underlying record set and case timeline.`;
}

function buildReasoning(e: EvidenceItem, hits: string[], tier: RiskTier): string {
  const bullets: string[] = [];
  bullets.push(`NODE_CLASSIFICATION: ${tier.toUpperCase()}_RISK`);
  bullets.push(`INPUT_TYPE: ${e.type}`);
  bullets.push(`TIMESTAMP: ${e.timestamp}`);

  if (hits.length) {
    bullets.push(`SIGNALS_DETECTED: ${hits.join(" | ")}`);
  } else {
    bullets.push("SIGNALS_DETECTED: None (baseline node)");
  }

  bullets.push("VERIFICATION_PROTOCOL:");
  bullets.push("1) Confirm the statement against primary source lines (EHR, transcript, or original email headers).");
  bullets.push("2) Validate chronology: align timestamps with staffing rosters, pager logs, and vitals trending.");
  bullets.push("3) If contradictions exist, preserve them as anchored deltas for impeachment/causation analysis.");
  bullets.push("OUTPUT_CONSTRAINT: Demo mode produces structured findings but does not claim medical or legal conclusions.");

  return bullets.join("\n");
}

export const analyzeEvidence = async (evidence: EvidenceItem): Promise<AnalysisResult> => {
  // Small delay to preserve the product feel without external calls.
  await new Promise((r) => setTimeout(r, 500));

  const { score, hits } = scoreSignals(evidence.content);
  const tier = tierFromScore(score);

  return {
    summary: buildSummary(evidence, tier),
    liability: buildLiability(tier, hits),
    reasoning: buildReasoning(evidence, hits, tier),
    statutes: buildStatutes(evidence.type, hits),
  };
};
