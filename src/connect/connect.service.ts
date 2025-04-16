import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { CreateConnectDto } from './dto/create-connect.dto';
import { UpdateConnectDto } from './dto/update-connect.dto';

@Injectable()
export class ConnectService {
  private readonly anthropic: Anthropic;
  
  constructor () {
    this.anthropic = new Anthropic({
      apiKey:process.env.ANTHROPICS_API_KEY,
    });
  }

  async sendMessage(prompt:string): Promise<string> {
   try {
    const msg = await this.anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1000,
      temperature: 1,
      system: "Respond only with short poems.",
      messages: [
              {
              role: "user",
              content: [
            {
              type: "text",
              text: prompt
            }
          ]
        }
    ]
});
    console.log("content from result", msg);
    return (msg.content[0] as { text: string }).text
      
    
   } catch (error) {
    throw new Error(`Could not perform Claude response ${error.message}`);
   } 
  
}
  create(createConnectDto: CreateConnectDto) {
    return 'This action adds a new connect';
  }

  findAll() {
    return `This action returns all connect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connect`;
  }

  update(id: number, updateConnectDto: UpdateConnectDto) {
    return `This action updates a #${id} connect`;
  }

  remove(id: number) {
    return `This action removes a #${id} connect`;
  }
}
