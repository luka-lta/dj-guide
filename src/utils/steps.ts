/** Erkennt einen Fließtext der Form "1. … 2. …". */
const STEP_START = /^1\.\s+/;

/**
 * Zerlegt nummerierte Anleitungen in einzelne Schritte ohne Nummer.
 * Getrennt wird nur an fortlaufenden Nummern, damit Zahlen im Text ("Kanal 2. …") erhalten bleiben.
 * Text ohne führendes "1. " bleibt ein einzelner Eintrag.
 */
export function toSteps(text: string): string[] {
  const trimmed = text.trim();
  if (!STEP_START.test(trimmed)) return [trimmed];

  const steps: string[] = [];
  let rest = trimmed.replace(STEP_START, '');
  for (let next = 2; ; next++) {
    const marker = ` ${next}. `;
    const index = rest.indexOf(marker);
    if (index < 0) break;
    steps.push(rest.slice(0, index).trim());
    rest = rest.slice(index + marker.length);
  }
  steps.push(rest.trim());
  return steps;
}
