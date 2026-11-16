# Katha: Kokoro Heart recordings

Generated on 16 November 2026 using the author's free Kokoro demo:
https://huggingface.co/spaces/hexgrad/Kokoro-TTS

- Model: Kokoro-82M (Apache-2.0 model license).
- Voice: `af_heart`, American English.
- Generation speed: `0.85`.
- Input: the three narration passages in `demo/katha-story.js`, unchanged.
- Audio: 24 kHz, mono, 16-bit PCM WAV.
- Original durations: 14.475, 15.425 and 15.075 seconds.
- Each clip is padded with silence to 17 seconds; full story 51 seconds.
- Files are hosted with the website. No API key, generation or credits are needed during playback.

`scripts/prepare-katha-kokoro.py` prepares the downloaded recordings and player configuration; it does not generate speech. To regenerate, use the same voice, speed and narration in the linked demo, then replace the three WAVs before running the script.
