
import { GoogleGenAI } from "@google/genai";
import { ProfileInput, AlimonyInput } from "../types";

export const getProfileAnalysis = async (profile: ProfileInput, estimatedValue: number): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Act as a professional socio-economic career and marriage counselor. 
    Analyze the following profile and its satirical "Social Marriage Valuation":
    
    Profile Details:
    - Monthly Salary: ₹${profile.monthlySalary.toLocaleString()}
    - Education: ${profile.educationLevel}
    - Education Expenses: ₹${profile.educationExpenses.toLocaleString()}
    - Marital Status: ${profile.maritalStatus}
    - Home Ownership: ${profile.hasHome ? 'Yes' : 'No'}
    - Car Ownership: ${profile.hasCar ? 'Yes' : 'No'}
    - Location: ${profile.location}
    - Estimated Valuation: ₹${estimatedValue.toLocaleString()}

    Provide a professional 3-paragraph analysis:
    1. Economic Stability: Evaluate their current financial standing and growth potential.
    2. Social Mobility: Discuss how their education and assets contribute to their status.
    3. Advice: Suggest one way they could improve their "profile value".
    
    Keep the tone professional and informative. Frame it as "market worth" and "socio-economic stability" while keeping it for fun.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI counselor is currently busy. Please try again later.";
  }
};

export const getAlimonyAnalysis = async (input: AlimonyInput, estimatedValue: number): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Act as a professional family law counselor and financial advisor.
    Analyze the following alimony profile (for fun/entertainment context):
    
    Details:
    - Your Monthly Salary: ₹${input.yourMonthlySalary.toLocaleString()}
    - Spouse Monthly Salary: ₹${input.spouseMonthlySalary.toLocaleString()}
    - Marriage Duration: ${input.marriageDuration} years
    - Number of Children: ${input.numberOfChildren}
    - Location: ${input.location}
    - Estimated Monthly Alimony: ₹${estimatedValue.toLocaleString()}

    Provide a professional 3-paragraph analysis:
    1. Financial Impact: How this settlement might affect both parties' standard of living.
    2. Legal Context: General thoughts on how marriage duration and children influence financial dependencies.
    3. Future Outlook: Advice on financial planning for a post-separation life.
    
    Keep the tone professional, objective, and supportive. Ensure it's clear this is for entertainment purposes.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI counselor is currently busy. Please try again later.";
  }
};
