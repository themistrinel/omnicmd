import { SpeechProvider } from '@/types';

export class WebSpeechProvider implements SpeechProvider {
  readonly id = 'web-speech';
  readonly name = 'Web Speech Recognition';
  private recognition: any = null;
  private isListening: boolean = false;
  private transcriptAccumulator: string = '';

  isSupported(): boolean {
    return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  async startListening(onInterimTranscription?: (text: string) => void): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('Speech Recognition is not supported in this environment');
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'pt-BR'; // or dynamic user language

    this.transcriptAccumulator = '';
    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.transcriptAccumulator += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      if (onInterimTranscription) {
        onInterimTranscription((this.transcriptAccumulator + interim).trim());
      }
    };

    this.recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
    };

    this.recognition.start();
  }

  async stopListening(): Promise<string> {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
    return this.transcriptAccumulator.trim();
  }
}

export class WhisperSpeechProvider implements SpeechProvider {
  readonly id = 'whisper-api';
  readonly name = 'Whisper Audio Transcription';
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  isSupported(): boolean {
    return typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  }

  async startListening(): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('MediaDevices not available for audio capture');
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };
    this.mediaRecorder.start();
  }

  async stopListening(): Promise<string> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve('');
        return;
      }

      this.mediaRecorder.onstop = async () => {
        // Here the recorded audio blob can be sent to 9router or local whisper endpoint
        // SpeechProvider -> transcrição -> AIProvider
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        console.info(`Audio recorded (${audioBlob.size} bytes). Ready for Whisper STT endpoint.`);
        resolve('');
      };

      this.mediaRecorder.stop();
    });
  }
}

class SpeechRegistry {
  private activeProvider: SpeechProvider = new WebSpeechProvider();

  getProvider(): SpeechProvider {
    return this.activeProvider;
  }

  setProvider(provider: SpeechProvider) {
    this.activeProvider = provider;
  }
}

export const speechRegistry = new SpeechRegistry();
