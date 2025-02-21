export interface TelegramProvider {
  validateInitData: (data: string) => Promise<TelegramUser>;
}

export type TelegramUser = {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
};
