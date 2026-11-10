/** Splits "1. Do this. 2. Then that." into its steps; text without numbering stays one step. */
export function splitSteps(text: string): string[] {
  const parts = text
    .split(/(?:^|\s)(?=\d+\.\s)/)
    .map(part => part.replace(/^\d+\.\s+/, '').trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [text];
}
