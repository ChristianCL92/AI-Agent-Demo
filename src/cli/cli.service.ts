import { Injectable, Logger } from '@nestjs/common';
import { Anthropic } from '@anthropic-ai/sdk'
import { ConfigService } from '@nestjs/config';

interface Message {
 role: "user" | "assistant";
 content: { type: 'text'; text: string }[];
}

@Injectable()
export class CliService {
    private readonly anthropic: Anthropic;
  private readonly logger = new Logger(CliService.name);
  private conversationHistory: Message[] = [];

  constructor(private configService: ConfigService) {
    this.anthropic = new Anthropic({
      apiKey: this.configService.get<string>('ANTHROPICS_API_KEY'),
    });
  }

  /**
   * Send a message to Claude and maintain conversation history
   */
  async sendMessage(userInput: string): Promise<string> {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: [{ type: 'text', text: userInput }],
      });

      // Create message with full conversation history
      const response = await this.anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1000,
        temperature: 0.7,
        system: "You are a helpful AI assistant. Provide clear, concise responses.",
        messages: this.conversationHistory,
      });

      // Get response text
      const responseText = (response.content[0] as { text: string }).text;

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: [{ type: 'text', text: responseText }],
      });

      return responseText;
    } catch (error) {
      this.logger.error(`Claude API error: ${error.message}`);
      throw new Error(`Failed to get Claude response: ${error.message}`);
    }
  }

  resetConversation(): void {
    this.conversationHistory = [];
  }

  getConversationHistory(): Message[] {
    return [...this.conversationHistory];
  }
}
