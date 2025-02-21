import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';
import { TelegramProvider, TelegramUser } from './telegram.provider.ts';
import { handleAxiosError } from '../../utils/axios.ts';

const UserResponseSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string().optional(),
  username: z.string().optional(),
});

type ConstructorInput = {
  baseUrl: string;
};

class TelegramProviderMerlin implements TelegramProvider {
  private readonly client: AxiosInstance;

  private readonly baseUrl: string;

  constructor({ baseUrl }: ConstructorInput) {
    this.baseUrl = baseUrl;

    this.client = axios.create({
      baseURL: baseUrl,
    });
  }

  async validateInitData(data: string): Promise<TelegramUser> {
    const url = `/api/validate-telegram`;

    try {
      const response = await this.client.post(url, {
        data: JSON.stringify({ initData: data }),
      });

      const result = UserResponseSchema.parse(response.data);

      return result;
    } catch (error) {
      return handleAxiosError(error, `${this.baseUrl}${url}`);
    }
  }
}

export default TelegramProviderMerlin;
