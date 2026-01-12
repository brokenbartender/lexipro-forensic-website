import { GoogleGenAI, Type } from "@google/genai";
import { EvidenceItem, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeEvidence = async (evidence: EvidenceItem): Promise<AnalysisResult> => {
  try {
    const model = 'gemini-3-pro-preview';
    
    const prompt = `
      You are LexiPro, a specialized forensic legal AI. 
      Analyze the following raw evidence snippet from a medical malpractice dossier.
      
      METADATA:
      - Type: ${evidence.type}
      - Timestamp: ${evidence.timestamp}
      - ID: ${evidence.id}
      
      CONTENT:
      "${evidence.content}"
      
      TASK:
      Perform a deep forensic analysis. Do not offer general advice. 
      Identify contradictions, standard of care violations, or credibility issues.
      
      OUTPUT REQUIREMENTS (JSON):
      1. summary: A professional, objective summary of the facts (max 2 sentences).
      2. liability: A short, punchy risk assessment (e.g., "High Risk: Failure to Rescue").
      3. reasoning: A detailed 'Chain-of-Thought' explanation. Connect the specific timestamps, clinical values, and actions to legal standards.
      4. statutes: List 2-3 specific medical-legal terms, statutes, or protocols relevant to this exact scenario.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            liability: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            statutes: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "liability", "reasoning", "statutes"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      summary: "Analysis interrupted.",
      liability: "System Error",
      reasoning: "The forensic engine could not complete the request. Please check API connectivity.",
      statutes: ["Error"]
    };
  }
};