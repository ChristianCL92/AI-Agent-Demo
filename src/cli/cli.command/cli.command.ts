import { Command, CommandRunner } from 'nest-commander';
import { CliService } from '../cli.service';
import * as readline from 'readline';


@Command({ name: 'chat', description: 'Start a conversation with Claude' })
export class CliCommand extends CommandRunner {
    private readonly rl: readline.Interface;

  constructor(private readonly cliService: CliService) {
    super();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    console.log('Welcome to Claude CLI Chat! Type "exit" to quit or "reset" to start a new conversation.\n');
    this.startConversation();
  }

  private startConversation(): void {
    this.rl.question('You: ', async (input) => {
      // Check for exit command
      if (input.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        this.rl.close();
        return;
      }

      // Check for reset command
      if (input.toLowerCase() === 'reset') {
        this.cliService.resetConversation();
        console.log('Conversation history has been reset.\n');
        this.startConversation();
        return;
      }

      try {
        // Message sent to Claude
        const response = await this.cliService.sendMessage(input);
        console.log(`\nClaude: ${response}\n`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }

      // Continue conversation
      this.startConversation();
    });
  }
}

