import { envKey } from "./env";

const voices: Record<string, { locale: string; name: string }> = {
  "en-IN": { locale: "en-IN", name: "en-IN-NeerjaNeural" },
  "hi-IN": { locale: "hi-IN", name: "hi-IN-SwaraNeural" },
  "kn-IN": { locale: "kn-IN", name: "kn-IN-SapnaNeural" },
};

export function azureVoiceConfig() {
  const key = envKey("AZURE_VOICE_KEY");
  const region = envKey("AZURE_VOICE_REGION") || "centralindia";
  if (!key) {
    throw new Error("AZURE_VOICE_KEY is missing in .env");
  }
  return { key, region };
}

export function voiceFor(lang: string) {
  return voices[lang] ?? voices["en-IN"];
}

function escapeXml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function azureSpeechToText(audio: ArrayBuffer, language: string) {
  const { key, region } = azureVoiceConfig();
  const locale = voiceFor(language).locale;
  const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${encodeURIComponent(locale)}&format=detailed`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      Accept: "application/json",
      "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
    },
    body: audio,
  });
  const raw = await res.text();
  if (!res.ok) {
    throw new Error(azureError(res.status, raw, region));
  }
  const data = JSON.parse(raw) as {
    RecognitionStatus?: string;
    DisplayText?: string;
    NBest?: { Display?: string }[];
  };
  const text =
    data.DisplayText?.trim() || data.NBest?.[0]?.Display?.trim() || "";
  if (!text) {
    throw new Error("I didn’t catch that. Try again a little closer to the mic.");
  }
  return text;
}

export async function azureTextToSpeech(text: string, language: string) {
  const { key, region } = azureVoiceConfig();
  const voice = voiceFor(language);
  const ssml = `<speak version="1.0" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${voice.locale}"><voice xml:lang="${voice.locale}" name="${voice.name}"><prosody rate="0.94" pitch="+6%">${escapeXml(text)}</prosody></voice></speak>`;
  const res = await fetch(
    `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "User-Agent": "BiteMaadi",
      },
      body: ssml,
    },
  );
  if (!res.ok) {
    const raw = await res.text();
    throw new Error(azureError(res.status, raw, region));
  }
  return Buffer.from(await res.arrayBuffer());
}

function azureError(status: number, raw: string, region: string) {
  if (status === 401 || status === 403) {
    return `Azure voice rejected the key for region “${region}”. Set AZURE_VOICE_REGION in .env to your Speech resource location (Azure portal → Speech → Keys and Endpoint).`;
  }
  return `Azure voice failed (${status}). ${raw.slice(0, 180)}`;
}
