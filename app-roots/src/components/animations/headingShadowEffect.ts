export const HEADING_SHADOW_FROM =
  "16px 0 36px rgba(123,47,255,0.7), 32px 0 64px rgba(0,200,255,0.25)";
export const HEADING_SHADOW_TO = "0px 0px 0px rgba(0,0,0,0)";

export function splitLineIntoLetters(line: HTMLElement): HTMLElement[] {
  if (line.dataset.lettersSplit === "true") {
    return Array.from(line.querySelectorAll<HTMLElement>(".heading-char"));
  }

  const text = line.textContent ?? "";
  line.textContent = "";
  line.dataset.lettersSplit = "true";

  const letters: HTMLElement[] = [];

  for (const char of text) {
    const span = document.createElement("span");
    span.className = "heading-char inline-block will-change-transform";
    span.textContent = char === " " ? "\u00A0" : char;
    line.appendChild(span);
    letters.push(span);
  }

  return letters;
}

export function collectHeadingLetters(container: HTMLElement): HTMLElement[] {
  const lines = Array.from(
    container.querySelectorAll<HTMLElement>("[data-line]")
  );
  return lines.flatMap(splitLineIntoLetters);
}

export function setHeadingLettersInitial(
  letters: HTMLElement[],
  fromX = 80
) {
  letters.forEach((letter) => {
    letter.style.transform = `translate3d(${fromX}px, 0, 0)`;
    letter.style.opacity = "0.3";
    letter.style.textShadow = HEADING_SHADOW_FROM;
  });
}

export function applyHeadingLetterReveal(
  letters: HTMLElement[],
  progress: number,
  fromX = 80
) {
  const total = letters.length;
  if (!total) return;

  letters.forEach((letter, index) => {
    const start = index / total;
    const end = Math.min(start + 0.18, 1);
    const span = end - start || 1;
    const t = Math.min(Math.max((progress - start) / span, 0), 1);
    const shadowMix = 1 - t;

    letter.style.transform = `translate3d(${(1 - t) * fromX}px, 0, 0)`;
    letter.style.opacity = String(0.3 + t * 0.7);
    letter.style.textShadow =
      shadowMix <= 0.01
        ? HEADING_SHADOW_TO
        : `${16 * shadowMix}px 0 ${36 * shadowMix}px rgba(123,47,255,${0.7 * shadowMix}), ${32 * shadowMix}px 0 ${64 * shadowMix}px rgba(0,200,255,${0.25 * shadowMix})`;
  });
}
