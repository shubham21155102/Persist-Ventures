import { Injectable } from '@nestjs/common';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';
import { OpenAI } from 'openai';
import { configService } from 'src/config/env.config.service';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: configService.OpenAiKey(),
    });
  }

  create(createAiDto: CreateAiDto) {
    return 'This action adds a new ai';
  }

  findAll() {
    return `This action returns all ai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ai`;
  }

  update(id: number, updateAiDto: UpdateAiDto) {
    return `This action updates a #${id} ai`;
  }

  remove(id: number) {
    return `This action removes a #${id} ai`;
  }
  async trainUserAI(userData: string) {
    const prompt = `Based on this user data: ${userData}, simulate an AI personality that reflects the user's interests, tone, and preferences.`;

    try {
      const response = await this.openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
      });
      const aiPersonality = response.choices[0].text.trim();
      console.log('AI personality:', aiPersonality);
      return aiPersonality;
    } catch (error) {
      console.error('Error creating AI personality:', error);
      throw new Error('Failed to train AI personality');
    }
  }
  async aiConversation(user1Data: string, user2Data: string) {
    const prompt = `User1: ${user1Data}\nUser2: ${user2Data}\n\nSimulate a conversation between these two AIs based on their respective profiles.`;

    try {
      const response = await this.openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
      });
      const aiConversation = response.choices[0].text.trim();
      console.log('AI conversation:', aiConversation);
    } catch (error) {
      console.error('Error creating AI conversation:', error);
      throw new Error('Failed to simulate AI conversation');
    }
  }
}
