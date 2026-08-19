function merge(chunks: Float32Array[]) {
  const len = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Float32Array(len);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

function downsample(input: Float32Array, fromRate: number, toRate: number) {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const next = new Float32Array(Math.round(input.length / ratio));
  for (let i = 0; i < next.length; i++) {
    next[i] = input[Math.min(input.length - 1, Math.floor(i * ratio))];
  }
  return next;
}

function encodeWav(samples: Float32Array, sampleRate: number) {
  const bytes = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(bytes);
  const write = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let cursor = 44;
  for (let i = 0; i < samples.length; i++, cursor += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(cursor, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([bytes], { type: "audio/wav" });
}

export type MicSession = {
  stop: () => Promise<Blob>;
};

export async function startMic(): Promise<MicSession> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
  });
  const ctx = new AudioContext();
  const source = ctx.createMediaStreamSource(stream);
  const processor = ctx.createScriptProcessor(4096, 1, 1);
  const mute = ctx.createGain();
  mute.gain.value = 0;
  const chunks: Float32Array[] = [];
  processor.onaudioprocess = (event) => {
    chunks.push(new Float32Array(event.inputBuffer.getChannelData(0)));
  };
  source.connect(processor);
  processor.connect(mute);
  mute.connect(ctx.destination);

  return {
    stop: async () => {
      processor.disconnect();
      source.disconnect();
      mute.disconnect();
      stream.getTracks().forEach((track) => track.stop());
      const pcm = downsample(merge(chunks), ctx.sampleRate, 16000);
      await ctx.close();
      return encodeWav(pcm, 16000);
    },
  };
}
