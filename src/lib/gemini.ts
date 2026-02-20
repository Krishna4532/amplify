export const generateAdvocacyVision = async (referrals: number, livesSaved: number) => {
  // Adding a timestamp to the prompt ensures the AI treats every request as unique
  const salt = Date.now(); 
  
  const prompt = `
    Context: Social Impact Startup "Amplify".
    User Stats: ${referrals} referrals, ${livesSaved} lives saved.
    Task: Write a UNIQUE, high-energy advocacy caption.
    Constraint: Do NOT repeat previous styles. Use a different hook each time.
    Random seed: ${salt}
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9, // Higher temperature = more creative/varied responses
        topP: 0.95,
      },
    });
    return result.response.text();
  } catch (error) {
    return "Let's change the world together. Join the movement.";
  }
};