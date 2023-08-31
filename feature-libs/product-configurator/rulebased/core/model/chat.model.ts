export namespace ConfiguratorChat {
  export interface ChatMessage {
    creationDate: Date;
    role: Role;
    content: string;
  }

  export enum Role {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system',
  }
}
